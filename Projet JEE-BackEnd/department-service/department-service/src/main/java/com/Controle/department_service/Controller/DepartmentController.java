package com.Controle.department_service.Controller;

import com.Controle.department_service.Model.Department;
import com.Controle.department_service.Repository.DepartmentRepository;
import com.Controle.department_service.Service.DepartmentService;
import com.Controle.department_service.client.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private DepartmentRepository departmentRepository;

    // Fetch all departments
    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    // Fetch a department by ID
    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        return departmentService.getDepartmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Check if a department exists by ID
    @GetMapping("/{id}/exists")
    public ResponseEntity<Boolean> doesDepartmentExist(@PathVariable Long id) {
        boolean exists = departmentRepository.existsById(id);
        return ResponseEntity.ok(exists);
    }

    // Create a new department
    @PostMapping
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        return ResponseEntity.ok(departmentService.saveDepartment(department));
    }
    @GetMapping("/employee-counts-by-department")
    public List<Object[]> getEmployeeCountsByDepartment() {
        return departmentService.getCountsByDepartmentWithNames();
    }
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return departmentService.getAllEmployees();
    }


    // Fetch employees for a department by ID
    @GetMapping("/{id}/employees")
    public ResponseEntity<List<Employee>> getEmployeesByDepartment(@PathVariable Long id) {
        List<Employee> employees = departmentService.getEmployeesByDepartment(id);
        return ResponseEntity.ok(employees);
    }
    // Get total number of employees
    @GetMapping("/total")
    public ResponseEntity<Long> getTotalEmployees() {
        Long totalEmployees = departmentService.getTotalDepartments();
        return ResponseEntity.ok(totalEmployees);
    }

    // Update a department
    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Long id, @RequestBody Department departmentDetails) {
        return departmentService.getDepartmentById(id)
                .map(existingDepartment -> {
                    existingDepartment.setName(departmentDetails.getName());
                    existingDepartment.setManagerId(departmentDetails.getManagerId());
                    return ResponseEntity.ok(departmentService.saveDepartment(existingDepartment));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a department
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        if (departmentService.getDepartmentById(id).isPresent()) {
            departmentService.deleteDepartment(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
