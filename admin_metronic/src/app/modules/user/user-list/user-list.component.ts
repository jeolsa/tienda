import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user.service';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  USERS:any;
  isLoading:any = null;

  search:any = null;
  state:any = null;

  constructor(public modalService: NgbModal, public userService: UserService) { }

  ngOnInit(): void {
    this.isLoading = this.userService.isLoading$;

    this.listUser();
  }

  listUser(){
    this.userService.listUsers(this.search, this.state).subscribe((resp:any) => {
      console.log(resp)
      this.USERS = resp.users.data;
    })
  }

  openModalCreateUseer(){
    const modalRef = this.modalService.open(UserAddComponent,{centered: true, size: 'md'});

    modalRef.componentInstance.UserC.subscribe((User:any) => {
      this.USERS.unshift(User);
    })
  }

  editUser(USER:any){
    const modalRef = this.modalService.open(UserEditComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.user = USER;

    modalRef.componentInstance.UserE.subscribe((User:any) => {
      let index = this.USERS.findIndex((item:any) => item.id == User.id);
      this.USERS[index] = User;
    })
  }

  deleteUser(USER:any){
    const modalRef = this.modalService.open(UserDeleteComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.user = USER;

    modalRef.componentInstance.UserD.subscribe((User:any) => {
      let index = this.USERS.findIndex((item:any) => item.id == User.id);
      //this.USERS.splice(index,1);
      this.USERS[index] = User;
    })
  }

}
