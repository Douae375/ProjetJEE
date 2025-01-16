package com.Controler.auth_service.Model;

public class AuthResponse {
    private final String token;
    private final String role;
    private final Employee user;

    public AuthResponse(String token, String role,Employee user) {
        this.token = token;
        this.role = role;
        this.user=user;
    }

    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }

    public Employee getUser() {
        return user;
    }
}