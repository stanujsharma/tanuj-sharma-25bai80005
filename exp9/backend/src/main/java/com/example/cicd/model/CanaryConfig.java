
package com.example.cicd.model;

public class CanaryConfig {

    private int canaryPercentage = 20;

    public int getCanaryPercentage() {
        return canaryPercentage;
    }

    public void setCanaryPercentage(int canaryPercentage) {
        if (canaryPercentage < 0 || canaryPercentage > 100) {
            throw new IllegalArgumentException(
                "Canary percentage must be between 0 and 100"
            );
        }

        this.canaryPercentage = canaryPercentage;
    }
}
