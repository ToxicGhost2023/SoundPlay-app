"use client";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function DarkModeSwitch() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  return (
    <Tooltip title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
      <IconButton
        onClick={toggleDarkMode}
        color="inherit"
        sx={{
          backgroundColor: dark ? "#1e1e1e" : "#f5f5f5",
          color: dark ? "#fff" : "#000",
          "&:hover": {
            backgroundColor: dark ? "#333" : "#ddd",
          },
        }}
      >
        {dark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
