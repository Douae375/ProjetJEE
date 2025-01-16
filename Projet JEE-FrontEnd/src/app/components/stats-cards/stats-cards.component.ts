import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { CongeService } from '../../services/conge.service';
import { AbsenceService } from '../../services/absence.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  templateUrl: './stats-cards.component.html',
  styleUrls: ['./stats-cards.component.css'],
  imports: [CommonModule]
})
export class StatsCardsComponent implements OnInit {
  stats = [
    { label: 'Total Employees', value: 0, icon: 'fas fa-users' },
    { label: 'Total Departments', value: 0, icon: 'fas fa-building' },
    { label: 'Total Conges', value: 0, icon: 'fas fa-calendar-check' },
    { label: 'Total Absences', value: 0, icon: 'fas fa-calendar-times' }
  ];

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private congeService: CongeService,
    private absenceService: AbsenceService
  ) {}

  ngOnInit(): void {
    // Fetch total employees
    this.employeeService.getTotalEmployees().subscribe((count) => {
      this.stats[0].value = count;
    });

    // Fetch total departments
    this.departmentService.getTotalDepartments().subscribe((count) => {
      this.stats[1].value = count;
    });

    // Fetch total leaves
    this.congeService.getTotalConges().subscribe((count) => {
      this.stats[2].value = count;
    });

    // Fetch total absences
    this.absenceService.getTotalAbsences().subscribe((count) => {
      this.stats[3].value = count;
    });
  }
}
