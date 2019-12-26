package com.mchau.oodo.repositories;

import com.mchau.oodo.model.Project;
import org.springframework.data.repository.CrudRepository;

public interface ProjectRepository extends CrudRepository<Project, Long> {
}
