import { motion } from 'framer-motion'
import { pageVariants, fadeUp, staggerContainer } from '../animations/variants'

const services = [
  {
    icon: '🌐',
    title: 'Full Stack Development',
    description: 'Building complete web applications from frontend to backend with modern technologies and best practices.',
    features: ['React & Vite', 'Node.js & Express', 'MongoDB & PostgreSQL', 'REST APIs', 'Django & Python', 'Authentication & Security'],
  },
  {
    icon: '🖥️',
    title: 'Frontend Development',
    description: 'Crafting beautiful, responsive, and performant user interfaces with pixel-perfect attention to detail.',
    features: ['React.js', 'Tailwind CSS', 'Framer Motion', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Cross-browser Compatibility'],
  },
  {
    icon: '🎨',
    title: 'Creative Direction',
    description: 'Designing visually compelling experiences that combine aesthetics with functionality and user focus.',
    features: ['UI/UX Design', 'Wireframing', 'Design Systems', 'Brand Identity', 'Figma', 'Responsive Design'],
  },
  {
    icon: '📣',
    title: 'Digital Marketing',
    description: 'Creating effective digital strategies to increase brand visibility and engage target audiences online.',
    features: ['SEO Optimization', 'Social Media Strategy', 'Content Marketing', 'Analytics & Reporting'],
  },
]

export default function Services() {
  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show" exit="exit">
      <section className="min-h-screen py-28 px-6 md:px-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">

          {/* Label */}
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3"
          >
            Services
          </motion.p>

          {/* Title */}
          <motion.h1
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3"
          >
            What I Offer
          </motion.h1>

          {/* Divider */}
          <motion.hr
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="w-16 border-2 border-indigo-500 mb-12"
          />

          {/* Service Cards */}
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {services.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border border-gray-100 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 overflow-hidden"
              >
                {/* Hover background sweep */}
                <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-2xl" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-5xl mb-6">{s.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-white mb-3 transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-100 text-sm mb-6 transition-colors duration-300">
                    {s.description}
                  </p>
                  <ul className="space-y-2">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:bg-white transition-colors duration-300" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Process Section */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center">
              My Work Process
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Discovery', desc: 'Understanding your goals, audience, and project requirements.' },
                { step: '02', title: 'Planning', desc: 'Creating a clear roadmap, wireframes, and technical approach.' },
                { step: '03', title: 'Development', desc: 'Building the product with clean, maintainable code.' },
                { step: '04', title: 'Delivery', desc: 'Testing, launching, and supporting your product post-launch.' },
              ].map((p, i) => (
                <div key={i} className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-indigo-500 transition-all duration-300">
                  <div className="text-4xl font-black text-indigo-100 dark:text-indigo-900 mb-3">
                    {p.step}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{p.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </motion.div>
  )
}