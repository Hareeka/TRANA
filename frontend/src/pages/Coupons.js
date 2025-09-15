import React, { useState } from "react";
import {
  Box, Typography, Grid, Card, CardContent, Button, Snackbar, Alert,
} from "@mui/material";
import { useUser } from "../context/UserContext";

const sampleCoupons = [
  { id: 1, title: "10% Off Self Defense Gear", description: "Save 10% on our online gear store.", cost: 100 },
  { id: 2, title: "Free Training Session", description: "Redeem for a one-on-one training class.", cost: 250 },
  { id: 3, title: "Safety App Subscription", description: "Free 1-month subscription to our Safety App.", cost: 400 },
];

export default function Coupons() {
  const { points, addPoints } = useUser();
  const [redeemedIds, setRedeemedIds] = useState([]);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  const handleRedeem = (coupon) => {
    if (points >= coupon.cost) {
      setRedeemedIds([...redeemedIds, coupon.id]);
      addPoints(-coupon.cost);
      setSnack({ open: true, message: `Redeemed "${coupon.title}" successfully!`, severity: "success" });
    } else {
      setSnack({ open: true, message: "Insufficient points to redeem this coupon.", severity: "error" });
    }
  };

  return (
    <Box p={4} sx={{ minHeight: "100vh", bgcolor: "#f0f4f8" }}>
      <Typography variant="h4" gutterBottom>
        Redeem Your Coupons
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your Points: {points}
      </Typography>
      <Grid container spacing={4}>
        {sampleCoupons.map((coupon) => {
          const isRedeemed = redeemedIds.includes(coupon.id);
          const canRedeem = points >= coupon.cost && !isRedeemed;
          return (
            <Grid xs={12} sm={6} md={4} key={coupon.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{coupon.title}</Typography>
                  <Typography variant="body2" paragraph>{coupon.description}</Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Cost: {coupon.cost} points
                  </Typography>
                  <Button
                    variant="contained"
                    color={isRedeemed ? "success" : "primary"}
                    disabled={!canRedeem}
                    onClick={() => handleRedeem(coupon)}
                    fullWidth
                  >
                    {isRedeemed ? "Redeemed" : "Redeem"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
