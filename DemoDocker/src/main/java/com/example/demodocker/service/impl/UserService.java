package com.example.demodocker.service.impl;

import com.example.demodocker.entity.User;
import com.example.demodocker.repository.UserRepository;
import com.example.demodocker.dto.request.UserDto;
import com.example.demodocker.dto.response.UserResponse;
import com.example.demodocker.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;

    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return toUserResponse(user);
    }

    @Override
    public List<UserResponse> getUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::toUserResponse)
                .toList();
    }

    @Override
    @Transactional
    public UserResponse addUser(UserDto req) {
        User newUser = User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .description(req.getDescription())
                .build();
        User savedUser = userRepository.save(newUser);
        return toUserResponse(savedUser);
    }

    @Override
    @Transactional
    public UserResponse updateUser(Long id, UserDto req) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if(req.getUsername() != null) {
            existingUser.setUsername(req.getUsername());
        }
        if(req.getEmail() != null) {
            existingUser.setEmail(req.getEmail());
        }
        if(req.getDescription() != null) {
            existingUser.setDescription(req.getDescription());
        }
        User savedUser = userRepository.save(existingUser);
        return toUserResponse(savedUser);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }

    private UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .description(user.getDescription())
                .build();
    }
}
