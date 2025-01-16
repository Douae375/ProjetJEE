package com.Controle.document_service.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "employee-service", url = "http://localhost:8081/api/employees")
public interface EmployeeClient {
    @GetMapping("/{id}")
    Employee getEmployeeById(@PathVariable Long id);
}

