package com.mchau.oodo.services;

import com.mchau.oodo.exceptions.ProjectIdException;
import com.mchau.oodo.exceptions.ProjectNotFundException;
import com.mchau.oodo.model.Backlog;
import com.mchau.oodo.model.Project;
import com.mchau.oodo.repositories.BacklogRepository;
import com.mchau.oodo.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectServiceImpl {
    private ProjectRepository projectRepository;
    private BacklogRepository backlogRepository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, BacklogRepository backlogRepository) {
        this.projectRepository = projectRepository;
        this.backlogRepository = backlogRepository;
    }



    public Project saveOrUpdateProject(Project project){
        String projectIdentifier = project.getProjectIdentifier().toUpperCase();
        project.setProjectIdentifier(projectIdentifier);
        if(project.getId()==null){
            Backlog backlog=new Backlog();
            backlog.setProject(project);
            project.setBacklog(backlog);
            backlog.setProjectIdentifier(projectIdentifier);
//            backlogRepository.save(backlog); <--ma być bez tego, zapisuje pomimo to.
        }

        if (project.getId()!=null){
            project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
        }
        try {
            return projectRepository.save(project);
        } catch (Exception ex){
            throw new ProjectIdException("Project ID: "+ projectIdentifier +" already taken");
        }
    }

    public Project findProjectByIdentifier(String projectIdentifier){
        Project project=projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        if(project==null){
            throw new ProjectNotFundException("Project ID: "+projectIdentifier.toUpperCase()+" not found");
        }
        return project;
    }

    public Iterable<Project> findAll(){
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectIdentifier){
        Project project=findProjectByIdentifier(projectIdentifier);
        projectRepository.delete(project);
    }

}
