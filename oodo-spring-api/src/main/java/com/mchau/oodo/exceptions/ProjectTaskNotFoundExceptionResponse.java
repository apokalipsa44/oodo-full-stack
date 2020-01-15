package com.mchau.oodo.exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTaskNotFoundExceptionResponse {
    private String projectTaskSequence;

    public ProjectTaskNotFoundExceptionResponse(String projectTaskSequence) {
        this.projectTaskSequence = projectTaskSequence;
    }
}
