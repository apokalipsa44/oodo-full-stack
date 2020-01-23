package com.mchau.oodo.exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvalidLoginResponse {
private String username;
private String password;

    public InvalidLoginResponse() {
        this.username = "Wrong login";
        this.password = "Wrong password";
    }
}
