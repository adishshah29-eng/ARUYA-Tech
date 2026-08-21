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
    key: 'discover-mess',
    chapter: 'Discover',
    title: 'It starts with the mess.',
    body: 'Spreadsheets, sticky notes, disconnected tools — the reality before a real system exists.',
    image: '/story/1-discover-mess.jpg',
  },
  {
    key: 'build-design',
    chapter: 'Build',
    title: 'We design the system.',
    body: 'Wireframes become working software — architecture first, screens second.',
    image: '/story/2-build-design.jpg',
  },
  {
    key: 'automate-connect',
    chapter: 'Automate',
    title: 'Then we wire it together.',
    body: 'Manual steps become workflows — automations that used to be someone’s job.',
    image: '/story/3-automate-connect.jpg',
  },
  {
    key: 'automate-run',
    chapter: 'Automate',
    title: 'And it runs on its own.',
    body: 'Dashboards update live. Nobody’s babysitting a spreadsheet anymore.',
    image: '/story/4-automate-run.jpg',
  },
  {
    key: 'scale-expand',
    chapter: 'Scale',
    title: 'The system grows with you.',
    body: 'More dashboards, more data, more capacity — same architecture underneath.',
    image: '/story/5-scale-expand.jpg',
  },
  {
    key: 'scale-thrive',
    chapter: 'Scale',
    title: 'This is what it looks like at scale.',
    body: 'A business running on systems built to hold real weight.',
    image: '/story/6-scale-thrive.jpg',
  },
]

export default function StoryHero() {
  const pinRef = useRef(null)
  const frameRefs = useRef([])
  const captionRefs = useRef([])
  const titleRefs = useRef([])
  const chapterRef = useRef(null)
  const dotRefs = useRef([])
  const progressRef = useRef(null)

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // a locked-camera "wipe": each incoming frame reveals itself over the
    // static frame beneath it via a diagonal clip-path sweep, rather than
    // cross-dissolving. The camera never moves — only the clipped shape
    // reveals the next frame, which reads as a real scene change instead
    // of a soft fade.
    const HIDDEN_CLIP = 'polygon(120% 0%, 100% 0%, 100% 100%, 100% 100%)'
    const REVEALED_CLIP = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

    const ctx = gsap.context(() => {
      gsap.set(frameRefs.current, { clipPath: HIDDEN_CLIP, scale: 1.05 })
      gsap.set(frameRefs.current[0], { clipPath: REVEALED_CLIP })
      gsap.set(captionRefs.current, { opacity: 0 })
      gsap.set(captionRefs.current[0], { opacity: 1 })
      gsap.set(titleRefs.current, { yPercent: 100 })
      gsap.set(titleRefs.current[0], { yPercent: 0 })

      const setActive = (idx) => {
        dotRefs.current.forEach((el, i) => el && el.classList.toggle('is-active', i === idx))
        if (chapterRef.current) chapterRef.current.textContent = BEATS[idx].chapter
      }
      setActive(0)

      if (reduceMotion) {
        const last = BEATS.length - 1
        gsap.set(frameRefs.current, { clipPath: REVEALED_CLIP, scale: 1 })
        gsap.set(captionRefs.current, { opacity: 0 })
        gsap.set(captionRefs.current[last], { opacity: 1 })
        gsap.set(titleRefs.current, { yPercent: 0 })
        setActive(last)
        return
      }

      frameRefs.current.forEach((f, i) => {
        gsap.to(f, { scale: '+=0.05', duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.35 })
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
        tl.to(frameRefs.current[i + 1], { clipPath: REVEALED_CLIP, duration: segment * 0.55, ease: 'power2.inOut' }, start + segment * 0.15)
          .to(titleRefs.current[i], { yPercent: -100, duration: segment * 0.32, ease: 'power2.in' }, start + segment * 0.05)
          .to(captionRefs.current[i], { opacity: 0, duration: segment * 0.25 }, start + segment * 0.1)
          .call(() => setActive(i + 1), null, start + segment * 0.4)
          .set(captionRefs.current[i + 1], { opacity: 1 }, start + segment * 0.4)
          .set(titleRefs.current[i + 1], { yPercent: 100 }, start + segment * 0.4)
          .to(titleRefs.current[i + 1], { yPercent: 0, duration: segment * 0.4, ease: 'power3.out' }, start + segment * 0.42)
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
              backgroundImage: `url(${beat.image}), linear-gradient(160deg, var(--ink), var(--ink-800))`,
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
                <div className="story-title-mask">
                  <h1 ref={(el) => (titleRefs.current[i] = el)}>{beat.title}</h1>
                </div>
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
