import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/DTO/Login.DTO';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  form: any;
  mensagem!: String;

  user = {} as User;
  users!: User[];


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
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
    console.log(form);
    if(this.form.get('login').value === null && this.form.get('senha') === null){
      this.mensagem = "Login e senha não podem ser nulos";
    } else {
      this.authService.login(this.user);
    }

    if(this.form.get('login').value == this.user.username && this.form.get('senha').value == this.user.password){
      this.mensagem = "Login efetuado com sucesso";
    } else {
      this.mensagem = "Login ou senha incorretos";
    }
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
