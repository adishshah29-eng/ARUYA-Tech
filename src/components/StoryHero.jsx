import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './StoryHero.css'

gsap.registerPlugin(ScrollTrigger)

// Drop generated images at these exact paths (see story-image-prompts.md) —
// they're picked up automatically, no code changes needed. Until then each
// frame falls back to a warm ink gradient so the section still looks
// intentional rather than broken.
const BEATS = [
  {
    key: 'build-raw',
    chapter: 'Build',
    title: 'Every system starts empty.',
    body: 'Before code, before workflows — just an idea and a blank bench.',
    image: '/story/1-build-raw.jpg',
  },
  {
    key: 'build-assembling',
    chapter: 'Build',
    title: 'We build with intent.',
    body: 'Not templates. Every piece placed on purpose, by hand.',
    image: '/story/2-build-assembling.jpg',
  },
  {
    key: 'automate-connecting',
    chapter: 'Automate',
    title: 'Then we connect it.',
    body: 'The moment manual work becomes a system that runs itself.',
    image: '/story/3-automate-connecting.jpg',
  },
  {
    key: 'automate-running',
    chapter: 'Automate',
    title: 'And let it run.',
    body: 'Workflows move on their own — steady, unattended, reliable.',
    image: '/story/4-automate-running.jpg',
  },
  {
    key: 'scale-expanding',
    chapter: 'Scale',
    title: 'The workshop grows.',
    body: 'More capacity, more reach — without losing what it was built on.',
    image: '/story/5-scale-expanding.jpg',
  },
  {
    key: 'scale-thriving',
    chapter: 'Scale',
    title: 'This is what scale looks like.',
    body: 'Not bigger for its own sake. Built to hold the weight of growth.',
    image: '/story/6-scale-thriving.jpg',
  },
]

export default function StoryHero() {
  const pinRef = useRef(null)
  const frameRefs = useRef([])
  const captionRefs = useRef([])
  const chapterRef = useRef(null)
  const dotRefs = useRef([])
  const progressRef = useRef(null)

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.set(frameRefs.current, { opacity: 0, scale: 1.08 })
      gsap.set(frameRefs.current[0], { opacity: 1 })
      gsap.set(captionRefs.current, { opacity: 0, y: 16 })
      gsap.set(captionRefs.current[0], { opacity: 1, y: 0 })

      const setActive = (idx) => {
        dotRefs.current.forEach((el, i) => el && el.classList.toggle('is-active', i === idx))
        if (chapterRef.current) chapterRef.current.textContent = BEATS[idx].chapter
      }
      setActive(0)

      if (reduceMotion) {
        const last = BEATS.length - 1
        gsap.set(frameRefs.current[last], { opacity: 1, scale: 1 })
        gsap.set(captionRefs.current, { opacity: 0 })
        gsap.set(captionRefs.current[last], { opacity: 1, y: 0 })
        setActive(last)
        return
      }

      frameRefs.current.forEach((f, i) => {
        gsap.to(f, { scale: '+=0.06', duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.35 })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=3400',
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

      const segment = 1 / (BEATS.length - 1)

      BEATS.forEach((_, i) => {
        if (i === BEATS.length - 1) return
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
        {BEATS.map((beat, i) => (
          <div
            key={beat.key}
            className="story-frame"
            ref={(el) => (frameRefs.current[i] = el)}
            style={{
              backgroundImage: `linear-gradient(160deg, var(--ink), var(--ink-800)), url(${beat.image})`,
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
          <div className="story-dots" aria-hidden="true">
            {BEATS.map((beat, i) => (
              <span key={beat.key} className="story-dot" ref={(el) => (dotRefs.current[i] = el)} />
            ))}
          </div>

          <p className="eyebrow">
            Aruya Tech — <span ref={chapterRef}>Build</span>
          </p>

          <div className="story-captions">
            {BEATS.map((beat, i) => (
              <div key={beat.key} className="story-caption" ref={(el) => (captionRefs.current[i] = el)}>
                <h1>{beat.title}</h1>
                <p>{beat.body}</p>
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
