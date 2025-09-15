import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CssBaseline, Box } from "@mui/material";
import { UserProvider } from "./context/UserContext"; // Adjust path accordingly

import SignInPage from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";
import TrainingQuiz from "./components/TrainingQuiz";
import Coupons from "./pages/Coupons";
import MenuDrawer from "./components/MenuDrawer";
import AppTheme from "./shared-theme/AppTheme";
import ColorModeSelect from "./shared-theme/ColorModeSelect";
import AICoachEmbeddedChat from './components/AICoachEmbeddedChat';
import SafeAreaMap from "./pages/SafeAreaMap";


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <SignInPage />
            </motion.div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <Dashboard />
            </motion.div>
          }
        />
        <Route
          path="/training"
          element={
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <TrainingQuiz />
            </motion.div>
          }
        />
        <Route
          path="/coupons"
          element={
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <Coupons />
            </motion.div>
          }
        />
        <Route path="/map" element={<SafeAreaMap />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <UserProvider>
        <Router>
          <MenuDrawer />
          <Box component="main" sx={{ mt: 0, minHeight: "100vh", bgcolor: "#f7f7fa" }}>
            <AnimatedRoutes />
          </Box>
          <ColorModeSelect sx={{ position: "fixed", top: 16, right: 16, zIndex: 1300 }} />
        </Router>
      </UserProvider>
    </AppTheme>
  );
}
