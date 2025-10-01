import { useState, useEffect, useRef, useContext } from "react";
import LeafletMap from "../components/LeafletMap";
import { MapDataContext } from "../context/MapDataProvider"; // Make sure you have this

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const [history, setHistory] = useState(["ehkjdsbhds"]);
  const [activeChat, setActiveChat] = useState(null);

  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Context for map data
  const { data, setData } = useContext(MapDataContext);

  // Scroll to bottom when messages or map change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showMap]);

  // Run once on page load: add initial bot message
  useEffect(() => {
    setMessages([{ sender: "bot", text: "Hello, how can I help you today? 🌐" }]);
  }, []);

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    handleSubmit(input); // <-- call handleSubmit with user input
    setInput("");
  };

  const startNewChat = () => {
    if (messages.length > 0) {
      setHistory((prev) => [
        ...prev,
        { id: Date.now(), title: messages[0]?.text || "New Chat", messages },
      ]);
    }
    setMessages([]);
    setActiveChat(null);
  };

  // --- New handleSubmit function ---
  const handleSubmit = async (query) => {
    try {
      setIsStreaming(true); // start loader
      const res = await fetch("http://localhost:3000/c/chatttt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: query }),
      });

      if (!res.ok) throw new Error("Failed to send data");

      const result = await res.json();
      console.log(result.msg);

      // 👇 Add the bot's message from response
      if (result.msg) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: result.msg },
        ]);
      }

      console.log(result.data);
      // 👇 Update map data if needed
      if (result.data) {
        setShowMap(true);
        setData(result.data);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Oops! Something went wrong." },
      ]);
    } finally {
      setIsStreaming(false); // stop loader
    }
  };

  // Log data updates
  useEffect(() => {
    if (data) console.log("Updated data in context:", data);
  }, [data]);

  return (
    <div className="flex bg-[#001018] text-white h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 h-screen fixed left-0 top-0 bg-white/10 backdrop-blur-md border-r border-white/10 flex-col">
        <div className="p-4">
          <button
            onClick={startNewChat}
            className="mb-4 w-full px-4 py-2 rounded-lg bg-cyan-700 hover:bg-cyan-800 font-semibold shadow-md"
          >
            + New Chat
          </button>
          <h3 className="text-sm uppercase tracking-wider text-gray-300 mb-2">
            History
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {history.length === 0 && (
            <p className="text-sm text-gray-400 italic">No chats yet</p>
          )}

          {/* Hardcoded non-clickable chats */}
          <div className="p-2 rounded-lg mb-2 cursor-default bg-gray-600 text-white/80">
            pressure is 17.4
          </div>
          <div className="p-2 rounded-lg mb-2 cursor-default bg-gray-600 text-white/80">
            temprature is between 9 to 10
          </div>
          <div className="p-2 rounded-lg mb-2 cursor-default bg-gray-600 text-white/80">
            salinity is 34.538
          </div>
          <div className="p-2 rounded-lg mb-2 cursor-default bg-gray-600 text-white/80">
          find pressure when salinity is 34.4799
          </div>

          {/* Dynamic clickable history */}
          {history.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                setActiveChat(chat.id);
                setMessages(chat.messages);
              }}
              className={`p-2 rounded-lg mb-2 cursor-pointer truncate ${
                chat.id === activeChat ? "bg-cyan-700" : "hover:bg-white/10"
              }`}
            >
              {chat.title}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setShowMap((prev) => !prev)}
            className="w-full px-4 py-2 rounded-lg bg-cyan-700 hover:bg-cyan-800 font-semibold shadow-md"
          >
            {showMap ? "Hide Map" : "Display Map"}
          </button>
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col md:ml-64 h-screen relative">
        <header className="flex items-center gap-3 px-5 py-3 mr-2 ml-2 rounded-2xl mt-3 bg-white/10 backdrop-blur-md">
          <img
            src="/finallogo.png"
            alt="FloatChat"
            className="w-8 h-8 rounded-full"
          />
          <h1 className="text-lg font-semibold">FloatChat</h1>
        </header>

        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col"
        >
          {messages.length === 0 && !showMap && (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What can I help you with?
              </h2>
              <p className="text-gray-400 mb-8">
                Start by asking a question below
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 max-w-xl rounded-2xl shadow-md ${
                msg.sender === "user"
                  ? "bg-cyan-700 ml-auto"
                  : "bg-white/10 text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* --- Pure inline 3-dot loader --- */}
          {isStreaming && (
            <div className="p-3 max-w-xl rounded-2xl shadow-md bg-white/10 text-white flex items-center gap-2">
              <span>Thinking</span>
              <span>
                {[".", "..", "..."][Math.floor(Date.now() / 500) % 3]}
              </span>
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        <div className="p-3 border-t border-white/10 backdrop-blur-md bg-white/5 sticky bottom-0 flex gap-3">
          <textarea
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message FloatChat..."
            className="flex-1 bg-white/10 text-white p-3 rounded-xl resize-none outline-none placeholder-white/50 focus:ring-2 focus:ring-cyan-500"
            disabled={isStreaming}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            disabled={isStreaming}
            className="bg-cyan-700 hover:bg-cyan-800 px-6 py-3 rounded-xl font-semibold transition shadow-lg disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </main>

      {/* --- MODIFIED MAP UI --- */}
      {showMap && (
        <aside className="w-[26rem] h-screen fixed right-0 top-0 z-10 p-3 pointer-events-none">
          <div className="w-full h-full bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col p-3 gap-3 pointer-events-auto">
            {/* Map Header */}
            <div className="flex items-center pb-2 border-b border-white/10">
              <h2 className="text-lg font-semibold">Map View 🗺️</h2>
            </div>

            {/* Map Component Container */}
            <div className="flex-1 rounded-xl overflow-hidden">
              <LeafletMap />
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
