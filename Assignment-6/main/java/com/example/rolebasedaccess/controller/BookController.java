package com.example.rolebasedaccess.controller;


import com.example.rolebasedaccess.dto.UserDbDto;
import com.example.rolebasedaccess.model.Book;
import com.example.rolebasedaccess.model.UserDb;
import com.example.rolebasedaccess.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping("/user/book")
    public ResponseEntity<Book> createBook(@RequestBody Book book){
        bookService.createBook(book);
        return  ResponseEntity
                .status(HttpStatus.CREATED)
                .body(book);
    }

    @GetMapping("/admin/books")
    public ResponseEntity<List<Book>> getAllBooks(){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(bookService.getAllBooks());
    }

    @GetMapping("/admin")
    public String hello(){
        return "Hello Admin";
    }
}
