package com.example.exp8.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

    @Bean
    public NewTopic postTopic() {
        return TopicBuilder.name("post-topic")
                .partitions(1)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic deadLetterTopic() {
        return TopicBuilder.name("post-topic-dlq")
                .partitions(1)
                .replicas(1)
                .build();
    }
}