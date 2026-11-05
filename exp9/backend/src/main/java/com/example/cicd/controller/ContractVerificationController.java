
package com.example.cicd.controller;

import com.example.cicd.model.Post;
import com.example.cicd.service.ContractValidationService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contracts")
public class ContractVerificationController {

    private final ContractValidationService validationService;

    public ContractVerificationController(
            ContractValidationService validationService) {
        this.validationService = validationService;
    }

    @PostMapping("/validate")
    public Map<String, Object> validatePost(@RequestBody Post post) {

        boolean valid = validationService.validatePost(post);

        String message = validationService.getValidationMessage(post);

        return Map.of(
                "valid", valid,
                "message", message
        );
    }
}
