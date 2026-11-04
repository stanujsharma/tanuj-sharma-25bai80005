package com.example.exp8.repository;

import com.example.exp8.entity.ScheduledPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ScheduledPostRepository extends JpaRepository<ScheduledPost, Long> {

    List<ScheduledPost> findByStatusAndScheduledTimeBefore(
            String status,
            LocalDateTime time
    );
}