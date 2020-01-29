package com.mchau.oodo.services;

import com.mchau.oodo.exceptions.ProjectIdException;
import com.mchau.oodo.exceptions.ProjectNotFundException;
import com.mchau.oodo.model.Backlog;
import com.mchau.oodo.model.Project;
import com.mchau.oodo.model.User;
import com.mchau.oodo.repositories.BacklogRepository;
import com.mchau.oodo.repositories.ProjectRepository;
import com.mchau.oodo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectServiceImpl {
    private ProjectRepository projectRepository;
    private BacklogRepository backlogRepository;
    private UserRepository userRepository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, BacklogRepository backlogRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.backlogRepository = backlogRepository;
        this.userRepository = userRepository;
    }

    public Project saveOrUpdateProject(Project project, String username) {

        try {
            User user = userRepository.findByUsername(username);
            project.setUser(user);
            project.setProjectLeader(user.getUsername().toUpperCase());
            String projectIdentifier = project.getProjectIdentifier().toUpperCase();
            project.setProjectIdentifier(projectIdentifier);
            // to update
            try {
                if (project.getId() != null) {
                    Project projectToUpdate = projectRepository.findByProjectIdentifier(projectIdentifier);
                    projectToUpdate.setId(project.getId());
                    if (projectToUpdate.getId() != null && !projectToUpdate.getProjectLeader().equalsIgnoreCase(username)) {
                        throw new ProjectNotFundException("This is not Your project");
                    }
                    if (projectToUpdate == null) {
                        throw new ProjectNotFundException("Wrong id given, project not found on db.");
                    }
                }
            } catch (Exception ex) {
                throw new ProjectNotFundException(ex.getMessage());
            }

            //to save new proj
            if (project.getId() == null && project.getProjectLeader().equalsIgnoreCase(username)) {
                Backlog backlog = new Backlog();
                backlog.setProject(project);
                project.setBacklog(backlog);
                backlog.setProjectIdentifier(projectIdentifier);
//            backlogRepository.save(backlog); <--ma być bez tego, zapisuje pomimo to.
            }
            if (project.getId() != null && project.getProjectLeader().equalsIgnoreCase(username)) {
                project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
            }
            return projectRepository.save(project);
        } catch (Exception ex) {
            throw new ProjectIdException("Project ID: " + project.getProjectIdentifier().toUpperCase() + " already taken."+ex.getMessage());
        }
    }

    public Project findProjectByIdentifier(String projectIdentifier, String username) {
        Iterable<Project> projects = findAll(username);
        List<Project> projectList = new ArrayList<>();
        projects.forEach(project -> {
            projectList.add(project);
        });

        Project project = projectList.stream().filter(p -> (p.getProjectIdentifier().equalsIgnoreCase(projectIdentifier)))
                .findFirst().orElse(null);

//        Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        if (project == null) {
            throw new ProjectNotFundException("Project ID: " + projectIdentifier.toUpperCase() + " not found");
        }
        return project;
    }

    public Iterable<Project> findAll(String username) {
        try {
            User user = userRepository.findByUsername(username);
            return projectRepository.findAllByUser(user);
        } catch (Exception ex) {
            throw new ProjectNotFundException("can't find projects for user " + username);
        }
    }

    public void deleteProjectByIdentifier(String projectIdentifier, String username) {
        Project project = findProjectByIdentifier(projectIdentifier, username);
        projectRepository.delete(project);
    }

}
