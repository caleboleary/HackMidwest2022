import React from "react";
import { Grid, Typography, Divider } from "@mui/material";
import insuranceCardImage from "../img/insurance.png";
import Expandable from '../components/Expandable'
import Image from 'next/image';

const getAgeFromDOB = (dobStr) => {
  const seconds = Math.floor((new Date() - new Date(dobStr)) / 1000);

  const interval = seconds / 31536000;

  return Math.floor(interval);
}


const Profile = ({ userData }) => {
  return (
    <div>
      <Typography sx={{marginBottom:'20px'}} variant='h5'>Hey {userData.data.firstName},</Typography>
      <Divider />
      <Expandable title="Demographics" defaultExpanded={true}>
      <p>First name: {userData.data.firstName}</p>
      <p>Last name: {userData.data.lastName}</p>
      <p>Date of Birth: {userData.data.demographics.dob}</p>
      <p>Age: {getAgeFromDOB(userData.data.demographics.dob)}</p>
      <p>Address: {userData.data.demographics.address}</p>
      <p>Have you had surgery?: {userData.data.demographics.surgery ? 'Yes' : 'No'}</p>
      </Expandable>
      <Expandable title="Insurance" >
      <Image src={insuranceCardImage} height={160} width={300} />
      </Expandable>

      <Expandable title="Allergies" >
        {userData.data.allergy.map(allergy => {
          return <p key={allergy.name}>Allergic to {allergy.name}</p>
        })}
      </Expandable>

      <Expandable title="PHQ-9" >
        <p>Score: {userData.data.PHQ9.score}</p>
        <p>Assessed: {userData.data.PHQ9.completed}</p>
      </Expandable>

    </div>
  );
};

export default Profile;
