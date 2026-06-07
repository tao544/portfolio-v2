import { Link } from 'react-router-dom'

const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/devwithlogo.png"
              alt="DevwithTao"
              className="h-10 w-auto brightness-0 invert"
            />
          </Link>

          {/* Links */}
          <ul className="flex flex-wrap justify-center gap-6">
            {links.map(link => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Socials */}
          <div className="flex gap-4">
            {[
              { href: 'https://github.com/tao544', icon: 'fa-brands fa-github' },
              { href: 'https://www.linkedin.com/in/taoheed-adepoju-72839122b', icon: 'fa-brands fa-linkedin' },
              { href: 'https://wa.me/+2348124329127', icon: 'fa-brands fa-whatsapp' },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all duration-300"
              >
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-800 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} DevwithTao. All Rights Reserved.</p>
          <p>Built with ❤️ using React + Tailwind CSS</p>
        </div>

      </div>
    </footer>
  )
}