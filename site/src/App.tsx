import { Navbar } from './sections/Navbar'
import { Hero } from './sections/Hero'
import { Features } from './sections/Features'
import { Quickstart } from './sections/Quickstart'
import { Commands } from './sections/Commands'
import { Compare } from './sections/Compare'
import { Cta } from './sections/Cta'
import { Footer } from './sections/Footer'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-sky-500/30">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Quickstart />
        <Commands />
        <Compare />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}

export default App
