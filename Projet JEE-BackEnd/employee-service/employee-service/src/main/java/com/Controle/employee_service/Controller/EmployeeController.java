package com.Controle.employee_service.Controller;

import com.Controle.employee_service.Model.Department;
import com.Controle.employee_service.Model.Employee;
import com.Controle.employee_service.Repository.EmployeeRepository;
import com.Controle.employee_service.Service.EmployeeService;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    private EmployeeRepository employeeRepository;
    // Get all employees

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }
    @GetMapping("/counts-by-department")
    public ResponseEntity<List<Object[]>> getCountsByDepartment() {
        List<Object[]> counts = employeeService.countEmployeesByDepartment();
        return ResponseEntity.ok(counts);
    }
    @GetMapping("/departments")
    public List<Department> getAllDepartments() {
        return employeeService.getAllDepartments();
    }

    // Get an employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/me")
    public ResponseEntity<Employee> getMyDetails(Authentication authentication) {
        String email = authentication.name();
        return employeeService.getEmployeeByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new employee
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        if (employee.getPassword() == null || employee.getPassword().isEmpty()) {
            employee.setPassword(null); // Allow password to remain null
        }
        return ResponseEntity.ok(employeeService.saveEmployee(employee));
    }

    // Update an existing employee
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        return employeeService.getEmployeeById(id)
                .map(existingEmployee -> {
                    existingEmployee.setFirstName(employeeDetails.getFirstName());
                    existingEmployee.setLastName(employeeDetails.getLastName());
                    existingEmployee.setEmail(employeeDetails.getEmail());
                    existingEmployee.setPosition(employeeDetails.getPosition());
                    existingEmployee.setHireDate(employeeDetails.getHireDate());
                    return ResponseEntity.ok(employeeService.saveEmployee(existingEmployee));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Get employees by department ID (fixed mapping)
    @GetMapping("/department/{departmentId}")
    public List<Employee> getEmployeesByDepartment(@PathVariable Long departmentId) {
        return employeeService.getEmployeesByDepartmentId(departmentId);
    }

    // Assign a department to an employee
    @PutMapping("/{id}/assign-department/{departmentId}")
    public ResponseEntity<Employee> assignDepartment(@PathVariable Long id, @PathVariable Long departmentId) {
        return employeeService.getEmployeeById(id)
                .map(employee -> {
                    employee.setDepartmentId(departmentId);
                    return ResponseEntity.ok(employeeService.saveEmployee(employee));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete an employee
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        if (employeeService.getEmployeeById(id).isPresent()) {
            employeeService.deleteEmployee(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    // Get total number of employees
    @GetMapping("/total")
    public ResponseEntity<Long> getTotalEmployees() {
        Long totalEmployees = employeeService.getTotalEmployees();
        return ResponseEntity.ok(totalEmployees);
    }

    // Check if an employee exists
    @GetMapping("/{id}/exists")
    public ResponseEntity<Boolean> doesEmployeeExist(@PathVariable Long id) {
        boolean exists = employeeService.getEmployeeById(id).isPresent();
        return ResponseEntity.ok(exists);
    }
}
