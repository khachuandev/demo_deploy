package com.example.demodocker.dto.response;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiResponse<T> {
    private int code;
    private String message;
    private T data;
    private Instant timestamp;

    public static <T> ApiResponse<T> success(T data) {
        return build(HttpStatus.OK.value(), "Success", data);
    }

    public static <T> ApiResponse<T> created(T data) {
        return build(HttpStatus.CREATED.value(), "Created", data);
    }

    private static <T> ApiResponse<T> build(int code, String message, T data) {
        return ApiResponse.<T>builder()
                .code(code)
                .message(message)
                .data(data)
                .timestamp(Instant.now())
                .build();
    }

}

