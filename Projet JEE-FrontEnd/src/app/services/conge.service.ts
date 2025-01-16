import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CongeDTO } from './models/conge-dto';

@Injectable({
  providedIn: 'root',
})
export class CongeService {
  private readonly apiUrl = 'http://localhost:8085/api/conges';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Récupérer tous les congés
  getAllConges(): Observable<CongeDTO[]> {
    return this.http.get<CongeDTO[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Créer un nouveau congé
  createConge(conge: CongeDTO): Observable<CongeDTO> {
    return this.http.post<CongeDTO>(this.apiUrl, conge, { headers: this.getHeaders() });
  }

  // Approuver un congé
  approveConge(id: number): Observable<CongeDTO> {
    return this.http.put<CongeDTO>(`${this.apiUrl}/${id}/approve`, {}, { headers: this.getHeaders() });
  }
  getCountsByStatus(): Observable<{ status: string, count: number }[]> {
    return this.http.get<{ status: string, count: number }[]>(`${this.apiUrl}/count-by-status`,{ headers: this.getHeaders() });
  }
  // Rejeter un congé
  rejectConge(id: number): Observable<CongeDTO> {
    return this.http.put<CongeDTO>(`${this.apiUrl}/${id}/reject`, {}, { headers: this.getHeaders() });
  }
  getCongesByEmployeeId(employeeId: number): Observable<CongeDTO[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CongeDTO[]>(`http://localhost:8085/api/conges/employee/${employeeId}`, { headers });
  }

  getTotalConges(): Observable<number> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<number>(`${this.apiUrl}/total`, { headers });
  }
  
}
