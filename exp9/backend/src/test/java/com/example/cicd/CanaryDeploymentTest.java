
package com.example.cicd;

import com.example.cicd.model.CanaryConfig;
import com.example.cicd.model.CanaryMetrics;
import com.example.cicd.service.CanaryRoutingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CanaryDeploymentTest {

    private CanaryRoutingService canaryRoutingService;

    @BeforeEach
    void setUp() {
        canaryRoutingService = new CanaryRoutingService();
    }

    @Test
    void shouldUseDefaultCanaryPercentage() {
        assertEquals(20,
                canaryRoutingService.getConfig().getCanaryPercentage());
    }

    @Test
    void shouldUpdateCanaryPercentage() {
        canaryRoutingService.updateCanaryPercentage(50);

        assertEquals(50,
                canaryRoutingService.getConfig().getCanaryPercentage());
    }

    @Test
    void shouldRejectInvalidPercentage() {
        assertThrows(IllegalArgumentException.class,
                () -> canaryRoutingService.updateCanaryPercentage(120));
    }

    @Test
    void shouldTrackTrafficMetrics() {
        for (int i = 0; i < 100; i++) {
            canaryRoutingService.routeTraffic();
        }

        CanaryMetrics metrics = canaryRoutingService.getMetrics();

        assertEquals(100,
                metrics.getStableHits() + metrics.getCanaryHits());
    }
}
