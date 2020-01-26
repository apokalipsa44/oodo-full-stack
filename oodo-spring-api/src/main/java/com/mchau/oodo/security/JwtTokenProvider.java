package com.mchau.oodo.security;

import com.mchau.oodo.model.User;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.mchau.oodo.security.JwtConstants.SECRET;
import static com.mchau.oodo.security.JwtConstants.TOKEN_EXP_DATE;

@Component
public class JwtTokenProvider {
    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Date dateNow = new Date(System.currentTimeMillis());
        Date expDate=new Date(dateNow.getTime()+TOKEN_EXP_DATE);
        String userId=String.valueOf(user.getId());

        Map<String, Object>claims = new HashMap<>();
        claims.put("id", userId);
        claims.put("username", user.getUsername());



//jwts - from dependencies pom.xml
        return Jwts.builder()
                .setSubject(userId)
                .addClaims(claims)
                .setIssuedAt(dateNow)
                .setExpiration(expDate)
                .signWith(SignatureAlgorithm.HS512, SECRET).compact();
    }
}
