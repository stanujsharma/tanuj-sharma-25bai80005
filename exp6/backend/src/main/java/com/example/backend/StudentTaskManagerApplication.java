package com.example.backend;

import com.example.backend.entity.Task;
import com.example.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SpringBootApplication
@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
@EnableCaching
public class StudentTaskManagerApplication {

    private final TaskService taskService;

    @Autowired
    public StudentTaskManagerApplication(TaskService taskService) {
        this.taskService = taskService;
    }

    public static void main(String[] args) {
        SpringApplication.run(StudentTaskManagerApplication.class, args);
    }

    // Get all tasks - Pagination & Sorting
    @GetMapping
    public Page<Task> getAllTasksPaginated(Pageable pageable) {
        return taskService.getTasksPaginated(pageable);
    }

    // Get all tasks with comments - N+1 problem fix
    @GetMapping("/with-comments")
    public List<Task> getAllTasksWithComments() {
        return taskService.getAllTasksWithComments();
    }

    // Get top 5 tasks - Native SQL
    @GetMapping("/top")
    public List<Task> getTopTasks() {
        return taskService.getTop5Tasks();
    }

    // Add task
    @PostMapping
    public Task addTask(@RequestBody Task newTask) {
        return taskService.addTask(newTask);
    }

    // Delete task
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return "Task with ID " + id + " has been deleted!";
    }

    // Toggle task completion
    @PutMapping("/{id}/toggle")
    public Task toggleTask(@PathVariable Long id) {
        return taskService.toggleTask(id);
    }
}