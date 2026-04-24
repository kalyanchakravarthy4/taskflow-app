package com.example.demo.dto;

import com.example.demo.entity.TaskStatus;

public class TaskDTO {
    private Long id;
    private String title;
    private TaskStatus status;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public TaskStatus getStatus() {
		return status;
	}
	public void setStatus(TaskStatus taskStatus) {
		this.status = taskStatus;
	}

    // getters & setters
}