package com.Controler.auth_service.service;

import com.Controler.auth_service.Model.AuthRequest;
import com.Controler.auth_service.Model.Employee;
import com.Controler.auth_service.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void register(Employee employee) {
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employeeRepository.save(employee);
    }



    public Employee authenticate(AuthRequest authRequest) {
        // Rechercher l'utilisateur
        Employee employee = employeeRepository.findByEmail(authRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Log pour vérifier les valeurs
        System.out.println("Email trouvé : " + employee.getEmail());
        System.out.println("Mot de passe stocké : " + employee.getPassword());
        System.out.println("Mot de passe saisi : " + authRequest.getPassword());

        // Comparer les mots de passe
        if (!passwordEncoder.matches(authRequest.getPassword(), employee.getPassword())) {
            System.out.println("Mot de passe invalide !");
            throw new RuntimeException("Invalid password");
        }

        System.out.println("Authentification réussie !");
        return employee;
    }


}