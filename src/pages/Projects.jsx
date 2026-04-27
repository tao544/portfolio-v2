import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { pageVariants, fadeUp, staggerContainer } from "../animations/variants";
import { useProjects } from "../context/ProjectsContext";

const filters = ["All", "Full Stack", "Frontend"];

const statusStyles = {
  Completed:
    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  "In Progress":
    "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  Planning:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
};

const statusDot = {
  Completed: "bg-green-500",
  "In Progress": "bg-blue-500",
  Planning: "bg-yellow-500",
};

export default function Projects() {
  const { projects, loading } = useProjects();
  const [active, setActive] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <section className="min-h-screen py-28 px-6 md:px-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          {/* Label */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3"
          >
            Projects
          </motion.p>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3"
          >
            Featured Work
          </motion.h1>

          {/* Divider */}
          <motion.hr
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-16 border-2 border-indigo-500 mb-6"
          />

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-gray-500 dark:text-gray-400 max-w-xl mb-10"
          >
            A showcase of my recent projects demonstrating expertise in
            full-stack development, modern frameworks, and creative
            problem-solving.
          </motion.p>

          {/* Status legend */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 mb-6"
          >
            {Object.entries(statusDot).map(([label, dot]) => (
              <div
                key={label}
                className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              >
                <span className={`w-2 h-2 rounded-full ${dot}`} />
                {label}
              </div>
            ))}
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setActive(f);
                  setVisibleCount(6);
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === f
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700"
                }`}
              >
                {f}
                <span className="ml-2 text-xs opacity-70">
                  {f === "All"
                    ? projects.length
                    : projects.filter((p) => p.category === f).length}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Loading state */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Projects Grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence>
                  {visible.map((project) => (
                    <motion.div
                      key={project._id}
                      variants={fadeUp}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="group relative rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300"
                    >
                      {/* Image + overlay */}
                      <div className="relative overflow-hidden h-52">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = `https://placehold.co/600x400/6366f1/ffffff?text=${encodeURIComponent(project.title)}`;
                          }}
                        />

                        {/* Badges top corners */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          {project.featured && (
                            <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full">
                              ⭐ Featured
                            </span>
                          )}
                        </div>
                        <div className="absolute top-3 right-3">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${statusStyles[project.status]}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${statusDot[project.status]}`}
                            />
                            {project.status}
                          </span>
                        </div>

                        {/* Slide-up overlay */}
                        <div className="absolute inset-0 bg-indigo-700/95 flex flex-col justify-end p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                          <p className="text-indigo-200 text-sm mb-4 line-clamp-3">
                            {project.description}
                          </p>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={`self-start flex items-center gap-2 bg-white text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors ${
                              project.liveUrl === "#"
                                ? "opacity-40 pointer-events-none"
                                : ""
                            }`}
                          >
                            🔗 Live Demo
                          </a>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wide">
                            {project.category}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                            📅 {project.year}
                          </span>
                        </div>

                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tech.slice(0, 3).map((t, i) => (
                            <span
                              key={i}
                              className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full font-medium"
                            >
                              {t}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full font-medium">
                              +{project.tech.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="mt-4 md:hidden">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={`flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors w-full ${
                              project.liveUrl === "#"
                                ? "opacity-40 pointer-events-none"
                                : ""
                            }`}
                          >
                            🔗 Live Demo
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Empty state */}
              {!loading && visible.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                  <p className="text-5xl mb-4">🔍</p>
                  <p>No projects found for this filter.</p>
                </div>
              )}

              {/* Load More */}
              {hasMore && (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="text-center mt-12"
                >
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 3)}
                    className="px-8 py-3.5 rounded-xl border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 font-semibold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 hover:scale-105"
                  >
                    Load More Projects
                  </button>
                </motion.div>
              )}
            </>
          )}

          {/* CTA Banner */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-20 bg-indigo-600 dark:bg-indigo-700 rounded-2xl p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Like What You See?
            </h2>
            <p className="text-indigo-200 mb-8 max-w-md mx-auto">
              I'm always excited to work on new projects and collaborate with
              amazing teams. Let's build something incredible together!
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-indigo-600 font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-all duration-300 hover:scale-105"
            >
              Let's Connect →
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
