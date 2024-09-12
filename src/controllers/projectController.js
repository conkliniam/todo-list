import Project from "../models/project";

const projects = [];

function getSavedProjects() {
  if (projects.length === 0) {
    const defaultProject = new Project("Default", 0, "#ef9b9b");
    projects.push(defaultProject);
  }

  return projects;
}

function getProjectById(projectId) {
  const project = projects.find((project) => project.id === projectId);

  return project;
}

function addProject(name, color) {
  const nextId = getNextId();
  const newProject = new Project(name, nextId, color);
  projects.push(newProject);
  return newProject;
}

function getNextId() {
  if (projects.length > 0) {
    return projects[projects.length - 1].id + 1;
  }

  return 0;
}

export { getSavedProjects, addProject, getProjectById };
