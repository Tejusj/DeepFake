
import Navbar from "./components/Navbar.jsx";

function App() {

  return (
      <div className="bg-gray-900 text-white">
          <Navbar />

          <main>


              {/* These sections are targets for the nav links */}
              <section id="features" className="min-h-screen bg-gray-800"></section>
              <section id="about" className="min-h-screen"></section>
              <section id="contact" className="min-h-screen bg-gray-800"></section>
          </main>
      </div>
  )
}

export default App
