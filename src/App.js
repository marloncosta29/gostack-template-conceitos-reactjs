import React, { useState } from "react";
import { useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const repo = {
      "url": "https://github.com/Rocketseat/umbriel",
      "title": `Repo Numero ${Date.now()}`,
      "techs": ["Node", "Express", "TypeScript"]
    }
    const repository = await api.post('repositories', repo)
    setRepositories([...repositories, repository.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const index = repositories.findIndex(r => r.id === id)
    repositories.splice(index, 1)
    setRepositories([...repositories])
  }

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo => {
            return (
              <li key={repo.id}>
                {repo.title}
                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
            )
          })
        }


        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
