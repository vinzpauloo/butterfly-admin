import React, { useState, forwardRef } from 'react'

// ** MUI Imports
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Button,
  Card,
  CardMedia,
  TextField,
  Typography
} from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

import styles from '../../styles/worksModal'
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import { DateType } from '@/types/forms/reactDatepickerTypes'
import CustomInput from '@/layouts/components/shared-components/Picker/CustomPickerInput'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const AnnouncementModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [date, setDate] = React.useState<DateType>(new Date())

  return (
    <DatePickerWrapper>
      <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={'lg'}>
        <DialogContent sx={{ backgroundColor: '#FFF', padding: 10 }}>
          <DialogTitle sx={{ padding: 0, margin: 0, textAlign: ['center', 'left'], textTransform: 'uppercase' }}>
            New Announcement
          </DialogTitle>

          <Box sx={{ display: 'flex', gap: 10, flexDirection: ['column', 'row'] }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: ' column',
                width: { xs: '100%', lg: '50%' },
                gap: 3
              }}
            >
              <TextField label='Title:' />
              <TextField label='Description' multiline={true} minRows={20} />
            </Box>

            <Box
              sx={{
                width: ['100%', '50%'],
                display: 'flex',
                flexDirection: 'column',
                mt: 10,
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <Typography>Duration: Start Date</Typography>
                <DatePicker
                  selected={date}
                  id='basic-input'
                  onChange={(date: Date) => setDate(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput customWidth='100%' />}
                />
              </Box>

              <Box>
                <Typography>Duration: End Date</Typography>
                <DatePicker
                  selected={date}
                  id='basic-input'
                  onChange={(date: Date) => setDate(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput customWidth='100%' />}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Button
                  sx={{
                    backgroundColor: '#FFF',
                    border: '1px solid black',
                    textTransform: 'uppercase',
                    color: '#000',
                    width: 120,
                    '&:hover': {
                      backgroundColor: '#9747FF',
                      color: '#FFF'
                    }
                  }}
                >
                  Publish
                </Button>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, border: '1px solid black', padding: 3 }}>
                <Typography sx={{ textAlign: 'center' }}>
                  Disclaimer on this part
                  <br /> Warning Message for selecting announcement
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </DatePickerWrapper>
  )
}

export default AnnouncementModal
