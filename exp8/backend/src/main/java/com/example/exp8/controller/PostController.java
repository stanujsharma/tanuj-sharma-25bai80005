package com.example.exp8.controller;

import com.example.exp8.entity.ScheduledPost;
import com.example.exp8.repository.ScheduledPostRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    private final ScheduledPostRepository repository;

    public PostController(ScheduledPostRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/schedule")
    public ResponseEntity<ScheduledPost> schedulePost(
            @RequestBody ScheduledPost post) {

        post.setStatus("PENDING");

        ScheduledPost savedPost = repository.save(post);

        return ResponseEntity.ok(savedPost);
    }

    @GetMapping
    public ResponseEntity<List<ScheduledPost>> getAllPosts() {

        return ResponseEntity.ok(repository.findAll());
    }
}