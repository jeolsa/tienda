import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponRoutingModule } from './coupon-routing.module';
import { CouponComponent } from './coupon.component';
import { CouponListComponent } from './coupon-list/coupon-list.component';
import { CouponAddComponent } from './coupon-add/coupon-add.component';
import { CouponEditComponent } from './coupon-edit/coupon-edit.component';
import { CouponDeleteComponent } from './coupon-delete/coupon-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    CouponComponent,
    CouponListComponent,
    CouponAddComponent,
    CouponEditComponent,
    CouponDeleteComponent
  ],
  imports: [
    CommonModule,
    CouponRoutingModule,

    HttpClientModule,//peticiones http
    FormsModule,//formularios reactivos
    NgbModule,//bootstrap
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
  ]
})
export class CouponModule { }
