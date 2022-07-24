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
      dob: '05/16/2000',
      address: '5100 Oak St, Unit 505, Kansas City, MO',
      surgery: false,
    },
    insurance: {
      cardPhotoURL: 'asdf',
    },
    allergy: [
      { name: 'bee', diagnosed: '05/29/2015', severity: 'severe' },
      { name: 'grass', diagnosed: '02/05/2007', severity: 'mild' },
      { name: 'lima bean', diagnosed: '04/25/2005', severity: 'mild' }
    ],
    PHQ9: {
      score: 7,
      completed: '07/23/2022 1:06:35pm'
    }
  },
  john: {
    firstName: 'John',
    lastName: 'Smith',
    demographics: {
      dob: '09/23/1990',
      address: '909 Walnut St, Unit 207, Kansas City, MO',
      surgery: true,
    },
    insurance: {
      cardPhotoURL: 'asdf',
    },
    allergy: [
      { name: 'cat', diagnosed: '11/12/2001', severity: 'severe' },
      { name: 'tree nut', diagnosed: '02/17/2000', severity: 'mild' }
    ],
    PHQ9: {
      score: 16,
      completed: '09/28/2020 5:23:10pm'
    }
  },
  alex: {
    firstName: 'Alex',
    lastName: 'Sharp',
    demographics: {
      dob: '01/01/1988',
      address: '1444 Grand Blvd, Unit 417, Kansas City, MO',
      surgery: true,
    },
    insurance: {
      cardPhotoURL: 'asdf',
    },
    allergy: [
      { name: 'peanut', diagnosed: '06/08/1999', severity: 'severe' },
      { name: 'eggs', diagnosed: '06/08/1999', severity: 'severe' },
      { name: 'shellfish', diagnosed: '06/08/1999', severity: 'severe' },
      { name: 'dog', diagnosed: '12/12/1990', severity: 'mild' }
    ],
    PHQ9: {
      score: 21,
      completed: '10/07/2021 12:01:19pm'
    }
  }
}

export const dataRequestNameMap = {
  demographics: 'Demographics & History',
  insurance: 'Insurance Information',
  PHQ9: 'PHQ-9',
  allergy: 'Known Allergies'
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
          'demographics',
          'insurance'
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
          'demographics',
          'insurance',
          'PHQ9'
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
          'demographics',
          'allergy',
          'insurance'
        ]
      }

  }
}

export default function Home({ profileId }) {
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

  const grantDrAccess = async (drId, drName, sharedData) => {
    const data = await fetch(`${API_URL}/dr/me?pouch-profile-id=${profileId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'pouch-profile-id=' + profileId
      },
      body: JSON.stringify({
        dr: {
          id: drId,
          name: drName
        },
        drID: drId,
        patient: sharedData,
        profileID: profileId,
        // ...(drId === 'dr-oleary' ? {activeRx: ['levocitirizine']} : {})
      })
    });
    const json = await data.json();

    if (drId === 'dr-oleary') {
      const data2 = await fetch(`${API_URL}/me?pouch-profile-id=${profileId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'pouch-profile-id=' + profileId
        },
        body: JSON.stringify({ activeRx: ['levocitirizine'] })
      });
    }
  }

  const handleAlertClose = () => {
    setAlertOpen(false)
    setAlertOpts(false)
  }

  const handleAlertSubmit = async (drId, drName, sharedData) => {
    //send doctor data to endpoint
    await grantDrAccess(drId, drName, sharedData);
    //re-get doctor data
    await fetchDr();
    setAlertOpen(false)
    setAlertOpts(false)
  }

  React.useEffect(() => {
    fetchMe();
    fetchDr();
  }, []);

  if (!muhData.data) return <div>Loading...</div>

  console.log('profileId', profileId)
  console.log('drdata', drData)

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
      <AlertModal open={alertOpen} title='Check-In' onClose={handleAlertClose} onSubmit={() => {
        handleAlertSubmit(alertOpts.doctor.id, alertOpts.doctor.name, alertOpts.requests.reduce((acc, currKey) => {
          acc[currKey] = muhData.data[currKey]
          return acc;
        }, {}))
      }}>
        {alertOpts && <Typography variant='h5'>{alertOpts.doctor.office}</Typography>}
        <br />
        {alertOpts && <Typography variant='body1'>{alertOpts.doctor.name}</Typography>}
        <List>
          {alertOpts && alertOpts.requests.map(req => <ListItem key={req}>- {dataRequestNameMap[req]}</ListItem>)}
        </List>
      </AlertModal>
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