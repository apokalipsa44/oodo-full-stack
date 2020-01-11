package com.mchau.oodo.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Backlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer PrTaskSequence=0;
    private String projectIdentifier;

    @OneToOne
    private Project project;

    @OneToMany(mappedBy = "backlog", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<ProjectTask> projectTasks;

}
