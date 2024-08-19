import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {

  @ViewChild('formDirective') formDirective!:NgForm

  nome!: string;
  departamento!: string;
  contato!: string;

  ticket = {} as Ticket;
  tickets!: Ticket[];

  user = {} as User;
  users: User[] = [];



  constructor(private ticketService: TicketService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService){
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

