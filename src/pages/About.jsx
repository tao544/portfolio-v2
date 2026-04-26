import { motion } from 'framer-motion'
import { fadeLeft, fadeRight, fadeUp, staggerContainer, pageVariants } from '../animations/variants'

const cards = [
  {
    icon: '💻',
    title: 'Languages',
    desc: 'HTML, CSS, JavaScript, React, Node.js, Django, MongoDB'
  },
  {
    icon: '🎓',
    title: 'Education',
    desc: 'B.Tech in Human Anatomy'
  },
  {
    icon: '📁',
    title: 'Projects',
    desc: 'Built more than 5 projects'
  },
]

export default function About() {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <section className="py-28 px-6 md:px-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-6xl mx-auto">

          {/* Section label */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3"
          >
            About Me
          </motion.p>

          {/* Title */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-3"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Building Meaningful
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 leading-tight">
              Digital Experiences
            </h1>
          </motion.div>

          {/* Divider */}
          <motion.hr
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-16 border-2 border-indigo-500 mb-12"
          />

          {/* Main content */}
          <div className="flex flex-col md:flex-row gap-12 items-start">

            {/* Left — Text + Cards */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm a creative front-end developer passionate about building modern,
                responsive, and user-focused web experiences. My journey began with a
                love for design and evolved into a strong curiosity about how the web
                works — allowing me to combine logic with creativity to bring ideas to life.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                When I'm not coding, I enjoy learning new technologies, improving existing
                projects, and exploring better ways to make the web faster, more accessible,
                and more engaging. I believe in continuous learning, attention to detail,
                and the power of clean, meaningful design.
              </p>

              {/* What drives me */}
              <h2 className="text-xl font-bold text-gray-900 dark:text-white pt-4">
                What Drives Me
              </h2>

              {/* Cards */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {cards.map((card, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="group border-2 border-gray-200 dark:border-gray-700 rounded-xl p-5 text-center hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-100 dark:hover:shadow-indigo-900/20 transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-3xl mb-3">{card.icon}</div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{card.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Image */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex-1 flex justify-center"
            >
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border-2 border-indigo-500 opacity-40" />
                <img
                  src="/images/second-grad.jpg"
                  alt="Taoheed about"
                  className="relative w-72 md:w-96 rounded-2xl object-cover shadow-2xl border-4 border-white dark:border-gray-800"
                />
                <div className="absolute -bottom-4 -right-4 bg-indigo-600 text-white rounded-xl px-4 py-3 text-center shadow-lg">
                  <p className="text-2xl font-bold">2+</p>
                  <p className="text-xs">Years Experience</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </motion.div>
  )
}