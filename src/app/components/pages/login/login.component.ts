import { Component } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form:any
  mensagem!: String;

  user = {} as User;
  users!: User[];

  constructor(private formBuilder: FormBuilder){
    this.buildForm();
  }


  logar(){
    if(this.form.get('login').value == this.user.login && this.form.get('password').value == this.user.password){
      this.mensagem = "Login efetuado com sucesso";
    } else {
      this.mensagem = "Login ou senha incorretos";
    }
  }

  buildForm(){
    this.form = this.formBuilder.group({
      login: [''],
      senha: [''],
    });
  }

}
