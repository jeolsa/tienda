import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-clase-file-delete',
  templateUrl: './clase-file-delete.component.html',
  styleUrls: ['./clase-file-delete.component.scss']
})
export class ClaseFileDeleteComponent implements OnInit {

  @Input() flie_selected:any;
  @Output() FileD: EventEmitter<any> = new EventEmitter();

  isLoading:any;

  constructor(public toaster: Toaster, public modal: NgbActiveModal, public courseService: CourseService) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;
  }

  delete(){
    this.courseService.deleteClaseFile(this.flie_selected.id).subscribe((resp:any) => {
      if(resp.codigo == 200){
        this.FileD.emit(resp);
        this.toaster.open({text: resp.msg, caption: 'Proceso', type: 'success'});
        this.modal.dismiss();
      }
      else{
        this.toaster.open({text: resp.msg, caption: 'Proceso', type: 'danger'});
      }

    })
  }
}