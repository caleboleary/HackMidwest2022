import { Button, Grid, Typography } from "@mui/material";
import React from 'react';
import Profile from '../components/Profile';

// const API_URL = 'https://api-rmtl2t3ega-uc.a.run.app';
const API_URL = 'https://pouch-api.forhaley.com';

const DUMMY_USER_DATA = {
  katy: {
    firstName: 'Katy', 
    lastName: 'Smith',
    demographics: {
      dob: '01/01/1990',
      address: '909 Walnut St, Kansas City, MO',
      surgery: true,
    }, 
    insurance: {
      cardPhotoURL: 'asdf', 
    },
    allergy: [
      {name: 'grass', diagnosed: '01/01/2010', severity: 'severe'}
    ],
    PHQ9: {
      score: 8,
      completed: '01/01/2019 1:06:00pm'
    }
  },
  john: {
    firstName: 'John',
    lastName: 'Smith',
    demographics: {
      dob: '01/01/1990',
      address: '909 Walnut St, Kansas City, MO',
      surgery: true,
    },
    insurance: {
      cardPhotoURL: 'asdf', 
    },
    allergy: [
      {name: 'grass', diagnosed: '01/01/2010', severity: 'severe'}
    ],
    PHQ9: {
      score: 8,
      completed: '01/01/2019 1:06:00pm'
    }
  },
  alex: {
    firstName: 'Alex',
    lastName: 'Smith',
    demographics: {
      dob: '01/01/1990',
      address: '909 Walnut St, Kansas City, MO',
      surgery: true,
    }, 
    insurance: {
      cardPhotoURL: 'asdf', 
    },
    allergy: [
      {name: 'grass', diagnosed: '01/01/2010', severity: 'severe'}
    ],
    PHQ9: {
      score: 8,
      completed: '01/01/2019 1:06:00pm'
    }
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
        <Typography variant="h5" sx={{color:'#602eb2'}}>Select a profile to start from</Typography>

          {Object.values(DUMMY_USER_DATA).map((userObj) => {
            return <Button key={userObj.firstName} size="large" variant="contained" onClick={() => {
              setMuhData({...muhData, data: userObj})
            }}>
              {userObj.firstName}
            </Button>
          })}

      </Grid>}
    </div>
  );
}
