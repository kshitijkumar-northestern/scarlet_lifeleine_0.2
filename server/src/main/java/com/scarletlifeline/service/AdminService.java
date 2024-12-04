package com.scarletlifeline.service;

import com.scarletlifeline.dto.AdminRegistrationDTO;
import com.scarletlifeline.dto.LoginDTO;
import com.scarletlifeline.exception.CustomException;
import com.scarletlifeline.model.Admin;
import com.scarletlifeline.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public Admin register(AdminRegistrationDTO dto) {
        if (adminRepository.existsByUsername(dto.getUsername())) {
            throw new CustomException("Username already exists");
        }

        Admin admin = new Admin();
        admin.setUsername(dto.getUsername());
        admin.setPassword(passwordEncoder.encode(dto.getPassword()));
        admin.setName(dto.getName());
        admin.setEmail(dto.getEmail());

        return adminRepository.save(admin);
    }

    public Admin login(LoginDTO dto) {
        Admin admin = adminRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new CustomException("Invalid credentials"));

        if (!passwordEncoder.matches(dto.getPassword(), admin.getPassword())) {
            throw new CustomException("Invalid credentials");
        }

        return admin;
    }
}
