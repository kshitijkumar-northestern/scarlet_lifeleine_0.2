package com.scarletlifeline.service;

import com.scarletlifeline.dto.AppointmentDTO;
import com.scarletlifeline.enums.AppointmentStatus;
import com.scarletlifeline.exception.CustomException;
import com.scarletlifeline.model.Appointment;
import com.scarletlifeline.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public Appointment createAppointment(String donorId, AppointmentDTO dto) {
        Appointment appointment = new Appointment();
        appointment.setDonorId(donorId);
        appointment.setBloodBankId(dto.getBloodBankId());
        appointment.setAppointmentDate(dto.getAppointmentDate());

        return appointmentRepository.save(appointment);
    }

    public Appointment updateStatus(String id, AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new CustomException("Appointment not found"));

        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getDonorAppointments(String donorId) {
        return appointmentRepository.findByDonorId(donorId);
    }

    public List<Appointment> getBloodBankAppointments(String bloodBankId) {
        return appointmentRepository.findByBloodBankId(bloodBankId);
    }

    public Appointment getAppointment(String id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new CustomException("Appointment not found"));
    }
}