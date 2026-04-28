import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  pageVariants,
} from "../animations/variants";
import { useProjects } from "../context/ProjectsContext";
import { fetchSettings } from "../services/api";

const words = ["Web Developer", "Frontend Developer", "Full Stack Developer"];

const skillCategories = {
  Frontend: [
    { name: "HTML5", percent: 95, icon: "devicon-html5-plain colored" },
    { name: "CSS3", percent: 90, icon: "devicon-css3-plain colored" },
    {
      name: "JavaScript",
      percent: 85,
      icon: "devicon-javascript-plain colored",
    },
    { name: "React.js", percent: 82, icon: "devicon-react-original colored" },
    {
      name: "Tailwind CSS",
      percent: 88,
      icon: "devicon-tailwindcss-plain colored",
    },
    { name: "Bootstrap", percent: 88, icon: "devicon-bootstrap-plain colored" },
    {
      name: "TypeScript",
      percent: 30,
      icon: "devicon-typescript-plain colored",
    },
    { name: "Next.js", percent: 30, icon: "devicon-nextjs-plain" },
  ],
  Backend: [
    { name: "Node.js", percent: 70, icon: "devicon-nodejs-plain colored" },
    { name: "Express.js", percent: 65, icon: "devicon-express-original" },
    { name: "Django", percent: 60, icon: "devicon-django-plain colored" },
    { name: "Python", percent: 65, icon: "devicon-python-plain colored" },
    { name: "REST APIs", percent: 75, icon: "devicon-fastapi-plain colored" },
  ],
  Database: [
    { name: "MongoDB", percent: 68, icon: "devicon-mongodb-plain colored" },
    {
      name: "PostgreSQL",
      percent: 60,
      icon: "devicon-postgresql-plain colored",
    },
    { name: "MySQL", percent: 55, icon: "devicon-mysql-plain colored" },
    { name: "SQLite", percent: 55, icon: "devicon-sqlite-plain colored" },
  ],
  Tools: [
    { name: "Git", percent: 85, icon: "devicon-git-plain colored" },
    { name: "GitHub", percent: 85, icon: "devicon-github-original" },
    { name: "Vercel", percent: 80, icon: "devicon-vercel-original" },
    { name: "Netlify", percent: 80, icon: "devicon-netlify-plain colored" },
    { name: "VS Code", percent: 95, icon: "devicon-vscode-plain colored" },
    { name: "Figma", percent: 70, icon: "devicon-figma-plain colored" },
    { name: "Azure", percent: 25, icon: "devicon-azure-plain colored" },
  ],
  "Soft Skills": [
    { name: "Communication", percent: 90, icon: null, emoji: "🗣️" },
    { name: "Teamwork", percent: 88, icon: null, emoji: "🤝" },
    { name: "Problem Solving", percent: 85, icon: null, emoji: "🧩" },
    { name: "Time Management", percent: 80, icon: null, emoji: "⏰" },
    { name: "Adaptability", percent: 85, icon: null, emoji: "🔄" },
    { name: "Attention to Detail", percent: 88, icon: null, emoji: "🔍" },
    { name: "Self Learning", percent: 92, icon: null, emoji: "📚" },
    { name: "Creativity", percent: 85, icon: null, emoji: "💡" },
  ],
};

const stats = [
  { value: "5+", label: "Projects Built" },
  { value: "10+", label: "Technologies" },
  { value: "2+", label: "Years Experience" },
  { value: "100%", label: "Passion" },
];

function SkillBar({ name, percent, icon, emoji }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon ? (
            <i className={`${icon} text-xl`} />
          ) : (
            <span className="text-xl">{emoji}</span>
          )}
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {name}
          </span>
        </div>
        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
          {percent}%
        </span>
      </div>
      <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              percent >= 80
                ? "linear-gradient(90deg, #6366f1, #818cf8)"
                : percent >= 60
                  ? "linear-gradient(90deg, #6366f1, #a5b4fc)"
                  : "linear-gradient(90deg, #818cf8, #c7d2fe)",
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-400">
        <span>Beginner</span>
        <span>Intermediate</span>
        <span>Expert</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState("Frontend");
  const [cvUrl, setCvUrl] = useState("#");
  const { projects } = useProjects();

  const featuredProjects = projects.filter((p) => p.featured);

  useEffect(() => {
    fetchSettings()
      .then((s) => {
        if (s.cvUrl) setCvUrl(s.cvUrl);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        100,
      );
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        55,
      );
    } else {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex]);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center px-6 md:px-20 pt-28 pb-16 bg-white dark:bg-gray-950">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-6xl mx-auto w-full flex flex-col-reverse md:flex-row items-center gap-12"
        >
          {/* Left */}
          <motion.div variants={fadeLeft} className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for freelance work
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Hi, I'm <span className="text-indigo-600">Taoheed</span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-300 h-10">
              {displayed}
              <span className="inline-block w-0.5 h-7 bg-indigo-500 ml-1 animate-pulse" />
            </h2>

            <p className="text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
              I create beautiful, functional, and user-centered digital
              experiences with a focus on performance and usability.{" "}
              <span className="text-red-500 font-bold">2+</span> years of
              experience building through clean code and thoughtful design.
            </p>

            <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span>📍 Based in Nigeria</span>
              <span>💼 Available Now</span>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/contact"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                → Hire Me
              </Link>
              <a
                href={cvUrl}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 hover:scale-105 ${
                  cvUrl === "#" ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                ⬇ Download CV
              </a>
            </div>

            <hr className="border-gray-200 dark:border-gray-800 w-3/4" />

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Follow me:
              </span>
              {[
                {
                  href: "https://github.com/tao544",
                  icon: "fa-brands fa-github",
                },
                {
                  href: "https://www.linkedin.com/in/taoheed-adepoju-72839122b",
                  icon: "fa-brands fa-linkedin",
                },
                { href: "#", icon: "fa-brands fa-instagram" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            variants={fadeRight}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-indigo-500 blur-2xl opacity-20 scale-105" />
              <img
                src="/images/second-grad.jpg"
                alt="Taoheed"
                className="relative w-72 md:w-96 rounded-2xl object-cover shadow-2xl border-4 border-white dark:border-gray-800"
              />
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl px-4 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                💻 Open to Work
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-12 px-6 md:px-20 bg-indigo-600">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center">
              <p className="text-3xl md:text-4xl font-black text-white mb-1">
                {s.value}
              </p>
              <p className="text-indigo-200 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── SKILLS & EXPERTISE ── */}
      <section className="py-24 px-6 md:px-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3"
          >
            Expertise
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3"
          >
            Skills & Technologies
          </motion.h2>
          <motion.hr
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-16 border-2 border-indigo-500 mb-10"
          />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {Object.keys(skillCategories).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveSkillTab(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeSkillTab === cat
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
          <motion.div
            key={activeSkillTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {activeSkillTab === "Tools"
                ? "Tools & Platforms"
                : activeSkillTab === "Database"
                  ? "Database & Storage"
                  : activeSkillTab === "Soft Skills"
                    ? "Leadership & Soft Skills"
                    : `${activeSkillTab} Development`}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
              {skillCategories[activeSkillTab].map((skill, i) => (
                <SkillBar
                  key={i}
                  name={skill.name}
                  percent={skill.percent}
                  icon={skill.icon}
                  emoji={skill.emoji}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      {featuredProjects.length > 0 && (
        <section className="py-24 px-6 md:px-20 bg-white dark:bg-gray-950">
          <div className="max-w-6xl mx-auto">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3"
            >
              Work
            </motion.p>
            <div className="flex items-end justify-between mb-3">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
              >
                Featured Projects
              </motion.h2>
              <Link
                to="/projects"
                className="hidden md:block text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                View All →
              </Link>
            </div>
            <motion.hr
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="w-16 border-2 border-indigo-500 mb-12"
            />
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredProjects.map((project) => (
                <motion.div
                  key={project._id}
                  variants={fadeUp}
                  className="group relative rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300"
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/600x400/6366f1/ffffff?text=${encodeURIComponent(project.title)}`;
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                          project.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : project.status === "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
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
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wide">
                        {project.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        📅 {project.year}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tech.slice(0, 3).map((t, i) => (
                        <span
                          key={i}
                          className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full font-medium"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 px-3 py-1 rounded-full">
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
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 hover:scale-105"
              >
                View All Projects →
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── HOME CTA ── */}
      <section className="py-20 px-6 md:px-20 bg-gray-50 dark:bg-gray-900">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            I'm always open to new opportunities, collaborations, and exciting
            projects. Don't hesitate to reach out!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
          >
            Get In Touch →
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
}
