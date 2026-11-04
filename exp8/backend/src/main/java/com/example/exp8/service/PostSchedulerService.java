package com.example.exp8.service;

import com.example.exp8.entity.ScheduledPost;
import com.example.exp8.repository.ScheduledPostRepository;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostSchedulerService {

    private final ScheduledPostRepository repository;
    private final KafkaProducerService producerService;

    public PostSchedulerService(
            ScheduledPostRepository repository,
            KafkaProducerService producerService) {

        this.repository = repository;
        this.producerService = producerService;
    }

    @Scheduled(fixedRate = 10000)
    public void checkAndPublishDuePosts() {

        LocalDateTime now = LocalDateTime.now();

        List<ScheduledPost> duePosts =
                repository.findByStatusAndScheduledTimeBefore("PENDING", now);

        for (ScheduledPost post : duePosts) {

            producerService.publishPostEvent(post);

            post.setStatus("PUBLISHING");
            repository.save(post);

            System.out.println("Post status updated to PUBLISHING: " + post.getId());
        }
    }
}