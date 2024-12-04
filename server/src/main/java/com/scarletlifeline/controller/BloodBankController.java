// BloodBankController.java
package com.scarletlifeline.controller;

import com.scarletlifeline.model.BloodBank;
import com.scarletlifeline.model.Appointment;
import com.scarletlifeline.service.BloodBankService;
import com.scarletlifeline.service.AppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bloodbanks")
@RequiredArgsConstructor
@Tag(name = "BloodBank", description = "Blood bank management APIs")
public class BloodBankController {
    private final BloodBankService bloodBankService;
    private final AppointmentService appointmentService;

    @GetMapping
    @Operation(summary = "Get all blood banks")
    public ResponseEntity<List<BloodBank>> getAllBloodBanks() {
        return ResponseEntity.ok(bloodBankService.getAllBloodBanks());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get blood bank details")
    public ResponseEntity<BloodBank> getBloodBank(@PathVariable String id) {
        return ResponseEntity.ok(bloodBankService.getBloodBank(id));
    }

    @GetMapping("/{id}/appointments")
    @Operation(summary = "Get blood bank appointments")
    public ResponseEntity<List<Appointment>> getBloodBankAppointments(@PathVariable String id) {
        return ResponseEntity.ok(appointmentService.getBloodBankAppointments(id));
    }
}
