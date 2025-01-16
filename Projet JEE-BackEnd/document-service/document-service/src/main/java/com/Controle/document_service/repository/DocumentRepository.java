package com.Controle.document_service.repository;

import com.Controle.document_service.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository <Document,Long> {
    // Requête pour trouver les documents par ID d'employé
    List<Document> findByEmployeeId(Long employeeId);
}
