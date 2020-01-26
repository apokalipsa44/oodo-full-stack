package com.mchau.oodo.security;

import com.mchau.oodo.model.User;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
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
        Date expDate = new Date(dateNow.getTime() + TOKEN_EXP_DATE);
        String userId = String.valueOf(user.getId());

        Map<String, Object> claims = new HashMap<>();
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

    public Boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            System.out.println("Wrong signature");
        } catch (MalformedJwtException e) {
            System.out.println("Bad token");
        } catch (ExpiredJwtException e) {
            System.out.println("Token expired");
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported token");
        } catch (IllegalArgumentException e) {
            System.out.println("Empty string or null?");
        }
        return false;
    }

    public Long getUserIdFromToken(String token){
        Key key;
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String idString= String.valueOf(claims.get("id"));
        Long id=Long.valueOf(idString);
        return id;
    }
}
