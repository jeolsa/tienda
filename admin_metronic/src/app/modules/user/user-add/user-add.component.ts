import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  @Output() UserC: EventEmitter<any> = new EventEmitter();

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

  constructor(public toaster: Toaster, public modal: NgbActiveModal, public userService: UserService) { }

  ngOnInit(): void {
    this.isLoading = this.userService.isLoading$;
  }

  processAvatar($event:any){
    console.log($event.target.files[0].type)
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

    if (!this.name || !this.surname || !this.email || !this.password || !this.confirmation_password || !this.file_avatar) {
      this.toaster.open({text: 'Todos los campos son obligatorios', caption: 'Mensaje de validación', type: 'danger'});
      return;
    }

    if (this.password != this.confirmation_password) {
      this.toaster.open({text: 'Las contraseñas no coinciden', caption: 'Mensaje de validación', type: 'danger'});
      return;
    }

    if(this.selected_rol == 3 && (!this.description || !this.profesion)){
      this.toaster.open({text: 'Para los tutores son necesarios la profesión y la descripción', caption: 'Mensaje de validación', type: 'danger'});
      return;
    }

    let formData = new FormData();

    formData.append("name",this.name)
    formData.append("surname",this.surname)
    formData.append("email",this.email)
    formData.append("password",this.password)
    formData.append("role_id", this.selected_rol.toString())
    formData.append("tipo","2")
    formData.append("image",this.file_avatar)
    if(this.description){
      formData.append("description",this.description);
    }
    if(this.profesion){
      formData.append("profesion",this.profesion);
    }

    this.userService.register(formData).subscribe((resp:any) => {
      console.log(resp)
      this.UserC.emit(resp.user);
      this.toaster.open({text: 'Usuario creado exitosamente', caption: 'Proceso', type: 'success'});
      this.modal.close();
    })

  }

  selectedRol(value:number){
    this.selected_rol = value;
  }
}
