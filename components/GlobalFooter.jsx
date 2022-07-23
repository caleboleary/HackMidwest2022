import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../img/logo-inverted.png";

const GlobalFooter = () => {
  const router = useRouter();
  return (
    <BottomNavigation
      showLabels
    
    >
      <BottomNavigationAction label="Terms of Use" />
      <BottomNavigationAction
        label="Home"
        onClick={() => {
          router.push("/");
        }}
      />

      <BottomNavigationAction label="Privacy Policy" />
    </BottomNavigation>
  );
};

export default GlobalFooter;
