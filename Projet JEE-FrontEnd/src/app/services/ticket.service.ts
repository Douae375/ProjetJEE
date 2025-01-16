import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketDTO } from './models/Ticket-dto.model';
import { GenericService } from './generic.service';
import { AuthService } from './auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root',
})
export class TicketService extends GenericService<TicketDTO> {
  constructor(http: HttpClient, private authService: AuthService) { // Inject AuthService here
    super(http, 'http://localhost:1010/api/tickets');
  }

  createTicket(ticketData: any): Observable<TicketDTO> {
    const token = localStorage.getItem('authToken'); // Retrieve JWT from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Now authService is available, get the current user's ID
    const payload = {
      ...ticketData,
      user: { id: this.authService.getCurrentUser()?.id }, // Include the logged-in user's ID
    };

    return this.http.post<TicketDTO>(`${this.apiUrl}`, payload, { headers });
  }

  // Method for assigning a technician to a ticket
  assignTechnician(ticketId: number, technicianId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${ticketId}/assign-technician?technicianId=${technicianId}`, {}, { headers });
  }
  

  override getAll(): Observable<TicketDTO[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<TicketDTO[]>(`${this.apiUrl}`, { headers });
  }

  // Other ticket-related methods remain unchanged...



  // Other ticket-related methods remain unchanged...



  // Specific method for getting tickets by status
  countTicketsByStatut(): Observable<{ statut: string; ticketcount: number }[]> {
    const token = localStorage.getItem('authToken'); // Retrieve JWT from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<{ statut: string; ticketcount: number }[]>(`${this.apiUrl}/by-status`, { headers });
  }

  // Specific method for getting tickets by technician
  getTicketsByTechnician(): Observable<TicketDTO[]> {
    return this.http.get<TicketDTO[]>(`${this.apiUrl}/by-technician`);
  }

  // Total ticket count
  getTotalTickets(): Observable<number> {
    const token = localStorage.getItem('authToken'); // Retrieve JWT from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<number>(`${this.apiUrl}/count`, { headers });
  }

  // Specific method for getting tickets by equipment type
  getTicketsByEquipementType(): Observable<TicketDTO[]> {
    return this.http.get<TicketDTO[]>(`${this.apiUrl}/by-equipement-type`);
  }

  getMyTickets(): Observable<TicketDTO[]> {
    const token = localStorage.getItem('authToken'); // Retrieve JWT from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<TicketDTO[]>(`${this.apiUrl}/my-tickets`, { headers });
  }
  
  // Add this method to your TicketService
updateTicketStatus(ticketId: number, status: string): Observable<any> {
  const token = localStorage.getItem('authToken'); // Retrieve JWT from localStorage
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.put(`${this.apiUrl}/${ticketId}/status`, { status }, { headers });
}

}
