import Reveal from './Reveal'
import './Services.css'

const PILLARS = [
  {
    key: 'build',
    label: 'Build',
    blurb: 'The foundation: sites, apps and the people to ship them.',
    items: [
      { title: 'Website Development', desc: 'Responsive, fast, clean sites that position your brand and convert visitors.' },
      { title: 'App Development', desc: 'Web apps, dashboards and internal tools tailored to your workflows.' },
      { title: 'Engineering Teams', desc: 'Flexible engineering capacity across AI, data and software, on your timeline.' },
    ],
  },
  {
    key: 'automate',
    label: 'Automate',
    blurb: 'Take the manual work out of the systems you already run.',
    items: [
      { title: 'Automation', desc: 'WhatsApp bots, workflow automation and integrations that cut manual work.' },
      { title: 'AI / Machine Learning', desc: 'Forecasting, recommendations and intelligence built on your own data.' },
      { title: 'Data & Analytics', desc: 'Dashboards and reporting so decisions are faster and better-informed.' },
    ],
  },
  {
    key: 'scale',
    label: 'Scale',
    blurb: 'Infrastructure that holds as the business grows.',
    items: [
      { title: 'Cloud Services', desc: 'Deployments, environments and infrastructure on AWS, GCP or Azure.' },
      { title: 'Hosting & Maintenance', desc: 'Secure hosting, updates and monitoring so your stack stays stable.' },
      { title: 'Shopify & E-commerce', desc: 'Store setup, optimisation and automation for D2C and online brands.' },
    ],
  },
]

export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <Reveal as="div" className="section-head">
          <p className="eyebrow">What We Do</p>
          <h2>Everything you need to build, automate and scale</h2>
          <p>Organised the same way we work — not a flat list of nine buzzwords.</p>
        </Reveal>

        <div className="pillars">
          {PILLARS.map((pillar, pi) => (
            <Reveal key={pillar.key} as="article" className={`pillar pillar-${pillar.key}`} delay={pi * 90}>
              <div className="pillar-head">
                <span className="pillar-index">0{pi + 1}</span>
                <h3>{pillar.label}</h3>
              </div>
              <p className="pillar-blurb">{pillar.blurb}</p>
              <ul className="pillar-list">
                {pillar.items.map((item) => (
                  <li key={item.title}>
                    <span className="pillar-item-title">{item.title}</span>
                    <span className="pillar-item-desc">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
