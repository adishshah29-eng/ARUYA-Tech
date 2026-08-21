import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './StoryHero.css'

gsap.registerPlugin(ScrollTrigger)

const CX = 220
const CY = 220
const CORE_COUNT = 8
const TAU = Math.PI / 180

function polar(radius, angleDeg) {
  const rad = angleDeg * TAU
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) }
}

const CORE_ANGLES = Array.from({ length: CORE_COUNT }, (_, i) => i * (360 / CORE_COUNT))

// deterministic jitter so the "Build" state reads as scattered, unassembled
const BUILD_JITTER_R = [58, 96, 70, 110, 62, 88, 100, 74]
const BUILD_JITTER_A = [8, -14, 20, -6, -22, 12, -10, 18]

const BUILD_POS = CORE_ANGLES.map((a, i) => polar(BUILD_JITTER_R[i], a + BUILD_JITTER_A[i]))
const AUTOMATE_POS = CORE_ANGLES.map((a) => polar(112, a))
const SCALE_POS = CORE_ANGLES.map((a) => polar(172, a))

// 6 outer nodes emerge from alternating core nodes once the system "scales"
const OUTER_PAIR = [0, 1, 3, 4, 5, 7]
const OUTER_POS = OUTER_PAIR.map((coreIdx) => {
  const a = CORE_ANGLES[coreIdx] + 13
  return polar(248, a)
})

const ACTS = [
  {
    key: 'build',
    step: '01',
    title: 'We build.',
    body: 'Every system starts as raw components — code, data, infrastructure — assembled with intent, not templates.',
  },
  {
    key: 'automate',
    step: '02',
    title: 'We automate.',
    body: 'Manual steps become workflows. What was scattered starts moving on its own, connected end to end.',
  },
  {
    key: 'scale',
    step: '03',
    title: 'We scale.',
    body: 'The system grows outward with more capacity and reach, without losing the structure it was built on.',
  },
]

export default function StoryHero() {
  const pinRef = useRef(null)
  const hubRef = useRef(null)
  const hubRingRef = useRef(null)
  const coreRefs = useRef([])
  const spokeRefs = useRef([])
  const outerRefs = useRef([])
  const outerLineRefs = useRef([])
  const captionRefs = useRef([])
  const stepRefs = useRef([])
  const progressRef = useRef(null)
  const cornerRefs = useRef([])

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.set(coreRefs.current, {
        attr: { cx: (i) => BUILD_POS[i].x, cy: (i) => BUILD_POS[i].y },
      })
      gsap.set(spokeRefs.current, {
        attr: {
          x1: CX,
          y1: CY,
          x2: (i) => BUILD_POS[i].x,
          y2: (i) => BUILD_POS[i].y,
        },
        opacity: 0,
      })
      gsap.set(outerRefs.current, {
        attr: {
          cx: (i) => SCALE_POS[OUTER_PAIR[i]].x,
          cy: (i) => SCALE_POS[OUTER_PAIR[i]].y,
        },
        opacity: 0,
      })
      gsap.set(outerLineRefs.current, {
        attr: {
          x1: (i) => SCALE_POS[OUTER_PAIR[i]].x,
          y1: (i) => SCALE_POS[OUTER_PAIR[i]].y,
          x2: (i) => SCALE_POS[OUTER_PAIR[i]].x,
          y2: (i) => SCALE_POS[OUTER_PAIR[i]].y,
        },
        opacity: 0,
      })
      gsap.set(hubRef.current, { attr: { r: 5 }, opacity: 0.3 })
      gsap.set(captionRefs.current, { opacity: 0, y: 16 })
      gsap.set(captionRefs.current[0], { opacity: 1, y: 0 })
      gsap.set(stepRefs.current[0], { className: '+=is-active' })

      gsap.to(hubRingRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 1.8,
        repeat: -1,
        ease: 'power1.out',
        transformOrigin: '50% 50%',
      })

      if (reduceMotion) {
        gsap.set(coreRefs.current, {
          attr: { cx: (i) => SCALE_POS[i].x, cy: (i) => SCALE_POS[i].y },
        })
        gsap.set(spokeRefs.current, {
          attr: { x2: (i) => SCALE_POS[i].x, y2: (i) => SCALE_POS[i].y },
          opacity: 0.5,
        })
        gsap.set(outerRefs.current, { opacity: 1 })
        gsap.set(outerLineRefs.current, {
          attr: { x2: (i) => OUTER_POS[i].x, y2: (i) => OUTER_POS[i].y },
          opacity: 0.35,
        })
        gsap.set(hubRef.current, { attr: { r: 14 }, opacity: 1 })
        gsap.set(captionRefs.current, { opacity: 0 })
        gsap.set(captionRefs.current[2], { opacity: 1, y: 0 })
        gsap.set(stepRefs.current, { className: '-=is-active' })
        gsap.set(stepRefs.current[2], { className: '+=is-active' })
        return
      }

      const setActive = (idx) => {
        stepRefs.current.forEach((el, i) => el && el.classList.toggle('is-active', i === idx))
      }

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

      cornerRefs.current.forEach((c, i) => {
        tl.to(c, { opacity: 0, duration: 0.08 }, 0.04 + i * 0.01)
      })

      tl.to(
        coreRefs.current,
        {
          attr: { cx: (i) => AUTOMATE_POS[i].x, cy: (i) => AUTOMATE_POS[i].y },
          duration: 0.4,
          ease: 'power2.inOut',
        },
        0,
      )
        .to(
          spokeRefs.current,
          {
            attr: { x2: (i) => AUTOMATE_POS[i].x, y2: (i) => AUTOMATE_POS[i].y },
            opacity: 0.45,
            duration: 0.4,
            ease: 'power2.inOut',
          },
          0,
        )
        .to(hubRef.current, { attr: { r: 13 }, opacity: 1, duration: 0.35 }, 0.05)
        .to(captionRefs.current[0], { opacity: 0, y: -16, duration: 0.15 }, 0.1)
        .call(() => setActive(1), null, 0.3)
        .to(captionRefs.current[1], { opacity: 1, y: 0, duration: 0.18 }, 0.32)

        // ---- Automate -> Scale ----
        .to(
          coreRefs.current,
          {
            attr: { cx: (i) => SCALE_POS[i].x, cy: (i) => SCALE_POS[i].y },
            duration: 0.45,
            ease: 'power2.inOut',
          },
          0.5,
        )
        .to(
          spokeRefs.current,
          {
            attr: { x2: (i) => SCALE_POS[i].x, y2: (i) => SCALE_POS[i].y },
            opacity: 0.3,
            duration: 0.45,
            ease: 'power2.inOut',
          },
          0.5,
        )
        .to(
          outerRefs.current,
          {
            attr: { cx: (i) => OUTER_POS[i].x, cy: (i) => OUTER_POS[i].y },
            opacity: 1,
            duration: 0.4,
            stagger: 0.03,
            ease: 'back.out(1.4)',
          },
          0.62,
        )
        .to(
          outerLineRefs.current,
          {
            attr: { x2: (i) => OUTER_POS[i].x, y2: (i) => OUTER_POS[i].y },
            opacity: 0.3,
            duration: 0.4,
            stagger: 0.03,
            ease: 'power2.out',
          },
          0.62,
        )
        .to(captionRefs.current[1], { opacity: 0, y: -16, duration: 0.15 }, 0.58)
        .call(() => setActive(2), null, 0.75)
        .to(captionRefs.current[2], { opacity: 1, y: 0, duration: 0.18 }, 0.78)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="story-hero" ref={pinRef}>
      <div className="container story-inner">
        <div className="story-visual">
          <div className="story-progress-track">
            <div className="story-progress-fill" ref={progressRef} />
          </div>
          <svg viewBox="0 0 440 440" className="story-svg" role="img" aria-label="Aruya's build, automate, scale system, animated">
            {[
              [190, 190, 20, 20],
              [250, 190, -20, 20],
              [190, 250, 20, -20],
              [250, 250, -20, -20],
            ].map(([x, y, dx, dy], i) => (
              <path
                key={i}
                ref={(el) => (cornerRefs.current[i] = el)}
                d={`M ${x} ${y} l ${dx} 0 M ${x} ${y} l 0 ${dy}`}
                stroke="var(--blue-500)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.5"
                fill="none"
              />
            ))}

            {OUTER_PAIR.map((_, i) => (
              <line
                key={`ol-${i}`}
                ref={(el) => (outerLineRefs.current[i] = el)}
                stroke="var(--blue-500)"
                strokeWidth="1.5"
              />
            ))}
            {Array.from({ length: CORE_COUNT }).map((_, i) => (
              <line
                key={`sp-${i}`}
                ref={(el) => (spokeRefs.current[i] = el)}
                stroke="var(--blue-600)"
                strokeWidth="1.5"
              />
            ))}

            {OUTER_PAIR.map((_, i) => (
              <circle
                key={`on-${i}`}
                ref={(el) => (outerRefs.current[i] = el)}
                r="6"
                fill="var(--blue-100)"
                stroke="var(--blue-500)"
                strokeWidth="1.5"
              />
            ))}
            {Array.from({ length: CORE_COUNT }).map((_, i) => (
              <circle
                key={`c-${i}`}
                ref={(el) => (coreRefs.current[i] = el)}
                r="9"
                fill="var(--white)"
                stroke="var(--blue-600)"
                strokeWidth="2"
              />
            ))}

            <circle ref={hubRingRef} cx={CX} cy={CY} r="14" fill="none" stroke="var(--blue-500)" strokeWidth="1.5" />
            <circle ref={hubRef} cx={CX} cy={CY} r="5" fill="var(--blue-600)" />
          </svg>
        </div>

        <div className="story-copy">
          <div className="story-stepper" aria-hidden="true">
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
            <a href="#services" className="btn btn-ghost">
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
