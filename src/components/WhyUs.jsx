import Reveal from './Reveal'
import SplitReveal from './SplitReveal'
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
          <div className="section-head">
            <Reveal as="p" className="eyebrow">Who We Work With</Reveal>
            <SplitReveal text="Businesses that need real engineering capacity" />
            <Reveal as="p" delay={120}>Scalable systems, automation and the right team to grow — whatever stage you're at.</Reveal>
          </div>
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
          <div className="section-head">
            <Reveal as="p" className="eyebrow">Why Work With Us</Reveal>
            <SplitReveal text="Deep technical skill, business-first mindset" />
          </div>
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
