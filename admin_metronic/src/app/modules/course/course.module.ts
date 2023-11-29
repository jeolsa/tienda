import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseDeleteComponent } from './course-delete/course-delete.component';
import { CourseListComponent } from './course-list/course-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CKEditorModule } from 'ckeditor4-angular';
import { SectionAddComponent } from './section/section-add/section-add.component';
import { SectionEditComponent } from './section/section-edit/section-edit.component';
import { SectionDelComponent } from './section/section-del/section-del.component';
import { ClaseAddComponent } from './clases/clase-add/clase-add.component';
import { ClaseEditComponent } from './clases/clase-edit/clase-edit.component';
import { ClaseDeleteComponent } from './clases/clase-delete/clase-delete.component';
import { ClaseFileDeleteComponent } from './clases/clase-file-delete/clase-file-delete.component';


@NgModule({
  declarations: [
    CourseComponent,
    CourseAddComponent,
    CourseEditComponent,
    CourseDeleteComponent,
    CourseListComponent,
    SectionAddComponent,
    SectionEditComponent,
    SectionDelComponent,
    ClaseAddComponent,
    ClaseEditComponent,
    ClaseDeleteComponent,
    ClaseFileDeleteComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,

    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,

    CKEditorModule,
  ]
})
export class CourseModule { }
