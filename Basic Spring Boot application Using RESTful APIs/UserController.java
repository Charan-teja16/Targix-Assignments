package com.example.sample.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController

public class UserController {

    private Map<Integer,User> userdb = new HashMap<>();

    @PostMapping("/user")
    public ResponseEntity<String> createUser(@RequestBody User user){
        userdb.put(user.getId(),user);
        return new ResponseEntity<>("User Created Successfully",HttpStatus.CREATED);
    }

    @GetMapping("/users")
    public ArrayList<User> Users(){
        return new ArrayList<>(userdb.values());
    }

    @PutMapping("/user")
    public ResponseEntity<String> updateUser(@RequestBody User user){
        if(!userdb.containsKey(user.getId()))
            return new ResponseEntity<>("No such User",HttpStatus.NOT_FOUND);
        userdb.put(user.getId(), user);
        return new ResponseEntity<>("Updated Successfully",HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/user")
    public String deleteUser(@RequestHeader("User-Id") int id){
        if(!userdb.containsKey(id))
            return "No such User";
        userdb.remove(id);
        return "User Deleted Successfully";

    }


    @GetMapping("/user/{id}")
    public List<User> viewUser(@PathVariable int id){
        if(!userdb.containsKey(id))
            return null;
        return List.of(userdb.get(id));
    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> searchUser(@RequestParam int id){
        if(!userdb.containsKey(id))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(List.of(userdb.get(id)),HttpStatus.OK);

    }



}
