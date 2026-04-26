package com.example.demodocker.controller;

import com.example.demodocker.dto.request.UserDto;
import com.example.demodocker.dto.response.ApiResponse;
import com.example.demodocker.dto.response.UserResponse;
import com.example.demodocker.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final IUserService userService;

    @PostMapping
    private ResponseEntity<ApiResponse<UserResponse>> addUser(@RequestBody UserDto req){
        UserResponse newUser = userService.addUser(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.created(newUser));
    }

    @PutMapping("/{id}")
    private ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable Long id, @RequestBody UserDto req){
        UserResponse updateUser = userService.updateUser(id, req);
        return ResponseEntity.ok(ApiResponse.success(updateUser));
    }

    @GetMapping
    private ResponseEntity<ApiResponse<List<UserResponse>>> getUsers(){
        return ResponseEntity.ok(ApiResponse.success(userService.getUsers()));
    }

    @GetMapping("/{id}")
    private ResponseEntity<ApiResponse<UserResponse>> getUser(@PathVariable Long id){
        return ResponseEntity.ok(ApiResponse.success(userService.getUserById(id)));
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
