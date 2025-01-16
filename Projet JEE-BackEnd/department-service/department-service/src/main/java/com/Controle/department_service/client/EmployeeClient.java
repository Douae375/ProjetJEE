package com.Controle.department_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;
@FeignClient(name = "employee-service", url = "http://localhost:8081")
public interface EmployeeClient {
    @GetMapping("/api/employees")
    List<Employee> getAllEmployees(); // Ajouter cette méthode dans EmployeeClient

    @GetMapping("/employees/department/{departmentId}")
    List<Employee> getEmployeesByDepartmentId(@PathVariable("departmentId") Long departmentId);

    @GetMapping("api/employees/{id}/exists")
    ResponseEntity<Boolean> doesEmployeeExist(@PathVariable("id") Long id);
    @GetMapping("api/employees/{id}")
    Employee getEmployeeById(@PathVariable("id") Long id);
    @GetMapping("/api/employees/department/{departmentId}")
    List<Employee> getEmployeesByDepartment(@PathVariable("departmentId") Long departmentId);
    @GetMapping("api/employees/counts-by-department")
    List<Object[]> getCountsByDepartment();
}



