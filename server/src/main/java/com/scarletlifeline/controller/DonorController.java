package com.scarletlifeline.controller;

import com.scarletlifeline.service.AppointmentService;
import com.scarletlifeline.dto.AppointmentDTO;
import com.scarletlifeline.dto.DonorRegistrationDTO;
import com.scarletlifeline.dto.LoginDTO;
import com.scarletlifeline.model.Appointment;
import com.scarletlifeline.model.Donor;
import com.scarletlifeline.service.DonorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
@RequiredArgsConstructor
@Tag(name = "Donor", description = "Donor management APIs")
public class DonorController {
    private final DonorService donorService;
    private final AppointmentService appointmentService;

    @PostMapping("/register")
    @Operation(summary = "Register new donor")
    public ResponseEntity<Donor> register(@Valid @RequestBody DonorRegistrationDTO dto) {
        return ResponseEntity.ok(donorService.register(dto));
    }

    @PostMapping("/login")
    @Operation(summary = "Donor login")
    public ResponseEntity<Donor> login(@Valid @RequestBody LoginDTO dto) {
        return ResponseEntity.ok(donorService.login(dto));
    }

    @PostMapping("/appointments")
    @Operation(summary = "Create appointment")
    public ResponseEntity<Appointment> createAppointment(
            @RequestParam String donorId,
            @Valid @RequestBody AppointmentDTO dto) {
        return ResponseEntity.ok(appointmentService.createAppointment(donorId, dto));
    }

    @GetMapping("/{id}/appointments")
    @Operation(summary = "Get donor appointments")
    public ResponseEntity<List<Appointment>> getDonorAppointments(@PathVariable String id) {
        return ResponseEntity.ok(appointmentService.getDonorAppointments(id));
    }
}
