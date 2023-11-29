import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CategorieService } from '../service/categorie.service';

@Component({
  selector: 'app-categorie-delete',
  templateUrl: './categorie-delete.component.html',
  styleUrls: ['./categorie-delete.component.scss']
})
export class CategorieDeleteComponent implements OnInit {

  @Input() categorie:any;
  @Output() CategorieD: EventEmitter<any> = new EventEmitter();

  isLoading:any;

  constructor(public toaster: Toaster, public modal: NgbActiveModal, public categorieService: CategorieService) { }

  ngOnInit(): void {
    this.isLoading = this.categorieService.isLoading$;
  }

  delete(){
    this.categorieService.delete(this.categorie.id).subscribe((resp:any) => {
      console.log(resp)
      this.CategorieD.emit(resp.categorie);
      this.toaster.open({text: 'Categoria inactivada exitosamente', caption: 'Proceso', type: 'success'});
      this.modal.dismiss();
    })
  }
}
