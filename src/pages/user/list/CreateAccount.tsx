// ** React Imports
import React, { ReactNode, useEffect, useState } from 'react'

// ** MUI Imports
import { Box, Button, Checkbox, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system'

// ** Next Imports
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** Other Imports
import CreatedSuccessful from '../components/form/CreatedSuccessful'
import UserLayoutNoPadding from '@/layouts/UserLayoutNoPadding'
import CreateForm from '@/pages/user/components/form/CreateForm'
import styles from './StyleSheetCreateAccount'

const CreateAccount = () => {
  // ** Styled Components
  const BoxBG = styled(Box)(({ theme }) => {
    return {
      backgroundColor: 'inherit',
      padding: 10,
      height: 'auto',

      [theme.breakpoints.up('sm')]: {
        padding: 80,
        height: '100dvh'
      }
    }
  })

  const [submitted, setSubmitted] = useState(false)
  const [continueBtn, setContinueBtn] = useState(false)
  const [continueBtnTwo, setContinueBtnTwo] = useState(false)

  const router = useRouter()
  const param = router.query

  const handleSubmit = (event: any) => {
    event.preventDefault()

    setSubmitted(true)
    setTimeout(() => {
      router.push('/user/list')
    }, 1000)
  }

  const superAgentContinueBtn = (event: any) => {
    event.preventDefault()

    setContinueBtn(true)
  }

  const superAgentContinueBtnTwo = (event: any) => {
    event.preventDefault()

    setContinueBtnTwo(true)
    setTimeout(() => {
      router.push('/user/list')
    }, 1000)
  }

  const handleOperatorClick = () => {
    setActiveBtn('operators')
  }

  const handleSuperAgentClick = () => {
    setActiveBtn('superagent')
  }

  const handleCreatorClick = () => {
    setActiveBtn('contentcreators')
  }

  const [isMobile, setIsMobile] = useState(false)
  const [activeBtn, setActiveBtn] = useState('')
  useEffect(() => {
    setActiveBtn(`${param.activeBtn}`)
    console.log('operator')
    setSubmitted(false)
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <BoxBG>
      <Box sx={styles.container}>
        <Box>
          <Box sx={styles.userButtons}>
            <Button
              sx={{
                ...styles.userButton,
                backgroundColor: activeBtn === 'operators' ? '#9747FF' : 'white',
                color: activeBtn === 'operators' ? 'white' : 'black'
              }}
              onClick={handleOperatorClick}
            >
              <Image src='/images/icons/project-icons/operator-icon.png' width={40} height={40} alt='operator-icon' />
              <Typography sx={{ ...styles.text, color: activeBtn === 'operators' ? 'white' : 'black' }}>
                Operator
              </Typography>
            </Button>
            <Button
              sx={{
                ...styles.userButton,
                backgroundColor: activeBtn === 'superagent' ? '#9747FF' : 'white',
                color: activeBtn === 'superagent' ? 'white' : 'black'
              }}
              onClick={handleSuperAgentClick}
            >
              <Image src='/images/icons/project-icons/superagent-icon.png' width={40} height={40} alt='operator-icon' />
              <Typography sx={{ ...styles.text, color: activeBtn === 'superagent' ? 'white' : 'black' }}>
                Super Agent
              </Typography>
            </Button>
            <Button
              sx={{
                ...styles.userButton,
                backgroundColor: activeBtn === 'contentcreators' ? '#9747FF' : 'white',
                color: activeBtn === 'contentcreators' ? 'white' : 'black'
              }}
              onClick={handleCreatorClick}
            >
              <Image src='/images/icons/project-icons/creator-icon.png' width={40} height={40} alt='operator-icon' />
              <Typography sx={{ ...styles.text, color: activeBtn === 'contentcreators' ? 'white' : 'black' }}>
                Content Creator
              </Typography>
            </Button>
          </Box>
        </Box>

        {activeBtn === 'operators' ? (
          <Box>
            {!submitted ? (
              <Box sx={styles.formContainer}>
                <Box sx={styles.operatorHeader}>
                  <Box sx={styles.header}>
                    <Typography sx={styles.white}>Operator</Typography>
                    <Checkbox
                      name='operator'
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                      sx={styles.white}
                      color='default'
                    />
                  </Box>
                  <Box sx={styles.header}>
                    <Typography sx={styles.white}>Supervisor</Typography>
                    <Checkbox
                      name='supervisor'
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                      sx={styles.white}
                      color='default'
                    />
                  </Box>
                </Box>
                <CreateForm onSubmit={handleSubmit} />
              </Box>
            ) : (
              <CreatedSuccessful />
            )}
          </Box>
        ) : activeBtn === 'superagent' ? (
          <Box>
            {!continueBtn ? (
              <Box sx={styles.formContainer}>
                <Box sx={styles.headerContainer}>
                  <Box sx={styles.header}>
                    <Typography sx={styles.white}>Step 1</Typography>
                  </Box>
                  <Box sx={styles.header}>
                    <Typography sx={styles.white}>Create Super Agent</Typography>
                  </Box>
                </Box>
                <Box sx={styles.innerFormContainer}>
                  <form>
                    <Box style={styles.formMargin}>
                      <Box sx={styles.halfWidth}>
                        <Typography>Company Name</Typography>
                        <TextField
                          label='Enter Company Name'
                          variant='outlined'
                          fullWidth
                          type='companyName'
                          name='companyName'
                        />
                      </Box>
                      <Box sx={styles.halfWidth}>
                        <Typography>Company Code</Typography>
                        <TextField
                          label='Enter Company Code'
                          variant='outlined'
                          fullWidth
                          type='password'
                          name='confirmPassword'
                        />
                      </Box>
                    </Box>
                    <Box sx={styles.fullWidth}>
                      <Typography>Username</Typography>
                      <TextField label='Entire Desired Username' variant='outlined' fullWidth name='username' />
                    </Box>
                    <Box style={styles.formMargin}>
                      <Box sx={styles.halfWidth}>
                        <Typography>Password</Typography>
                        <TextField
                          label='Enter Password'
                          variant='outlined'
                          fullWidth
                          type='password'
                          name='password'
                        />
                      </Box>
                      <Box sx={styles.halfWidth}>
                        <Typography>Re-enter Password</Typography>
                        <TextField
                          label='Re-enter Password'
                          variant='outlined'
                          fullWidth
                          type='password'
                          name='confirmPassword'
                        />
                      </Box>
                    </Box>
                    <Box style={styles.formMargin}>
                      <Box sx={styles.halfWidth}>
                        <Typography>Mobile No.</Typography>
                        <TextField label='Mobile No.' variant='outlined' fullWidth name='mobileNo' />
                      </Box>
                      <Box sx={styles.halfWidth}>
                        <Typography>Email Address</Typography>
                        <TextField label='Email Address' variant='outlined' fullWidth name='emailAddress' />
                      </Box>
                    </Box>
                    <Typography>Notes (Optional)</Typography>
                    <TextField label='Notes' variant='outlined' fullWidth multiline rows={4} name='notes' />
                    <Box sx={styles.bottomFormButtons}>
                      <Box>
                        <Button sx={styles.cancelButton}>
                          <Typography sx={styles.buttonText}>Cancel</Typography>
                        </Button>
                      </Box>

                      <Box>
                        <Button type='submit' sx={styles.continueButton} onClick={superAgentContinueBtn}>
                          <Typography sx={styles.buttonText}>Continue</Typography>
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </Box>
              </Box>
            ) : !continueBtnTwo ? (
              <Box sx={styles.formContainer}>
                <Box sx={styles.headerContainer}>
                  <Box sx={styles.header}>
                    <Typography sx={styles.white}>Step 2</Typography>
                  </Box>
                  <Box sx={styles.header}>
                    <Typography sx={styles.white}>Create Site</Typography>
                  </Box>
                </Box>
                <Box sx={styles.innerFormContainer}>
                  <form>
                    <Box style={styles.formMargin}>
                      <Box sx={styles.halfWidth}>
                        <Typography>Name of Site</Typography>
                        <TextField
                          label='Please input site name'
                          variant='outlined'
                          fullWidth
                          type='password'
                          name='confirmPassword'
                        />
                      </Box>
                      <Box sx={styles.halfWidth}>
                        <Typography>Language</Typography>
                        <TextField select label='Choose Language' variant='outlined' fullWidth name='language'>
                          <MenuItem value='en'>English</MenuItem>
                          <MenuItem value='es'>Spanish</MenuItem>
                          <MenuItem value='fr'>French</MenuItem>
                        </TextField>
                      </Box>
                    </Box>
                    <Box style={styles.formMargin}>
                      <Box sx={styles.halfWidth}>
                        <Typography>Currency</Typography>
                        <TextField select label='Choose Currency' variant='outlined' fullWidth name='currency'>
                          <MenuItem value='usd'>USD</MenuItem>
                          <MenuItem value='eur'>EUR</MenuItem>
                          <MenuItem value='gbp'>GBP</MenuItem>
                        </TextField>
                      </Box>
                      <Box sx={styles.halfWidth}>
                        <Typography>Access URL</Typography>
                        <TextField label='' variant='outlined' fullWidth type='password' name='confirmPassword' />
                      </Box>
                    </Box>
                    <Box style={styles.formMargin}>
                      <Box sx={styles.halfWidth}>
                        <Typography>Add Security Funds</Typography>
                        <TextField label='Amount' variant='outlined' fullWidth name='mobileNo' />
                      </Box>
                      <Box sx={styles.halfWidth}>
                        <Typography>Logo</Typography>
                        <Box>
                          <input type='file' accept='.jpg, .jpeg, .png' style={styles.input} name='logo' id='logo' />
                          <label htmlFor='logo'>
                            <TextField
                              variant='outlined'
                              fullWidth
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <Box sx={styles.upload}>
                                      <Typography sx={styles.white}>UPLOAD</Typography>
                                    </Box>
                                  </InputAdornment>
                                )
                              }}
                            />
                          </label>
                        </Box>
                      </Box>
                    </Box>
                    <Typography>Notes (Optional)</Typography>
                    <TextField label='Notes' variant='outlined' fullWidth multiline rows={4} name='notes' />
                    <Box sx={styles.bottomFormButtons}>
                      <Box>
                        <Button sx={styles.cancelButton}>
                          <Typography sx={styles.buttonText}>Cancel</Typography>
                        </Button>
                      </Box>

                      <Box>
                        <Button type='submit' sx={styles.continueButton} onClick={superAgentContinueBtnTwo}>
                          <Typography sx={styles.buttonText}>Continue</Typography>
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </Box>
              </Box>
            ) : (
              <CreatedSuccessful />
            )}
          </Box>
        ) : (
          activeBtn === 'contentcreators' && (
            <Box>
              {!submitted ? (
                <Box sx={styles.formContainer}>
                  <Box sx={styles.creatorHeader}>
                    <Typography sx={styles.white}>Content Creator</Typography>
                  </Box>
                  <CreateForm onSubmit={handleSubmit} />
                </Box>
              ) : (
                <CreatedSuccessful />
              )}
            </Box>
          )
        )}
      </Box>
    </BoxBG>
  )
}

CreateAccount.contentHeightFixed = false
CreateAccount.getLayout = (page: ReactNode) => (
  <UserLayoutNoPadding contentHeightFixed={CreateAccount.contentHeightFixed}>{page}</UserLayoutNoPadding>
)

export default CreateAccount
