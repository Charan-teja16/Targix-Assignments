package com.example.rolebasedaccess.controller;

import com.example.rolebasedaccess.dto.UserDbDto;
import com.example.rolebasedaccess.service.CRUDservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CRUDcontroller {

    @Autowired
    private CRUDservice crudService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDbDto userDto){
        crudService.registerUser(userDto);
        return  ResponseEntity.status(HttpStatus.CREATED).body("User Created Successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserDbDto userDbDto){
        return  ResponseEntity.status(HttpStatus.CREATED).body(crudService.loginUser(userDbDto));
    }

}
