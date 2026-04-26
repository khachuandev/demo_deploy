package com.example.demodocker.service;

import com.example.demodocker.dto.request.UserDto;
import com.example.demodocker.dto.response.UserResponse;

import java.util.List;

public interface IUserService {
    UserResponse getUserById(Long id);
    List<UserResponse> getUsers();
    UserResponse addUser(UserDto req);
    UserResponse updateUser(Long id, UserDto req);
    void deleteUser(Long id);
}
