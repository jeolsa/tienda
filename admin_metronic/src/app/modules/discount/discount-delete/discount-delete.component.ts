import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { DiscountService } from '../service/discount.service';

@Component({
  selector: 'app-discount-delete',
  templateUrl: './discount-delete.component.html',
  styleUrls: ['./discount-delete.component.scss']
})
export class DiscountDeleteComponent implements OnInit {

  @Input() discount:any;
  @Output() DiscountD: EventEmitter<any> = new EventEmitter();

  isLoading:any;

  constructor(public toaster: Toaster, public modal: NgbActiveModal, public discountService: DiscountService) { }

  ngOnInit(): void {
    this.isLoading = this.discountService.isLoading$;
  }

  delete(){
    this.discountService.deleteDiscount(this.discount.id).subscribe((resp:any) => {
      this.DiscountD.emit(resp.discount);
      this.toaster.open({text: 'Descuento eliminado exitosamente', caption: 'Proceso', type: 'success'});
      this.modal.dismiss();
    })
  }

}
