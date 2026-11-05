
package com.example.cicd.controller;

import com.example.cicd.model.CanaryConfig;
import com.example.cicd.model.CanaryMetrics;
import com.example.cicd.service.CanaryRoutingService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/canary")
public class CanaryController {

    private final CanaryRoutingService canaryRoutingService;

    public CanaryController(CanaryRoutingService canaryRoutingService) {
        this.canaryRoutingService = canaryRoutingService;
    }

    @GetMapping("/route")
    public Map<String, String> routeTraffic() {
        String version = canaryRoutingService.routeTraffic();
        return Map.of("version", version);
    }

    @GetMapping("/config")
    public CanaryConfig getConfig() {
        return canaryRoutingService.getConfig();
    }

    @PutMapping("/config")
    public CanaryConfig updateConfig(@RequestParam int percentage) {
        canaryRoutingService.updateCanaryPercentage(percentage);
        return canaryRoutingService.getConfig();
    }

    @GetMapping("/metrics")
    public CanaryMetrics getMetrics() {
        return canaryRoutingService.getMetrics();
    }
}
