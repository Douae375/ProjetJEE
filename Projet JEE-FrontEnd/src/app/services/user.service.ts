import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDTO } from './models/User-dto.model';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<UserDTO> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:1010/api/auth');
  }
  getTotalUsers(): Observable<number> {
    const token = localStorage.getItem('authToken'); // Retrieve JWT from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<number>(`${this.apiUrl}/count`, { headers });
  }

  getAllUsers(): Observable<UserDTO[]> {
    const token = localStorage.getItem('authToken'); // Retrieve JWT from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<UserDTO[]>(`${this.apiUrl}/users`, { headers });
  }

  override create(user: UserDTO): Observable<any> {
    const token = localStorage.getItem('authToken');  // Retrieve JWT token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post(`${this.apiUrl}/users`, user, { headers, responseType: 'text' as 'json' });
  }
  

  


  override update(id: number, user: UserDTO): Observable<UserDTO> {
    const token = localStorage.getItem('authToken');  // Retrieve JWT token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.put<UserDTO>(`${this.apiUrl}/users/${id}`, user, { headers });
  }

  // Delete a user by ID
  override delete(id: number): Observable<void> {
    const token = localStorage.getItem('authToken');  // Retrieve JWT token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`, { headers });
  }
  
}
