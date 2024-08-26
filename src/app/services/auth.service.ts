import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { ErrorHandlerService } from './errorhandler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = "http://10.10.10.110:8082/auth";
  private readonly TOKEN_KEY = "authToken";

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient,
              private handleError: ErrorHandlerService) { }

  public saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.loggedIn.next(true);
  }

  public removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.loggedIn.next(false);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public hasToken(): boolean {
    return !!this.getToken();
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable(); // Retorna o Observable do BehaviorSubject
  }

  public login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<{ token: string }>(`${this.authUrl}/login`, body)
      .pipe(
        tap(response => {
          this.saveToken(response.token);
          localStorage.setItem('username', username);
        }),
        catchError(this.handleError.handleError)
      );
  }

  public logout(): void {
    this.removeToken();
  }
}
