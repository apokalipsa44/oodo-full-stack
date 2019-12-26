package com.mchau.oodo.model;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.ScrollableResults;
import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@Setter
@Getter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String projectName;
    private String projectIdentifier;
    private String description;
    private LocalDate dateStart;
    private LocalDate dateEnd;
    private LocalDate createdAt;
    private LocalDate updatedAt;

    @PrePersist
    void onCreate(){
        this.createdAt=LocalDate.now();
    }

    @PreUpdate
    void onUpdate(){
        this.updatedAt=LocalDate.now();
    }
}
