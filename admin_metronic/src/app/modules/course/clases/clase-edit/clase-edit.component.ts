import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../../service/course.service';
import { ClaseFileDeleteComponent } from '../clase-file-delete/clase-file-delete.component';

@Component({
  selector: 'app-clase-edit',
  templateUrl: './clase-edit.component.html',
  styleUrls: ['./clase-edit.component.scss']
})
export class ClaseEditComponent implements OnInit {

  @Input() clase_selected:any;
  @Output() ClaseE: EventEmitter<any> = new EventEmitter();
  title:any = null;
  state:any = 1;
  description:any;
  video_curso:any = null;
  link_video_clase:any = null;

  FILES:any = [];
  FILES_CLASE:any = [];

  isLoading:any;
  isLoadVideo:boolean = false;
  isUploadFile:boolean = false;

  constructor(
    public courseService: CourseService,
    public modal: NgbActiveModal,
    public toaster: Toaster,
    public sanitizer: DomSanitizer,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;
    this.title = this.clase_selected.name;
    this.description = this.clase_selected.description;
    this.state = this.clase_selected.state;
    this.FILES_CLASE = this.clase_selected.file;
    this.link_video_clase = this.clase_selected.vimeo_id;
  }

  public onChange(event: any){
    this.description = event.editor.getData();
  }

  save(){
    let data = {
      name: this.title,
      state: this.state,
      description: this.description
    }

    this.courseService.updateClase(data,this.clase_selected.id).subscribe((resp:any) => {
      if(resp.codigo == 200){
        this.ClaseE.emit(resp.clase);
        this.modal.close();
        this.toaster.open({text: resp.msg, caption: "Proceso", type:"success"});
      }
      else{
        this.toaster.open({text: resp.msg, caption: "Proceso", type:"danger"});
      }
    })
  }

  processFiles($event:any){
    for (let file of $event.target.files) {
      this.FILES.push(file);

    }
    console.log(this.FILES)

  }

  deleteFile(FILE:any){
    const modalref = this.modalService.open(ClaseFileDeleteComponent, { centered:true, size: 'md' });
    modalref.componentInstance.flie_selected = FILE;

    modalref.componentInstance.FileD.subscribe((resp:any) => {
      let INDEX = this.FILES_CLASE.findIndex((item:any) => item.id == FILE.id);

      this.FILES_CLASE.splice(INDEX,1);
    })
  }

  uploadVideo(){
    let formData = new FormData();
    formData.append("video",this.video_curso);

    this.isLoadVideo = true;

    this.courseService.uploadVideoClase(formData, this.clase_selected.id).subscribe((resp:any) => {

      this.isLoadVideo = false;
      this.link_video_clase = resp.link_video;
      this.toaster.open({text: resp.message_text, caption: 'Acción exitosa', type: resp.tipo });

    })
  }

  urlVideo(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.link_video_clase);
  }

  uploadFiles(){
    if(this.FILES.length == 0){
      this.toaster.open({text: "Selecciona por lo menos un recurso", caption: 'Acción exitosa', type: "danger" });
      return;
    }

    let formData = new FormData();
    formData.append("course_clase_id", this.clase_selected.id);
    this.FILES.forEach((file:any,index:number) => {
      formData.append("files["+index+"]",file);
    });
    this.isUploadFile = true;
    this.courseService.registerClaseFile(formData).subscribe((resp:any) => {
      this.isUploadFile = false;
      this.ClaseE.emit(resp.clase);
      this.toaster.open({text: "Recurso cargado exitosamente", caption: 'Acción exitosa', type: "success" });
      this.modal.close();
    })
  }

  processVideo($event:any){
    if ($event.target.files[0].type.indexOf("video") < 0) {
      this.toaster.open({text: 'Solamente se aceptan videos', caption: 'Mensaje de validación', type: 'danger'});
      return;
    }
    console.log($event.target.files[0])
    this.video_curso = $event.target.files[0];
  }

}
