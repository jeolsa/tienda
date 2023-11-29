import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

declare function _clickDoc():any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //auth-login
  email:any = null;
  password:any = null;

  //aut-register
  email_register:any = null;
  password_register:any = null;
  name:any = null;
  surname:any = null;
  password_confirmation:any = null;

  constructor(public authService: AuthService, public router: Router){}

  ngOnInit(): void {
    setTimeout(() => {
      _clickDoc();
    }, 50);

    if(this.authService.user){
      this.router.navigateByUrl("/");
      //document.location.reload();
      return;
    }

  }

  login(){
    if(!this.email || !this.password){
      alert("campos obligatorios");
      return;
    }

    this.authService.login(this.email,this.password).subscribe((resp:any) => {
      console.log(resp)
      if (resp) {
        window.location.reload();
      } else {
        alert("las credenciales no existen")
      }
    })
  }

  register(){
    if ( !this.email_register || !this.name || !this.surname || !this.password_register || !this.password_confirmation) {
      alert("todos los campos son necesarios");
      return;
    }

    if ( this.password_confirmation != this.password_register ) {
      alert("Las contraseñas no coinciden");
      return;
    }

    let data = {
      email: this.email_register,
      name: this.name,
      surname: this.surname,
      password: this.password_register,
    }
    this.authService.register(data).subscribe((resp:any) => {
      console.log(resp.msg)
      if(resp.status == "200"){
        alert(resp.msg)
      }

      if(resp.status == "401"){
        alert(resp.msg)
      }
    })
  }
}
