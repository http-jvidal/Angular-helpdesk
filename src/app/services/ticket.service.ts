import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, finalize, retry, throwError } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {


  private ticketUrl;
  constructor( private httpClient: HttpClient) {
    this.ticketUrl = "http://10.10.10.110:8082/api/ticket/";
  }

  httpOptions = {
    _headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    get headers() {
      return this._headers;
    },
    set headers(value) {
      this._headers = value;
    },
  }


  createTicket(ticket : Ticket): Observable<any>{
    return this.httpClient.post<Ticket>(this.ticketUrl, JSON.stringify(ticket), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  updateTicket(ticket: Ticket): Observable<Ticket>{
    return this.httpClient.put<Ticket>(this.ticketUrl + ticket.id, JSON.stringify(ticket), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent)
      errorMessage = error.error.message;
    else
      errorMessage = `Código de erro: ${error.status}, ` + `mensagem: ${error.message}`;
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
