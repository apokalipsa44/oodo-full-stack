package com.mchau.oodo.services;

import com.mchau.oodo.exceptions.ProjectIdException;
import com.mchau.oodo.model.Project;
import com.mchau.oodo.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectServiceImpl {
    private ProjectRepository repository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository repository) {
        this.repository = repository;
    }

    public Project saveOrUpdateProject(Project project){
        try {
            return repository.save(project);
        } catch (Exception ex){
            throw new ProjectIdException("Project ID: "+project.getProjectIdentifier().toUpperCase()+" already taken");
        }
    }
}
