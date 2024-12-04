package com.scarletlifeline.repository;

import com.scarletlifeline.model.BloodBank;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BloodBankRepository extends MongoRepository<BloodBank, String> {
}
