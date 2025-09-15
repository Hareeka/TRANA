import React from "react";
import axios from "axios";
import { Button, Box } from "@mui/material";

function NavigationButton() {
  const handleNavigateClick = async () => {
    try {
      const payload = {
        user_id: 1,
        latitude: 17.385044,
        longitude: 78.486671,
        location: "Hyderabad",
      };

      const res = await axios.post("http://localhost:8000/navigate", payload);

      alert("AI Advice: " + res.data.advice);
    } catch (err) {
      alert("Failed to get AI advice.");
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button variant="contained" sx={{ mt: 4 }} onClick={handleNavigateClick}>
        Navigate Safe Areas
      </Button>
    </Box>
  );
}

export default NavigationButton;
