// This file handles ALL communication between frontend and backend
// Instead of writing fetch() everywhere, we centralize it here

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Helper function — every admin request needs the secret in headers
// This is how our auth middleware on the backend verifies the request
const adminHeaders = () => ({
  'Content-Type': 'application/json',
  'x-admin-secret': import.meta.env.VITE_ADMIN_SECRET
})

// ─────────────────────────────────────────
// GET all projects — public, no auth needed
// Called when portfolio loads to show projects
// ─────────────────────────────────────────
export const fetchProjects = async () => {
  const res = await fetch(`${BASE_URL}/api/projects`)
  if (!res.ok) throw new Error('Failed to fetch projects')
  return res.json()
}

// ─────────────────────────────────────────
// POST — add new project (admin only)
// ─────────────────────────────────────────
export const createProject = async (projectData) => {
  const res = await fetch(`${BASE_URL}/api/projects`, {
    method: 'POST',
    headers: adminHeaders(),
    body: JSON.stringify(projectData)
  })
  if (!res.ok) throw new Error('Failed to create project')
  return res.json()
}

// ─────────────────────────────────────────
// PUT — edit existing project (admin only)
// ─────────────────────────────────────────
export const updateProject = async (id, projectData) => {
  const res = await fetch(`${BASE_URL}/api/projects/${id}`, {
    method: 'PUT',
    headers: adminHeaders(),
    body: JSON.stringify(projectData)
  })
  if (!res.ok) throw new Error('Failed to update project')
  return res.json()
}

// ─────────────────────────────────────────
// DELETE — remove project (admin only)
// ─────────────────────────────────────────
export const deleteProject = async (id) => {
  const res = await fetch(`${BASE_URL}/api/projects/${id}`, {
    method: 'DELETE',
    headers: adminHeaders()
  })
  if (!res.ok) throw new Error('Failed to delete project')
  return res.json()
}

// ─────────────────────────────────────────
// PATCH — toggle featured or change status
// We use PUT on the backend so just call updateProject
// ─────────────────────────────────────────
export const toggleFeaturedAPI = async (id, featured) => {
  return updateProject(id, { featured })
}

export const changeStatusAPI = async (id, status) => {
  return updateProject(id, { status })
}