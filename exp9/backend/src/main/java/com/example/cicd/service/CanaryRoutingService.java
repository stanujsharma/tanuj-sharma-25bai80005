
package com.example.cicd.service;

import com.example.cicd.model.CanaryConfig;
import com.example.cicd.model.CanaryMetrics;
import org.springframework.stereotype.Service;

import java.util.concurrent.ThreadLocalRandom;

@Service
public class CanaryRoutingService {

    private final CanaryConfig canaryConfig = new CanaryConfig();

    private int stableHits = 0;
    private int canaryHits = 0;

    public synchronized String routeTraffic() {
        int randomValue = ThreadLocalRandom.current().nextInt(100);

        if (randomValue < canaryConfig.getCanaryPercentage()) {
            canaryHits++;
            return "CANARY";
        }

        stableHits++;
        return "STABLE";
    }

    public CanaryConfig getConfig() {
        return canaryConfig;
    }

    public void updateCanaryPercentage(int percentage) {
        canaryConfig.setCanaryPercentage(percentage);
    }

    public synchronized CanaryMetrics getMetrics() {
        return new CanaryMetrics(stableHits, canaryHits);
    }
}
