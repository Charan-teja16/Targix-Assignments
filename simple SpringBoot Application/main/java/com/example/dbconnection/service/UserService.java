package com.example.dbconnection.service;

import com.example.dbconnection.model.User;
import com.example.dbconnection.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;

    public User CreateUser(User user) {
        return userRepository.save(user);
    }
}
