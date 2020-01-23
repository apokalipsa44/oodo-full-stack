package com.mchau.oodo.web;

import com.mchau.oodo.model.Project;
import com.mchau.oodo.model.User;
import com.mchau.oodo.services.UserServiceImpl;
import com.mchau.oodo.services.ValidationErrorMsgService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private ValidationErrorMsgService errorMsgService;
    private UserServiceImpl userService;

    public UserController(ValidationErrorMsgService errorMsgService, UserServiceImpl userService) {
        this.errorMsgService = errorMsgService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid User user, BindingResult bindingResult) {
        ResponseEntity<?> errorMap = errorMsgService.getErrorMessages(bindingResult);
        if (errorMap != null) return errorMap;

        userService.saveUser(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }

}
