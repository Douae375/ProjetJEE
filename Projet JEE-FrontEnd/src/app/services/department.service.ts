import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { departmentdtO } from './models/department-dto.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private readonly apiUrl = 'http://localhost:8085/api/departments'; // L'URL de l'API backend

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir les en-têtes avec le token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Récupérer le JWT depuis localStorage
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Récupérer tous les départements
  getAllDepartments(): Observable<departmentdtO[]> {
    const headers = this.getHeaders();
    return this.http.get<departmentdtO[]>(`${this.apiUrl}`, { headers });
  }

  // Récupérer un département par ID
  getDepartmentById(id: number): Observable<departmentdtO> {
    const headers = this.getHeaders();
    return this.http.get<departmentdtO>(`${this.apiUrl}/${id}`, { headers });
  }

  // Créer un nouveau département
  createDepartment(department: departmentdtO): Observable<departmentdtO> {
    const headers = this.getHeaders();
    return this.http.post<departmentdtO>(`${this.apiUrl}`, department, { headers });
  }

  // Mettre à jour un département existant
  updateDepartment(id: number, department: departmentdtO): Observable<departmentdtO> {
    const headers = this.getHeaders();
    return this.http.put<departmentdtO>(`${this.apiUrl}/${id}`, department, { headers });
  }
  getEmployeeCountsByDepartment(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/employee-counts-by-department`, { headers });
  }
  getAllEmployees(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>('http://localhost:8085/api/departments/employees', { headers });
  }
  
  

  // Supprimer un département
  deleteDepartment(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // Vérifier si un département existe par ID
  doesDepartmentExist(id: number): Observable<boolean> {
    const headers = this.getHeaders();
    return this.http.get<boolean>(`${this.apiUrl}/${id}/exists`, { headers });
  }
  getTotalDepartments(): Observable<number> {
    const headers = this.getHeaders();
    return this.http.get<number>(`${this.apiUrl}/total`,{headers});
  }

  // Récupérer les employés d'un département par ID
  getEmployeesByDepartment(id: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/${id}/employees`, { headers });
  }
}
