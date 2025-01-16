package com.example.absence_service.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Conge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long employeeId; // Référence à l'employé demandant le congé

    @Column(nullable = false)
    private Long departmentId; // Référence au département de l'employé

    @Column(nullable = false)
    private String startDate;

    @Column(nullable = false)
    private String endDate;

    @Column(nullable = false)
    private int duration; // Durée calculée automatiquement

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CongeStatus status; // Status de la demande de congé (PENDING, APPROVED, REJECTED)

    public enum CongeStatus {
        PENDING, APPROVED, REJECTED
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public CongeStatus getStatus() {
        return status;
    }

    public void setStatus(CongeStatus status) {
        this.status = status;
    }


}