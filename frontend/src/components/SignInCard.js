import React from "react";
import { Box, Typography, TextField, Button, Grid, Link, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignInCard() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }
    if (!password) {
      alert("Please enter your password");
      return;
    }

    // Simulate login success
    navigate("/dashboard");
  };

  return (
    <Paper
      elevation={24}
      sx={{
        minWidth: 340,
        maxWidth: 410,
        px: 4,
        py: 5,
        m: "auto",
        borderRadius: 4,
        background: "rgba(15,30,40,0.98)",
        boxShadow: "0 8px 40px 0 #00e5ff22",
        backdropFilter: "blur(8px)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "box-shadow 0.4s",
        "&:hover": {
          boxShadow: "0 12px 60px 0 #00e5ff33",
        },
      }}
    >
      <Box
        component="img"
        src="/logo.png"
        alt="TRANA Logo"
        sx={{ height: 64, mb: 2 }}
      />
      <Typography
        variant="h5"
        fontWeight={800}
        mb={3}
        mt={1}
        sx={{ color: "#fff", letterSpacing: 1 }}
      >
        Sign in to TRANA
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          label="Email"
          autoComplete="email"
          variant="outlined"
          InputProps={{
            sx: {
              color: "#fff",
              background: "rgba(42,60,80,0.8)",
              borderRadius: 2,
            },
          }}
          InputLabelProps={{
            sx: { color: "#b2ebf2" },
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#00e5ff55" },
              "&:hover fieldset": { borderColor: "#00e5ff" },
              "&.Mui-focused fieldset": {
                borderColor: "#00e5ff",
                boxShadow: "0 0 6px #00e5ff88",
              },
            },
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          InputProps={{
            sx: {
              color: "#fff",
              background: "rgba(42,60,80,0.8)",
              borderRadius: 2,
            },
          }}
          InputLabelProps={{
            sx: { color: "#b2ebf2" },
          }}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#00e5ff55" },
              "&:hover fieldset": { borderColor: "#00e5ff" },
              "&.Mui-focused fieldset": {
                borderColor: "#00e5ff",
                boxShadow: "0 0 6px #00e5ff88",
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            fontWeight: 700,
            py: 1.5,
            mb: 2,
            fontSize: "1.12rem",
            background: "linear-gradient(90deg,#00e5ff 0%,#2979ff 100%)",
            color: "#111",
            letterSpacing: 0.5,
            boxShadow: "0 2px 18px 0 #00e5ff44",
            transition: "all 0.2s",
            "&:hover": {
              background: "linear-gradient(90deg,#2979ff 0%,#00e5ff 100%)",
              color: "#222",
              transform: "scale(1.03)",
            },
          }}
        >
          SIGN IN
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link href="#" underline="hover" sx={{ color: "#00e5ff" }}>
              Forgot password? Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
