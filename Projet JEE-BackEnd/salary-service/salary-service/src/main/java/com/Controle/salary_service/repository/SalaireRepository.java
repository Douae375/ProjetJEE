package com.Controle.salary_service.repository;

import com.Controle.salary_service.model.Salaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SalaireRepository extends JpaRepository<Salaire, Long> {
    List<Salaire> findByEmployeId(Long employeId); // Utilisation correcte du nom de l'attribut
}
