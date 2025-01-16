import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TableComponent } from '../table/table.component';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { DepartmentChartComponent } from '../DepartmentChart/department-chart.component';
import { CongeChartComponent } from '../Conge-chart/conge-chart.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    CommonModule,
    SidebarComponent,
    TableComponent,
    StatsCardsComponent,
    DepartmentChartComponent,
    CongeChartComponent,
  ],
})
export class DashboardComponent {
  selectedTableType: string = 'Dashboard';

  // Ensure the method accepts a string
  onTableSelected(tableType: string): void {
    this.selectedTableType = tableType;
  }
}
