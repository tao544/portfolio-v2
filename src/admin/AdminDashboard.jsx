import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProjects } from '../context/ProjectsContext'
import ProjectFormModal from './ProjectFormModal'

const statusStyles = {
  'Completed':   'bg-green-900/30 text-green-400 border-green-800',
  'In Progress': 'bg-blue-900/30 text-blue-400 border-blue-800',
  'Planning':    'bg-yellow-900/30 text-yellow-400 border-yellow-800',
}

export default function AdminDashboard() {
  const { logout } = useAuth()
  const { projects, loading, deleteProject, toggleFeatured, changeStatus } = useProjects()
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setModalOpen(true)
  }

  const handleAdd = () => {
    setEditingProject(null)
    setModalOpen(true)
  }

  const handleDelete = (id) => {
    if (deleteConfirm === id) {
      deleteProject(id)
      setDeleteConfirm(null)
    } else {
      setDeleteConfirm(id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Top bar */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold font-mono text-indigo-400">&lt;DevwithTao /&gt;</span>
          <span className="text-gray-500 text-sm hidden sm:block">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            View Site ↗
          </a>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-900/30 hover:bg-red-900/60 text-red-400 border border-red-800 px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Projects', value: projects.length, color: 'text-indigo-400' },
            { label: 'Completed', value: projects.filter(p => p.status === 'Completed').length, color: 'text-green-400' },
            { label: 'In Progress', value: projects.filter(p => p.status === 'In Progress').length, color: 'text-blue-400' },
            { label: 'Featured', value: projects.filter(p => p.featured).length, color: 'text-yellow-400' },
          ].map((s, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-gray-500 text-xs mb-1">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Projects header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            Projects <span className="text-gray-500 font-normal text-base ml-1">({projects.length})</span>
          </h2>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105"
          >
            + Add Project
          </button>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-5xl mb-4">📂</p>
            <p>No projects yet. Click "Add Project" to get started.</p>
          </div>
        ) : (
          /* Projects list */
          <div className="space-y-4">
            {projects.map(project => (
              <div
                key={project._id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-gray-700 transition-colors"
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full sm:w-20 h-32 sm:h-14 object-cover rounded-lg shrink-0"
                  onError={e => {
                    e.target.src = `https://placehold.co/80x56/6366f1/ffffff?text=Img`
                  }}
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white truncate">{project.title}</h3>
                    {project.featured && (
                      <span className="text-xs bg-yellow-900/30 text-yellow-400 border border-yellow-800 px-2 py-0.5 rounded-full">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                    <span>{project.category}</span>
                    <span>·</span>
                    <span>📅 {project.year}</span>
                    <span>·</span>
                    <span className={`px-2 py-0.5 rounded-full border ${statusStyles[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">

                  {/* Status dropdown */}
                  <select
                    value={project.status}
                    onChange={e => changeStatus(project._id, e.target.value)}
                    className="text-xs bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-500"
                  >
                    <option>Planning</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>

                  {/* Toggle featured */}
                  <button
                    onClick={() => toggleFeatured(project._id)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                      project.featured
                        ? 'bg-yellow-900/30 text-yellow-400 border-yellow-800 hover:bg-yellow-900/50'
                        : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-yellow-700 hover:text-yellow-400'
                    }`}
                  >
                    {project.featured ? '⭐ Featured' : '☆ Feature'}
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-xs bg-indigo-900/30 text-indigo-400 border border-indigo-800 hover:bg-indigo-900/60 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(project._id)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                      deleteConfirm === project._id
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-red-900/30 text-red-400 border-red-800 hover:bg-red-900/60'
                    }`}
                  >
                    {deleteConfirm === project._id ? 'Confirm?' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {modalOpen && (
        <ProjectFormModal
          project={editingProject}
          onClose={() => { setModalOpen(false); setEditingProject(null) }}
        />
      )}
    </div>
  )
}