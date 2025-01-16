package com.Controle.document_service.controller;

import com.Controle.document_service.model.Document;
import com.Controle.document_service.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("employeeId") Long employeeId,
            @RequestParam("description") String description) {
        try {
            documentService.uploadDocument(file, employeeId, description);
            return ResponseEntity.ok("File uploaded successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file.");
        }
    }

    @GetMapping("/employee/{employeeId}")
    public List<Document> getDocumentsByEmployeeId(@PathVariable Long employeeId) {
        return documentService.getDocumentsByEmployeeId(employeeId);
    }
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable Long id) {
        Optional<Document> documentOptional = documentService.getDocumentById(id);

        if (documentOptional.isPresent()) {
            Document document = documentOptional.get();
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(document.getType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getName() + "\"")
                    .body(document.getData());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}