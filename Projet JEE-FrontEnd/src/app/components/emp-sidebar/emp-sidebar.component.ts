import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-emp',
  standalone: true,
  imports: [CommonModule], // Include CommonModule in imports
  templateUrl: './emp-sidebar.component.html',
  styleUrls: ['./emp-sidebar.component.css'],
})
export class EMPSidebarComponent {
  @Output() tableSelected = new EventEmitter<string>();
  selectedTableType: string = 'EmpDashboard';

  constructor(private router: Router) {}

  selectTable(tableType: string): void {
    this.selectedTableType = tableType;
    this.tableSelected.emit(tableType);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
