import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-section-del',
  templateUrl: './section-del.component.html',
  styleUrls: ['./section-del.component.scss']
})
export class SectionDelComponent implements OnInit {

  @Input() section_selected:any;
  @Output() SectionD: EventEmitter<any> = new EventEmitter();

  constructor(
    public modal: NgbActiveModal,
    public courseService: CourseService,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
  }

  delete(){

    this.courseService.deleteSections(this.section_selected.id).subscribe((resp:any) => {

      this.SectionD.emit(resp);
      this.modal.close();

    })
  }
}
