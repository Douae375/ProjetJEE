import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salaire } from './models/salary-dto.model';

@Injectable({
  providedIn: 'root',
})
export class SalaireService {
  private readonly apiUrl = 'http://localhost:8085/api/salaire'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir les en-têtes avec le token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Récupérez le token depuis le localStorage ou autre source
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Récupérer tous les salaires
  getAllSalaries(): Observable<Salaire[]> {
    return this.http.get<Salaire[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Créer un nouveau salaire
  createSalaire(salaire: Salaire): Observable<Salaire> {
    console.log('Données envoyées au backend:', salaire);
    return this.http.post<Salaire>(this.apiUrl, salaire, { headers: this.getHeaders() });
  }

  // Recalculer les montants pour tous les salaires
  recalculateSalaries(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/recalculate`, {}, { headers: this.getHeaders() });
  }

  // Mettre à jour un salaire existant
  updateSalaire(id: number, salaire: Salaire): Observable<Salaire> {
    console.log('Mise à jour du salaire avec ID:', id, 'Données:', salaire);
    return this.http.put<Salaire>(`${this.apiUrl}/${id}`, salaire, { headers: this.getHeaders() });
  }

  // Supprimer un salaire existant
  deleteSalaire(id: number): Observable<void> {
    console.log('Suppression du salaire avec ID:', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  // Récupérer les salaires d'un employé spécifique
getSalariesByEmployeeId(employeeId: number): Observable<Salaire[]> {
  return this.http.get<Salaire[]>(`${this.apiUrl}/employee/${employeeId}`, { headers: this.getHeaders() });
}

}
