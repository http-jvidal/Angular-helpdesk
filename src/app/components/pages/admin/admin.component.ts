import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {


  user = {} as User;
  users!: User[];

  constructor(private userService: UserService){

  }

  ngOnInit(){
    this.getUser();
  }
  saveUser(form: NgForm) {
    if(this.user.id !== undefined){
      this.userService.updateUser(this.user).subscribe( () => {
        this.cleanForm(form);
        console.log("salvo")
      });
    } else{
      this.userService.saveUser(this.user).subscribe(() => {
        this.cleanForm(form);
        console.log("salvo")
      });
    }
  }

  getUser(){
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    })
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(() => {
      this.getUser();
    })
  }

  editUser(user: User) {
    this.user = {...user}
  }

  cleanForm(form: NgForm) {
    this.getUser();
    form.resetForm();
    this.user = {} as User;
  }

}
