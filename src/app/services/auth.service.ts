import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDTO } from '../DTO/Login.DTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = "http://localhost:8082/auth/users";

  constructor(private http: HttpClient) { }

  // Método para fazer login
  login(loginData: LoginDTO): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, loginData);
  }
}