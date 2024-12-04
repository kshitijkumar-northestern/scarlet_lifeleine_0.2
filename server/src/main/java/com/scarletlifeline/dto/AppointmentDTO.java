// AppointmentDTO.java
package com.scarletlifeline.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AppointmentDTO {
    @NotBlank(message = "Blood bank ID is required")
    private String bloodBankId;

    @NotNull(message = "Appointment date is required")
    private LocalDateTime appointmentDate;
}