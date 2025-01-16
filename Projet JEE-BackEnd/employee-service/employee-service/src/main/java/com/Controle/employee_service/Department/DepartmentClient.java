package com.Controle.employee_service.Department;

import com.Controle.employee_service.Model.Department;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "department-service", url = "http://localhost:8083")
public interface DepartmentClient {
    @GetMapping("api/departments/{id}/exists")
    ResponseEntity<Boolean> doesDepartmentExist(@PathVariable("id") Long id);
    @GetMapping("api/departments")
    List<Department> getAllDepartments(); // Nouvelle méthode
}
