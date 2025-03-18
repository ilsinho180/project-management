import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleStartAppProject() {
    setProjectsState((projectsState) => {
      return {
        ...projectsState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddTask(text) {
    const task = {
      text: text,
      projectId: projectsState.selectedProjectId,
      id: Math.random(),
    };

    setProjectsState((projectsState) => {
      return {
        ...projectsState,
        tasks: [...projectsState.tasks, task],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((projectsState) => {
      return {
        ...projectsState,
        tasks: projectsState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((projectsState) => {
      return {
        ...projectsState,
        projects: projectsState.projects.filter(
          (project) => project.id !== projectsState.selectedProjectId
        ),
        selectedProjectId: undefined,
      };
    });
  }

  function handleSelectedProject(id) {
    setProjectsState((projectsState) => {
      return {
        ...projectsState,
        selectedProjectId: id,
      };
    });
  }

  function handleAddAppProject(newProject) {
    const ourNewProject = { ...newProject, id: Math.random() };
    setProjectsState((projectsState) => {
      return {
        ...projectsState,
        selectedProjectId: undefined,
        projects: [...projectsState.projects, ourNewProject],
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((projectsState) => {
      return {
        ...projectsState,
        selectedProjectId: undefined,
      };
    });
  }

  const currentProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={currentProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onSave={handleAddAppProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAppProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAppProject}
        projects={projectsState.projects}
        onSelect={handleSelectedProject}
        selectedId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
