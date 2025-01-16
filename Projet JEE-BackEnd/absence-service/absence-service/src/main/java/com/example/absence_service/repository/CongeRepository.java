package com.example.absence_service.repository;

import com.example.absence_service.model.Conge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CongeRepository extends JpaRepository<Conge, Long> {
    List<Conge> findByEmployeeId(Long employeeId);
    @Query("SELECT c.status, COUNT(c) FROM Conge c GROUP BY c.status")
    List<Object[]> countByStatus();
}