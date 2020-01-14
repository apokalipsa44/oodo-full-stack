package com.mchau.oodo.web;

import com.mchau.oodo.model.ProjectTask;
import com.mchau.oodo.services.ProjectServiceImpl;
import com.mchau.oodo.services.ProjectTaskServiceImpl;
import com.mchau.oodo.services.ValidationErrorMsgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/backlog")
public class BacklogController {
    private ProjectTaskServiceImpl projectTaskService;
    private ValidationErrorMsgService errorMsgService;

    @Autowired
    public BacklogController(ProjectTaskServiceImpl projectTaskService, ValidationErrorMsgService errorMsgService) {
        this.projectTaskService = projectTaskService;
        this.errorMsgService = errorMsgService;
    }

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addProjectTaskToBacklog(@Valid @RequestBody ProjectTask projectTask,
                                                     BindingResult result,
                                                     @PathVariable String backlog_id) {
        ResponseEntity<?> errorMap = errorMsgService.getErrorMessages(result);
        if (errorMap != null) {
            return errorMap;
        }
        projectTaskService.addProjectTask(projectTask, backlog_id);
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.CREATED);

    }

    @GetMapping("/{backlog_id}")
    public Iterable<ProjectTask> getAllTaskByBacklogId(@PathVariable String backlog_id){
        System.out.println("ssij");
        return projectTaskService.getAllSortedTaskByBacklogId(backlog_id);
    }
}
