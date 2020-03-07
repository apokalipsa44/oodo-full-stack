package com.mchau.oodo.security;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.stereotype.Component;

@Component
//@ConfigurationProperties("security.oauth2.client.google")
public class GoogleRegistrationProperties {

    private String clientId = "244090549454-fkuttbh408n0t7vrsk0sl63c6n9k4gbb.apps.googleusercontent.com";
    private String clientSecret = "GkTZ4ZuVMRVJ5AvRtyDuDpnq";
    private String scopes= "profile,email";
    private String redirectUri="https://www.allegro.pl";
    private String authorizationUri="https://accounts.google.com/o/oauth2/auth";
    private String tokenUri="https://www.googleapis.com/oauth2/v3/token";
    private String clientName = "Google";
    private String clientAlias = "google";
    private String userInfoUri="https://www.googleapis.com/plus/v1/people/me";
    private String userInfoNameAttributeKey = "name";
    private String jwkSetUri;

    private AuthorizationGrantType authorizedGrantType
            = AuthorizationGrantType.AUTHORIZATION_CODE;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getScopes() {
        return scopes;
    }

    public void setScopes(String scopes) {
        this.scopes = scopes;
    }

    public String getRedirectUri() {
        return redirectUri;
    }

    public void setRedirectUri(String redirectUri) {
        this.redirectUri = redirectUri;
    }

    public String getAuthorizationUri() {
        return authorizationUri;
    }

    public void setAuthorizationUri(String authorizationUri) {
        this.authorizationUri = authorizationUri;
    }

    public String getTokenUri() {
        return tokenUri;
    }

    public void setTokenUri(String tokenUri) {
        this.tokenUri = tokenUri;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getClientAlias() {
        return clientAlias;
    }

    public void setClientAlias(String clientAlias) {
        this.clientAlias = clientAlias;
    }

    public AuthorizationGrantType getAuthorizedGrantType() {
        return authorizedGrantType;
    }

    public String getUserInfoUri() {
        return userInfoUri;
    }

    public void setUserInfoUri(String userInfoUri) {
        this.userInfoUri = userInfoUri;
    }

    public String getUserInfoNameAttributeKey() {
        return userInfoNameAttributeKey;
    }

    public void setUserInfoNameAttributeKey(String userInfoNameAttributeKey) {
        this.userInfoNameAttributeKey = userInfoNameAttributeKey;
    }

    public String getJwkSetUri() {
        return jwkSetUri;
    }

    public void setJwkSetUri(String jwkSetUri) {
        this.jwkSetUri = jwkSetUri;
    }
}