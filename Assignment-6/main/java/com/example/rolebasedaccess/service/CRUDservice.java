package com.example.rolebasedaccess.service;


import com.example.rolebasedaccess.dto.UserDbDto;
import com.example.rolebasedaccess.exception.UserAlreadyExistedException;
import com.example.rolebasedaccess.model.UserDb;
import com.example.rolebasedaccess.repository.UserDbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CRUDservice {

    @Autowired
    private UserDbRepository userDbRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    public void registerUser(UserDbDto userDto) {

        UserDb user=userDbRepository.findByUsername(userDto.getUsername());

        if(user!=null){
            throw new UserAlreadyExistedException("User Already Exist");
        }


        UserDb newUser = new UserDb();
        newUser.setUsername(userDto.getUsername());
        newUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        newUser.setRole("ROLE_USER");

        userDbRepository.save(newUser);
    }

    public String loginUser(UserDbDto userDbDto) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(userDbDto.getUsername(), userDbDto.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(userDbDto.getUsername());
        } else {
            return "fail";
        }
    }
}
