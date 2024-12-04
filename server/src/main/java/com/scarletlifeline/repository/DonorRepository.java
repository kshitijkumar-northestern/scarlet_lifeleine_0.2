package com.scarletlifeline.repository;

import com.scarletlifeline.model.Donor;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface DonorRepository extends MongoRepository<Donor, String> {
    Optional<Donor> findByUsername(String username);
    boolean existsByUsername(String username);
}