import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './StoryHero.css'

gsap.registerPlugin(ScrollTrigger)

// Drop generated images at these exact paths (see story-image-prompts.md) —
// they're picked up automatically, no code changes needed. Until then each
// frame falls back to a brand-blue gradient so the section still looks
// intentional rather than broken.
const ACTS = [
  {
    key: 'build',
    step: '01',
    title: 'We build.',
    body: 'Every system starts as raw components — code, data, infrastructure — assembled with intent, not templates.',
    image: '/story/build.jpg',
  },
  {
    key: 'automate',
    step: '02',
    title: 'We automate.',
    body: 'Manual steps become workflows. What was scattered starts moving on its own, connected end to end.',
    image: '/story/automate.jpg',
  },
  {
    key: 'scale',
    step: '03',
    title: 'We scale.',
    body: 'The system grows outward with more capacity and reach, without losing the structure it was built on.',
    image: '/story/scale.jpg',
  },
]

export default function StoryHero() {
  const pinRef = useRef(null)
  const frameRefs = useRef([])
  const captionRefs = useRef([])
  const stepRefs = useRef([])
  const progressRef = useRef(null)

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.set(frameRefs.current, { opacity: 0, scale: 1.08 })
      gsap.set(frameRefs.current[0], { opacity: 1 })
      gsap.set(captionRefs.current, { opacity: 0, y: 16 })
      gsap.set(captionRefs.current[0], { opacity: 1, y: 0 })

      const setActive = (idx) => {
        stepRefs.current.forEach((el, i) => el && el.classList.toggle('is-active', i === idx))
      }
      setActive(0)

      if (reduceMotion) {
        gsap.set(frameRefs.current[ACTS.length - 1], { opacity: 1, scale: 1 })
        gsap.set(captionRefs.current, { opacity: 0 })
        gsap.set(captionRefs.current[ACTS.length - 1], { opacity: 1, y: 0 })
        setActive(ACTS.length - 1)
        return
      }

      // slow continuous drift on every frame, independent of scroll, for a living feel
      frameRefs.current.forEach((f, i) => {
        gsap.to(f, { scale: '+=0.06', duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.4 })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=2200',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleY(${self.progress})`
            }
          },
        },
      })

      const segment = 1 / (ACTS.length - 1)

      ACTS.forEach((_, i) => {
        if (i === ACTS.length - 1) return
        const start = i * segment
        tl.to(frameRefs.current[i], { opacity: 0, duration: segment * 0.7, ease: 'power2.inOut' }, start + segment * 0.15)
          .to(frameRefs.current[i + 1], { opacity: 1, duration: segment * 0.7, ease: 'power2.inOut' }, start + segment * 0.15)
          .to(captionRefs.current[i], { opacity: 0, y: -16, duration: segment * 0.35 }, start + segment * 0.05)
          .call(() => setActive(i + 1), null, start + segment * 0.4)
          .to(captionRefs.current[i + 1], { opacity: 1, y: 0, duration: segment * 0.35 }, start + segment * 0.45)
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="story-hero" ref={pinRef}>
      <div className="story-frames" aria-hidden="true">
        {ACTS.map((act, i) => (
          <div
            key={act.key}
            className="story-frame"
            ref={(el) => (frameRefs.current[i] = el)}
            style={{
              backgroundImage: `linear-gradient(160deg, var(--blue-900), var(--blue-600)), url(${act.image})`,
            }}
          />
        ))}
        <div className="story-scrim" />
      </div>

      <div className="story-progress-track">
        <div className="story-progress-fill" ref={progressRef} />
      </div>

      <div className="container story-inner">
        <div className="story-copy">
          <div className="story-stepper">
            {ACTS.map((act, i) => (
              <div key={act.key} className="story-step" ref={(el) => (stepRefs.current[i] = el)}>
                <span className="story-step-num">{act.step}</span>
                <span className="story-step-label">{act.title.replace('We ', '').replace('.', '')}</span>
              </div>
            ))}
          </div>

          <p className="eyebrow">Aruya Tech</p>

          <div className="story-captions">
            {ACTS.map((act, i) => (
              <div key={act.key} className="story-caption" ref={(el) => (captionRefs.current[i] = el)}>
                <h1>{act.title}</h1>
                <p>{act.body}</p>
              </div>
            ))}
          </div>

          <div className="story-cta">
            <a href="#contact" className="btn btn-primary">
              Book a Discovery Call
            </a>
            <a href="#services" className="btn btn-ghost-light">
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
