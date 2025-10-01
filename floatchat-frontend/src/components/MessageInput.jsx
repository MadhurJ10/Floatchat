import Input from "./Input"
import Button from "./Button"

export default function MessageInput({ message, setMessage, handleSend }) {
  return (
    <div className="border-t border-gray-300 p-4 flex gap-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
      />
      <Button onClick={handleSend}>Send</Button>
    </div>
  )
}
