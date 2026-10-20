package com.websitebuilder.platform.common.exceptions;

import java.util.List;
import java.util.Objects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse> handleApiException(ApiException ex) {
        HttpStatus status = switch (ex.code()) {
            case "AUTH_INVALID_CREDENTIALS" -> HttpStatus.UNAUTHORIZED;
            case "AUTH_SUSPENDED" -> HttpStatus.FORBIDDEN;
            case "AUTH_EMAIL_TAKEN" -> HttpStatus.CONFLICT;
            case "SUBSCRIPTION_REQUIRED" -> HttpStatus.PAYMENT_REQUIRED;
            case "SUBSCRIPTION_NOT_FOUND" -> HttpStatus.PAYMENT_REQUIRED;
            case "STRIPE_SIGNATURE_INVALID" -> HttpStatus.BAD_REQUEST;
            case "VALIDATION_ERROR" -> HttpStatus.BAD_REQUEST;
            case "BILLING_PLAN_NOT_SUPPORTED" -> HttpStatus.BAD_REQUEST;
            case "ADMIN_METRICS_PERIOD_INVALID" -> HttpStatus.BAD_REQUEST;
            case "BILLING_CHECKOUT_FAILED" -> HttpStatus.BAD_GATEWAY;
            case "BILLING_PORTAL_FAILED" -> HttpStatus.BAD_GATEWAY;
            case "STRIPE_SUBSCRIPTION_SYNC_FAILED" -> HttpStatus.BAD_GATEWAY;
            case "STRIPE_EVENT_INVALID" -> HttpStatus.BAD_REQUEST;
            case "WEBSITE_STATUS_INVALID" -> HttpStatus.BAD_REQUEST;
            case "USER_STATUS_INVALID" -> HttpStatus.BAD_REQUEST;
            case "USER_NOT_FOUND" -> HttpStatus.NOT_FOUND;
            case "CATEGORY_NOT_FOUND" -> HttpStatus.NOT_FOUND;
            case "TEMPLATE_NOT_FOUND" -> HttpStatus.NOT_FOUND;
            case "WEBSITE_NOT_FOUND" -> HttpStatus.NOT_FOUND;
            case "WEBSITE_ACCESS_DENIED" -> HttpStatus.FORBIDDEN;
            case "CATEGORY_SLUG_TAKEN" -> HttpStatus.CONFLICT;
            case "TEMPLATE_SLUG_TAKEN" -> HttpStatus.CONFLICT;
            case "WEBSITE_SLUG_CONFLICT" -> HttpStatus.CONFLICT;
            case "CATEGORY_HAS_ACTIVE_TEMPLATES" -> HttpStatus.CONFLICT;
            default -> HttpStatus.INTERNAL_SERVER_ERROR;
        };

        return ResponseEntity
                .status(status)
                .body(new ErrorResponse(ex.code(), ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        List<FieldValidationError> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
            .map(this::toFieldValidationError)
                .toList();

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ValidationErrorResponse("VALIDATION_ERROR", "Validation failed", errors));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("INVALID_PATH_PARAMETER", "Invalid value for parameter: " + ex.getName()));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        log.warn("Request body not readable: {}", ex.getMessage(), ex);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("INVALID_REQUEST_BODY", "Request body is missing or malformed"));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException ex) {
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(new ErrorResponse("FORBIDDEN", "Access denied"));
    }

    @ExceptionHandler(ErrorResponseException.class)
    public ResponseEntity<ErrorResponse> handleErrorResponseException(ErrorResponseException ex) {
        return ResponseEntity
                .status(ex.getStatusCode())
                .body(new ErrorResponse(String.valueOf(ex.getStatusCode().value()), ex.getMessage()));
    }

    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(org.springframework.dao.DataIntegrityViolationException ex) {
        log.warn("DataIntegrityViolationException suppressed as 409", ex);
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("VERSION_CONFLICT", "A conflicting save operation is in progress. Please try again."));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        log.error("Unhandled exception", ex);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("INTERNAL_ERROR", "An unexpected error occurred"));
    }

    private FieldValidationError toFieldValidationError(FieldError fieldError) {
        return new FieldValidationError(
                fieldError.getField(),
                Objects.requireNonNullElse(fieldError.getDefaultMessage(), "Invalid value")
        );
    }

    private record ErrorResponse(String code, String message) {
    }

    private record ValidationErrorResponse(String code, String message, List<FieldValidationError> errors) {
    }

    private record FieldValidationError(String field, String message) {
    }
}
