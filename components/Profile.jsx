import React from "react";
import {  Grid, Typography } from "@mui/material";

const Profile = ({userData}) => {
  return (
    <div>
        <Typography variant='h3'>Hey {userData.data.firstName},</Typography>
    </div>
  );
};

export default Profile;
