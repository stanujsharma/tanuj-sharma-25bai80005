package com.example.exp8.service;

import com.example.exp8.entity.ProcessedEvent;
import com.example.exp8.entity.ScheduledPost;
import com.example.exp8.repository.ProcessedEventRepository;
import com.example.exp8.repository.ScheduledPostRepository;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class KafkaConsumerService {

    private final ScheduledPostRepository postRepository;
    private final ProcessedEventRepository processedEventRepository;
    private final KafkaTemplate<String, ScheduledPost> kafkaTemplate;

    public KafkaConsumerService(
            ScheduledPostRepository postRepository,
            ProcessedEventRepository processedEventRepository,
            KafkaTemplate<String, ScheduledPost> kafkaTemplate) {

        this.postRepository = postRepository;
        this.processedEventRepository = processedEventRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    @KafkaListener(topics = "post-topic", groupId = "post-processing-group")
    public void consumePostEvent(ScheduledPost post) {

        String eventId = String.valueOf(post.getId());

        if (processedEventRepository.existsById(eventId)) {
            System.out.println("Duplicate event skipped: " + eventId);
            return;
        }

        try {
            System.out.println("Processing post: " + eventId);

            if (Math.random() < 0.2) {
                throw new RuntimeException("Simulated processing failure");
            }

            post.setStatus("PUBLISHED");
            postRepository.save(post);

            ProcessedEvent event = new ProcessedEvent();
            event.setEventId(eventId);
            event.setProcessedAt(LocalDateTime.now());

            processedEventRepository.save(event);

            System.out.println("Post published successfully: " + eventId);

        } catch (Exception e) {
            System.err.println("Processing failed: " + e.getMessage());

            sendToDlq(post);
        }
    }

    private void sendToDlq(ScheduledPost post) {

        kafkaTemplate.send(
                "post-topic-dlq",
                String.valueOf(post.getId()),
                post
        );

        post.setStatus("FAILED");
        postRepository.save(post);

        System.out.println("Post sent to Dead Letter Queue: " + post.getId());
    }
}