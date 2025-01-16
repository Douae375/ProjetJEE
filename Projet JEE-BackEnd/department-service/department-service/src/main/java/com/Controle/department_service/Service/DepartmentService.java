package com.Controle.department_service.Service;
import com.Controle.department_service.Model.Department;
import com.Controle.department_service.Repository.DepartmentRepository;
import com.Controle.department_service.client.DepartmentWithEmployees;
import com.Controle.department_service.client.Employee;
import com.Controle.department_service.client.EmployeeClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    public DepartmentService(EmployeeClient employeeClient, DepartmentRepository departmentRepository) {
        this.employeeClient = employeeClient;
        this.departmentRepository = departmentRepository;
    }

    private EmployeeClient employeeClient;
    public Long getTotalDepartments() {
        return departmentRepository.count();
    }
    public List<Object[]> getCountsByDepartmentWithNames() {
        return employeeClient.getCountsByDepartment();
    }
    public List<Employee> getAllEmployees() {
        return employeeClient.getAllEmployees();
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }
    public DepartmentWithEmployees getDepartmentWithEmployees(Long departmentId) {
        Optional<Department> departmentOptional = departmentRepository.findById(departmentId);
        if (departmentOptional.isPresent()) {
            List<Employee> employees = employeeClient.getEmployeesByDepartment(departmentId);
            return new DepartmentWithEmployees(departmentOptional.get(), employees);
        } else {
            throw new IllegalArgumentException("Department not found with ID " + departmentId);
        }
    }

    public Optional<Department> getDepartmentById(Long id) {
        return departmentRepository.findById(id);
    }
    public List<Employee> getEmployeesByDepartment(Long departmentId) {
        return employeeClient.getEmployeesByDepartment(departmentId);
    }

    public List<Employee> getEmployeesForDepartment(Long departmentId) {
        return employeeClient.getEmployeesByDepartmentId(departmentId);
    }

    public Department saveDepartment(Department department) {
        ResponseEntity<Boolean> response = employeeClient.doesEmployeeExist(department.getManagerId());
        if (response.getBody() != null && response.getBody()) {
            return departmentRepository.save(department); // Save the department
        } else {
            throw new IllegalArgumentException("Manager with ID " + department.getManagerId() + " does not exist.");
        }
    }


    public void deleteDepartment(Long id) {
        departmentRepository.deleteById(id);
    }

}
