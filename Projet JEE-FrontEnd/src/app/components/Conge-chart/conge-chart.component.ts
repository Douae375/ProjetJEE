import { Component, OnInit } from '@angular/core';
import { CongeService } from '../../services/conge.service';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conge-chart',
  standalone: true,
  templateUrl: './conge-chart.component.html',
  styleUrls: ['./conge-chart.component.css'],
  imports: [CommonModule]
})
export class CongeChartComponent implements OnInit {

  constructor(private congeService: CongeService) {
    Chart.register(...registerables);  // Register all necessary Chart.js components
  }

  ngOnInit(): void {
    this.loadCongeData();
  }

  loadCongeData(): void {
    this.congeService.getCountsByStatus().subscribe((data: any[]) => {
      // Adjust for array of arrays structure
      const statuses = data.map(item => item[0]);  // First element of each array is the status
      const counts = data.map(item => item[1]);    // Second element of each array is the count
  
      console.log('Statuses:', statuses);
      console.log('Counts:', counts);
  
      this.createDoughnutChart(statuses, counts);  // Create chart with the extracted data
    });
  }
  

  createDoughnutChart(statuses: string[], counts: number[]): void {
    new Chart('congeChart', {
      type: 'doughnut',  // Doughnut chart type
      data: {
        labels: statuses,  // Labels for the doughnut (statuses)
        datasets: [{
          label: 'Congés by Status',
          data: counts,  // Data for the doughnut (counts)
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)', // PENDING
            'rgba(54, 162, 235, 0.2)', // APPROVED
            'rgba(255, 99, 132, 0.2)', // REJECTED
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
