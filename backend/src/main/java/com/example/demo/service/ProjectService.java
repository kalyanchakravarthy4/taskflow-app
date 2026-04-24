package com.example.demo.service;

import com.example.demo.dto.ProjectDTO;
import com.example.demo.dto.TaskDTO;
import com.example.demo.entity.Project;
import com.example.demo.repository.ProjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    // 🔹 GET ALL PROJECTS (DTO)
    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }
    
    public List<Project> getAllProjectsEntity() {
        return projectRepository.findAll();
    }

    // 🔥 PAGINATION (NEW STEP)
    public Page<ProjectDTO> getProjectsPaged(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return projectRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    // 🔹 SAVE PROJECT
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    // 🔹 DELETE PROJECT
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    // 🔹 UPDATE PROJECT
    public Project updateProject(Long id, Project updatedProject) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        project.setName(updatedProject.getName());

        return projectRepository.save(project);
    }

    // 🔹 CONVERT ENTITY → DTO
    private ProjectDTO convertToDTO(Project project) {

        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setName(project.getName());

        List<TaskDTO> taskDTOs =
                project.getTasks() == null ? List.of() :
                project.getTasks().stream().map(task -> {
                    TaskDTO t = new TaskDTO();
                    t.setId(task.getId());
                    t.setTitle(task.getTitle());
                    t.setStatus(task.getStatus());
                    return t;
                }).toList();

        dto.setTasks(taskDTOs);

        return dto;
    }
}