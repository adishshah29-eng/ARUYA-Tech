import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './StoryHero.css'

gsap.registerPlugin(ScrollTrigger)

// Drop generated images at these exact paths (see story-image-prompts.md) —
// they're picked up automatically, no code changes needed. Until then each
// frame falls back to a deep navy gradient so the section still looks
// intentional rather than broken.
const BEATS = [
  {
    key: 'discover-alone',
    chapter: 'Discover',
    title: 'It starts with one person.',
    body: 'Before the system exists, someone is just trying to see the whole picture.',
    image: '/story/1-discover-alone.jpg',
  },
  {
    key: 'build-connect',
    chapter: 'Build',
    title: 'Then the first connections form.',
    body: 'Ideas turn into structure — the beginning of something that can scale.',
    image: '/story/3-automate-link.jpg',
  },
  {
    key: 'automate-link',
    chapter: 'Automate',
    title: 'The system starts linking everything together.',
    body: 'Manual steps quietly become a network that runs on its own.',
    image: '/story/2-build-connect.jpg',
  },
  {
    key: 'automate-live',
    chapter: 'Automate',
    title: 'And the data comes alive.',
    body: 'Dashboards update in real time — the system is finally running itself.',
    image: '/story/4-automate-live.jpg',
  },
  {
    key: 'scale-team',
    chapter: 'Scale',
    title: 'The team grows into the system.',
    body: 'More people, more desks, same architecture holding it all together.',
    image: '/story/5-scale-team.jpg',
  },
  {
    key: 'scale-full',
    chapter: 'Scale',
    title: 'This is what full scale looks like.',
    body: 'A business running on a system built to grow with it.',
    image: '/story/6-scale-full.jpg',
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

    // the 6 frames are genuinely camera-locked (same room, same shot), so
    // a straight cross-dissolve reads as real video frames blending into
    // each other — no directional wipe, just layered opacity like footage.
    const ctx = gsap.context(() => {
      gsap.set(frameRefs.current, { opacity: 0, scale: 1.04 })
      gsap.set(frameRefs.current[0], { opacity: 1 })
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
        gsap.set(frameRefs.current, { opacity: 0, scale: 1 })
        gsap.set(frameRefs.current[last], { opacity: 1 })
        gsap.set(captionRefs.current, { opacity: 0 })
        gsap.set(captionRefs.current[last], { opacity: 1 })
        gsap.set(titleRefs.current, { yPercent: 0 })
        setActive(last)
        return
      }

      frameRefs.current.forEach((f, i) => {
        gsap.to(f, { scale: '+=0.04', duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.4 })
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
        tl.to(frameRefs.current[i], { opacity: 0, duration: segment * 0.6, ease: 'sine.inOut' }, start + segment * 0.15)
          .to(frameRefs.current[i + 1], { opacity: 1, duration: segment * 0.6, ease: 'sine.inOut' }, start + segment * 0.15)
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
          <img
            key={beat.key}
            className="story-frame"
            ref={(el) => (frameRefs.current[i] = el)}
            src={beat.image}
            alt=""
            decoding={i === 0 ? 'sync' : 'async'}
            fetchPriority={i === 0 ? 'high' : 'low'}
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
