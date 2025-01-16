import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../services/employee.service';
import { CongeService } from '../../services/conge.service';
import { SalaireService } from '../../services/salary.service';
@Component({
  standalone: true,
  selector: 'app-table-emp',
  templateUrl: './emp-table.component.html',
  styleUrls: ['./emp-table.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class EMPTableComponent implements OnInit, OnChanges {
  @Input() tableType: string = 'Employees'; // Définit le type de table à afficher
  entities: any[] = [];
  entityFields: any[] = [];
  form: FormGroup;
  isEditing: boolean = false;
  currentEntityId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private employeeService: EmployeeService,
    private congeService: CongeService, // Ajout du service des congés
    private salaryService: SalaireService
  ) {
    this.form = this.fb.group({});
  }

  // Nouvelle méthode pour récupérer les valeurs imbriquées
  getNestedValue(entity: any, path: string): any {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), entity);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadTableData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableType']) {
      this.loadTableData();
    }
  }

  loadTableData(): void {
    if (this.tableType === 'MyProfile') {
      const userId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur connecté

      if (userId) {
        this.employeeService.getEmployeeById(+userId).subscribe((data) => {
          this.entities = [data]; // Charger uniquement l'utilisateur connecté
          this.entityFields = [
            { name: 'firstName', label: 'First Name' },
            { name: 'lastName', label: 'Last Name' },
            { name: 'email', label: 'Email' },
            { name: 'position', label: 'Position' },
          ];
          this.initializeForm();
        });
      } else {
        console.error('Aucun utilisateur connecté trouvé.');
      }
    } else if (this.tableType === 'MyLeaves') {
      const userId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur connecté
  
      if (userId) {
        this.congeService.getCongesByEmployeeId(+userId).subscribe((data) => {
          this.entities = data; // Charger les congés pour l'utilisateur connecté
          this.entityFields = [
            { name: 'employeeId', label: 'Employee ID' },
            { name: 'departmentId', label: 'Department ID' },
            { name: 'startDate', label: 'Start Date' },
            { name: 'endDate', label: 'End Date' },
            { name: 'status', label: 'Status' },
          ];
          this.initializeForm();
        });
      } else {
        console.error('Aucun utilisateur connecté trouvé.');
      }
    }else if (this.tableType === 'MySalaries') {
      const userId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur connecté
    
      if (userId) {
        this.salaryService.getSalariesByEmployeeId(+userId).subscribe((data: any[]) => {
          this.entities = data; // Charger les salaires pour l'utilisateur connecté
          this.entityFields = [
            { name: 'employeId', label: 'Employee ID' },
            { name: 'montant', label: 'Total Amount' },
            { name: 'overtimeHours', label: 'Overtime Hours' },
            { name: 'baseSalary', label: 'Base Salary' },
            { name: 'absenceDays', label: 'Absence Days' },
            { name: 'bonuses', label: 'Bonuses' },
            { name: 'datePaiement', label: 'Payment Date' },
          ];
          this.initializeForm();
        });
      } else {
        console.error('Aucun utilisateur connecté trouvé.');
      }
    }
    
  }

  initializeForm(): void {
    this.form = this.fb.group({});
    this.entityFields.forEach((field) => {
      if (field.name === 'status') {
        this.form.addControl(field.name, this.fb.control('PENDING', Validators.required)); // Par défaut
      } else {
        this.form.addControl(field.name, this.fb.control('', Validators.required));
      }
    });
  }

  openModal(content: any): void {
    this.modalService.open(content);
    this.isEditing = false;
    this.currentEntityId = null;
    this.form.reset();
  }

  onSubmit(): void {
    const formData = this.form.value;

    if (this.isEditing && this.currentEntityId) {
      this.updateEntity(this.currentEntityId, formData);
    } else {
      this.createEntity(formData);
    }

    this.modalService.dismissAll();
  }

  createEntity(formData: any): void {
    if (this.tableType === 'Employees') {
      this.employeeService.createEmployee(formData).subscribe(() => {
        this.loadTableData();
      });
    }else if (this.tableType === 'MyLeaves') {
      this.congeService.createConge(formData).subscribe(() => {
        this.loadTableData();
      });
    }
  }

  updateEntity(id: number, formData: any): void {
    if (this.tableType === 'Employees') {
      this.employeeService.updateEmployee(id, formData).subscribe(() => {
        this.loadTableData();
      });
    }
  }

  approveConge(id: number): void {
    this.congeService.approveConge(id).subscribe(() => {
      this.loadTableData();
    }, error => console.error('Erreur lors de l\'approbation du congé :', error));
  }

  rejectConge(id: number): void {
    this.congeService.rejectConge(id).subscribe(() => {
      this.loadTableData();
    }, error => console.error('Erreur lors du rejet du congé :', error));
  }

  editEntity(entity: any, content: any): void {
    this.form.patchValue(entity);
    this.isEditing = true;
    this.currentEntityId = entity.id;
    this.modalService.open(content);
  }

  deleteEntity(entity: any): void {
    if (this.tableType === 'Employees') {
      this.employeeService.deleteEmployee(entity.id).subscribe(() => {
        this.loadTableData();
      });
    }
  }
}
