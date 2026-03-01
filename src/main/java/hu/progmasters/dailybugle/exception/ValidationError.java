package hu.progmasters.dailybugle.exception;

public record ValidationError(String field, String errorMessage) {
}
