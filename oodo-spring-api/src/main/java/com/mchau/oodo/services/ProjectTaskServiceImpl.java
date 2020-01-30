package com.mchau.oodo.services;

import com.mchau.oodo.exceptions.BacklogNotFondException;
import com.mchau.oodo.exceptions.ProjectNotFundException;
import com.mchau.oodo.exceptions.ProjectTaskNotFoundException;
import com.mchau.oodo.model.Backlog;
import com.mchau.oodo.model.ProjectTask;
import com.mchau.oodo.repositories.BacklogRepository;
import com.mchau.oodo.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ProjectTaskServiceImpl {
    public static final String PROJECT_NOT_FOUND = "Backlog for project not found. Project ID: ";

    private BacklogRepository backlogRepository;
    private ProjectTaskRepository projectTaskRepository;
    private ProjectServiceImpl projectService;

    @Autowired
    public ProjectTaskServiceImpl(BacklogRepository backlogRepository, ProjectTaskRepository projectTaskRepository,
                                  ProjectServiceImpl projectService) {
        this.backlogRepository = backlogRepository;
        this.projectTaskRepository = projectTaskRepository;
        this.projectService = projectService;
    }

    public ProjectTask addProjectTask(ProjectTask projectTask, String projectIdentifier, String username) {
        Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();
        if (backlog == null) {
            throw new BacklogNotFondException(PROJECT_NOT_FOUND + projectIdentifier);
        }
        projectTask.setBacklog(backlog);
        Integer backlogSequence = projectTask.getBacklog().getPrTaskSequence();
        backlogSequence++;
        projectTask.getBacklog().setPrTaskSequence(backlogSequence);
        projectTask.setProjectSequence(projectIdentifier.toUpperCase() + "-" + backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier.toUpperCase());
        if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
            projectTask.setPriority(3);
        }
        if (projectTask.getStatus() == null || projectTask.getStatus() == "") {
            projectTask.setStatus("TO_DO");
        }

        return projectTaskRepository.save(projectTask);
    }

    public Iterable<ProjectTask> getAllSortedTaskByBacklogId(String projectIdentifier, String username) {
        try {
            projectService.findProjectByIdentifier(projectIdentifier, username);
        } catch (Exception ex) {
            throw new ProjectNotFundException(ex.getMessage());
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }

    public ProjectTask findByProjectTaskSequence(String sequence, String backlogId, String username) {
        projectService.findAll(username);

        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(sequence);
        if (projectTask == null) {
            throw new ProjectTaskNotFoundException("Project task not found. Task ID: " + sequence);
        }
        if (!projectTask.getProjectIdentifier().equalsIgnoreCase(backlogId)) {
            throw new ProjectTaskNotFoundException("Wrong project task  Id or project Id.");
        }
        return projectTask;
    }

    public ProjectTask updateProjectTask(ProjectTask updatedTask, String backlogId, String sequence, String username) {
        ProjectTask projectTask = findByProjectTaskSequence(sequence, backlogId, username);
        projectTask = updatedTask;
        return projectTaskRepository.save(updatedTask);
    }

    public void deleteProjectTask(String backlogId, String sequence, String username) {
        projectTaskRepository.delete(findByProjectTaskSequence(sequence, backlogId, username));
    }

    private Backlog getBacklog(String projectIdentifier) {
        return backlogRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
    }

}
