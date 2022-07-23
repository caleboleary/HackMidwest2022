import { Button, Grid } from "@mui/material";
import Link from "next/link";
import React from 'react';
import Profile from '../components/Profile';

const API_URL = 'https://api-rmtl2t3ega-uc.a.run.app';

const DUMMY_USER_DATA = {
  katy: {
    firstName: 'Katy', 
    lastName: 'Smith'
  },
  john: {
    firstName: 'John',
    lastName: 'Smith',
  },
  alex: {
    firstName: 'Alex',
    lastName: 'Smith'
  }
}

export default function Home() {
  const [muhData, setMuhData] = React.useState({});

  const fetchMe = async () => {
    const data = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    setMuhData(json);
  }

  React.useEffect(() => {
    fetchMe();
  }, []);

  if (!muhData.data) return <div>Loading...</div>

  return (
    <div>
      {muhData.data?.firstName ? <Profile userData={muhData}/> : <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        flexDirection="column"
        flexGrow={1}
        sx={{ height: "100%" }}
      >
        <h2>Select a profile to start from</h2>

          {Object.values(DUMMY_USER_DATA).map((userObj) => {
            return <Button size="large" variant="contained" onClick={() => {
              setMuhData({...muhData, data: userObj})
            }}>
              {userObj.firstName}
            </Button>
          })}

      </Grid>}
    </div>
  );
}
