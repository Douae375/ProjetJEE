package com.example.absence_service.repository;

import com.example.absence_service.model.Absence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AbsenceRepository extends JpaRepository<Absence, Long> {
    List<Absence> findByEmployeeId(Long employeeId);
}
