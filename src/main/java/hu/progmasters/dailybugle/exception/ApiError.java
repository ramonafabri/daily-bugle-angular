package hu.progmasters.dailybugle.exception;

public record ApiError(String errorCode, String error, String details) {
}
