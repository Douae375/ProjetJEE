package com.example.absence_service.controller;

import com.example.absence_service.model.Conge;
import com.example.absence_service.service.CongeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/conges")
public class CongeController {

    @Autowired
    private CongeService congeService;

    @GetMapping
    public List<Conge> getAllConges() {

        return congeService.getAllConges();
    }
    @GetMapping("/total")
    public ResponseEntity<Long> getTotalEmployees() {
        Long totalEmployees = congeService.getTotalconge();
        return ResponseEntity.ok(totalEmployees);
    }
        @GetMapping("/count-by-status")
    public ResponseEntity<List<Object[]>> getCountByStatus() {
        List<Object[]> countByStatus = congeService.countByStatus();
        return ResponseEntity.ok(countByStatus);
    }

    @PostMapping
    public Conge createConge(@RequestBody Conge conge) {
        // Vérifiez que les dates sont valides


        conge.setStatus(Conge.CongeStatus.PENDING);

        // Sauvegarder le congé
        return congeService.createConge(conge);
    }


    /* @PutMapping("/{id}/status")
    public ResponseEntity<Conge> updateCongeStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        Conge updatedConge = congeService.updateCongeStatus(id, status.toUpperCase());
        return ResponseEntity.ok(updatedConge);
    }
*/
    @PutMapping("/{id}/approve")
    public Conge approveConge(@PathVariable Long id) {
        return congeService.approveConge(id);
    }

    @PutMapping("/{id}/reject")
    public Conge rejectConge(@PathVariable Long id) {
        return congeService.rejectConge(id);
    }

    @GetMapping("/employee/{employeeId}")
    public List<Conge> getCongesByEmployeeId(@PathVariable Long employeeId) {
        return congeService.getCongesByEmployeeId(employeeId);
    }

}