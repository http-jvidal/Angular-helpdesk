import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any;
  mensagem!: String;

  user = {} as User;
  users!: User[];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              ){
    this.buildForm();
  }
  ngOnInit(): void {
    this.getUser()
  }

  buildForm(){
    this.form = this.formBuilder.group({
      login: [''],
      senha: [''],
    });
  }

  logar(form: NgForm){
    if(this.form.get('login').value === null && this.form.get('senha') === null){
      this.mensagem = "Login e/ou senha não podem ser nulos";
    } else {
      this.userService.login(this.user).subscribe()
    }

    if(this.form.get('login').value == this.user.username && this.form.get('senha').value == this.user.password){
      this.mensagem = "Login efetuado com sucesso";
    } else {
      this.mensagem = "Login ou senha incorretos";
    }
    this.cleanForm(form);
  }

  getUser(){
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    })
  }
  cleanForm(form: NgForm) {
    this.getUser();
    form.resetForm();
    this.user = {} as User;
  }
}
