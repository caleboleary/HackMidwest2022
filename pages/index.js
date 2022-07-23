import { Button, Grid, Typography } from "@mui/material";
import React from 'react';
import Profile from '../components/Profile';
import nookies from 'nookies';

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
      { name: 'grass', diagnosed: '01/01/2010', severity: 'severe' }
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
      { name: 'grass', diagnosed: '01/01/2010', severity: 'severe' }
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
      { name: 'grass', diagnosed: '01/01/2010', severity: 'severe' }
    ],
    PHQ9: {
      score: 8,
      completed: '01/01/2019 1:06:00pm'
    }
  }
}

export default function Home({ profileId }) {
  const [muhData, setMuhData] = React.useState({});

  const fetchMe = async () => {
    const data = await fetch(`${API_URL}/me?pouch-profile-id=${profileId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    setMuhData(json);
  }

  const selectDefaultProfile = async (selectedData) => {
    const data = await fetch(`${API_URL}/me?pouch-profile-id=${profileId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'pouch-profile-id='+profileId
      },
      body: JSON.stringify(selectedData)
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
      {muhData.data?.firstName ? <Profile userData={muhData} /> : <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        flexDirection="column"
        flexGrow={1}
        sx={{ height: "100%" }}
      >
        <Typography variant="h5" sx={{ color: '#602eb2' }}>Select a profile to start from</Typography>

        {Object.values(DUMMY_USER_DATA).map((userObj) => {
          return <Button key={userObj.firstName} size="large" variant="contained" onClick={async () => {
            await selectDefaultProfile(userObj)
            setMuhData({ ...muhData, data: userObj })
          }}>
            {userObj.firstName}
          </Button>
        })}

      </Grid>}
    </div>
  );
}


export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)


  if (!cookies['pouch-profile-id']) {
    const data = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    console.log(json.id)
    nookies.set(ctx, 'pouch-profile-id', json.id, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      secure: false,
      httpOnly: false,
      domain: 'forhaley.com'
    })
    return { props: { profileId: json.id } };

  }

  return { props: { profileId: cookies['pouch-profile-id'] } };
}