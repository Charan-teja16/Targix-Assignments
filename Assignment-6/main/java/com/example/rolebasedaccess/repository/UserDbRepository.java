package com.example.rolebasedaccess.repository;

import com.example.rolebasedaccess.model.UserDb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDbRepository extends JpaRepository<UserDb,Integer> {

    UserDb findByUsername(String username);

}
