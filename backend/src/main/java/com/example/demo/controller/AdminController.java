package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private UserRepository userRepo;

    // GET all users
    @GetMapping("/users")
    public java.util.List<User> getUsers() {
        return (java.util.List<User>) userRepo.findAll();
    }

    // DELETE user
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepo.deleteById(id);
    }

    // UPDATE role
    @PutMapping("/users/{id}/role")
    public void updateRole(@PathVariable Long id, @RequestParam String role) {
        User user = userRepo.findById(id).orElseThrow();
        user.setRole(role);
        userRepo.save(user);
    }
}