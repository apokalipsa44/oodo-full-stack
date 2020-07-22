package com.mchau.oodo.web;

import com.mchau.oodo.model.Project;
import com.mchau.oodo.model.User;
import com.mchau.oodo.payload.JwtLoginSuccess;
import com.mchau.oodo.payload.LoginRequest;
import com.mchau.oodo.security.JwtTokenProvider;
import com.mchau.oodo.services.UserServiceImpl;
import com.mchau.oodo.services.ValidationErrorMsgService;
import com.mchau.oodo.validators.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.security.Principal;

import static com.mchau.oodo.security.JwtConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private ValidationErrorMsgService errorMsgService;
    private UserServiceImpl userService;
    private UserValidator userValidator;
    private JwtTokenProvider tokenProvider;
    private AuthenticationManager authenticationManager;


    @Autowired
    public UserController(ValidationErrorMsgService errorMsgService, UserServiceImpl userService,
                          UserValidator userValidator, JwtTokenProvider tokenProvider,
                          AuthenticationManager authenticationManager) {
        this.errorMsgService = errorMsgService;
        this.userService = userService;
        this.userValidator = userValidator;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid User user, BindingResult bindingResult) {
        userValidator.validate(user, bindingResult);

        ResponseEntity<?> errorMap = errorMsgService.getErrorMessages(bindingResult);
        if (errorMap != null) return errorMap;

        userService.saveUser(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody @Valid LoginRequest loginRequest, BindingResult bindingResult) {
        ResponseEntity<?> errorMap = errorMsgService.getErrorMessages(bindingResult);
        if (errorMap != null) return errorMap;

        Object principal;
        Object credentials;
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);


        return ResponseEntity.ok(new JwtLoginSuccess(true, jwt));//todo <-- ResponseEntity.ok ??
    }


}
