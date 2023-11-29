import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { HomeService } from './services/home.service';

declare var $:any;
declare function HOMEINIT([]):any;
declare function bannerHome():any;
declare function countdownT():any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  CATEGORIES:any = [];
  COURSES_HOME:any = [];
  group_courses_categories:any = [];
  discount_banner:any = null;
  discount_banner_courses:any = [];
  discount_flash:any = null;
  discount_flash_courses:any = [];

  constructor(
    public authService: AuthService,
    public router: Router,
    public homeService: HomeService,
  ){
      setTimeout(() => {
        HOMEINIT($);
      }, 50);

    }

  ngOnInit(): void {
    this.homeService.home().subscribe((resp:any) => {
      console.log(resp)
      this.CATEGORIES = resp.categories;
      this.COURSES_HOME = resp.courses_home.data;
      this.group_courses_categories = resp.group_courses_categories;
      this.discount_banner = resp.discount_banner;
      this.discount_banner_courses = resp.discount_banner_courses;
      this.discount_flash = resp.discount_flash;
      this.discount_flash_courses = resp.discount_flash_courses;

      setTimeout(() => {
        bannerHome();
        countdownT();
      }, 50);
    })


    /*if(!localStorage.getItem("token")){
      this.router.navigateByUrl("/auth/login");
      return;
    }*/

  }

  getNewTotal(COURSE:any, DISCOUNT:any){
    if(DISCOUNT.type_discount ==  2){
      return COURSE.precio_co - COURSE.precio_co*(DISCOUNT.discount*0.01);
    }
    else{
      if(DISCOUNT.discount > COURSE.precio_co ){
        return DISCOUNT.discount - COURSE.precio_co;
      }
      else{
        return COURSE.precio_co - DISCOUNT.discount;
      }
    }
  }

}
