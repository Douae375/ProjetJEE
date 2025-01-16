package com.Controler.auth_service.Controller;

import com.Controler.auth_service.Model.AuthRequest;
import com.Controler.auth_service.Model.AuthResponse;
import com.Controler.auth_service.Model.Employee;
import com.Controler.auth_service.service.AuthService;
import com.Controler.auth_service.service.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        Employee employee = authService.authenticate(authRequest);
        String token = jwtUtil.generateToken(employee.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, employee.getPosition().name(),employee));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Employee employee) {
        authService.register(employee);
        return ResponseEntity.ok("Employee registered successfully!");
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestParam String token) {
        try {
            boolean claims = new JwtUtil().validateToken(token);
            return ResponseEntity.ok(claims);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
        }
    }
}