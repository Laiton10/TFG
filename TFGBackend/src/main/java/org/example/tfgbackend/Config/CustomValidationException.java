package org.example.tfgbackend.Config;

public class CustomValidationException extends RuntimeException {
    private final String field;
    private final String message;

    public CustomValidationException(String field, String message) {
        super(message);
        this.field = field;
        this.message = message;
    }

    public String getField() {
        return field;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
