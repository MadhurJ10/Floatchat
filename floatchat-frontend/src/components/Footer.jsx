import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


export default function Footer() {
  return (
    <footer className="relative bg-[#001018] text-white overflow-hidden mt-24">
      {/* Decorative Blobs */}
      <div className="absolute -top-32 -left-20 w-72 h-72 bg-cyan-600 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-700 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16 flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
        {/* Logo & Description */}
        <div className="flex flex-col gap-4 md:w-1/3">
          <div className="flex items-center gap-2">
            <img src="/finallogo.png" alt="FloatChat" className="w-10 h-10" />
            <span className="text-2xl font-bold text-cyan-400">FloatChat</span>
          </div>
          <p className="text-gray-300 text-sm md:text-base">
            Explore ocean data like never before. Ask questions, get insights, and visualize results.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-4">
            <a href="https://github.com/MadhurJ10" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition text-2xl">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/madhur-bhawsar/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition text-2xl">
              <FaLinkedin />
            </a>
            <a href="https://x.com/0xmadhur" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition text-2xl">
              <FaXTwitter/>
            </a>
          </div>

          <p className="text-gray-500 text-xs mt-4">© 2026 FloatChat. Created by Madhur.</p>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-12 md:gap-24 w-full md:w-auto">
          <div className="flex flex-col gap-2">
            <h4 className="text-cyan-400 font-semibold mb-2">Product</h4>
            <a href="#features" className="text-gray-300 hover:text-cyan-300 transition">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-cyan-300 transition">How It Works</a>
            <a href="#about" className="text-gray-300 hover:text-cyan-300 transition">About</a>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-cyan-400 font-semibold mb-2">Resources</h4>
            <a href="#contact" className="text-gray-300 hover:text-cyan-300 transition">Contact</a>
            <a href="/chat" className="text-gray-300 hover:text-cyan-300 transition">Start Chatting</a>
            <a href="#" className="text-gray-300 hover:text-cyan-300 transition">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#001018] to-transparent"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </footer>
  );
}
