package com.mchau.oodo.repositories;

import com.mchau.oodo.model.ProjectTask;
import org.springframework.data.repository.CrudRepository;



public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long> {

    Iterable<ProjectTask> findByProjectIdentifierOrderByPriority(String backlogId);

    ProjectTask findByProjectSequence(String  projectSequence);
}
