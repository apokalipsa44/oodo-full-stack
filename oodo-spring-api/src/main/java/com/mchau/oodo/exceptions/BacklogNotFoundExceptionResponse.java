package com.mchau.oodo.exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BacklogNotFoundExceptionResponse {
    private String projectIIdentifier;

    public BacklogNotFoundExceptionResponse(String projectIIdentifier) {
        this.projectIIdentifier = projectIIdentifier;
    }
}
