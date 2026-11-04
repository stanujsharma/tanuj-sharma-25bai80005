package com.example.exp8.service;

import com.example.exp8.entity.ScheduledPost;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String, ScheduledPost> kafkaTemplate;

    public KafkaProducerService(KafkaTemplate<String, ScheduledPost> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishPostEvent(ScheduledPost post) {

        kafkaTemplate.send(
                "post-topic",
                String.valueOf(post.getId()),
                post
        );

        System.out.println("Post event sent to Kafka: " + post.getId());
    }
}