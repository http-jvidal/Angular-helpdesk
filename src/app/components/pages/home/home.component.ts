import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  nome!: string;
  departamento!: string;
  contato!: string;


  user = {} as User;
  users: User[] = [];
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
    ){

}

  ngOnInit() {
    const username = localStorage.getItem('username');

    if (username) {
      this.userService.getUserByUsername(username).subscribe({
        next: (userData) => {
          if (userData) {
            this.nome = userData.name;
            this.departamento = userData.departamento.name;
            this.contato = userData.contato;

          } else {
            console.log('Usuário não encontrado.');
          }
        },
        error: (error) => {
          console.error('Erro ao obter informações do usuário:', error);
        }
      });
    } else {
      console.log('Nome de usuário não encontrado no localStorage.');
    }
  }

}
