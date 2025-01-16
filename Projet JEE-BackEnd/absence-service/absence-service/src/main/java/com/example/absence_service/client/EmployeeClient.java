package com.example.absence_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "employee-service", url = "http://localhost:8081/api/employees")
public interface EmployeeClient {

    @GetMapping("/{id}")
    EmployeeDTO getEmployeeById(@PathVariable("id") Long id);

    class EmployeeDTO {
        public Long id;
        public String firstName;
        public String lastName;
        public String email;
        public Long departmentId;
        public String position;// Enum PositionType
    }
}