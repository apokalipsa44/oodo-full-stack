package com.mchau.oodo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ProjectNotFundException extends RuntimeException {
    public ProjectNotFundException(String message) {
        super(message);
    }
}
