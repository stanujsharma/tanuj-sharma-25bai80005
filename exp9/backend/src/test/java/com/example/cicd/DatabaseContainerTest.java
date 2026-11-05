
package com.example.cicd;

import com.example.cicd.model.Post;
import com.example.cicd.repository.PostRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Testcontainers
class DatabaseContainerTest {

    @Container
    static PostgreSQLContainer<?> postgres =
            new PostgreSQLContainer<>("postgres:15")
                    .withDatabaseName("testdb")
                    .withUsername("test")
                    .withPassword("test");

    @DynamicPropertySource
    static void configureDatabase(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
        registry.add("spring.datasource.driver-class-name",
                postgres::getDriverClassName);
    }

    @Autowired
    private PostRepository postRepository;

    @Test
    void shouldSaveAndRetrievePost() {

        Post post = new Post(
                "Database Testing",
                "Testing with PostgreSQL container",
                "DevOps Lead",
                "v1.0.0",
                10
        );

        Post savedPost = postRepository.save(post);

        assertNotNull(savedPost.getId());

        Post retrievedPost =
                postRepository.findById(savedPost.getId()).orElseThrow();

        assertEquals("Database Testing", retrievedPost.getTitle());
    }
}
