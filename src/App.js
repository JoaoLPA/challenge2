import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => setProjects(response.data));
  }, []);

  async function handleAddRepository() {
    const repo = {
      title: `newly added ${Date.now()}`,
      url: "https://github.com/joaolpa",
      techs: "javascript, html, css",
    };

    const response = await api.post("/repositories", repo);

    const createRepo = response.data;
    console.log(createRepo);
    setProjects([...projects, createRepo]);
  }

  async function handleRemoveRepository(id) {
    const projectIndex = projects.findIndex((project) => project.id === id);
    api.delete(`/repositories/${id}`);
    const projectsUpdate = [...projects];
    projectsUpdate.splice(projectIndex, 1);
    setProjects([...projectsUpdate]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project) => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
