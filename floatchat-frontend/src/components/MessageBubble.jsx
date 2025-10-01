import InlineChart from "./InlineChart"
import { cn } from "../lib/utils"

export default function MessageBubble({ message }) {
  const { type, content, isOwn } = message

  const bubbleClass = cn(
    "rounded-2xl px-4 py-2 text-sm max-w-[70%] transition-transform duration-300",
    isOwn
      ? "bg-teal-400 text-white ml-auto transform hover:-translate-y-1"
      : "bg-blue-100 text-blue-900 transform hover:translate-y-1"
  )

  return (
    <div className={cn("flex gap-3", isOwn ? "flex-row-reverse" : "flex-row")}>
      <div className={cn("space-y-1", isOwn ? "text-right" : "")}>
        <div className={bubbleClass}>
          {type === "text" && <span>{content}</span>}

          {type === "chart" ? (
            content?.x && content?.y ? (
              <InlineChart data={content} />
            ) : (
              <span className="text-red-600">Invalid chart data</span>
            )
          ) : null}

          {type === "error" && <span className="text-red-600">{content}</span>}
        </div>
      </div>
    </div>
  )
}
