package com.Controle.salary_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "com.Controle.salary_service.service")
public class SalaryServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(SalaryServiceApplication.class, args);
	}
}


