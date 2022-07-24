import { Button, Grid, Typography, List, ListItem } from "@mui/material";
import React from 'react';
import Profile from '../components/Profile';
import AlertModal from '../components/AlertModal';
import DoctorData from '../components/DoctorData';
import Expandable from "../components/Expandable";
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

const findAlertOpts = provider => {
  switch (provider) {
    case 'primary-care':
      return {
        doctor: {
          office: 'Kansas City Physicians',
          name: 'Dr. Stark is requesting',
          id: 'dr-stark'
        },
        requests: [
          'Demographics & History',
          'Insurance Information'
        ]
      }
    case 'mentalhealth':
      return {
        doctor: {
          office: 'KC Mental Health',
          name: 'Neral, LPC is requesting',
          id: 'dr-neral'
        },
        requests: [
          'Demographics & History',
          'Insurance Information',
          'PHQ-9'
        ]
      }
    case 'allergy':
      return {
        doctor: {
          office: 'Allergy KC',
          name: 'Dr. O\'Leary is requesting',
          id: 'dr-oleary'
        },
        requests: [
          'Demographics & History',
          'Known Allergies',
          'Insurance Information'
        ]
      }

  }
}

export default function Home ({ profileId }) {
  const [muhData, setMuhData] = React.useState({});
  const [drData, setDrData] = React.useState([]);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertOpts, setAlertOpts] = React.useState();
  const [provider, setProvider] = React.useState();

  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    const provider = params.get('provider')
    setProvider(provider)
    if (provider) {
      setAlertOpen(true)
      setAlertOpts(findAlertOpts(provider))
    }
  }, [])

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

  const fetchDr = async () => {
    const data = await fetch(`${API_URL}/dr/me?pouch-profile-id=${profileId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    setDrData(json);
  }

  const selectDefaultProfile = async (selectedData) => {
    const data = await fetch(`${API_URL}/me?pouch-profile-id=${profileId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'pouch-profile-id=' + profileId
      },
      body: JSON.stringify(selectedData)
    });
    const json = await data.json();
    setMuhData(json);
  }

  const handleAlertClose = () => {
    setAlertOpen(false)
    setAlertOpts(false)
  }

  const handleAlertSubmit = () => {
    setAlertOpen(false)
    setAlertOpts(false)
  }

  React.useEffect(() => {
    fetchMe();
    fetchDr();
  }, []);

  if (!muhData.data) return <div>Loading...</div>

  console.log('profileId', profileId)

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

      {muhData.data?.firstName && (
        <Expandable title="Providers you are linked to">
          {drData && drData.length == 0 && <p>No data.</p>}
          {drData && drData.length > 0 && drData.map(d => <DoctorData key={d.drID} data={d} />)}
        </Expandable>
      )}
      <AlertModal open={alertOpen} title='Check-In' onClose={handleAlertClose} onSubmit={handleAlertSubmit}>
        {alertOpts && <Typography variant='h5'>{alertOpts.doctor.office}</Typography>}
        <br />
        {alertOpts && <Typography variant='body1'>{alertOpts.doctor.name}</Typography>}
        <List>
          {alertOpts && alertOpts.requests.map(req => <ListItem key={req}>- {req}</ListItem>)}
        </List>
      </AlertModal>
    </div>
  );
}


export async function getServerSideProps (ctx) {
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