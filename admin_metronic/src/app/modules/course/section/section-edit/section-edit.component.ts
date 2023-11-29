import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.scss']
})
export class SectionEditComponent implements OnInit {

  @Input() section_selected:any;
  @Output() SectionE: EventEmitter<any> = new EventEmitter();
  title:any;

  constructor(
    public modal: NgbActiveModal,
    public courseService: CourseService,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
    this.title = this.section_selected.name;
  }

  store(){
    let data = {
      name: this.title,
    }

    this.courseService.updateSections(data, this.section_selected.id).subscribe((resp:any) => {

      this.SectionE.emit(resp);
      this.modal.close();

    })
  }

}
