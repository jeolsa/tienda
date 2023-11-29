import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CategorieService } from '../service/categorie.service';

@Component({
  selector: 'app-categorie-edit',
  templateUrl: './categorie-edit.component.html',
  styleUrls: ['./categorie-edit.component.scss']
})
export class CategorieEditComponent implements OnInit {

  name:any = null;
  imagen_prev: any = "";
  file_imagen:any = null;

  isLoading:any;
  selected_option:any = 1;
  categorie_id:any = null;

  @Input() categorie:any;
  @Output() CategorieE: EventEmitter<any> = new EventEmitter();
  @Input() CATEGORIES:any = null;


  constructor(public toaster: Toaster, public modal: NgbActiveModal, public categorieService: CategorieService) { }

  ngOnInit(): void {
    this.isLoading = this.categorieService.isLoading$;
    this.name = this.categorie.name;
    this.imagen_prev = this.categorie.imagen? this.categorie.imagen: "./assets/media/avatars/300-6.jpg";
    this.selected_option = this.categorie.categorie_id ? 2 : 1;
    this.categorie_id = this.categorie.categorie_id;
  }

  processImagen($event:any){
    //console.log($event.target.files[0].type)
    if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toaster.open({text: 'Solamente se aceptan imagenes', caption: 'Mensaje de validación', type: 'danger'});
      return;
    }

    this.file_imagen = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.file_imagen);
    reader.onloadend = () => this.imagen_prev = reader.result;

  }

  store(){

    if(this.selected_option == 1){
      if (!this.name) {
        this.toaster.open({text: 'Todos los campos son obligatorios', caption: 'Mensaje de validación', type: 'danger'});
        return;
      }
    }

    if(this.selected_option == 2){
      if (!this.name || !this.categorie_id) {
        this.toaster.open({text: 'Todos los campos son obligatorios', caption: 'Mensaje de validación', type: 'danger'});
        return;
      }
    }

    let formData = new FormData();

    formData.append("name",this.name);
    if(this.file_imagen){
      formData.append("image",this.file_imagen);
    }
    if(this.categorie_id){
      formData.append("categorie_id",this.categorie_id)
    }

    this.categorieService.update(formData, this.categorie.id).subscribe((resp:any) => {
      console.log(resp)
      this.CategorieE.emit(resp.categorie);
      this.toaster.open({text: 'Categoria editada exitosamente', caption: 'Proceso', type: 'success'});
      this.modal.close();
    })

  }

}
