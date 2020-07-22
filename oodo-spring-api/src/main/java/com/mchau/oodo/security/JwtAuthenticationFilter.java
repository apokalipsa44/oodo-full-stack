package com.mchau.oodo.security;

import com.mchau.oodo.model.User;
import com.mchau.oodo.services.UserDetailsService;
//import com.sun.org.apache.xml.internal.security.utils.JavaUtils;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
//import sun.plugin.com.Utils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

import static com.mchau.oodo.security.JwtConstants.TOKEN_HEADER;
import static com.mchau.oodo.security.JwtConstants.TOKEN_PREFIX;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private JwtTokenProvider tokenProvider;
    private UserDetailsService userDetailsService;

    @Autowired
    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider, UserDetailsService userDetailsService) {
        this.tokenProvider = tokenProvider;
        this.userDetailsService = userDetailsService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwtBearer = httpServletRequest.getHeader(TOKEN_HEADER);
//            System.out.println(jwtBearer);
            String jwt = "";
            // extract token - removes the prefix
            if (StringUtils.hasText(jwtBearer) && jwtBearer.startsWith(TOKEN_PREFIX)) {
                jwt = jwtBearer.substring(7, jwtBearer.length());
            }
            //validate the token and extracts the user
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                Long userId = tokenProvider.getUserIdFromToken(jwt);
                User user = userDetailsService.getUserById(userId);

                UsernamePasswordAuthenticationToken passwordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());

                passwordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(passwordAuthenticationToken);
            }
        } catch (Exception ex) {
            System.out.println("Error with token: " + ex.getMessage());
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}

