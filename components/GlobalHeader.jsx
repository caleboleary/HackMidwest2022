import React from "react";
import { AppBar, Grid, Typography, Dialog } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import logo from "../img/pouch-logo-inv.png";

const GlobalHeader = () => {


  return (
    <>
      <AppBar color="primary" position="static" sx={{ height: "56px" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Link href="/">
            <>
              <Image src={logo} height={40} width={40} />
              <Typography variant="h6" sx={{ margin: "0 10px" }}>
                POUCH
              </Typography>
            </>
          </Link>
        </Grid>
      </AppBar>

    </>
  );
};

export default GlobalHeader;
