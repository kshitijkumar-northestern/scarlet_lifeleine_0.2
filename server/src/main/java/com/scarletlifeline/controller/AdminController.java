// AdminController.java
package com.scarletlifeline.controller;

import com.scarletlifeline.dto.AdminRegistrationDTO;
import com.scarletlifeline.dto.LoginDTO;
import com.scarletlifeline.dto.BloodBankDTO;
import com.scarletlifeline.enums.AppointmentStatus;
import com.scarletlifeline.enums.BloodGroup;
import com.scarletlifeline.model.Admin;
import com.scarletlifeline.model.Appointment;
import com.scarletlifeline.model.BloodBank;
import com.scarletlifeline.service.AdminService;
import com.scarletlifeline.service.BloodBankService;
import com.scarletlifeline.service.AppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admins")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin management APIs")
public class AdminController {
    private final AdminService adminService;
    private final BloodBankService bloodBankService;
    private final AppointmentService appointmentService;

    @PostMapping("/register")
    @Operation(summary = "Register new admin")
    public ResponseEntity<Admin> register(@Valid @RequestBody AdminRegistrationDTO dto) {
        return ResponseEntity.ok(adminService.register(dto));
    }

    @PostMapping("/login")
    @Operation(summary = "Admin login")
    public ResponseEntity<Admin> login(@Valid @RequestBody LoginDTO dto) {
        return ResponseEntity.ok(adminService.login(dto));
    }


    @PostMapping("/bloodbanks")
    @Operation(summary = "Add new blood bank")
    public ResponseEntity<BloodBank> addBloodBank(@Valid @RequestBody BloodBankDTO dto) {
        return ResponseEntity.ok(bloodBankService.addBloodBank(dto));
    }

    @DeleteMapping("/bloodbanks/{id}")
    @Operation(summary = "Remove blood bank")
    public ResponseEntity<Void> removeBloodBank(@PathVariable String id) {
        bloodBankService.deleteBloodBank(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/bloodbanks/{id}/inventory")
    @Operation(summary = "Update blood bank inventory")
    public ResponseEntity<BloodBank> updateInventory(
            @PathVariable String id,
            @RequestBody Map<BloodGroup, Integer> inventory) {
        return ResponseEntity.ok(bloodBankService.updateInventory(id, inventory));
    }

    @PutMapping("/appointments/{id}/status")
    @Operation(summary = "Update appointment status")
    public ResponseEntity<Appointment> updateAppointmentStatus(
            @PathVariable String id,
            @RequestParam AppointmentStatus status) {
        return ResponseEntity.ok(appointmentService.updateStatus(id, status));
    }
}