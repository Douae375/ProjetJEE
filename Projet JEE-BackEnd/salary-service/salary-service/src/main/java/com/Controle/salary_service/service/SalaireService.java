package com.Controle.salary_service.service;

import com.Controle.salary_service.model.EmployeDTO;
import com.Controle.salary_service.model.Salaire;
import com.Controle.salary_service.repository.SalaireRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SalaireService {

    private final SalaireRepository salaireRepository;

    public SalaireService(SalaireRepository salaireRepository) {
        this.salaireRepository = salaireRepository;
    }

    public List<Salaire> getAllSalaries() {
        return salaireRepository.findAll();
    }

    public Salaire createSalaire(Salaire salaire) {
        // Enregistrer les données du salaire de base
        Salaire nouveauSalaire = salaireRepository.save(salaire);

        // Calculer immédiatement le montant pour ce salaire
        calculerSalairePourEmploye(nouveauSalaire);

        return salaireRepository.save(nouveauSalaire);
    }
    public Salaire updateSalaire(Long id, Salaire salaireDetails) {
        // Vérifier si le salaire existe
        Salaire salaire = salaireRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Salaire non trouvé pour l'id : " + id));

        // Mettre à jour les champs
        salaire.setBaseSalary(salaireDetails.getBaseSalary());
        salaire.setOvertimeHours(salaireDetails.getOvertimeHours());
        salaire.setAbsenceDays(salaireDetails.getAbsenceDays());
        salaire.setBonuses(salaireDetails.getBonuses());
        salaire.setDatePaiement(salaireDetails.getDatePaiement());

        // Recalculer le montant si nécessaire
        calculerSalairePourEmploye(salaire);

        return salaireRepository.save(salaire);
    }
    public List<Salaire> getSalariesByEmployeeId(Long employeeId) {
        return salaireRepository.findByEmployeId(employeeId);
    }

    public void deleteSalaire(Long id) {
        // Vérifier si le salaire existe
        if (!salaireRepository.existsById(id)) {
            throw new IllegalArgumentException("Salaire non trouvé pour l'id : " + id);
        }

        // Supprimer le salaire
        salaireRepository.deleteById(id);
    }


    public void calculerSalairePourEmploye(Salaire salaire) {
        if (salaire.getOvertimeHours() == null || salaire.getAbsenceDays() == null || salaire.getBonuses() == null) {
            throw new IllegalArgumentException("Les heures supplémentaires, jours d'absence et primes doivent être renseignés.");
        }

        // Calculer le montant du salaire
        double montant = salaire.getBaseSalary() +
                (salaire.getOvertimeHours() * 10) -
                (salaire.getAbsenceDays() * 50) +
                salaire.getBonuses();

        salaire.setMontant(montant);
        salaire.setDetailsCalcul("Calcul basé sur heures supp, absences et primes.");
    }

    public void calculerTousLesSalaires() {
        List<Salaire> salaires = salaireRepository.findAll();

        for (Salaire salaire : salaires) {
            calculerSalairePourEmploye(salaire);
            salaireRepository.save(salaire);
        }
    }
}

