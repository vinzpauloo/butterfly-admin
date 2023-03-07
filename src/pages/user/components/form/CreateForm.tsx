import {Box, Button, TextField, Typography} from "@mui/material";
import React from "react";

interface CreateFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
const CreateForm = ({onSubmit}: CreateFormProps) => {

  return (
    <Box sx={styles.container}>
      <form onSubmit={onSubmit}>
        <Box sx={styles.fullWidth}>
          <Typography>Username</Typography>
          <TextField
            label="Entire Desired Username"
            variant="outlined"
            fullWidth
            name="username"
          />
        </Box>
        <Box style={{...styles.formContainer, marginTop: 20}}>
          <Box sx={styles.halfWidth}>
            <Typography>Password</Typography>
            <TextField
              label="Enter Password"
              variant="outlined"
              fullWidth
              type="password"
              name="password"
            />
          </Box>
          <Box sx={styles.halfWidth}>
            <Typography>Re-enter Password</Typography>
            <TextField
              label="Re-enter Password"
              variant="outlined"
              fullWidth
              type="password"
              name="confirmPassword"
            />
          </Box>
        </Box>
        <Box style={styles.formContainer}>
          <Box sx={styles.halfWidth}>
            <Typography>Mobile No.</Typography>
            <TextField
              label="Mobile No."
              variant="outlined"
              fullWidth
              name="mobileNo"
            />
          </Box>
          <Box sx={styles.halfWidth}>
            <Typography>Email Address</Typography>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              name="emailAddress"
            />
          </Box>
        </Box>
        <Typography>Notes (Optional)</Typography>
        <TextField
          label="Notes"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          name="notes"
        />
        <Box sx={styles.formButtonContainer}>
          <Box>
            <Button sx={styles.cancelButton}>
              <Typography sx={styles.text}>Cancel</Typography>
            </Button>
          </Box>

          <Box>
            <Button
              type="submit"
              sx={styles.continueButton}
            >
              <Typography sx={styles.text}>Continue</Typography>
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

const styles = {
  container: {
    padding: 4,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  halfWidth: {
    width: '50%'
  },
  fullWidth: {
    width: '100%'
  },
  formContainer: {
    display: 'flex',
    gap: 20,
    marginBottom: 20
  },
  formButtonContainer: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'column',
      lg: 'row',
    },
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: 5,
    gap:3,
  },
  cancelButton: {
    backgroundColor: '#98A9BC',
    color: 'white',
    width: '200px',
    '&:hover': {
      backgroundColor: '#7899ac',
    }
  },
  text: {
    color: 'white',
    textTransform: 'uppercase',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'transform 0.2s ease-in-out',
    },
  },
  continueButton: {
    backgroundColor: '#9747FF',
    color: 'white',
    width: '200px',
    '&:hover': {
      backgroundColor: '#9747FF',
    },
  }
}

export default CreateForm
