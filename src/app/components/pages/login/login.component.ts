import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})


export class LoginComponent implements OnInit{
  form: any;
  mensagem!: String;

  user = {} as User;
  users!: User[];

  carregando: boolean = true;
  login!: string;
  senha!: string;


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar
              ){

  }

  ngOnInit(): void {

  }

  logar(): void{
    if(!this.login || !this.senha){
      this.snackBar.open("Login e Senha não podem ser nulos", "Fechar", {
        duration: 3000
      });
      return
    }

    this.authService.login(this.login, this.senha)?.subscribe( () => {
      localStorage.setItem('username', this.login);
      this.router.navigate(['/ticket']);
      this.snackBar.open("Login efetuado com sucesso", "Fechar", {
        duration: 3000
      });

    }, (error) => {
      console.error("Erro no login", error)
      this.cleanForm(this.form);
    })
  }

  getUser(){
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    })
  }

  cleanForm(form: NgForm): void {
    if (form) {
      form.resetForm();
    }
  }

}
