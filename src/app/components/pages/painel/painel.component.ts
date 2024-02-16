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

  
  constructor(private ticketService: TicketService,
              private snackBar: MatSnackBar){
    
  }



  createTicket(){
    this.ticketService.createTicket(this.ticket).subscribe( () => {
      this.cleanForm();
      this.snackBar.open('Ticket aberto', 'Fechar', {
        duration: 3000,
      });
      console.log("Ticket Aberto")
    });
    
    
  }
  
  cleanForm() {
    this.formDirective.resetForm();
  }
}
