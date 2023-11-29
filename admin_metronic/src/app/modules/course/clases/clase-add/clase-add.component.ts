import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../../service/course.service';
import { ClaseDeleteComponent } from '../clase-delete/clase-delete.component';
import { ClaseEditComponent } from '../clase-edit/clase-edit.component';

@Component({
  selector: 'app-clase-add',
  templateUrl: './clase-add.component.html',
  styleUrls: ['./clase-add.component.scss']
})
export class ClaseAddComponent implements OnInit {

  title:any = null;
  description:any = null;
  section_id:any;

  CLASES:any = [];
  FILES:any = [];

  isLoading:any;

  @ViewChild('fileUploader') fileUploader:ElementRef;


  constructor(
    public courseService:CourseService,
    public activeRouter: ActivatedRoute,
    public toaster: Toaster,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {

    this.activeRouter.params.subscribe((resp:any) => {
      this.section_id = resp.id;
    })

    this.isLoading = this.courseService.isLoading$;

    this.courseService.lisClases(this.section_id).subscribe((resp:any) => {
      console.log(resp.clases.data)
      this.CLASES = resp.clases.data;
    })

  }

  public onChange(event: any){
    this.description = event.editor.getData();
  }

  addClase(){
    if (!this.title) {
      this.toaster.open({text: "Ingresa el titulo de la clase", caption: "Validación", type: "danger"});
      return;
    }

    if(this.FILES.length == 0){
      this.toaster.open({text: "Sube por lo menos un recurso para la clase", caption: "Validación", type: "danger"});
      return;
    }

    let formData = new FormData();
    formData.append("name", this.title);
    formData.append("description", this.description);
    formData.append("course_section_id", this.section_id);
    formData.append("state", "1");

    this.FILES.forEach((file:any, index:number) => {
      formData.append("files["+index+"]",file);
    });

    this.courseService.registerClase(formData).subscribe((resp:any) => {
      if(resp.codigo == 200){
        console.log(resp.clase)
        this.toaster.open({text: resp.msg, caption: "Proceso", type: "success"});
        this.CLASES.push(resp.clase);
        this.title = null;
        this.description = null;
        this.FILES = [];
        this.fileUploader.nativeElement.value = null;

      }
      else{
        this.toaster.open({text: resp.msg, caption: "Proceso", type: "danger"});
      }
    })
  }

  editClase(CLASE:any){
    const modalref =  this.modalService.open(ClaseEditComponent, {centered: true, size: "lg"});
    modalref.componentInstance.clase_selected = CLASE;

    modalref.componentInstance.ClaseE.subscribe((claseE:any) => {
      let INDEX = this.CLASES.findIndex((item:any) => item.id == claseE.id);
      this.CLASES[INDEX] = claseE;
    })
  }

  deleteClase(CLASE:any){
    const modalref = this.modalService.open(ClaseDeleteComponent, { centered:true, size: 'md' });
    modalref.componentInstance.clase_selected = CLASE;

    modalref.componentInstance.ClaseD.subscribe((resp:any) => {
      let INDEX = this.CLASES.findIndex((item:any) => item.id == CLASE.id);

      this.CLASES.splice(INDEX,1);
    })
  }

  processFiles($event:any){
    for (let file of $event.target.files) {
      this.FILES.push(file);

    }
    console.log(this.FILES)
    /*if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toaster.open({text: 'Solamente se aceptan imagenes', caption: 'Mensaje de validación', type: 'danger'});
      return;
    }

    this.file_portada = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.file_portada);
    reader.onloadend = () => this.portada_prev = reader.result;
    this.courseService.isLoadingSubject.next(true);
    setTimeout(() => {
      this.courseService.isLoadingSubject.next(false);
    }, 50);*/
  }


}
