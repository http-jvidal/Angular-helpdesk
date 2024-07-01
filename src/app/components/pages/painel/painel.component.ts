import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent {

  @ViewChild('formDirective') formDirective!:NgForm

  nome!: string;
  departamento!: string;
  contato!: string;

  user = {} as User;
  users: User[] = [];

  ticket = {} as Ticket;
  tickets!: Ticket[];

  constructor(private ticketService: TicketService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService,
            ){
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Recuperar o nome de usuário do localStorage
    const username = localStorage.getItem('username');

    if (username !== null) {
      this.userService.getUserByUsername(username).subscribe(
        (userData) => {
          if (userData) {
            this.nome = userData.name;
            this.departamento = userData.departamento.name;
            console.log(userData);
          } else {
            console.log('Usuário não encontrado.');
          }
        },
        (error) => {
          console.error('Erro ao obter informações do usuário:', error);
        }
      );
    } else {
      console.log('Nome de usuário não encontrado no localStorage.');
    }

      })
    }

  painelAdmin(): void {

    const username = localStorage.getItem('username');

    if(username != null){
      this.userService.getUserByUsername(username).subscribe(params => {
        (userData: any) => {
          if(userData){
            this.authService.isAdmin
          }
        }
      })
    }

  }

  createTicket(): void {
    if(!this.ticket || !this.ticket.detalhes || !this.nome || !this.departamento || !this.ticket.contato) {
      this.snackBar.open("Preencha todos os campos obrigatórios", "Fechar" ,{
        duration: 3000
      });
      return;
    }

    this.ticket.departamento = this.departamento;
    this.ticket.nome = this.nome;
    this.user.contato = this.contato;

    this.ticketService.createTicket(this.ticket).subscribe( () => {
      this.snackBar.open("Ticket aberto com sucesso", "Fechar", {
        duration: 3000
      });
      this.cleanForm();
    }, (error) => {
      console.log("Erro ao criar ticket", error);
    })
  }

  cleanForm() {
    this.formDirective.resetForm();
  }

}
