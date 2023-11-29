import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CategorieService } from '../service/categorie.service';

@Component({
  selector: 'app-categorie-add',
  templateUrl: './categorie-add.component.html',
  styleUrls: ['./categorie-add.component.scss']
})
export class CategorieAddComponent implements OnInit {

  @Output() CategorieC: EventEmitter<any> = new EventEmitter();
  @Input() CATEGORIES:any = null;

  name:any = null;
  imagen_prev: any = "";
  file_imagen:any = null;

  isLoading: any;

  selected_option:number = 1;
  categorie_id:any = null;


  constructor(public toaster: Toaster, public modal: NgbActiveModal, public categorieService: CategorieService) { }

  ngOnInit(): void {
    this.isLoading = this.categorieService.isLoading$;
  }

  processImage($event:any){
    console.log($event.target.files[0].type)
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
      if (!this.name || !this.file_imagen) {
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

    formData.append("name",this.name)
    if(this.categorie_id){
      formData.append("categorie_id",this.categorie_id)
    }
    if (this.file_imagen) {
      formData.append("image",this.file_imagen)
    }

    this.categorieService.registerCategorie(formData).subscribe((resp:any) => {
      console.log(resp)
      this.CategorieC.emit(resp.categorie);
      this.toaster.open({text: 'Categoria creada exitosamente', caption: 'Proceso', type: 'success'});
      this.modal.close();
    })

  }

  selectedOption(value:number){
    this.selected_option = value;
  }

}
