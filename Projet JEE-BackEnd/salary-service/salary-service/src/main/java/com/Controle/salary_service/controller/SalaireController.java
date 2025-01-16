package com.Controle.salary_service.controller;

import com.Controle.salary_service.model.Salaire;
import com.Controle.salary_service.service.SalaireService;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salaire")
public class SalaireController {

    private final SalaireService salaireService;

    public SalaireController(SalaireService salaireService) {
        this.salaireService = salaireService;
    }
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Salaire>> getSalariesByEmployeeId(@PathVariable Long employeeId) {
        List<Salaire> salaires = salaireService.getSalariesByEmployeeId(employeeId);
        return ResponseEntity.ok(salaires);
    }


    // Récupérer tous les salaires
    @GetMapping
    public ResponseEntity<List<Salaire>> getAllSalaries() {
        return ResponseEntity.ok(salaireService.getAllSalaries());
    }

    // Créer un nouveau salaire
    @PostMapping
    public ResponseEntity<Salaire> createSalaire(@RequestBody Salaire salaire) {
        return ResponseEntity.ok(salaireService.createSalaire(salaire));
    }

    // Recalculer les montants pour tous les salaires existants
    @PostMapping("/recalculate")
    public ResponseEntity<String> recalculateSalaries() {
        salaireService.calculerTousLesSalaires();
        return ResponseEntity.ok("Tous les salaires ont été recalculés.");
    }
    // Mettre à jour un salaire existant
    @PutMapping("/{id}")
    public ResponseEntity<Salaire> updateSalaire(@PathVariable Long id, @RequestBody Salaire salaireDetails) {
        Salaire updatedSalaire = salaireService.updateSalaire(id, salaireDetails);
        return ResponseEntity.ok(updatedSalaire);
    }


    // Supprimer un salaire existant
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSalaire(@PathVariable Long id) {
        salaireService.deleteSalaire(id);
        return ResponseEntity.ok("Salaire supprimé avec succès.");
    }
}
