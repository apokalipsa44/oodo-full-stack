package com.mchau.oodo.exceptions;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserNameTakenExceptionResponse {
private String userName;

    public UserNameTakenExceptionResponse(String userName) {
        this.userName = userName;
    }
}
