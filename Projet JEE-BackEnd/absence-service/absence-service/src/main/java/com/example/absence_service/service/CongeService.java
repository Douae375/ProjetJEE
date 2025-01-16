package com.example.absence_service.service;

import com.example.absence_service.client.EmployeeClient;
import com.example.absence_service.model.Conge;
import com.example.absence_service.repository.CongeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class CongeService {

    @Autowired
    private CongeRepository congeRepository;

    @Autowired
    private EmployeeClient employeeClient;

    public List<Conge> getAllConges() {
        return congeRepository.findAll();
    }
    public Long getTotalconge() {
        return congeRepository.count();
    }
    public List<Object[]> countByStatus() {
        return congeRepository.countByStatus();
    }
    public Conge createConge(Conge conge) {
        // Récupérer l'employé pour vérifier la validité de la demande
        EmployeeClient.EmployeeDTO employee = employeeClient.getEmployeeById(conge.getEmployeeId());

        // Définir le département
        conge.setDepartmentId(employee.departmentId);

        // Calculer la durée du congé
        int duration = 0;
        conge.setDuration(duration);

        conge.setStatus(Conge.CongeStatus.PENDING);
        return congeRepository.save(conge);
    }

    public Conge approveConge(Long id) {
        // Récupérer la demande de congé
        Conge conge = congeRepository.findById(id).orElseThrow(() -> new RuntimeException("Conge non trouvé"));

        // Récupérer les détails de l'employé qui approuve


        // Mettre à jour le statut du congé et le responsable
        conge.setStatus(Conge.CongeStatus.APPROVED);
        return congeRepository.save(conge);
    }
    public List<Conge> getCongesByEmployeeId(Long employeeId) {
        return congeRepository.findByEmployeeId(employeeId);
    }


    public Conge rejectConge(Long id) {
        // Récupérer la demande de congé
        Conge conge = congeRepository.findById(id).orElseThrow(() -> new RuntimeException("Conge non trouvé"));

        // Récupérer les détails de l'employé qui rejette

        // Mettre à jour le statut du congé et le responsable
        conge.setStatus(Conge.CongeStatus.REJECTED);
        return congeRepository.save(conge);
    }

    public Conge updateCongeStatus(Long id, String status) {
        // Valider le statut
        if (!status.equals("APPROVED") && !status.equals("REJECTED") && !status.equals("PENDING")) {
            throw new IllegalArgumentException("Statut invalide : " + status);
        }

        // Vérifier si le congé existe
        Optional<Conge> optionalConge = congeRepository.findById(id);
        if (optionalConge.isEmpty()) {
            throw new IllegalArgumentException("Le congé avec l'ID " + id + " n'existe pas.");
        }

        Conge conge = optionalConge.get();
        conge.setStatus(Conge.CongeStatus.valueOf(status)); // Mettre à jour le statut// Assigner le responsable
        return congeRepository.save(conge); // Enregistrer les modifications
    }

}