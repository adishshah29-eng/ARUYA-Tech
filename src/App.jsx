import Header from './components/Header'
import StoryHero from './components/StoryHero'
import Services from './components/Services'
import Process from './components/Process'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main id="top">
        <StoryHero />
        <Services />
        <Process />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
