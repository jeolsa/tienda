import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { DiscountService } from '../service/discount.service';

@Component({
  selector: 'app-discount-edit',
  templateUrl: './discount-edit.component.html',
  styleUrls: ['./discount-edit.component.scss']
})

export class DiscountEditComponent implements OnInit {

  discount: number = 0;
  type_discount: number = 1;
  clase_discount: number = 1;
  categorie_id: any;
  course_id: any;
  start_date:any = null;
  end_date:any = null;
  type_campaing:number = 1;
  state:any = 1;

  isLoading: any;

  courses: any = [];
  categories: any = [];
  categories_selecteds: any = [];
  courses_selecteds: any = [];

  discount_selected:any;
  discount_id:any;

  constructor(
    public discountService: DiscountService,
    public toaster: Toaster,
    public activeRouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.isLoading = this.discountService.isLoading$;
    this.activeRouter.params.subscribe((resp:any) => {
      this.discount_id = resp.id;
    });
    this.discountService.lisConfig().subscribe((resp: any) => {
      console.log(resp)
      this.courses = resp.courses;
      this.categories = resp.categories;

      this.showDiscount();

    })
  }

  showDiscount(){
    this.discountService.showDiscount(this.discount_id).subscribe((resp:any) => {

      this.discount_selected = resp.discount;

      this.discount = this.discount_selected.discount;
      this.type_campaing = this.discount_selected.type_campaing;
      this.type_discount = this.discount_selected.type_discount;
      this.clase_discount = this.discount_selected.clase_discount;
      this.state = this.discount_selected.state;
      this.start_date = this.discount_selected.start_date;
      this.end_date = this.discount_selected.end_date;

      if (this.clase_discount == 1) {
        this.courses_selecteds = this.discount_selected.courses;
      }

      if (this.clase_discount == 2) {
        this.categories_selecteds = this.discount_selected.categories;
      }

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
      categorie_selected: this.categories_selecteds,
      state: this.state,
    }

    this.discountService.updateDiscount(data,this.discount_id).subscribe((resp:any) => {
      if (resp.codigo == 200) {
        this.toaster.open({text: resp.msj, caption: "Proceso", type: "success"});
        /*this.type_discount = 1,
        this.discount = 0,
        this.clase_discount = 1,
        this.start_date = null;
        this.end_date = null;
        this.courses_selecteds = [];
        this.categories_selecteds = [];
        this.categorie_id = null;
        this.course_id = null;*/
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
    console.log(this.categories_selecteds)

    if (this.courses_selecteds.length > 0) {
      this.toaster.open({ text: "Se ha seleccionado la opcion corso y ya se han agrgado algunos", caption: "Validacion", type: "warning" });
      return;
    }
    else {
      let VALID = this.categories_selecteds.findIndex((categorie:any) => categorie.id == this.categorie_id);
      if (VALID == -1) {
        let INDEX = this.categories.findIndex((categorie: any) => categorie.id == this.categorie_id);

        if (INDEX != -1) {
          if (!this.categories_selecteds.includes(this.categories[INDEX])) {
            this.categories_selecteds.push(this.categories[INDEX]);
            this.categorie_id = null;
          }

        }
      }
      else {
        this.toaster.open({ text: "Esta categoria ya se ha agregado", caption: "Validacion", type: "warning" })
      }
    }

  }

  addCourseSelected() {
    if (this.categories_selecteds.length > 0) {
      this.toaster.open({ text: "Se ha seleccionado la opcion categoria y ya se han agrgado algunos", caption: "Validacion", type: "warning" });
      return;
    }
    else {
      let VALID = this.courses_selecteds.findIndex((course:any) => course.id == this.course_id);
      if (VALID == -1) {
        let INDEX = this.courses.findIndex((course: any) => course.id == this.course_id);

        if (INDEX != -1) {
          if (!this.courses_selecteds.includes(this.courses[INDEX])) {
            this.courses_selecteds.push(this.courses[INDEX]);
            this.course_id = null;
          }
        }
      }
      else {
        this.toaster.open({ text: "Este curso ya se ha agregado", caption: "Validacion", type: "warning" })
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
