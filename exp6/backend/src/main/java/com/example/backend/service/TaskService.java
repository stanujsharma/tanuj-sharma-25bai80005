package com.example.backend.service;

import com.example.backend.entity.Task;
import com.example.backend.repository.TaskRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    // Pagination + Sorting + Caching
    @Cacheable(value = "tasks")
    public Page<Task> getTasksPaginated(Pageable pageable) {
        return repository.findAll(pageable);
    }

    // JOIN FETCH - avoids N+1 problem
    public List<Task> getAllTasksWithComments() {
        return repository.findAllWithComments();
    }

    // Native SQL query
    public List<Task> getTop5Tasks() {
        return repository.findTop5TasksNative();
    }

    // Add task and clear cache
    @CacheEvict(value = "tasks", allEntries = true)
    public Task addTask(Task task) {
        return repository.save(task);
    }

    // Delete task and clear cache
    @CacheEvict(value = "tasks", allEntries = true)
    public void deleteTask(Long id) {
        repository.deleteById(id);
    }

    // Toggle task and clear cache
    @CacheEvict(value = "tasks", allEntries = true)
    public Task toggleTask(Long id) {
        Task task = repository.findById(id)
                .orElseThrow();

        task.setCompleted(!task.isCompleted());

        return repository.save(task);
    }
}