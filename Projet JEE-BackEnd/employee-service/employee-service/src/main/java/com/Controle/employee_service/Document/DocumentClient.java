package com.Controle.employee_service.Document;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.swing.text.Document;
import java.util.List;

@FeignClient(name = "document-service", url = "http://localhost:8082/api/documents")
public interface DocumentClient {
    @GetMapping("/employee/{employeeId}")
    List<Document> getDocumentsByEmployeeId(@PathVariable Long employeeId);
}
