package com.Controle.salary_service.service;

import com.Controle.salary_service.model.EmployeDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "employee-service", url = "http://localhost:8081") // Remplacez par le vrai URL
public interface EmployeFeignClient {

    @GetMapping("/api/employees/{id}")
    EmployeDTO getEmployeById(@PathVariable("id") Long id);

    @GetMapping("/api/employees")
    List<EmployeDTO> getAllEmployes();
}
