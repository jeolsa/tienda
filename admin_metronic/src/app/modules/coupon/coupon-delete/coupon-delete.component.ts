import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CategorieService } from '../../categories/service/categorie.service';
import { CouponService } from '../service/coupon.service';

@Component({
  selector: 'app-coupon-delete',
  templateUrl: './coupon-delete.component.html',
  styleUrls: ['./coupon-delete.component.scss']
})
export class CouponDeleteComponent implements OnInit {

  @Input() coupon:any;
  @Output() CouponD: EventEmitter<any> = new EventEmitter();

  isLoading:any;

  constructor(public toaster: Toaster, public modal: NgbActiveModal, public couponService: CouponService) { }

  ngOnInit(): void {
    this.isLoading = this.couponService.isLoading$;
  }

  delete(){
    this.couponService.delete(this.coupon.id).subscribe((resp:any) => {
      this.CouponD.emit(resp.coupon);
      this.toaster.open({text: 'Cupón eliminado exitosamente', caption: 'Proceso', type: 'success'});
      this.modal.dismiss();
    })
  }
}
