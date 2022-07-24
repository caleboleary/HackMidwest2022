import React from 'react'
import { Box, Typography, List, ListItem, Divider, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings"
import { dataRequestNameMap } from '../pages/index';

const DoctorData = ({ data }) => {
  return (
    <>
      <Typography variant='h6'>Provider: {data.dr.name}</Typography>
      <p>Data shared:</p>
      <List disablePadding sx={{ paddingLeft: 2 }}>
        {Object.keys(data.patientData || {}).map(key => <ListItem disablePadding key={key}>-{dataRequestNameMap[key]}</ListItem>)}
      </List>
      <Box display='flex' justifyContent='flex-end'>
        <IconButton>
          <SettingsIcon color='primary' />
        </IconButton>
      </Box>
      <Divider />
    </>
  )
}

export default DoctorData
