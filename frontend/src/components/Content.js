// src/components/Content.js
import React from "react";
import { Box, Typography } from "@mui/material";

export default function Content() {
  return (
    <Box sx={{ maxWidth: 360, mx: "auto", textAlign: "center", p: 2 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Welcome to TRANA
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Your AI-powered self-defense companion. Stay safe, train smart, be prepared.
      </Typography>
    </Box>
  );
}
