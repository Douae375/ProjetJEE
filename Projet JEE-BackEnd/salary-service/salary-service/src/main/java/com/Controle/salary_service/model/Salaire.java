package com.Controle.salary_service.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "salaries")
public class Salaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long employeId;

    @Column(nullable = true)
    private Double montant;

    @Column(nullable = false)
    private Double overtimeHours; // Heures supplémentaires

    @Column(nullable = false)
    private Integer absenceDays; // Jours d'absence

    @Column(nullable = false)
    private Double bonuses; // Primes

    @Column
    private String detailsCalcul;

    @Column(nullable = false)
    private String datePaiement;
    @Column(nullable = false)
    private Double baseSalary;
    public Long getId() {
        return id;
    }

    public Double getBaseSalary() {
        return baseSalary;
    }

    public void setBaseSalary(Double baseSalary) {
        this.baseSalary = baseSalary;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeId() {
        return employeId;
    }

    public void setEmployeId(Long employeId) {
        this.employeId = employeId;
    }

    public Double getMontant() {
        return montant;
    }

    public void setMontant(Double montant) {
        this.montant = montant;
    }

    public Double getOvertimeHours() {
        return overtimeHours;
    }

    public void setOvertimeHours(Double overtimeHours) {
        this.overtimeHours = overtimeHours;
    }

    public Integer getAbsenceDays() {
        return absenceDays;
    }

    public void setAbsenceDays(Integer absenceDays) {
        this.absenceDays = absenceDays;
    }

    public Double getBonuses() {
        return bonuses;
    }

    public void setBonuses(Double bonuses) {
        this.bonuses = bonuses;
    }

    public String getDetailsCalcul() {
        return detailsCalcul;
    }

    public void setDetailsCalcul(String detailsCalcul) {
        this.detailsCalcul = detailsCalcul;
    }

    public String getDatePaiement() {
        return datePaiement;
    }

    public void setDatePaiement(String datePaiement) {
        this.datePaiement = datePaiement;
    }
}
