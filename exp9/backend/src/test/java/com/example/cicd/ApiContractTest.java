
package com.example.cicd;

import com.example.cicd.model.Post;
import com.example.cicd.service.ContractValidationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ApiContractTest {

    private ContractValidationService validationService;

    @BeforeEach
    void setUp() {
        validationService = new ContractValidationService();
    }

    @Test
    void shouldAcceptValidPost() {
        Post post = new Post(
                "CI/CD Pipeline",
                "Automated testing and deployment",
                "DevOps Lead",
                "v1.0.0",
                10
        );

        assertTrue(validationService.validatePost(post));
    }

    @Test
    void shouldRejectPostWithoutTitle() {
        Post post = new Post(
                "",
                "Post content",
                "DevOps Lead",
                "v1.0.0",
                10
        );

        assertFalse(validationService.validatePost(post));
    }

    @Test
    void shouldRejectPostWithoutContent() {
        Post post = new Post(
                "CI/CD",
                "",
                "DevOps Lead",
                "v1.0.0",
                10
        );

        assertFalse(validationService.validatePost(post));
    }

    @Test
    void shouldRejectPostWithoutAuthor() {
        Post post = new Post(
                "CI/CD",
                "Post content",
                "",
                "v1.0.0",
                10
        );

        assertFalse(validationService.validatePost(post));
    }
}
