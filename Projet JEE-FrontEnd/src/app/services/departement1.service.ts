import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartementDTO } from './models/Departement-dto.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class DepartementService1 extends GenericService<DepartementDTO> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:1010/api/departements');
  }
  getTotalDepartements(): Observable<number> {
    const token = localStorage.getItem('authToken'); // Retrieve JWT from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<number>(`${this.apiUrl}/count`, { headers });
  }
   getAllDepartements(): Observable<DepartementDTO[]> {
    const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get<DepartementDTO[]>(`${this.apiUrl}`, { headers });

  }
}
