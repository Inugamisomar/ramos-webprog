import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import "leaflet/dist/leaflet.css";
import App from "./App.jsx";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00f5d4",
    },
    background: {
      default: "#061a1f",
      paper: "#0b2a30",
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: "rgba(10, 25, 30, 0.95)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(0,255,200,0.2)",
          color: "#e6fefe",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255,255,255,0.05)",
            "& fieldset": {
              borderColor: "rgba(0,255,200,0.3)",
            },
            "&:hover fieldset": {
              borderColor: "#00f5d4",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00f5d4",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#aaa",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#00f5d4",
          },
        },
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);