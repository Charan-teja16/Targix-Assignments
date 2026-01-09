package com.example.rolebasedaccess.service;

import com.example.rolebasedaccess.model.UserDb;
import com.example.rolebasedaccess.model.UserPrinciple;
import com.example.rolebasedaccess.repository.UserDbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDbRepository userDbRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserDb user = userDbRepository.findByUsername(username);

        if (user == null){
            throw new UsernameNotFoundException("User Not Found");
        }
        return new UserPrinciple(user);
    }
}
