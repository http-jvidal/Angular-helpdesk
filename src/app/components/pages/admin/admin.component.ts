import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})

export class AdminComponent implements OnInit{

  user = {} as User;
  users: User[] = [];

  ticket = {} as Ticket;
  tickets: Ticket[] = [];

  roles!: string;
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar
  ){

  }

  ngOnInit(): void {
    this.getUser();

  }


  saveUser(form: NgForm) {
    if(this.user.id !== undefined){
      this.userService.updateUser(this.user).subscribe( () => {
        this.cleanForm(form);
        this.snackBar.open("Usuário Atualizado", "Fechar", {
          duration: 3000
        });
      });

    } else{
      this.userService.saveUser(this.user).subscribe(() => {
        this.cleanForm(form);
        this.snackBar.open("Usuário salvo", "Fechar", {
          duration: 3000
        });
      });
    }
  }


  getUser(){
    try {
      this.userService.getUsers().subscribe((users: User[]) => {
        this.users = users;
      })
    } catch(e){
      this.snackBar.open("Não foi possivel retornar usuários: " + e)
    }
  }

  deleteUser(user: User) {
    try{
      this.userService.deleteUser(user).subscribe(() => {
        this.getUser();
        this.snackBar.open("Usuário Deletado", "Fechar", {
          duration: 3000
        });
      })
    } catch(e){
      this.snackBar.open("Erro ao Deletar usuário: " + e, "Fechar", {
        duration: 3000
      })
    }

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
