import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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


  buildForm(){
    this.form = this.formBuilder.group({
      login: [''],
      senha: [''],
    });
  }

  logar(user: User){
    if(this.form.get('login').value == this.user.username && this.form.get('password').value == this.user.password){
      this.mensagem = "Login efetuado com sucesso";
    } else {
      this.mensagem = "Login ou senha incorretos";
    }
  }

  cleanForm(form: NgForm) {
    form.resetForm();
  }
}
