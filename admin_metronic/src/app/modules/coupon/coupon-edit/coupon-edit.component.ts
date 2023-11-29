import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { CouponService } from '../service/coupon.service';

@Component({
  selector: 'app-coupon-edit',
  templateUrl: './coupon-edit.component.html',
  styleUrls: ['./coupon-edit.component.scss']
})
export class CouponEditComponent implements OnInit {

  code: any = null;
  discount: number = 0;
  num_use: number = 0;
  type_discount: number = 1;
  type_count: number = 1;
  type_coupon: number = 1;
  categorie_id: any;
  course_id: any;
  state: number = 1;

  isLoading: any;

  courses: any = [];
  categories: any = [];
  categories_selecteds: any = [];
  courses_selecteds: any = [];

  coupon_id: any;
  coupon_selected: any;

  constructor(
    public couponService: CouponService,
    public toaster: Toaster,
    public activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = this.couponService.isLoading$;

    this.activeRouter.params.subscribe((resp: any) => {
      this.coupon_id = resp.id;
    })

    this.couponService.lisConfig().subscribe((resp: any) => {
      console.log(resp)
      this.courses = resp.courses;
      this.categories = resp.categories;

      this.showCoupon();
    })
  }

  showCoupon() {
    this.couponService.showCoupon(this.coupon_id).subscribe((resp: any) => {
      this.coupon_selected = resp.coupon;

      this.code = this.coupon_selected.code;
      this.discount = this.coupon_selected.discount;
      this.num_use = this.coupon_selected.num_use;
      this.type_discount = this.coupon_selected.type_discount;
      this.type_count = this.coupon_selected.type_count;
      this.type_coupon = this.coupon_selected.type_coupon;
      this.state = this.coupon_selected.state;

      if (this.type_coupon == 1) {
        this.courses_selecteds = this.coupon_selected.courses;
        //this.courses  = this.coupon_selected.courses;
      }

      if (this.type_coupon == 2) {
        this.categories_selecteds = this.coupon_selected.categories;
        //this.categories = this.coupon_selected.categories;
      }

    })


  }

  save() {
    if (!this.code || !this.discount) {
      this.toaster.open({ text: "Necesitas ingresar todos los campos", caption: "Validacion", type: "warning" });
      return;
    }

    if (this.type_count == 2 && !this.num_use) {
      this.toaster.open({ text: "Necesitas ingresar un numero de uso", caption: "Validacion", type: "warning" });
      return;
    }

    if (this.type_coupon == 1 && this.courses_selecteds.length == 0) {
      this.toaster.open({ text: "Necesitas agrgar algún curso", caption: "Validacion", type: "warning" });
      return;
    }

    if (this.type_coupon == 2 && this.categories_selecteds.length == 0) {
      this.toaster.open({ text: "Necesitas agrgar algúna categoria", caption: "Validacion", type: "warning" });
      return;
    }

    let data = {
      code: this.code,
      type_discount: this.type_discount,
      discount: this.discount,
      type_count: this.type_count,
      num_use: this.num_use,
      type_coupon: this.type_coupon,
      state: this.state,
      course_selected: this.courses_selecteds,
      categorie_selected: this.categories_selecteds
    }

    this.couponService.update(data, this.coupon_id).subscribe((resp: any) => {
      if (resp.codigo == 200) {
        this.toaster.open({ text: resp.msj, caption: "Proceso", type: "success" });
        /*this.code = null,
        this.type_discount = 1,
        this.discount = 0,
        this.type_count = 1,
        this.num_use = 0,
        this.type_coupon = 1,
        this.courses_selecteds = [],
        this.categories_selecteds = []
        this.categorie_id = null;
        this.course_id = null;*/
      }
      else {
        this.toaster.open({ text: resp.msj, caption: "Proceso", type: "danger" });
        return;
      }
    })

  }

  selectedTypeDiscount(type: any) {
    this.type_discount = type;
  }

  selectedTypeCount(type: any) {
    this.type_count = type;
  }

  selectedTypeCoupon(type: any) {
    this.type_coupon = type;
  }

  addCategorieSelected() {

    if (this.courses_selecteds.length > 0) {
      this.toaster.open({ text: "Se ha seleccionado la opcion corso y ya se han agrgado algunos", caption: "Validacion", type: "warning" });
      return;
    }
    else {
      let INDEX = this.categories.findIndex((categorie: any) => categorie.id == this.categorie_id);

      alert("hh")

      if (INDEX != -1) {
        if (!this.categories_selecteds.includes(this.categories[INDEX])) {
          this.categories_selecteds.push(this.categories[INDEX]);
          this.categorie_id = null;
        }
        else {
          this.toaster.open({ text: "Esta categoria ya se ha agregado", caption: "Validacion", type: "warning" })
        }
      }
    }

  }

  addCourseSelected() {
    if (this.categories_selecteds.length > 0) {
      this.toaster.open({ text: "Se ha seleccionado la opcion categoria y ya se han agrgado algunos", caption: "Validacion", type: "warning" });
      return;
    }
    else {
      let INDEX = this.courses.findIndex((course: any) => course.id == this.course_id);

      if (INDEX != -1) {
        if (!this.courses_selecteds.includes(this.courses[INDEX])) {
          this.courses_selecteds.push(this.courses[INDEX]);
          this.course_id = null;
        }
        else {
          this.toaster.open({ text: "Este curso ya se ha agregado", caption: "Validacion", type: "warning" })
        }

      }
    }
  }

  removeCourse(i: number) {
    this.courses_selecteds.splice(i, 1);
  }

  removeCategorie(i: number) {
    this.categories_selecteds.splice(i, 1);
  }

}
