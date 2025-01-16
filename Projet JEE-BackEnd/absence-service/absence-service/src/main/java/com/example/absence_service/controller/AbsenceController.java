package com.example.absence_service.controller;

import com.example.absence_service.model.Absence;
import com.example.absence_service.service.AbsenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/absences")
public class AbsenceController {

    @Autowired
    private AbsenceService absenceService;

    @GetMapping
    public List<Absence> getAllAbsences() {
        return absenceService.getAllAbsences();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Absence> getAbsenceById(@PathVariable Long id) {
        Absence absence = absenceService.getAbsenceById(id);
        if (absence != null) {
            return ResponseEntity.ok(absence);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Absence createAbsence(@RequestBody Absence absence) {
        return absenceService.createAbsence(absence);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Absence> updateAbsence(@PathVariable Long id, @RequestBody Absence absenceDetails) {
        Absence updatedAbsence = absenceService.updateAbsence(id, absenceDetails);
        if (updatedAbsence != null) {
            return ResponseEntity.ok(updatedAbsence);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    // Get total number of employees
    @GetMapping("/total")
    public ResponseEntity<Long> getTotalEmployees() {
        Long totalEmployees = absenceService.getTotalabsence();
        return ResponseEntity.ok(totalEmployees);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAbsence(@PathVariable Long id) {
        boolean isDeleted = absenceService.deleteAbsence(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}