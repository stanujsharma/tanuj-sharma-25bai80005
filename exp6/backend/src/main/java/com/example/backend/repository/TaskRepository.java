package com.example.backend.repository;

import com.example.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    // JOIN FETCH helps avoid the N+1 query problem
    @Query("SELECT DISTINCT t FROM Task t LEFT JOIN FETCH t.comments")
    List<Task> findAllWithComments();

    // Native SQL query
    @Query(value = "SELECT * FROM tasks ORDER BY id DESC LIMIT 5", nativeQuery = true)
    List<Task> findTop5TasksNative();
}