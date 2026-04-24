package com.example.demo.dto;

import com.example.demo.entity.TaskStatus;

public class TaskRequest {
    private String title;
    private TaskStatus status;
    private Long projectId;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public TaskStatus getStatus() { return status; }
    public void setStatus(TaskStatus status) { this.status = status; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }
}