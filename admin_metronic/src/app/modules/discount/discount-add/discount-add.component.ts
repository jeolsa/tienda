import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { DiscountService } from '../service/discount.service';

@Component({
  selector: 'app-discount-add',
  templateUrl: './discount-add.component.html',
  styleUrls: ['./discount-add.component.scss']
})
export class DiscountAddComponent implements OnInit {

  discount: number = 0;
  type_discount: number = 1;
  clase_discount: number = 1;
  categorie_id: any;
  course_id: any;
  start_date:any = null;
  end_date:any = null;
  type_campaing:number = 1;

  isLoading: any;

  courses: any = [];
  categories: any = [];
  categories_selecteds: any = [];
  courses_selecteds: any = [];

  constructor(
    public discountService: DiscountService,
    public toaster: Toaster
  ) { }

  ngOnInit(): void {
    this.isLoading = this.discountService.isLoading$;
    this.discountService.lisConfig().subscribe((resp: any) => {
      console.log(resp)
      this.courses = resp.courses;
      this.categories = resp.categories;
    })
  }

  save() {
    if (!this.discount || !this.start_date || !this.end_date) {
      this.toaster.open({ text: "Necesitas ingresar todos los campos", caption: "Validacion", type: "warning" });
      return;
    }

    if (this.clase_discount == 1 && this.courses_selecteds.length == 0) {
      this.toaster.open({text: "Necesitas agrgar algún curso", caption: "Validacion", type: "warning"});
      return;
    }

    if (this.clase_discount == 2 && this.categories_selecteds.length == 0) {
      this.toaster.open({text: "Necesitas agrgar algúna categoria", caption: "Validacion", type: "warning"});
      return;
    }

    let data = {
      type_discount: this.type_discount,
      discount: this.discount,
      start_date: this.start_date,
      end_date: this.end_date,
      clase_discount: this.clase_discount,
      type_campaing: this.type_campaing,
      course_selected: this.courses_selecteds,
      categorie_selected: this.categories_selecteds
    }

    this.discountService.registerDiscount(data).subscribe((resp:any) => {
      if (resp.codigo == 200) {
        this.toaster.open({text: resp.msj, caption: "Proceso", type: "success"});
        this.type_discount = 1,
        this.discount = 0,
        this.clase_discount = 1,
        this.start_date = null;
        this.end_date = null;
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

  selectedTypeCampaing(type:any){
    this.type_campaing = type;
    this.clase_discount = 1;
  }

  selectedClaseDiscount(type: any) {
    this.clase_discount = type;
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
