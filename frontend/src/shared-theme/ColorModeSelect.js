// src/shared-theme/ColorModeSelect.js
import React, { useContext } from "react";
import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ColorModeContext } from "./AppTheme";
import { useTheme } from "@mui/material/styles";

export default function ColorModeSelect(props) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Tooltip title="Toggle light/dark mode">
      <IconButton onClick={colorMode.toggleColorMode} color="inherit" {...props}>
        {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
