import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service'; // Replace with your actual service path
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-chart',
  standalone: true,
  templateUrl: './department-chart.component.html', // Update the path as needed
  styleUrls: ['./department-chart.component.css'], // Update the path as needed
  imports: [CommonModule]
})
export class DepartmentChartComponent implements OnInit {
  constructor(private departmentService: DepartmentService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadDepartmentData();
  }

  loadDepartmentData(): void {
    this.departmentService.getEmployeeCountsByDepartment().subscribe((data: any[]) => {
      console.log(data); // Check the structure of data

      // Map the first and second elements of each array
      const departmentNames = data.map(item => item[0]); // Access the first element of each array (department name)
      const userCounts = data.map(item => item[1]); // Access the second element of each array (user count)

      console.log('Department Names:', departmentNames);
      console.log('User Counts:', userCounts);

      this.createChart(departmentNames, userCounts); // Pass the data to the chart creation function
    });
  }

  createChart(departmentNames: string[], userCounts: number[]): void {
    new Chart('departmentChart', {
      type: 'bar', // Bar chart type
      data: {
        labels: departmentNames, // Labels for the X axis (department names)
        datasets: [
          {
            label: 'Users by Department',
            data: userCounts, // Data for the Y axis (user counts)
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true, // Ensure it starts at zero
            ticks: {
              stepSize: 1, // Increment by 1
            },
          },
        },
      },
    });
  }
}
