import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = "http://localhost:8082/auth";

  constructor(private http: HttpClient) { }


  httpOptions = {
    _headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    get headers() {
      return this._headers;
    },
    set headers(value) {
      this._headers = value;
    },
  }
  // Método para fazer login
  login(login: string, password: string): Observable<any> {
    const loginData = { 
      login: login, 
      password: password,
    };
  
    return this.http.post<User>(this.authUrl + '/login', loginData)
      .pipe(
        retry(2),
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