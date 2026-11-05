
package com.example.cicd.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/pipeline")
public class PipelineStatusController {

    @GetMapping("/status")
    public Map<String, Object> getPipelineStatus() {
        return Map.of(
                "status", "SUCCESS",
                "pipeline", "CI/CD Pipeline",
                "build", "PASSED",
                "tests", "PASSED",
                "deployment", "READY",
                "message", "Pipeline executed successfully"
        );
    }
}
