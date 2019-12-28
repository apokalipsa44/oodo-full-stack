package com.mchau.oodo.services;

import com.mchau.oodo.exceptions.ProjectIdException;
import com.mchau.oodo.exceptions.ProjectNotFundException;
import com.mchau.oodo.model.Project;
import com.mchau.oodo.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;

@Service
public class ProjectServiceImpl {
    private ProjectRepository repository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository repository) {
        this.repository = repository;
    }

    public Project saveOrUpdateProject(Project project){
        project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
        try {
            return repository.save(project);
        } catch (Exception ex){
            throw new ProjectIdException("Project ID: "+project.getProjectIdentifier().toUpperCase()+" already taken");
        }
    }

    public Project findProjectByIdentifier(String projectIdentifier){
        Project project=repository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        if(project==null){
            throw new ProjectNotFundException("Project ID: "+projectIdentifier.toUpperCase()+" not found");
        }
        return project;
    }

    public Iterable<Project> findAll(){
        return repository.findAll();
    }

    public void deleteProjectByIdentifier(String projectIdentifier){
        Project project=findProjectByIdentifier(projectIdentifier);
        repository.delete(project);
    }
}
