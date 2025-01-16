package com.Controle.employee_service.Repository;

import com.Controle.employee_service.Model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository <Employee,Long> {
    List<Employee> findByDepartmentId(Long departmentId);
    Optional<Employee> findByEmail(String email);
    @Query("SELECT e.departmentId, COUNT(e.id) FROM Employee e GROUP BY e.departmentId")
    List<Object[]> countEmployeesByDepartment();

}
