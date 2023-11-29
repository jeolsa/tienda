import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseDeleteComponent } from '../course-delete/course-delete.component';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  COURSES:any = [];
  isLoading:any;

  search:any = null;
  state:any = null;

  constructor(public courseService:CourseService, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;
    this.listCourses();
  }

  listCourses(){

    this.courseService.listCourses(this.search, this.state).subscribe((resp:any) => { console.log(resp)
      this.COURSES = resp.courses.data;
    })
  }

  deleteCourse(Course:any){
    const modalRef = this.modalService.open(CourseDeleteComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.course = Course;

    modalRef.componentInstance.CourseD.subscribe((Course:any) => {
      let index = this.COURSES.findIndex((item:any) => item.id == Course.id);
      //this.COURSES.splice(index,1);
      this.COURSES[index] = Course;
    })
  }


}
