import { useState } from 'react'
import { useProjects } from '../context/ProjectsContext'
import { uploadProjectImage } from '../services/api'

const empty = {
  title: '',
  category: 'Frontend',
  year: new Date().getFullYear(),
  status: 'In Progress',
  featured: false,
  description: '',
  image: '',
  tech: '',
  liveUrl: '',
}

export default function ProjectFormModal({ project, onClose }) {
  const { addProject, updateProject } = useProjects()
  const isEditing = !!project

  const [form, setForm] = useState(
    isEditing
      ? { ...project, tech: project.tech.join(', ') }
      : empty
  )
  const [error, setError] = useState('')
  const [imageUploading, setImageUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState(isEditing ? project.image : '')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    if (!allowed.includes(file.type)) {
      setError('Only JPG, PNG or WEBP images allowed')
      return
    }

    setImageUploading(true)
    setError('')

    try {
      const data = await uploadProjectImage(file)
      setForm(prev => ({ ...prev, image: data.imageUrl }))
      setImagePreview(data.imageUrl)
    } catch {
      setError('Image upload failed. Try again.')
    } finally {
      setImageUploading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title || !form.description) {
      setError('Title and description are required.')
      return
    }
    const techArray = form.tech.split(',').map(t => t.trim()).filter(Boolean)
    const payload = { ...form, tech: techArray, year: Number(form.year) }

    if (isEditing) {
      updateProject(project._id, payload)
    } else {
      addProject(payload)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-white font-bold text-lg">
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl transition-colors">
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Title */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title *</label>
            <input
              name="title" value={form.title} onChange={handleChange} required
              placeholder="My Awesome Project"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description *</label>
            <textarea
              name="description" value={form.description} onChange={handleChange} required rows={3}
              placeholder="What does this project do?"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-sm resize-none"
            />
          </div>

          {/* Category + Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <select
                name="category" value={form.category} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500 text-sm"
              >
                <option>Frontend</option>
                <option>Full Stack</option>
                <option>Backend</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Year</label>
              <input
                name="year" type="number" value={form.year} onChange={handleChange}
                min="2020" max="2030"
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Status</label>
            <select
              name="status" value={form.status} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500 text-sm"
            >
              <option>Planning</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Project Image</label>

            {/* Preview */}
            {imagePreview && (
              <div className="mb-3 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-xl border border-gray-700"
                  onError={e => { e.target.src = `https://placehold.co/800x500/6366f1/ffffff?text=Preview` }}
                />
                <button
                  type="button"
                  onClick={() => { setImagePreview(''); setForm(prev => ({ ...prev, image: '' })) }}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Upload button */}
            <label className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
              imageUploading
                ? 'border-indigo-500 bg-indigo-900/20 text-indigo-400'
                : 'border-gray-600 hover:border-indigo-500 text-gray-400 hover:text-indigo-400'
            }`}>
              {imageUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>🖼️ {imagePreview ? 'Replace Image' : 'Upload Image'}</>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
                disabled={imageUploading}
              />
            </label>

            {/* Manual URL fallback */}
            <input
              name="image"
              value={form.image}
              onChange={(e) => {
                handleChange(e)
                setImagePreview(e.target.value)
              }}
              placeholder="Or paste image URL manually"
              className="w-full mt-2 px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          {/* Tech stack */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Tech Stack <span className="text-gray-500">(comma separated)</span>
            </label>
            <input
              name="tech" value={form.tech} onChange={handleChange}
              placeholder="React, Tailwind CSS, Node.js"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          {/* Live URL */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Live URL</label>
            <input
              name="liveUrl" value={form.liveUrl} onChange={handleChange}
              placeholder="https://myproject.com"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          {/* Featured toggle */}
          <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl">
            <input
              type="checkbox" name="featured" id="featured"
              checked={form.featured} onChange={handleChange}
              className="w-4 h-4 accent-indigo-600"
            />
            <label htmlFor="featured" className="text-sm text-gray-300 cursor-pointer">
              ⭐ Mark as Featured project
            </label>
          </div>

          {error && (
            <div className="p-3 bg-red-900/30 border border-red-800 rounded-xl text-red-400 text-sm">
              ❌ {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={imageUploading}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold transition-colors text-sm"
            >
              {isEditing ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}