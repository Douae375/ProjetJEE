package com.Controle.department_service.client;

import com.Controle.department_service.Model.Department;

import java.util.List;

public class DepartmentWithEmployees {
    private Department department;
    private List<Employee> employees;

    public DepartmentWithEmployees(Department department, List<Employee> employees) {
        this.department = department;
        this.employees = employees;
    }
}
