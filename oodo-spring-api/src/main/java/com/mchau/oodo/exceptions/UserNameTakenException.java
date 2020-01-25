package com.mchau.oodo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserNameTakenException extends RuntimeException {

    public UserNameTakenException(String message) {
        super(message);
    }
}
