import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-technicien-user',
  templateUrl: './technicien-user.component.html',
  styleUrls: ['./technicien-user.component.css'],
  imports: [CommonModule, NavbarComponent],
})
export class TechnicienUserComponent implements OnInit {
  tickets: any[] = [];

  constructor(
    private ticketService: TicketService,
  ) {}

  ngOnInit(): void {
    this.loadMyTickets();
  }

  loadMyTickets(): void {
    this.ticketService.getMyTickets().subscribe((data: any[]) => {
      this.tickets = data;
    });
  }
  

  takeTicket(ticket: any): void {
    if (ticket.statut === 'Open') {
      // Transition from 'Open' to 'In Progress'
      this.ticketService.updateTicketStatus(ticket.id, 'In Progress').subscribe(() => {
        Swal.fire('Started!', 'The ticket is now in progress.', 'success');
        this.loadMyTickets(); // Reload the tickets after updating the status
      });
    } else if (ticket.statut === 'In Progress') {
      // Transition from 'In Progress' to 'Closed'
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to mark this ticket as completed?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, complete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.ticketService.updateTicketStatus(ticket.id, 'Closed').subscribe(() => {
            Swal.fire('Completed!', 'The ticket is now closed.', 'success');
            this.loadMyTickets(); // Reload the tickets after updating the status
          });
        }
      });
    }
  }
  
  
  
  
  

  canTakeTicket(ticket: any): boolean {
    return ticket.statut === 'Open' || ticket.statut === 'In Progress';
  }

  logout(): void {
    window.location.href = '/login'; // Replace with your actual login route
  }
}
