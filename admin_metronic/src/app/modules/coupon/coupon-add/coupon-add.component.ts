import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { CouponService } from '../service/coupon.service';

@Component({
  selector: 'app-coupon-add',
  templateUrl: './coupon-add.component.html',
  styleUrls: ['./coupon-add.component.scss']
})
export class CouponAddComponent implements OnInit {

  code: any = null;
  discount: number = 0;
  num_use: number = 0;
  type_discount: number = 1;
  type_count: number = 1;
  type_coupon: number = 1;
  categorie_id: any;
  course_id: any;

  isLoading: any;

  courses: any = [];
  categories: any = [];
  categories_selecteds: any = [];
  courses_selecteds: any = [];

  constructor(
    public couponService: CouponService,
    public toaster: Toaster
  ) { }

  ngOnInit(): void {
    this.isLoading = this.couponService.isLoading$;
    this.couponService.lisConfig().subscribe((resp: any) => {
      console.log(resp)
      this.courses = resp.courses;
      this.categories = resp.categories;
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
      this.toaster.open({text: "Necesitas agrgar algún curso", caption: "Validacion", type: "warning"});
      return;
    }

    if (this.type_coupon == 2 && this.categories_selecteds.length == 0) {
      this.toaster.open({text: "Necesitas agrgar algúna categoria", caption: "Validacion", type: "warning"});
      return;
    }

    let data = {
      code: this.code,
      type_discount: this.type_discount,
      discount: this.discount,
      type_count: this.type_count,
      num_use: this.num_use,
      type_coupon: this.type_coupon,
      course_selected: this.courses_selecteds,
      categorie_selected: this.categories_selecteds
    }

    this.couponService.registerCoupon(data).subscribe((resp:any) => {
      if (resp.codigo == 200) {
        this.toaster.open({text: resp.msj, caption: "Proceso", type: "success"});
        this.code = null,
        this.type_discount = 1,
        this.discount = 0,
        this.type_count = 1,
        this.num_use = 0,
        this.type_coupon = 1,
        this.courses_selecteds = [];
        this.categories_selecteds = [];
        this.categorie_id = null;
        this.course_id = null;
      }
      else{
        this.toaster.open({text: resp.msj, caption: "Proceso", type: "danger"});
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
