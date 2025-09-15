// src/shared-theme/AppTheme.js
import React, { useState, useMemo, createContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function AppTheme({ children }) {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => {
    const isLight = mode === "light";
    return createTheme({
      palette: {
        mode,
        primary: {
          main: isLight ? "#ff4081" : "#f50057", // bright pinks
        },
        secondary: {
          main: isLight ? "#2979ff" : "#82b1ff", // vibrant blues
        },
        background: {
          default: isLight ? "#fff" : "#121212",
          paper: isLight ? "#f0f0f0" : "#1d1d1d",
        },
      },
      typography: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      },
    });
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
