import './Footer.css'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">ARUYA</span>
          <p>We design and build AI systems, automation workflows and scalable software platforms that help businesses operate faster, smarter and at scale.</p>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <a href="#services">Build</a>
          <a href="#services">Automate</a>
          <a href="#services">Scale</a>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <a href="#process">Our Process</a>
          <a href="#why-us">Why Us</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <a href="#" aria-label="LinkedIn">LinkedIn</a>
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="mailto:hello@aruyatech.com">Email</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {YEAR} Aruya Tech. All rights reserved.</p>
      </div>
    </footer>
  )
}
