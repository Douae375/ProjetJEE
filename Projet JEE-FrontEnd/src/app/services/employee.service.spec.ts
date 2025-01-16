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

  getAllEmployees(): Observable<EmployeeDTO[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<EmployeeDTO[]>(this.apiUrl, { headers });
  }

  createEmployee(employee: EmployeeDTO): Observable<EmployeeDTO> {
    const headers = this.getAuthHeaders();
    return this.http.post<EmployeeDTO>(this.apiUrl, employee, { headers });
  }

  updateEmployee(id: number, employee: EmployeeDTO): Observable<EmployeeDTO> {
    const headers = this.getAuthHeaders();
    return this.http.put<EmployeeDTO>(`${this.apiUrl}/${id}`, employee, { headers });
  }

  deleteEmployee(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
