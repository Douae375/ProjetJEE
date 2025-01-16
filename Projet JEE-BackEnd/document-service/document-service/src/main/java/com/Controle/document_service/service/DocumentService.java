package com.Controle.document_service.service;

import com.Controle.document_service.Client.Employee;
import com.Controle.document_service.Client.EmployeeClient;
import com.Controle.document_service.model.Document;
import com.Controle.document_service.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private EmployeeClient employeeClient;

    public Document saveDocument(MultipartFile file, Long employeeId) throws IOException {
        // Vérifier si l'employé existe
        Employee employee = employeeClient.getEmployeeById(employeeId);
        if (employee == null) {
            throw new IllegalArgumentException("L'employé avec l'ID " + employeeId + " n'existe pas.");
        }

        Document document = new Document();
        document.setName(file.getOriginalFilename());
        document.setType(file.getContentType());
        document.setSize(file.getSize());
        document.setData(file.getBytes());
        document.setEmployeeId(employeeId);

        return documentRepository.save(document);
    }
    private boolean employeeExists(Long employeeId) {
        // Appel au Employee Service pour vérifier si l'employé existe
        return true; // Modifiez ceci selon votre logique
    }
    public void uploadDocument(MultipartFile file, Long employeeId, String description) throws IOException {
        // Vérifiez si l'employé existe
        if (!employeeExists(employeeId)) {
            throw new IllegalArgumentException("Employee does not exist.");
        }

        // Enregistrez le fichier
        String fileName = file.getOriginalFilename();
        Path path = Paths.get("uploads/" + fileName);
        Files.createDirectories(path.getParent());
        Files.write(path, file.getBytes());

        // Sauvegardez les métadonnées dans la base de données (par exemple, via un repository)
        Document document = new Document();
        document.setName(file.getOriginalFilename());
        document.setType(file.getContentType());
        document.setSize(file.getSize());
        document.setData(file.getBytes());
        document.setEmployeeId(employeeId);
        documentRepository.save(document);
    }
    public List<Document> getDocumentsByEmployeeId(Long employeeId) {
        return documentRepository.findByEmployeeId(employeeId);
    }
    public Optional<Document> getDocumentById(Long id) {
        return documentRepository.findById(id);
    }
}