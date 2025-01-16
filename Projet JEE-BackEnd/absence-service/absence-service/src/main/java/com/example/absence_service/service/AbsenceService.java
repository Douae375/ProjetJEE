package com.example.absence_service.service;

import com.example.absence_service.model.Absence;
import com.example.absence_service.repository.AbsenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AbsenceService {

    @Autowired
    private AbsenceRepository absenceRepository;

    public List<Absence> getAllAbsences() {
        return absenceRepository.findAll();
    }

    public Absence getAbsenceById(Long id) {
        Optional<Absence> absence = absenceRepository.findById(id);
        return absence.orElse(null);
    }

    public Absence createAbsence(Absence absence) {
        return absenceRepository.save(absence);
    }

    public Absence updateAbsence(Long id, Absence absenceDetails) {
        Optional<Absence> optionalAbsence = absenceRepository.findById(id);
        if (optionalAbsence.isPresent()) {
            Absence existingAbsence = optionalAbsence.get();
            existingAbsence.setEmployeeId(absenceDetails.getEmployeeId());
            existingAbsence.setStartDate(absenceDetails.getStartDate());
            existingAbsence.setEndDate(absenceDetails.getEndDate());
            existingAbsence.setReason(absenceDetails.getReason());
            return absenceRepository.save(existingAbsence);
        }
        return null;
    }
    public Long getTotalabsence() {
        return absenceRepository.count();
    }

    public boolean deleteAbsence(Long id) {
        if (absenceRepository.existsById(id)) {
            absenceRepository.deleteById(id);
            return true;
        }
        return false;
    }
}