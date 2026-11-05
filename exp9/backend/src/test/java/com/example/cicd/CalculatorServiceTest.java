
package com.example.cicd;

import com.example.cicd.service.CalculatorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CalculatorServiceTest {

    private CalculatorService calculatorService;

    @BeforeEach
    void setUp() {
        calculatorService = new CalculatorService();
    }

    @Test
    void testAddition() {
        assertEquals(10, calculatorService.add(5, 5));
    }

    @Test
    void testSubtraction() {
        assertEquals(5, calculatorService.subtract(10, 5));
    }

    @Test
    void testMultiplication() {
        assertEquals(25, calculatorService.multiply(5, 5));
    }

    @Test
    void testDivision() {
        assertEquals(5.0, calculatorService.divide(25, 5));
    }

    @Test
    void testDivisionByZero() {
        assertThrows(ArithmeticException.class,
                () -> calculatorService.divide(10, 0));
    }
}
