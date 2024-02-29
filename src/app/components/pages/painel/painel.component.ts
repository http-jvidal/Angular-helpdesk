import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket.service';
@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
})

export class PainelComponent {


  @ViewChild('formDirective') formDirective!:NgForm


  ticket = {} as Ticket;
  tickets!: Ticket[];

  mensagem!: String;


  options = [
    {label: "TI", value: "TI"},
    {label: "RH", value: "RH"},
    {label: "COMPRAS", value: "COMPRAS"},
    {label: "EXPEDIÇÃO", value: "EXPEDIÇÃO"},
    {label: "ALMOX", value: "ALMOXARIFADO"},
  ]
  
  constructor(private ticketService: TicketService,
              private snackBar: MatSnackBar){
    
  }

  createTicket(){
    this.ticketService.createTicket(this.ticket).
    subscribe( response => {
      this.snackBar.open("Ticket aberto com sucesso", response, {
        duration: 3000,
      });
    }, error => {
      this.snackBar.open("Erro ao abrir ticket", error, {
        duration: 3000,
      });

      this.cleanForm();
    }
    
    );
    
    
  }
  
  cleanForm() {
    this.formDirective.resetForm();
  }

  
}
