import { useState } from 'react'
import Reveal from './Reveal'
import SplitReveal from './SplitReveal'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Discovery call — ${form.name || 'New enquiry'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:hello@aruyatech.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-head">
          <Reveal as="p" className="eyebrow">Contact</Reveal>
          <SplitReveal text="Let's talk about what you're building" />
          <Reveal as="p" delay={120}>Reach out for project enquiries, collaborations, or service requests — we usually reply within a day.</Reveal>
        </div>

        <div className="contact-grid">
          <Reveal as="form" className="contact-form" onSubmit={handleSubmit}>
            <div className="field-row">
              <label>
                Name
                <input type="text" required value={form.name} onChange={update('name')} placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" required value={form.email} onChange={update('email')} placeholder="you@company.com" />
              </label>
            </div>
            <label>
              What are you building?
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={update('message')}
                placeholder="Tell us about your project, timeline and goals."
              />
            </label>
            <button type="submit" className="btn btn-primary btn-block">
              Book a Discovery Call
            </button>
          </Reveal>

          <Reveal as="div" className="contact-side" delay={120}>
            <div className="contact-card">
              <h3>Office</h3>
              <p>Mumbai, India</p>
              <p>New York, USA</p>
            </div>
            <div className="contact-card">
              <h3>Email</h3>
              <a href="mailto:hello@aruyatech.com">hello@aruyatech.com</a>
            </div>
            <div className="contact-card">
              <h3>Social</h3>
              <div className="social-links">
                <a href="#" aria-label="LinkedIn">LinkedIn</a>
                <a href="#" aria-label="Instagram">Instagram</a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
