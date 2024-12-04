// Appointment.java
package com.scarletlifeline.model;

import com.scarletlifeline.enums.AppointmentStatus;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "appointments")
public class Appointment {
    @Id
    private String id;
    private String donorId;
    private String bloodBankId;
    private LocalDateTime appointmentDate;
    private AppointmentStatus status = AppointmentStatus.PENDING;
    private LocalDateTime createdAt = LocalDateTime.now();
}