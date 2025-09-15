import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Snackbar,
  Alert
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";  // Assuming you have this context
import AICoachEmbeddedChat from "../components/AICoachEmbeddedChat";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [points, setPoints] = useState(150);
  const [loadingPoints, setLoadingPoints] = useState(true);
  const [activeTrainings] = useState(3);
  const [sosAlerts] = useState(0);

  const [showCoach, setShowCoach] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertLocation, setAlertLocation] = useState(null);

  const canRedeem = points >= 100;

  // Fetch user points from backend when user.id changes
  useEffect(() => {
    async function fetchUserPoints() {
      if (!user?.id) {
        setLoadingPoints(false);
        return;
      }
      try {
        const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8001";
        const response = await fetch(`${API_BASE_URL}/users/${user.id}/points`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setPoints(data.points);
      } catch (error) {
        console.error("Failed to fetch user points", error);
        setPoints(0);
      } finally {
        setLoadingPoints(false);
      }
    }
    fetchUserPoints();
  }, [user?.id]);

  // Redeem coupon handler
  const handleRedeemCoupon = async () => {
    if (!canRedeem) {
      alert("You do not have enough points to redeem this coupon.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8001/coupons/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });
      if (!response.ok) {
        alert("Failed to redeem coupon. Please try again later.");
        return;
      }
      const data = await response.json();
      alert(`Coupon redeemed successfully! Code: ${data.coupon_code}`);
      setPoints((prev) => prev - 100);
    } catch (error) {
      console.error("Error redeeming coupon:", error);
      alert("Error redeeming coupon. Please try again.");
    }
  };

  // SOS Alert Handler
  const handleSOS = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const payload = {
          user_id: user?.id || 0,                // Use logged-in user ID or 0 as fallback
          latitude: latitude,                     // Separate latitude
          longitude: longitude,                   // Separate longitude
          location: `${latitude},${longitude}`,  // You can keep a combined string if desired
        };

        fetch("http://localhost:8001/sos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
          })
          .then((data) => {
            setAlertStatus(
              data.advice
                ? "YOUR DETAILS HAVE BEEN SENT TO NEARBY POLICE AND FAMILY.\n" + data.advice
                : "YOUR DETAILS HAVE BEEN SENT TO NEARBY POLICE AND FAMILY."
            );
            setSnackbarOpen(true);
            setShowCoach(true);
            setAlertLocation({ latitude, longitude });
          })
          .catch((error) => {
            setAlertStatus("Failed to send SOS alert!");
            setSnackbarOpen(true);
            console.error("Failed to send SOS alert", error);
          });
      },
      (error) => {
        alert("Could not get your location. Please allow location access.");
      }
    );
  };

  // Navigate Button Handler
  const handleNavigateClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        if (!user || !user.id) {
          alert("Please login to use this feature");
          return;
        }

        try {
          const payload = {
            user_id: user.id,
            latitude,
            longitude,
            location: "User location",
          };

          const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8001";
          const res = await axios.post(`${API_BASE_URL}/navigate`, payload);

          alert("AI Advice: " + res.data.advice);

          navigate("/map");
        } catch (error) {
          alert("Failed to get AI advice");
          console.error(error);
        }
      },
      (error) => {
        alert("Please allow location access to proceed");
      }
    );
  };

  if (loadingPoints)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Loading your points...
      </Typography>
    );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Points Card */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <EmojiEventsIcon fontSize="large" color="primary" />
              <Typography variant="h6">Reward Points</Typography>
              <Typography variant="h4">{points}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Points earned from training and activity
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRedeemCoupon}
                disabled={!canRedeem}
              >
                Redeem Coupon (Requires 100 Points)
              </Button>
              {!canRedeem && (
                <Typography variant="caption" color="error">
                  You need at least 100 points to redeem a coupon.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Active Trainings Card */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <FitnessCenterIcon fontSize="large" color="primary" />
              <Typography variant="h6">Active Trainings</Typography>
              <Typography variant="h4">{activeTrainings}</Typography>
              <Typography variant="body2" color="text.secondary">
                Training modules you are currently enrolled in
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* SOS Alerts Card */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <WarningAmberIcon fontSize="large" color="error" />
              <Typography variant="h6">SOS Alerts Sent</Typography>
              <Typography variant="h4">{sosAlerts}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Number of emergency alerts you have triggered
              </Typography>
              <Button variant="contained" color="error" onClick={handleSOS}>
                SOS & Open AI Coach
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* AI Coach Chat */}
      {showCoach && (
        <Box sx={{ mt: 3 }}>
          <AICoachEmbeddedChat location={alertLocation} />
          <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setShowCoach(false)}>
            Close AI Coach
          </Button>
        </Box>
      )}

      {/* Snackbar for alerts */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {alertStatus}
        </Alert>
      </Snackbar>

      {/* Self Training Videos */}
      <Typography variant="h5" sx={{ mt: 5, mb: 3 }}>
        Self Training Videos
      </Typography>
      <Grid container spacing={3}>
        {/* Video 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#22274b" }}>
            <CardActionArea
              href="https://www.youtube.com/watch?v=0rIHPqGVZmE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CardMedia
                component="img"
                height="180"
                image="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80"
                alt="Basic Self-Defense Techniques"
              />
              <CardContent>
                <Typography variant="subtitle1" color="#fff" fontWeight="bold">
                  Basic Self-Defense Techniques
                </Typography>
                <Typography variant="body2" color="#ccc">
                  Simple moves for new learners. Watch now!
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Video 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#22274b" }}>
            <CardActionArea
              href="https://www.youtube.com/watch?v=4NfVcy17W3Q"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CardMedia
                component="img"
                height="180"
                image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                alt="Situational Awareness Tips"
              />
              <CardContent>
                <Typography variant="subtitle1" color="#fff" fontWeight="bold">
                  Situational Awareness Tips
                </Typography>
                <Typography variant="body2" color="#ccc">
                  How to stay alert and avoid danger in public spaces.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      {/* Navigation Button */}
      <Button variant="contained" sx={{ mt: 4 }} onClick={handleNavigateClick}>
        Navigate Safe Areas
      </Button>
    </Box>
  );
}
