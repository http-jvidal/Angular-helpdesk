import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user = {} as User;
  users!: User[];

  constructor(private userService: UserService){

  }

  saveUser(form: NgForm) {
    this.userService.saveUser(this.user).subscribe(() => {
      this.cleanForm(form);
      console.log("salvo")
      console.log(this.user);
    });
  }

  cleanForm(form: NgForm) {
    this.getUser();
    form.resetForm();
    this.user = {} as User;
  }

  getUser(){
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    })
  }
}
