import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CouponDeleteComponent } from '../../coupon/coupon-delete/coupon-delete.component';
import { DiscountDeleteComponent } from '../discount-delete/discount-delete.component';
import { DiscountService } from '../service/discount.service';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss']
})
export class DiscountListComponent implements OnInit {

  DISCOUNTS:any = [];
  search:any = null;
  state:any = 0;
  tipo:any = 0;
  clase:any = 0;
  campaing:any = 0;

  isLoading:any;

  constructor(
    public discountService: DiscountService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading = this.discountService.isLoading$;
    this.listDiscounts();
  }

  listDiscounts(){
    this.discountService.listDiscount(this.tipo, this.clase, this.campaing, this.state).subscribe((resp:any) => {
      this.DISCOUNTS = resp.discounts.data;
    })
  }

  deleteDiscount(DISCOUNT:any){
    const modalRef = this.modalService.open(DiscountDeleteComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.discount = DISCOUNT;

    modalRef.componentInstance.DiscountD.subscribe((Discount:any) => {
      let index = this.DISCOUNTS.findIndex((item:any) => item.id == Discount.id);
      this.DISCOUNTS.splice(index,1);
      //this.DISCOUNT[index] = Discount;
    })
  }

}
