import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  name:any = null;
  surname:any = null;
  email:any = null;
  password:any = null;
  confirmation_password:any = null;
  imagen_prev:any = "./assets/media/avatars/300-6.jpg";
  file_avatar:any = null;
  profesion:any = null;
  description:any = null;


  isLoading:any;

  selected_rol:number = 1;


  @Input() user:any;
  @Output() UserE: EventEmitter<any> = new EventEmitter();

  constructor(public toaster: Toaster, public modal: NgbActiveModal, public userService: UserService) { }

  ngOnInit(): void {
    this.isLoading = this.userService.isLoading$;
    this.name = this.user.name;
    this.surname = this.user.surname;
    this.email = this.user.email;
    this.imagen_prev = this.user.avatar;
    this.selected_rol = this.user.role.id;
    this.profesion = this.user.profesion;
    this.description = this.user.description;
  }

  processAvatar($event:any){
    //console.log($event.target.files[0].type)
    if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toaster.open({text: 'Solamente se aceptan imagenes', caption: 'Mensaje de validación', type: 'danger'});
      return;
    }

    this.file_avatar = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.file_avatar);
    reader.onloadend = () => this.imagen_prev = reader.result;

  }

  store(){

    if (!this.name || !this.surname || !this.email || !this.selected_rol) {
      this.toaster.open({text: 'Todos los campos son obligatorios', caption: 'Mensaje de validación', type: 'danger'});
      return;
    }

    if(this.password){
      if (this.password != this.confirmation_password) {
        this.toaster.open({text: 'Las contraseñas no coinciden', caption: 'Mensaje de validación', type: 'danger'});
        return;
      }
    }

    if(this.selected_rol == 3 && (!this.description || !this.profesion)){
      this.toaster.open({text: 'Para los tutores son necesarios la profesión y la descripción', caption: 'Mensaje de validación', type: 'danger'});
      return;
    }

    let formData = new FormData();

    formData.append("name",this.name);
    formData.append("surname",this.surname);
    formData.append("email",this.email);
    if(this.password){
      formData.append("password",this.password);
    }
    formData.append("role_id", this.selected_rol.toString());
    formData.append("tipo","2");
    if(this.file_avatar){
      formData.append("image",this.file_avatar);
    }
    formData.append("email",this.email);
    if(this.description){
      formData.append("description",this.description);
    }
    if(this.profesion){
      formData.append("profesion",this.profesion);
    }

    this.userService.update(formData, this.user.id).subscribe((resp:any) => {
      console.log(resp)
      this.UserE.emit(resp.user);
      this.toaster.open({text: 'Usuario editado exitosamente', caption: 'Proceso', type: 'success'});
      this.modal.close();
    })

  }

  selectedRol(value:number){
    this.selected_rol = value;
  }

}
