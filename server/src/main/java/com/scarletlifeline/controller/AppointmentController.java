// AppointmentController.java
package com.scarletlifeline.controller;

import com.scarletlifeline.model.Appointment;
import com.scarletlifeline.service.AppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
@Tag(name = "Appointment", description = "Appointment management APIs")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @GetMapping("/{id}")
    @Operation(summary = "Get appointment details")
    public ResponseEntity<Appointment> getAppointment(@PathVariable String id) {
        return ResponseEntity.ok(appointmentService.getAppointment(id));
    }
}
