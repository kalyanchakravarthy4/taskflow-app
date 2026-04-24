package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.ProjectDTO;
import com.example.demo.entity.Project;
import com.example.demo.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000") // for frontend
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // 🔹 GET ALL
    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjectsEntity();
    }

    // 🔥 PAGINATED API (NEW)
    @GetMapping("/paged")
    public Page<ProjectDTO> getProjectsPaged(
            @RequestParam int page,
            @RequestParam int size) {

        return projectService.getProjectsPaged(page, size);
    }

    // 🔹 CREATE
    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.saveProject(project);
    }

    // 🔹 DELETE (ADMIN ONLY)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return "Project deleted successfully";
    }

    // 🔹 UPDATE
    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id,
                                @RequestBody Project updatedProject) {
        return projectService.updateProject(id, updatedProject);
    }
}