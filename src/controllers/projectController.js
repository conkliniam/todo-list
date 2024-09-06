import Project from "../models/project";

const projects = [];

function getSavedProjects() {
  const defaultProject = new Project("Default", 0, "#ef9b9b");
  projects.push(defaultProject);
  return projects;
}

function addProject(name, color) {
  const newProject = new Project(name, projects.length, color);
  projects.push(newProject);
  return newProject;
}

export { getSavedProjects, addProject };
