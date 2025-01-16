export interface TicketDTO {
    id?: number;
    type: string;
    date: Date;
    description: string;
    statut: string; 
    ticketcount?: number;  // Add this if you need it for the counts
  }
  