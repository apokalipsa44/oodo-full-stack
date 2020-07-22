package com.mchau.oodo.security;

import com.mchau.oodo.services.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.util.Arrays;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private UserDetailsService userDetailsService;
    private BCryptPasswordEncoder passwordEncoder;
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private GoogleRegistrationProperties properties;

    @Autowired
    public SecurityConfig(JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, UserDetailsService userDetailsService,
                          BCryptPasswordEncoder passwordEncoder, JwtAuthenticationFilter jwtAuthenticationFilter,
                          GoogleRegistrationProperties properties) {
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.properties=properties;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)  //stateless because of JWT (no cookies etc.)
                .and()
                .headers().frameOptions().sameOrigin()  // to use H2 only
                .and()
                .authorizeRequests()
                .antMatchers("/",
                        "**/*.ico",
                        "**/*.jpg",
                        "**/*.gif",
                        "**/*.png",
                        "**/*.css",
                        "**/*.svg",
                        "**/*.html",
                        "**/*.js").permitAll()
                .antMatchers("/api/users/**").permitAll()
                .antMatchers("/h2-console/**").permitAll()
                .anyRequest().permitAll()
                .and()
                .oauth2Login()
                .authorizationEndpoint()
                .authorizationRequestResolver(
                        new CustomAuthorizationRequestResolver(
                                clientRegistrationRepository(), "/ssij"))
        ;


        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public AuthorizationRequestRepository<OAuth2AuthorizationRequest> authorizationRequestRepository() {
        return new HttpSessionOAuth2AuthorizationRequestRepository();
    }

//    @Bean
//    public OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> accessTokenResponseClient() {
//        DefaultAuthorizationCodeTokenResponseClient accessTokenResponseClient = new DefaultAuthorizationCodeTokenResponseClient();
//        return accessTokenResponseClient;
//    }

    @Bean
    public ClientRegistrationRepository clientRegistrationRepository() {
        ClientRegistration registration = ClientRegistration.withRegistrationId(properties.getClientId())
                .clientId(properties.getClientId())
                .clientSecret(properties.getClientSecret())
                .redirectUriTemplate(properties.getRedirectUri())
                .authorizationUri(properties.getAuthorizationUri())
                .clientSecret(properties.getClientSecret())
                .tokenUri(properties.getTokenUri())
//                .redirectUri(properties.getRedirectUri())
                .scope(properties.getScopes().split(","))
                .clientName(properties.getClientName())
//                .clientAlias(properties.getClientAlias())
                .authorizationGrantType(properties.getAuthorizedGrantType())
                .userInfoUri(properties.getUserInfoUri())
                .clientAuthenticationMethod(new ClientAuthenticationMethod("get"))
                .build();

        return new InMemoryClientRegistrationRepository(Arrays.asList(registration));
    }

}
