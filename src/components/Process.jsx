import Reveal from './Reveal'
import SplitReveal from './SplitReveal'
import './Process.css'

const STEPS = [
  { n: '01', title: 'Discover', desc: 'We understand your business, users, goals and constraints before writing a line of code.' },
  { n: '02', title: 'Strategy', desc: 'We design the architecture, roadmap and execution plan the build will follow.' },
  { n: '03', title: 'Build', desc: 'We develop, integrate and test — in tight, reviewable cycles, not one big reveal.' },
  { n: '04', title: 'Launch & Support', desc: 'We deploy, monitor and scale with you, so launch day is the start, not the finish.' },
]

export default function Process() {
  return (
    <section id="process" className="section process">
      <div className="container">
        <div className="section-head">
          <Reveal as="p" className="eyebrow">How We Work</Reveal>
          <SplitReveal text="A clear, structured journey from idea to launch" />
        </div>

        <ol className="process-line">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.n} className="process-step" delay={i * 90}>
              <div className="process-node">
                <span className="process-num">{step.n}</span>
              </div>
              <div className="process-body">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
