package com.mchau.oodo.services;

import com.mchau.oodo.exceptions.UserNameTakenException;
import com.mchau.oodo.model.User;
import com.mchau.oodo.repositories.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl {

    private UserRepository repository;
    private BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository repository, BCryptPasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public User saveUser(User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setConfirmPassword(""); // clears typed password so its not visible in a returned json
            return repository.save(user);
        } catch (Exception e) {
            throw new UserNameTakenException(user.getUsername() + " This username is already taken");
        }


    }


}
