package com.mchau.oodo.payload;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JwtLoginSuccess {
    private Boolean isSucceeded;
    private String tooken;

    @Override
    public String toString() {
        return "JwtLoginSuccess{" +
                "isSucceeded=" + isSucceeded +
                ", tooken='" + tooken + '\'' +
                '}';
    }
}
