package com.mchau.oodo.repositories;

import com.mchau.oodo.model.Project;
import com.mchau.oodo.model.User;
import org.springframework.data.repository.CrudRepository;

import java.security.Principal;

public interface ProjectRepository extends CrudRepository<Project, Long> {
    Project findByProjectIdentifier(String projectIdentifier);

    Iterable<Project> findAllByProjectLeader(String username);
}
