import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbsenceDTO } from './models/absence-dto.model';

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {
  private readonly apiUrl = 'http://localhost:8085/api/absences';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Récupérer toutes les absences
  getAllAbsences(): Observable<AbsenceDTO[]> {
    return this.http.get<AbsenceDTO[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Récupérer une absence par ID
  getAbsenceById(id: number): Observable<AbsenceDTO> {
    return this.http.get<AbsenceDTO>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Créer une nouvelle absence
  createAbsence(absence: AbsenceDTO): Observable<AbsenceDTO> {
    return this.http.post<AbsenceDTO>(this.apiUrl, absence, { headers: this.getHeaders() });
  }

  // Mettre à jour une absence
  updateAbsence(id: number, absence: AbsenceDTO): Observable<AbsenceDTO> {
    return this.http.put<AbsenceDTO>(`${this.apiUrl}/${id}`, absence, { headers: this.getHeaders() });
  }

  // Supprimer une absence
  deleteAbsence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  getTotalAbsences(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`,{ headers: this.getHeaders() });
  }
}
