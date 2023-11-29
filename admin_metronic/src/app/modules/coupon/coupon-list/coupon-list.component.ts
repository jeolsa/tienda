import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieDeleteComponent } from '../../categories/categorie-delete/categorie-delete.component';
import { CouponDeleteComponent } from '../coupon-delete/coupon-delete.component';
import { CouponService } from '../service/coupon.service';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss']
})
export class CouponListComponent implements OnInit {

  COUPONS:any = [];
  search:any = null;
  state:any = 0;

  isLoading:any;

  constructor(
    public couponService: CouponService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading = this.couponService.isLoading$;
    this.listCoupons();
  }

  listCoupons(){
    this.couponService.listCoupons(this.search, this.state).subscribe((resp:any) => {
      this.COUPONS = resp.coupons.data;
    })
  }

  deleteCoupons(COUPON:any){
    const modalRef = this.modalService.open(CouponDeleteComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.coupon = COUPON;

    modalRef.componentInstance.CouponD.subscribe((Coupon:any) => {
      let index = this.COUPONS.findIndex((item:any) => item.id == Coupon.id);
      this.COUPONS.splice(index,1);
      //this.COUPONS[index] = Coupon;
    })
  }

}
