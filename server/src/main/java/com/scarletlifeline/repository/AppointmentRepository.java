package com.scarletlifeline.repository;

import com.scarletlifeline.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    List<Appointment> findByDonorId(String donorId);
    List<Appointment> findByBloodBankId(String bloodBankId);
}