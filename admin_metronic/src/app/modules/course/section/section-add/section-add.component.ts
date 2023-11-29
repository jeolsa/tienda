import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../../service/course.service';
import { SectionDelComponent } from '../section-del/section-del.component';
import { SectionEditComponent } from '../section-edit/section-edit.component';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.scss']
})
export class SectionAddComponent implements OnInit {

  course_id:any = null;
  isLoading:any;
  title:any = null;

  SECTIONS:any = [];

  constructor(
    public courseService:CourseService,
    public activeRouter: ActivatedRoute,
    public toaster: Toaster,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;
    this.activeRouter.params.subscribe((resp:any) => {
      this.course_id = resp.id;
    })

    this.courseService.lisSections(this.course_id).subscribe((resp:any) => {
      this.SECTIONS = resp.sections;
    })
  }

  save(){
    if(!this.title){
      this.toaster.open({text: "Necesitar ingresar un nombre de seccion", caption: "Validación", type: "danger"});
      return;
    }

    let data = {
      course_id: this.course_id,
      name: this.title,
      state: 1,
    }

    this.courseService.registerSections(data).subscribe((resp:any) => {
      console.log(resp)
      this.title = null;
      this.SECTIONS.push(resp.section);
      this.toaster.open({text: "La sección se registró con exito", caption: "Proceso", type: "success"});
    })
  }

  editSection(SECTION:any){
    const modalref = this.modalService.open(SectionEditComponent, { centered: true, size: 'md' });
    modalref.componentInstance.section_selected = SECTION;

    modalref.componentInstance.SectionE.subscribe((newEditSection:any) => {

      if(newEditSection.codigo == "200"){
        let INDEX = this.SECTIONS.findIndex((item:any) => item.id == newEditSection.section.id);

        this.toaster.open({text: newEditSection.msg, caption: "Proceso", type: "success"});

        if (INDEX != -1) {
          this.SECTIONS[INDEX] = newEditSection.section;
        }
      }
      else{
        this.toaster.open({text: newEditSection.msg, caption: "Proceso", type: "danger"});
      }

    })
  }

  deleteSection(SECTION:any){
    const modalref = this.modalService.open(SectionDelComponent, { centered: true, size: 'md' });
    modalref.componentInstance.section_selected = SECTION;

    modalref.componentInstance.SectionD.subscribe((newEditSection:any) => {
      if(newEditSection.codigo == "200"){
        let INDEX = this.SECTIONS.findIndex((item:any) => item.id == newEditSection.section.id);

        this.toaster.open({text: newEditSection.msg, caption: "Proceso", type: "success"});

        if (INDEX != -1) {
          this.SECTIONS[INDEX] = newEditSection.section;
        }
      }
      else{
        this.toaster.open({text: newEditSection.msg, caption: "Proceso", type: "danger"});
      }

    })
  }

}
