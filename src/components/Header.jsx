import { useEffect, useState } from 'react'
import './Header.css'

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('.story-hero')

    const onScroll = () => {
      if (!hero) {
        setScrolled(window.scrollY > 8)
        return
      }
      // the hero stays pinned (visually fixed) for a long internal scroll
      // range, so scrollY alone fires far too early — only flip once the
      // pinned hero has actually scrolled out from under the header.
      setScrolled(hero.getBoundingClientRect().bottom <= 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = () => setOpen(false)

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#top" className="logo" onClick={handleNavClick}>
          <span className="logo-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <path
                d="M16 3 L29 27 L21.5 27 L16 16.5 L10.5 27 L3 27 Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="logo-text">
            ARUYA<span className="logo-sub">TECH</span>
          </span>
        </a>

        <nav className="nav-desktop" aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-primary nav-cta">
          Book a Call
        </a>

        <button
          type="button"
          className={`nav-toggle ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`nav-mobile ${open ? 'is-open' : ''}`}>
        <nav aria-label="Mobile">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={handleNavClick}>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="btn btn-primary btn-block"
          onClick={handleNavClick}
        >
          Book a Discovery Call
        </a>
      </div>
    </header>
  )
}
