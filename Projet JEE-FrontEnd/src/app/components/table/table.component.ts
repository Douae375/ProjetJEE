import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { AbsenceService } from '../../services/absence.service';
import { CongeService } from '../../services/conge.service'; // Import du service des congés
import { SalaireService } from '../../services/salary.service'; 
@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() tableType: string = 'Employees'; // Définit le type de table à afficher
  entities: any[] = [];
  entityFields: any[] = [];
  employees: any[] = []; // Stocker la liste des employés
  departments: any[] = [];
  form: FormGroup;
  isEditing: boolean = false;
  currentEntityId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private employeeService: EmployeeService,
    private departementService: DepartmentService,
    private absenceService: AbsenceService,
    private congeService: CongeService, // Ajout du service des congés
    private salaryService: SalaireService
  ) {
    this.form = this.fb.group({});
  }
  // Nouvelle méthode pour récupérer les valeurs imbriquées
  getNestedValue(entity: any, path: string): any {
    if (path === 'departmentId' && this.tableType === 'Employees') {
      const department = this.departments.find((dep) => dep.id === entity.departmentId);
      return department ? department.name : 'N/A'; // Affiche le nom ou 'N/A' si non trouvé
    }
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
    if (this.tableType === 'Employees') {
      // Charger les employés
      this.employeeService.getAllEmployees().subscribe((data) => {
        this.entities = data;
        this.entityFields = [
          { name: 'firstName', label: 'First Name' },
          { name: 'lastName', label: 'Last Name' },
          { name: 'email', label: 'Email' },
          { name: 'position', label: 'Position' },
          { name: 'contractType', label: 'Contract Type' },
          { name: 'departmentId', label: 'Department' }, // Afficher le nom
          { name: 'hireDate', label: 'Hire Date' },
        ];
      });

      // Charger les départements
      this.employeeService.getAllDepartments().subscribe((data) => {
        this.departments = data;
      });
    }else if (this.tableType === 'Departement') {
      this.departementService.getAllDepartments().subscribe((data) => {
        this.entities = data;
        this.entityFields = [
          { name: 'id', label: 'ID' },
          { name: 'name', label: 'Name' },
          { name: 'managerId', label: 'Manager ID' },
        ];
        this.initializeForm();
      });
    
      // Récupérer les employés pour la liste déroulante
      this.departementService.getAllEmployees().subscribe((data) => {
        this.employees = data;
      });
    }
     else if (this.tableType === 'Absences') {
      this.absenceService.getAllAbsences().subscribe((data) => {
        this.entities = data;
        this.entityFields = [
          { name: 'employeeId', label: 'Employee ID' },
          { name: 'startDate', label: 'Start Date' },
          { name: 'endDate', label: 'End Date' },
          { name: 'reason', label: 'Reason' },
        ];
        this.initializeForm();
      });
    } else if (this.tableType === 'Conges') { // Gestion des congés
      this.congeService.getAllConges().subscribe((data) => {
        this.entities = data;
        this.entityFields = [
          { name: 'employeeId', label: 'Employee ID' },
          { name: 'departmentId', label: 'Department ID' },
          { name: 'startDate', label: 'Start Date' },
          { name: 'endDate', label: 'End Date' },
          { name: 'status', label: 'Status' },
        ];
        this.initializeForm();
      });
    }
    else if (this.tableType === 'Salaries') {
      this.salaryService.getAllSalaries().subscribe((data: any[]) => {
        this.entities = data;
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
    }
    
  }

  initializeForm(): void {
    if (this.tableType === 'Employees') {
      this.form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        position: ['', Validators.required],
        contractType: ['', Validators.required],
        departmentId: [null, Validators.required],
        hireDate: ['', Validators.required],
      });
    } else if (this.tableType === 'Departement') {
      this.form = this.fb.group({
        name: ['', Validators.required],
        managerId: [null, Validators.required],
      });
    } else {
      this.form = this.fb.group({});
      this.entityFields.forEach((field) => {
        if (!this.form.contains(field.name)) {
          this.form.addControl(field.name, this.fb.control('', Validators.required));
        }
      });
    }
  }
  
  
  
  

  openModal(content: any): void {
    this.modalService.open(content);
    this.isEditing = false;
    this.currentEntityId = null;
    this.initializeForm(); // Ensure the form is initialized properly
    this.form.reset(); // Reset the form for a new entry
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
    } else if (this.tableType === 'Departement') {
      this.departementService.createDepartment(formData).subscribe(() => {
        this.loadTableData();
      });
    } else if (this.tableType === 'Absences') {
      this.absenceService.createAbsence(formData).subscribe(() => {
        this.loadTableData();
      });
    } else if (this.tableType === 'Conges') {
      this.congeService.createConge(formData).subscribe(() => {
        this.loadTableData();
      });
    }
    else if (this.tableType === 'Salaries') {
      this.salaryService.createSalaire(formData).subscribe(() => {
        this.loadTableData();
      });
    }
  }

  updateEntity(id: number, formData: any): void {
    if (this.tableType === 'Employees') {
      this.employeeService.updateEmployee(id, formData).subscribe(
        () => {
          this.loadTableData(); // Reload table data after successful update
        },
        (error) => console.error('Error updating employee:', error)
      );
    }else if (this.tableType === 'Departement') {
      // Update department
      this.departementService.updateDepartment(id, formData).subscribe(() => {
        this.loadTableData();
      });
    } else if (this.tableType === 'Absences') {
      // Update absence
      this.absenceService.updateAbsence(id, formData).subscribe(() => {
        this.loadTableData();
      });
    } else if (this.tableType === 'Salaries') {
      // Update salary
      this.salaryService.updateSalaire(id, formData).subscribe(() => {
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
    this.isEditing = true;
    this.currentEntityId = entity.id;
  
    this.initializeForm(); // Ensure the form is initialized for the current table type
  
    // Patch values based on the table type
    if (this.tableType === 'Employees') {
      this.form.patchValue({
        firstName: entity.firstName,
        lastName: entity.lastName,
        email: entity.email,
        position: entity.position,
        contractType: entity.contractType,
        departmentId: entity.departmentId, // Dropdown handling for department
        hireDate: entity.hireDate,
      });
    } else if (this.tableType === 'Departement') {
      this.form.patchValue({
        name: entity.name,
        managerId: entity.managerId,
      });
    } else {
      // Generic form patch for other tables
      this.entityFields.forEach((field) => {
        if (this.form.contains(field.name)) {
          this.form.get(field.name)?.setValue(entity[field.name]);
        }
      });
    }
  
    this.modalService.open(content); // Open the modal with pre-filled data
  }
  
  
  

  deleteEntity(entity: any): void {
    if (this.tableType === 'Employees') {
      this.employeeService.deleteEmployee(entity.id).subscribe(() => {
        this.loadTableData();
      });
    } else if (this.tableType === 'Departement') {
      this.departementService.deleteDepartment(entity.id).subscribe(() => {
        this.loadTableData();
      });
    } else if (this.tableType === 'Absences') {
      this.absenceService.deleteAbsence(entity.id).subscribe(() => {
        this.loadTableData();
      });
    } 
    else if (this.tableType === 'Salaries') {
      this.salaryService.deleteSalaire(entity.id).subscribe(() => {
        this.loadTableData();
      });
    }
  }
}
