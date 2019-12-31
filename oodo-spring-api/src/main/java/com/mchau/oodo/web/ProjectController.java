package com.mchau.oodo.web;

import com.mchau.oodo.model.Project;
import com.mchau.oodo.services.ProjectServiceImpl;
import com.mchau.oodo.services.ValidationErrorMsgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {

    private ProjectServiceImpl projectService;
    private ValidationErrorMsgService errorMsgService;

    @Autowired
    public ProjectController(ProjectServiceImpl projectService, ValidationErrorMsgService errorMsgService) {
        this.errorMsgService = errorMsgService;
        this.projectService = projectService;
    }

    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult bindingResult) {
        ResponseEntity<?> errorMap = errorMsgService.getErrorMessages(bindingResult);
        if (errorMap != null) return errorMap;

        projectService.saveOrUpdateProject(project);
        return new ResponseEntity<Project>(project, HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectById(@PathVariable String projectId){
        Project project=projectService.findProjectByIdentifier(projectId);
        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Project> findAllProjects(){
        return projectService.findAll();
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProjectById(@PathVariable String projectId){
        projectService.deleteProjectByIdentifier(projectId);
        return new ResponseEntity<String>("Project "+projectId+" was deleted.", HttpStatus.OK);
    }

  
}
