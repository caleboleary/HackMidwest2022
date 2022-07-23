import React from "react";
import { BottomNavigation, BottomNavigationAction, Dialog, Grid } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../img/logo-inverted.png";

const GlobalFooter = () => {
  const router = useRouter();
  const [isTermsOpen, setIsTermsOpen] = React.useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = React.useState(false);
  return (
    <>
      <BottomNavigation
        showLabels

      >
        <BottomNavigationAction label="Terms of Use" onClick={() => {
            setIsTermsOpen(true)
          }}/>
        <BottomNavigationAction
          label="Home"
          onClick={() => {
            router.push("/");
          }}
        />

        <BottomNavigationAction label="Privacy Policy" onClick={() => {
            setIsPrivacyOpen(true)
          }}/>
      </BottomNavigation>
      <Dialog open={isTermsOpen} onClose={() => { setIsTermsOpen(false) }} >
        <Grid sx={{minWidth:'300px', minHeight: '200px'}}>Terms IOU</Grid>
      </Dialog>
      <Dialog open={isPrivacyOpen} onClose={() => { setIsPrivacyOpen(false) }}>
      <Grid sx={{minWidth:'300px', minHeight: '200px'}}>Privacy IOU</Grid>
      </Dialog>
    </>
  );
};

export default GlobalFooter;
