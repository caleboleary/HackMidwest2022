import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'

const AlertModal = ({ open, onSubmit, onClose, title, children }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ m: 3 }}>
        {children}
      </DialogContent>
      <DialogActions sx={{ '& button': { margin: 1 } }}>
        <Button onClick={onClose} startIcon={<CloseIcon />} color='warning'>Cancel</Button>
        <Button onClick={onSubmit} startIcon={<SendIcon />} color='primary'>Send</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertModal

