package com.mchau.oodo.services;

import com.mchau.oodo.model.User;
import com.mchau.oodo.repositories.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl {

    private UserRepository repository;

    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }


    public User saveUser(User user) {
        //noinspection SpringConfigurationProxyMethods
        user.setPassword(passwordEncoder().encode(user.getPassword()));

        return repository.save(user);


    }


    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
