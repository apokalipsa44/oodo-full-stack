package com.mchau.oodo.services;

import com.mchau.oodo.model.ProjectTask;
import com.mchau.oodo.repositories.BacklogRepository;
import com.mchau.oodo.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class ProjectTaskServiceImpl {
    private BacklogRepository backlogRepository;
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    public ProjectTaskServiceImpl(BacklogRepository backlogRepository, ProjectTaskRepository projectTaskRepository) {
        this.backlogRepository = backlogRepository;
        this.projectTaskRepository = projectTaskRepository;
    }

public ProjectTask addProjectTask(ProjectTask projectTask, String projectIdentifier){
        projectTask.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier.toUpperCase()));
        Integer backlogSequence=projectTask.getBacklog().getPrTaskSequence();
        backlogSequence++;
        projectTask.getBacklog().setPrTaskSequence(backlogSequence);
        projectTask.setProjectSequence(projectIdentifier.toUpperCase()+"-"+backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier.toUpperCase());
        if (projectTask.getPriority()==null||projectTask.getPriority()==0){
            projectTask.setPriority(3);
        }
        if (projectTask.getStatus()==null||projectTask.getStatus()==""){
            projectTask.setStatus("TO_DO");
        }

        return projectTaskRepository.save(projectTask);
}
}
