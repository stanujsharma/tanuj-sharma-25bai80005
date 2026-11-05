
package com.example.cicd.model;

public class CanaryMetrics {

    private int stableHits;
    private int canaryHits;

    public CanaryMetrics() {
    }

    public CanaryMetrics(int stableHits, int canaryHits) {
        this.stableHits = stableHits;
        this.canaryHits = canaryHits;
    }

    public int getStableHits() {
        return stableHits;
    }

    public void setStableHits(int stableHits) {
        this.stableHits = stableHits;
    }

    public int getCanaryHits() {
        return canaryHits;
    }

    public void setCanaryHits(int canaryHits) {
        this.canaryHits = canaryHits;
    }
}
