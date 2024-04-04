import { Observable, catchError, retry, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class UserService {
  private usersUrl: string;

  authenticated = false;

  constructor(private httpClient: HttpClient) {
    this.usersUrl = "http://10.10.10.181:8082/api/users"
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

  public getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.usersUrl + '/')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getByRoles(username: string): any {
    return this.httpClient.get(this.usersUrl + "/roles/" + username)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getUserByUsername(username: string): Observable<User>{
    return this.httpClient.get<User>(this.usersUrl + '/find/username/' + username)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  
  getUserById(id: number): Observable<User>{
    return this.httpClient.get<User>(this.usersUrl + '/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  saveUser(user : User): Observable<any>{
    return this.httpClient.post<User>(this.usersUrl + '/' , JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  updateUser(user: User): Observable<User>{
    return this.httpClient.put<User>(this.usersUrl + '/update/' + user.id, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteUser(user: User): Observable<User>{
    return this.httpClient.delete<User>(this.usersUrl + '/delete/' + user.id, this.httpOptions)
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
