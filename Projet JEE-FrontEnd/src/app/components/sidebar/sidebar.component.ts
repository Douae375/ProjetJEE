import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [CommonModule],
})
export class SidebarComponent {
  @Output() tableSelected = new EventEmitter<string>(); // Output for event emission
  selectedTableType: string = 'Dashboard';

  constructor(private router: Router) {}

  selectTable(tableType: string): void {
    this.selectedTableType = tableType;
    this.tableSelected.emit(tableType); // Emit the tableType as string
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
