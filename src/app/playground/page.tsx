'use client'

import { useState, useRef, useEffect } from "react"
import { Box, TextField, IconButton, Paper, Button, CircularProgress } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { useRouter } from "next/navigation"
import LivePlayground from "@/components/LivePlayground"


export default function Playground() {
  const router = useRouter()

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  type ChatMessage = { role: "user" | "assistant"; content: string; fullContent?: string }
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [code, setCode] = useState<string>("// Enter your code here")
  const sessionID = Math.random().toString(36).substring(2, 15)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const parseTextToJSX = (text: string) => {
    const match = text.match(/```jsx\s*([\s\S]*?)```/);
    return match ? match[1].trim() : text;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const question = input.trim()
    if (!question) return

    // First, reveal any hidden assistant responses from previous turns
    // then add the new user message and a placeholder "typing..." assistant message
    setMessages(prev => {
      const revealed = prev.map(m =>
        m.fullContent ? { ...m, content: m.fullContent, fullContent: undefined } : m
      )
      return [
        ...revealed,
        { role: "user", content: question },
        { role: "assistant", content: "typing..." },
      ]
    })
    setLoading(true)

    try {
      const res = await fetch(
        `https://n8n.optym.net/webhook/sendMessage?message=${
          question
        }&sessionID=${sessionID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      const data = await res.json()
      const componentCode = parseTextToJSX(data[0].output)
      setCode(componentCode)

      // replace typing placeholder with a generic ready message, storing full content for later reveal
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Your component is ready!",
          fullContent: componentCode,
        }
        return updated
      })

      setInput("")
      setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true })
      }, 0)
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Error generating component." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ height: "100vh", maxHeight: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", background: "linear-gradient(135deg,#e0f7fa 0%,#e3f2fd 100%)"}}>
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button variant="contained" onClick={() => router.push("/side-nav")}>Home</Button>
      </Box>

      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left 20% Chat Panel */}
        <Paper sx={{ width: "20%", minWidth: 220, display: "flex", flexDirection: "column", p: 2, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.8)" }}>
          {/* Message List */}
          <Box sx={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 1, pr: 1 }}>
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                alignSelf={msg.role === "user" ? "flex-end" : "flex-start"}
                sx={{
                  px: 1.5,
                  py: 1,
                  backgroundColor: msg.role === "user" ? "primary.main" : "grey.300",
                  color: msg.role === "user" ? "primary.contrastText" : "text.primary",
                  borderRadius: 2,
                  maxWidth: "100%",
                  whiteSpace: "pre-wrap",
                  fontSize: 12,
                }}
              >
                {msg.content}
              </Box>
            ))}
            {loading && (
              <Box alignSelf="flex-start">
                <CircularProgress size={16} />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 1, mt: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              minRows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for a UI component..."
              disabled={loading}
              inputRef={inputRef}
            />
            <IconButton color="primary" type="submit" disabled={loading}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>

        {/* Right 80% Preview Panel */}
        <Paper sx={{ flex: 1, ml: 2, p: 2, maxHeight: "100%", overflow: "hidden", borderRadius: 3, backgroundColor: "rgba(255,255,255,0.8)", display: "flex", flexDirection: "column" }}>
          <LivePlayground code={code} onChange={setCode}/>
        </Paper>
      </Box>
    </Box>
  )
}