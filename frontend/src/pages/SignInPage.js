import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import SignInCard from "../components/SignInCard"; // Update path as needed

export default function SignInPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#111",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Poppins', sans-serif",
        color: "#eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Floating glow circles */}
      <Box sx={{
        position: "absolute", top: "10%", left: "10%", width: 180, height: 180,
        background: "radial-gradient(circle, #00e5ff55 0%, transparent 70%)",
        zIndex: 0
      }} />
      <Box sx={{
        position: "absolute", bottom: "15%", right: "8%", width: 180, height: 180,
        background: "radial-gradient(circle, #2979ff33 0%, transparent 70%)",
        zIndex: 0
      }} />
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={6}
        sx={{ zIndex: 1, width: "100%", maxWidth: "1100px", mx: "auto", px: 2 }}
      >
        {/* Welcome section */}
        <Box
          flex={1}
          py={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems={{ xs: "center", md: "flex-start" }}
        >
          <Typography variant="h3" fontWeight={700} mb={2} sx={{ color: "#fff" }}>
            Welcome to TRANA
          </Typography>
          <Typography variant="h6" mb={1} sx={{ color: "#eee", maxWidth: 480 }}>
            Your AI-powered self-defense companion.<br />
            <span style={{ color: "#00e5ff" }}>Stay safe, train smart, be prepared.</span>
          </Typography>
        </Box>
        {/* Sign in card */}
        <SignInCard />
      </Stack>
    </Box>
  );
}
