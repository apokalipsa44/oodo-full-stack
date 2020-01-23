package com.mchau.oodo.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email(message = "Your username is Your Email")
    @NotBlank(message = "username must be provided")
    @Column(unique = true)
    private String username;

    @NotBlank(message = "password must be provided")
    private String password;

    @Transient
    private String confirmPassword;

    private Date createdAt;

    private Date updatedAt;

    @PrePersist
    void onCreate() {
        this.createdAt = new Date();
    }

    @PreUpdate
    void onUpdate() {
        this.updatedAt = new Date();
    }
}
