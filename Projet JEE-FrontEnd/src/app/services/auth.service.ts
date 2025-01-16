import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from './models/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:8085/auth/login'; // URL correcte de l'auth backend via API Gateway

  constructor(private http: HttpClient) {}

  // Méthode de connexion
  login(email: string, password: string): Observable<LoginResponse> {
    const payload = { email, password }; // Structure correcte pour l'auth backend
    return this.http.post<LoginResponse>(this.authUrl, payload);
  }

  // Méthodes auxiliaires
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user'); // Nettoyer les données utilisateur
    localStorage.removeItem('role'); // Nettoyer le rôle
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
}
