import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SplitReveal({ as: Tag = 'h2', text, className = '', delay = 0, ...rest }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll('.split-word-inner')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      gsap.set(words, { yPercent: 0, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 115, opacity: 0, rotate: 4 })
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.8,
        delay: delay / 1000,
        stagger: 0.032,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [text, delay])

  const words = text.split(' ')

  return (
    <Tag className={`split-reveal ${className}`} ref={ref} {...rest}>
      {words.map((w, i) => (
        <span className="split-word" key={i}>
          <span className="split-word-inner">{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
