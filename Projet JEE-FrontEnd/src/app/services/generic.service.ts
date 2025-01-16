import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class GenericService<T> {
  protected apiUrl: string;

  constructor(protected http: HttpClient, apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  protected getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, entity, { headers: this.getHeaders() });
  }

  update(id: number, entity: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, entity, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
