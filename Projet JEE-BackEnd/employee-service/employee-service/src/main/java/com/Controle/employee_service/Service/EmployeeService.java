package com.Controle.employee_service.Service;

import com.Controle.employee_service.Department.DepartmentClient;
import com.Controle.employee_service.Model.Department;
import com.Controle.employee_service.Model.Employee;
import com.Controle.employee_service.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    public List<Employee> getEmployeesByDepartmentId(Long departmentId) {
        return employeeRepository.findByDepartmentId(departmentId); // Assuming this repository method exists
    }

    public Optional<Employee> getEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }
    public Long getTotalEmployees() {
        return employeeRepository.count();
    }


    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
    public List<Object[]> countEmployeesByDepartment() {
        return employeeRepository.countEmployeesByDepartment();
    }
    public List<Department> getAllDepartments() {
        return departmentClient.getAllDepartments();
    }
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }
    private final  DepartmentClient departmentClient;
    @Autowired
    public EmployeeService(DepartmentClient departmentClient) {
        this.departmentClient = departmentClient;
    }

    public Employee saveEmployee(Employee employee) {
        if (employee.getDepartmentId() != null) {

            ResponseEntity<Boolean> response = departmentClient.doesDepartmentExist(employee.getDepartmentId());
            if (response.getBody() == null || !response.getBody()) {
                throw new IllegalArgumentException("Department with ID " + employee.getDepartmentId() + " does not exist.");
            }
        }
        return employeeRepository.save(employee); // Save the employee
    }



    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
