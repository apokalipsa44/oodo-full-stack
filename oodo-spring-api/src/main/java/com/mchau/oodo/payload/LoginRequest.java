package com.mchau.oodo.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;


@Getter
@Setter
public class LoginRequest {

    @NotBlank(message = "LoginRequest failed, username must be provided")
    private String username;
    @NotBlank(message = "LoginRequest failed, password must be provided")
    private String password;
}
