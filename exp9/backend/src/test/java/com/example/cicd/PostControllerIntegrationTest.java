
package com.example.cicd;

import com.example.cicd.model.Post;
import com.example.cicd.repository.PostRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class PostControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PostRepository postRepository;

    @Test
    void shouldGetAllPosts() throws Exception {
        mockMvc.perform(get("/api/posts"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldCreatePost() throws Exception {
        String postJson = """
                {
                    "title": "CI/CD Testing",
                    "content": "Testing automated deployment",
                    "author": "DevOps Lead",
                    "version": "v1.0.0",
                    "likes": 10
                }
                """;

        mockMvc.perform(post("/api/posts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(postJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("CI/CD Testing"));
    }
}
