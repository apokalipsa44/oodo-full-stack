package com.mchau.oodo.services;

import com.mchau.oodo.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl {

    private UserRepository repository;

    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }
}
