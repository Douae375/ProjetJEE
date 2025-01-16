import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EMPSidebarComponent } from '../emp-sidebar/emp-sidebar.component';
import { EMPTableComponent } from '../emp-table/emp-table.component';

@Component({
  selector: 'app-emp-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    EMPSidebarComponent,
    EMPTableComponent,
  ],
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css'],
})
export class EMPDashboardComponent {
  selectedTableType: string = 'EmpDashboard';

  onTableSelected(tableType: string): void {
    this.selectedTableType = tableType;
  }
}
