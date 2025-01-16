import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeDTO } from './models/Employee-dto.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8085/api/employees';

  constructor(private http: HttpClient) {}

  // Récupérer tous les employés
  getAllEmployees(): Observable<EmployeeDTO[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<EmployeeDTO[]>(this.apiUrl, { headers });
  }

  // Créer un nouvel employé
  createEmployee(employeeData: any): Observable<EmployeeDTO> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<EmployeeDTO>(this.apiUrl, employeeData, { headers });
  }
  getAllDepartments(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>('http://localhost:8085/api/employees/departments', { headers });
  }
  
// EmployeeService.ts
// Récupérer les détails de l'employé par ID
getEmployeeById(id: number): Observable<EmployeeDTO> {
  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<EmployeeDTO>(`${this.apiUrl}/${id}`, { headers });
}


  // Mettre à jour un employé existant
  updateEmployee(employeeId: number, employeeData: any): Observable<EmployeeDTO> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<EmployeeDTO>(`${this.apiUrl}/${employeeId}`, employeeData, { headers });
  }
  getTotalEmployees(): Observable<number> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<number>(`${this.apiUrl}/total`, { headers });
  }

  // Supprimer un employé
  deleteEmployee(employeeId: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${employeeId}`, { headers });
  }
}
