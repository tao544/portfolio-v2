import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import emailjs from 'emailjs-com'
import { pageVariants, fadeUp, fadeLeft, fadeRight } from '../animations/variants'

export default function Contact() {
  const formRef = useRef()
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')
    try {
      await emailjs.sendForm(
        'service_6mer25r',   // 👈 replace with your EmailJS service ID
        'template_ynkt1sc',  // 👈 replace with your EmailJS template ID
        formRef.current,
        'GWuMPM9_Mf4c73VEd'    // 👈 replace with your EmailJS public key
      )
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show" exit="exit">
      <section className="min-h-screen py-28 px-6 md:px-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">

          {/* Label */}
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3"
          >
            Contact
          </motion.p>

          {/* Title */}
          <motion.h1
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3"
          >
            Get In Touch
          </motion.h1>

          {/* Divider */}
          <motion.hr
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="w-16 border-2 border-indigo-500 mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* Left — Info */}
            <motion.div
              variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                I'm always open to discuss exciting projects and new opportunities.
                Let's collaborate and build something great together!
              </p>

              {/* Contact details */}
              <div className="space-y-5">
                {[
                  { icon: '✉️', label: 'Email', value: 'adepojutaoheed23@gmail.com', href: 'mailto:adepojutaoheed23@gmail.com' },
                  { icon: '📞', label: 'Phone', value: '+234 812 432 9127', href: 'tel:+2348124329127' },
                  { icon: '📍', label: 'Location', value: 'Lagos, Nigeria', href: null },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-gray-800 dark:text-gray-200 font-medium hover:text-indigo-600 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-800 dark:text-gray-200 font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Find me on</p>
                <div className="flex gap-3">
                  {[
                    { href: 'https://github.com/tao544', icon: 'fa-brands fa-github', label: 'GitHub' },
                    { href: 'https://www.linkedin.com/in/taoheed-adepoju-72839122b', icon: 'fa-brands fa-linkedin', label: 'LinkedIn' },
                    { href: 'https://wa.me/+2348124329127', icon: 'fa-brands fa-whatsapp', label: 'WhatsApp' },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                      <i className={s.icon} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability card */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">Available for work</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Currently open to freelance projects and full-time opportunities. Response time is usually within 24 hours.
                </p>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Project Inquiry"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-100"
                >
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>

                {/* Status messages */}
                {status === 'success' && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-400 text-sm text-center">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm text-center">
                    ❌ Something went wrong. Please try again or email me directly.
                  </div>
                )}
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </motion.div>
  )
}