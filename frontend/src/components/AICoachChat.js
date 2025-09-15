// src/components/AICoachChat.js

import React, { useState } from "react";
import { Box, Button, Typography, TextField, Paper, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export default function AICoachChat({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: "coach", text: "Hi, I am your AI Safety Coach. How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Replace with your actual WXO agent endpoint and API key
  const WXO_URL = "https://api.ap-south-1.dl.watson-orchestrate.ibm.com/instances/20250907-1827-4190-50ed-be5164ad3b81";
  const WXO_API_KEY = "azE6dXNyXzRmZmIyZTExLWJlMzQtMzA3OS05ZjNiLWZlMjQwOTNmMzBlMTpYcmhuajBJRU5RcXVEUFBndEhJMlNtMVFlQWlEYVB4VStnY3RQaUhvMVdNPTpBRCto";

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");
    try {
      const res = await axios.post(
        WXO_URL,
        { message: input },
        { headers: { Authorization: `Bearer ${WXO_API_KEY}` } }
      );
      setMessages((prev) => [
        ...prev,
        { sender: "coach", text: res.data.reply || "..." },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { sender: "coach", text: "Sorry, I couldn't reach the AI Coach." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{
      p: 3, maxWidth: 420, bgcolor: "#191d32", position: "fixed", bottom: 40, right: 40, zIndex: 2001,
      boxShadow: 8
    }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" color="white">
          AI Coach
        </Typography>
        {onClose && (
          <IconButton size="small" onClick={onClose}>
            <CloseIcon sx={{ color: "#fff" }} />
          </IconButton>
        )}
      </Box>
      <Stack spacing={2} sx={{ mb: 2, maxHeight: 300, overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              bgcolor: msg.sender === "user" ? "#4f8cff" : "#1a1a75",
              color: "#fff",
              px: 2,
              py: 1,
              borderRadius: 2,
              maxWidth: "80%",
              mb: 0.5,
            }}
          >
            {msg.text}
          </Box>
        ))}
      </Stack>
      <Box display="flex" gap={1} mt={2}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Type your emergency or question…"
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <Button variant="contained" disabled={loading} onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Paper>
  );
}
