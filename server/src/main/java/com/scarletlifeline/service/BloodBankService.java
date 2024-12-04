// BloodBankService.java
package com.scarletlifeline.service;

import com.scarletlifeline.dto.BloodBankDTO;
import com.scarletlifeline.enums.BloodGroup;
import com.scarletlifeline.exception.CustomException;
import com.scarletlifeline.model.BloodBank;
import com.scarletlifeline.repository.BloodBankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BloodBankService {
    private final BloodBankRepository bloodBankRepository;

    public BloodBank addBloodBank(BloodBankDTO dto) {
        BloodBank bloodBank = new BloodBank();
        bloodBank.setName(dto.getName());
        bloodBank.setAddress(dto.getAddress());
        bloodBank.setContactNumber(dto.getContactNumber());
        bloodBank.setInventory(dto.getInventory());

        return bloodBankRepository.save(bloodBank);
    }

    public void deleteBloodBank(String id) {
        if (!bloodBankRepository.existsById(id)) {
            throw new CustomException("Blood bank not found");
        }
        bloodBankRepository.deleteById(id);
    }

    public BloodBank updateInventory(String id, Map<BloodGroup, Integer> inventory) {
        BloodBank bloodBank = bloodBankRepository.findById(id)
                .orElseThrow(() -> new CustomException("Blood bank not found"));

        bloodBank.setInventory(inventory);
        return bloodBankRepository.save(bloodBank);
    }

    public List<BloodBank> getAllBloodBanks() {
        return bloodBankRepository.findAll();
    }

    public BloodBank getBloodBank(String id) {
        return bloodBankRepository.findById(id)
                .orElseThrow(() -> new CustomException("Blood bank not found"));
    }
}