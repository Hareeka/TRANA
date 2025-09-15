import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function ColorfulCard({ title, value, description, icon }) {
  return (
    <Card
      sx={{
        bgcolor: "#0d47a1",
        color: "#fff",
        borderRadius: 3,
        transition: "transform 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 20px 0 rgba(0, 123, 255, 0.7)",
        },
      }}
      elevation={10}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          {icon}
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {value}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
}
