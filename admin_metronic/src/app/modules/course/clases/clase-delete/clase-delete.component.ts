import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-clase-delete',
  templateUrl: './clase-delete.component.html',
  styleUrls: ['./clase-delete.component.scss']
})
export class ClaseDeleteComponent implements OnInit {

  isLoading:any;
  @Input() clase_selected:any = null;
  @Output() ClaseD: EventEmitter<any> = new EventEmitter();

  constructor(
    public modal: NgbActiveModal,
    public courseService: CourseService,
    public toaster: Toaster
    ) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;

  }

  delete(){
    this.courseService.deleteClase(this.clase_selected.id).subscribe((resp:any) => {
      if(resp.codigo == 200){
        this.ClaseD.emit(resp.clase);
        this.toaster.open({text: resp.msg, caption: "Proceso", type: "success"});
        this.modal.close();
      }
      else{
        this.toaster.open({text: resp.msg, caption: "Proceso", type: "danger"});
      }
    })


  }
}
