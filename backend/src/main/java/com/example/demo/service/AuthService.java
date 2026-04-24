package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.config.JwtUtil;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;

	public User getUserByEmail(String email) {
	    return userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found"));
	}
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Register
    public User register(User user) {
    	if (user.getRole() == null) {
    	    user.setRole("USER");
    	}

        // 🔥 IMPORTANT: encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    // ✅ Login
    public String login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(password, user.getPassword())) {
            return jwtUtil.generateToken(user.getEmail(), user.getRole());
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}