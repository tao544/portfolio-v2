import { createContext, useContext, useState, useEffect } from 'react'
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  toggleFeaturedAPI,
  changeStatusAPI
} from '../services/api'

const ProjectsContext = createContext()

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load projects from backend when app starts
  // This replaces reading from localStorage
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true)
        const data = await fetchProjects()
        setProjects(data)
      } catch (err) {
        console.error('Failed to load projects:', err)
        setError('Failed to load projects')
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  // ADD project — sends to backend, then updates local state
  const addProject = async (projectData) => {
    try {
      const newProject = await createProject(projectData)
      setProjects(prev => [newProject, ...prev])
    } catch (err) {
      console.error('Failed to add project:', err)
    }
  }

  // UPDATE project — sends to backend, then updates local state
  const updateProjectCtx = async (id, projectData) => {
    try {
      const updated = await updateProject(id, projectData)
      setProjects(prev =>
        prev.map(p => p._id === id ? updated : p)
      )
    } catch (err) {
      console.error('Failed to update project:', err)
    }
  }

  // DELETE project — sends to backend, then removes from local state
  const deleteProjectCtx = async (id) => {
    try {
      await deleteProject(id)
      setProjects(prev => prev.filter(p => p._id !== id))
    } catch (err) {
      console.error('Failed to delete project:', err)
    }
  }

  // TOGGLE FEATURED
  const toggleFeatured = async (id) => {
    const project = projects.find(p => p._id === id)
    if (!project) return
    try {
      const updated = await toggleFeaturedAPI(id, !project.featured)
      setProjects(prev =>
        prev.map(p => p._id === id ? updated : p)
      )
    } catch (err) {
      console.error('Failed to toggle featured:', err)
    }
  }

  // CHANGE STATUS
  const changeStatus = async (id, status) => {
    try {
      const updated = await changeStatusAPI(id, status)
      setProjects(prev =>
        prev.map(p => p._id === id ? updated : p)
      )
    } catch (err) {
      console.error('Failed to change status:', err)
    }
  }

  return (
    <ProjectsContext.Provider value={{
      projects,
      loading,
      error,
      addProject,
      updateProject: updateProjectCtx,
      deleteProject: deleteProjectCtx,
      toggleFeatured,
      changeStatus
    }}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  return useContext(ProjectsContext)
}