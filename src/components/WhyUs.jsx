import Reveal from './Reveal'
import './WhyUs.css'

const AUDIENCE = ['Startups', 'SMEs', 'D2C Brands', 'Consultants', 'Enterprises']

const REASONS = [
  { title: 'Systems designed for impact', desc: 'We build solutions aligned with real business outcomes, not just features or visuals.' },
  { title: 'Automation-first approach', desc: 'We prioritise automation to reduce manual work, improve efficiency and streamline operations.' },
  { title: 'Data-driven decisions', desc: "We don't just build screens — we connect them to data, metrics and real business outcomes." },
  { title: 'Fast, focused delivery', desc: 'Clear scopes, tight feedback loops and timelines you can actually plan around.' },
  { title: 'End-to-end execution', desc: 'From idea to launch and ongoing support, we stay hands-on instead of just advising.' },
  { title: 'Founder-led quality', desc: 'You work directly with someone who understands both tech and business, not a rotating bench.' },
]

export default function WhyUs() {
  return (
    <>
      <section id="who-we-work-with" className="section audience">
        <div className="container">
          <Reveal as="div" className="section-head">
            <p className="eyebrow">Who We Work With</p>
            <h2>Businesses that need real engineering capacity</h2>
            <p>Scalable systems, automation and the right team to grow — whatever stage you're at.</p>
          </Reveal>
          <div className="audience-pills">
            {AUDIENCE.map((a, i) => (
              <Reveal as="span" key={a} className="audience-pill" delay={i * 60}>
                {a}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="section why-us">
        <div className="container">
          <Reveal as="div" className="section-head">
            <p className="eyebrow">Why Work With Us</p>
            <h2>Deep technical skill, business-first mindset</h2>
          </Reveal>
          <div className="reasons-grid">
            {REASONS.map((r, i) => (
              <Reveal as="div" key={r.title} className="reason-card" delay={(i % 3) * 90}>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
