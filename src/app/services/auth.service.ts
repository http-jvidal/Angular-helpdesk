import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  private isLogged: boolean = true
  private userData: any ;
  private authUrl = "http://localhost:8082/auth";

  user = {} as User;
  users: User[] = [];




  constructor(private http: HttpClient,
              private userService: UserService,
              private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    this.isLogged = true;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    localStorage.setItem('userData', JSON.stringify(this.userService.getUserByUsername(username)));
    this.isAuthenticated = true;


    return this.http.post<any>(`${this.authUrl}/login`, body.toString(),  { headers: headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  isAuthenticatedUser(): boolean{
    return this.isAuthenticated;
  }


  isAdmin(user: string){
    return this.isAuthenticated
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
