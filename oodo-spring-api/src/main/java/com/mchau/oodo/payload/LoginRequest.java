package com.mchau.oodo.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;


@Getter
@Setter
public class LoginRequest {

    @NotBlank(message = "username must be provided")
    private String userName;
    @NotBlank(message = "password must be provided")
    private String password;
}
