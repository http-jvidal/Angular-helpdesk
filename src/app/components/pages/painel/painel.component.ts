import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
})

export class PainelComponent implements OnInit {


  @ViewChild('formDirective') formDirective!:NgForm

  nome!: string;
  departamento!: string;

  ticket = {} as Ticket;
  tickets!: Ticket[];

  constructor(private ticketService: TicketService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private userService: UserService){
    
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Recuperar o nome de usuário do localStorage
    const username = localStorage.getItem('username');

    if (username !== null) {
    // Obter informações do usuário com base no nome de usuário
      this.userService.getUserByUsername(username).subscribe(
        (userData) => {
          if (userData) {
            this.nome = userData.name; // Supondo que 'nome' seja o atributo que armazena o nome do usuário
            this.departamento = userData.departamento.name; // Supondo que 'departamento' seja o atributo que armazena o departamento do usuário
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

  createTicket(): void {
    if(!this.ticket || !this.ticket.detalhes || !this.nome || !this.departamento || !this.ticket.contato) {
      this.snackBar.open("Preencha todos os campos obrigatórios", "Fechar" ,{
        duration: 3000
      });
      return;
    } 

    this.ticket.departamento = this.departamento;
    this.ticket.nome = this.nome;

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
