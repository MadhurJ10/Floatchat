import { useState } from "react"
import Button from "../components/Button"
import Footer from "../components/Footer"
import { motion } from "framer-motion"

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  const steps = [
    { icon: "🔍", title: "Ask Questions", desc: "Type your ocean data queries in natural language." },
    { icon: "📊", title: "Get Insights", desc: "Receive structured answers, charts, and analysis instantly." },
    { icon: "🌊", title: "Visualize & Act", desc: "Use data-driven insights for research and decision-making." },
  ]

  return (
    <div className="flex flex-col min-h-screen gap12 relative overflow-hidden bg-[#001018] text-white">
      {/* Blobs Background - scattered, not crowded */}
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-25 "></div>
      <div className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] bg-cyan-600 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-1/4 w-[28rem] h-[28rem] bg-blue-400 rounded-full blur-[190px] opacity-20"></div>
      <div className="absolute top-1/2 left-[10%] w-64 h-64 bg-cyan-600 rounded-full blur-[130px] opacity-15"></div>
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-blue-800 rounded-full blur-[160px] opacity-50"></div>
      <div className="absolute top-10 right-1/3 w-40 h-40 bg-cyan-300 rounded-full blur-2xl opacity-10"></div>
      <div className="absolute top-[7%] left-[80%] w-102 h-102 bg-blue-500 rounded-full blur-3xl opacity-25 "></div>
      {/* Blobs Background - scattered & visible */}
<div className="absolute -top-32 -left-20 w-96 h-96 bg-blue-500 rounded-full blur-[190px] opacity-40"></div>
<div className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] bg-cyan-600 rounded-full blur-[180px] opacity-35"></div>
<div className="absolute bottom-0 left-1/4 w-[28rem] h-[28rem] bg-blue-400 rounded-full blur-[180px] opacity-30"></div>
<div className="absolute top-[30%] left-[5%] w-64 h-64 bg-cyan-600 rounded-full blur-[80px] opacity-25"></div>
<div className="absolute bottom-20 right-1/4 w-72 h-72 bg-blue-800 rounded-full blur-[190px] opacity-45"></div>
<div className="absolute top-10 right-1/3 w-40 h-40 bg-cyan-300 rounded-full blur-[160px] opacity-25"></div>

{/* Extra Blobs for balance */}
<div className="absolute top-[70%] left-[5%] w-72 h-72 bg-blue-500 rounded-full blur-[80px] opacity-30"></div>
<div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-sky-400 rounded-full blur-[70px] opacity-35"></div>
<div className="absolute top-[15%] left-[40%] w-60 h-60 bg-blue-400 rounded-full blur-[80px] opacity-30"></div>
<div className="absolute bottom-[30%] right-[40%] w-72 h-72 bg-teal-500 rounded-full blur-[90px] opacity-35"></div>

      {/* Glass Navbar */}
     <nav className="fixed w-[95%] max-w-6xl rounded-2xl z-50 top-4 left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-white/10 text-white px-4 md:px-6 py-3 flex justify-between items-center">
  <div className="text-2xl font-bold flex justify-center items-center gap-2 ">
    <img src="/finallogo.png" alt="FloatChat" className="w-10 h-10" />
     FloatChat
     </div>

  {/* Desktop links */}
  <div className="hidden md:flex items-center gap-10">
    <a href="#features" className="hover:text-cyan-200 transition">Features</a>
    <a href="#about" className="hover:text-cyan-200 transition">About</a>
    <a href="#contact" className="hover:text-cyan-200 transition">Contact</a>
    
    {/* Try Now button */}
    <a 
      href="#try" 
      className="ml-4 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium transition"
    >
      Try Now
    </a>
  </div>

  {/* Mobile menu toggle */}
  <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
    <span className="text-2xl">☰</span>
  </button>
</nav>


      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white/20 backdrop-blur-md flex flex-col items-center py-4 gap-4 text-white z-40">
          <a href="#features" className="hover:text-cyan-200 transition">Features</a>
          <a href="#about" className="hover:text-cyan-200 transition">About</a>
          <a href="#contact" className="hover:text-cyan-200 transition">Contact</a>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[80vh] grid grid-cols-1 md:grid-cols-2 items-center px-8 md:px-16 gap-5 z-10">
        {/* Left Content */}
        <div className="text-center md:text-left z-10">
          <h1 className="text-6xl text-white md:text-7xl font-extrabold mb-6 drop-shadow-lg">
            Float
            <span className="text-cyan-600">Chat</span>
          </h1>
          <p className="text-lg md:text-xl text-amber-50 mb-8 max-w-xl drop-shadow-md">
            Talk to <span className="text-cyan-600 font-mono font-bold">Ocean</span> Data - ask questions, see results, visualize charts.<br />
            Unlock the Ocean Data with AI.
          </p>
          <Button
            onClick={() => (window.location.href = "/chat")}
            className="text-lg px-8 py-3 shadow-lg hover:shadow-2xl hover:bg-cyan-800 transition-all font-semibold bg-cyan-700 rounded-4xl"
          >
            Start your Deep Dive
          </Button>
        </div>

{/* Right Image */}
<div className="flex justify-center md:justify-end z-10">
  <motion.img
    src="https://videos.openai.com/vg-assets/assets%2Ftask_01k59z2hhherysqsac6cc2kev1%2F1758050087_img_0.webp?st=2025-09-17T09%3A33%3A08Z&se=2025-09-23T10%3A33%3A08Z&sks=b&skt=2025-09-17T09%3A33%3A08Z&ske=2025-09-23T10%3A33%3A08Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=3FF4ZyI8wVd3hnOUly6183MkefPXWyuss%2FZJtzxbB5Y%3D&az=oaivgprodscus"
    alt="Ocean Data Illustration"
    className="w-[90%] md:w-[800px] md:h-[700px] drop-shadow-xl rounded-2xl mt-5"
    animate={{ y: [0, -15, 0] }} // float effect
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</div>

      </section>

      {/* Features Section */}
      {/* Features Section */}
<section
  id="features"
  className="relative py-24 flex flex-col justify-center items-center text-center px-6 z-10"
>
  {/* Animated Heading */}
  <motion.h2
    className="text-5xl md:text-6xl font-bold text-cyan-200 mb-20"
    initial={{ opacity: 0, y: -50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    viewport={{ once: false, amount: 0.2 }}
  >
    FEATURES
  </motion.h2>

  {/* Cards Grid */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    {[
      {
        img: "/chat.png",
        title: "Interactive Chat",
        desc: "Ask questions and get instant system replies in an ocean-themed interface.",
      },
      {
        img: "/chart.png",
        title: "Inline Charts",
        desc: "Visualize data directly inside chat using charts rendered from backend responses.",
      },
      {
        img: "/new.png",
        title: "Fast Responses",
        desc: "Optimized query handling ensures real-time results from large ocean datasets.",
      },
      {
        img: "/final.png",
        title: "Secure",
        desc: "Your queries and data are processed with top-notch security and privacy measures.",
      },
    ].map((card, i) => (
      <motion.div
        key={i}
        className="bg-white/10 p-3 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-white/20 flex flex-col items-center text-center overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: "easeInOut",
        }}
        viewport={{ once: false, amount: 0.3 } }
      >
        <img
          src={card.img}
          alt={card.title}
          className="w-full h-40 object-cover rounded-2xl mb-3"
        />
        <div>
          <h3 className="text-xl font-semibold font-mono mb-2">{card.title}</h3>
          <p className="text-sm">{card.desc}</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>
     
{/* How It Works Section */}
<section
  id="how-it-works"
  className="relative py-24 px-6 text-center z-10"
>
  {/* Animated Heading */}
  <motion.h2
    className="text-5xl md:text-6xl font-semibold text-white mb-20"
    initial={{ opacity: 0, y: -50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.4 }} // 👈 animate on every scroll-in
  >
    How It <span className="text-cyan-600 font-mono font-bold">Works</span>
  </motion.h2>

  {/* Steps Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
    {[
      {
        img: "/search.png",
        title: "Query",
        desc: "User asks a question related to ocean data in the chat interface.",
      },
      {
        img: "/setting.png",
        title: "Process",
        desc: "Backend parses data (NetCDF, APIs) and generates relevant insights.",
      },
      {
        img: "/graph.png",
        title: "Visualize",
        desc: "Results are returned as chat replies with text, charts, or maps.",
      },
    ].map((item, i) => (
      <motion.div
        key={i}
        className="bg-white/10 p-3 rounded-2xl shadow-2xl bg-gradient-to-tr from-transparent to-cyan-950 border border-white/5 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: i * 0.2,
          ease: "easeOut",
        }}
        viewport={{ once: false, amount: 0.3 }} // 👈 animate on every scroll-in
      >
        <img
          src={item.img}
          alt={item.title}
          className=" h-20 w-20 mt-2 object-cover rounded-2xl mb-3"
        />
        <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
        <p className="text-sm">{item.desc}</p>
      </motion.div>
    ))}
  </div>
</section>

<section className="relative py-20 px-6 md:px-16 flex justify-center items-center z-10">
  <motion.div
    initial={{ opacity: 0, y: 100, scale: 0.9, zIndex: -1 }}
    whileInView={{ opacity: 1, y: 0, scale: 1, zIndex: 10 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    viewport={{ once: false, amount: 0.3 }}
    className="relative bg-gradient-to-r from-cyan-700/10 via-blue-800/10 to-cyan-600/10 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-6xl text-center p-12 md:p-16 border border-white/10 overflow-hidden"
  >
    {/* Background Accent Blobs */}
    <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500 blur-3xl opacity-20 rounded-full"></div>
    <div className="absolute bottom-0 -right-20 w-80 h-80 bg-blue-700 blur-3xl opacity-30 rounded-full"></div>

    {/* Content */}
    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight font-sans text-white drop-shadow-lg">
      🌊 Dive Deeper Into <span className="text-cyan-400">FloatChat</span>
    </h2>
    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
      Unlock insights from ocean data like never before. Start chatting, exploring, and visualizing today.
    </p>

    {/* CTA Button */}
    <button
      onClick={() => (window.location.href = "/chat")}
      className="px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-cyan-500/40 transition-all bg-cyan-600 hover:bg-cyan-700 text-white tracking-wide"
    >
      Start Exploring Now
    </button>
  </motion.div>
</section>

      <Footer />
    </div>
  )
}
