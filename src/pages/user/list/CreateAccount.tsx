// ** React Imports
import React, { ReactNode, useEffect, useState } from 'react'

// ** MUI Imports
import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/system'

// ** Next Imports
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** Other Imports
import UserLayoutNoPadding from '@/layouts/UserLayoutNoPadding'
import CreateForm from '@/pages/user/components/form/CreateForm'
import CreateCreator from '../components/form/CreateCreator'
import CreateSuperAgent from '../components/form/CreateSuperAgent'

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

  const router = useRouter()
  const param = router.query

  const handleOperatorClick = () => {
    setActiveBtn('SUPERVISOR')
  }

  const handleSuperAgentClick = () => {
    setActiveBtn('SA')
  }

  const handleCreatorClick = () => {
    setActiveBtn('CC')
  }

  const [isMobile, setIsMobile] = useState(false)
  const [activeBtn, setActiveBtn] = useState('')
  useEffect(() => {
    setActiveBtn(`${param.role}`)
    console.log(param.role)
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
                backgroundColor: activeBtn === 'SUPERVISOR' ? '#9747FF' : 'white',
                color: activeBtn === 'SUPERVISOR' ? 'white' : 'black'
              }}
              onClick={handleOperatorClick}
            >
              <Image src='/images/icons/project-icons/operator-icon.png' width={40} height={40} alt='operator-icon' />
              <Typography sx={{ ...styles.text, color: activeBtn === 'SUPERVISOR' ? 'white' : 'black' }}>
                Operator
              </Typography>
            </Button>
            <Button
              sx={{
                ...styles.userButton,
                backgroundColor: activeBtn === 'SA' ? '#9747FF' : 'white',
                color: activeBtn === 'SA' ? 'white' : 'black'
              }}
              onClick={handleSuperAgentClick}
            >
              <Image src='/images/icons/project-icons/superagent-icon.png' width={40} height={40} alt='operator-icon' />
              <Typography sx={{ ...styles.text, color: activeBtn === 'SA' ? 'white' : 'black' }}>
                Super Agent
              </Typography>
            </Button>
            <Button
              sx={{
                ...styles.userButton,
                backgroundColor: activeBtn === 'CC' ? '#9747FF' : 'white',
                color: activeBtn === 'CC' ? 'white' : 'black'
              }}
              onClick={handleCreatorClick}
            >
              <Image src='/images/icons/project-icons/creator-icon.png' width={40} height={40} alt='operator-icon' />
              <Typography sx={{ ...styles.text, color: activeBtn === 'CC' ? 'white' : 'black' }}>
                Content Creator
              </Typography>
            </Button>
          </Box>
        </Box>

        {activeBtn === 'SUPERVISOR' ? (
          <CreateForm />
        ) : activeBtn === 'SA' ? (
          <CreateSuperAgent />
        ) : (
          activeBtn === 'CC' && <CreateCreator />
        )}
      </Box>
    </BoxBG>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'column',
      lg: 'row'
    },
    justifyContent: {
      xs: 'flex-start',
      md: 'flex-start',
      lg: 'center'
    },
    gap: 10
  },
  userButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  userButton: {
    border: 1,
    height: '62px',
    minWidth: {
      xs: '232px',
      lg: '332px'
    },
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    borderColor: 'black',
    transition: 'background-color 0.1s',
    '&:hover': {
      backgroundColor: `#9747FF`,
      color: 'white'
    }
  },
  text: {
    flexGrow: 1
  },
  formContainer: {
    border: '1px solid grey',
    borderRadius: '5px'
  },
  operatorHeader: {
    display: 'flex',
    backgroundColor: '#A459D1',
    padding: 2
  },
  creatorHeader: {
    display: 'flex',
    backgroundColor: '#A459D1',
    padding: 4
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#A459D1',
    padding: 4
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  white: {
    color: '#FFF'
  },
  innerFormContainer: {
    padding: 4,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidth: {
    width: '100%'
  },
  halfWidth: {
    width: '50%'
  },
  formMargin: {
    display: 'flex',
    gap: 20,
    marginTop: 20,
    marginBottom: 20
  },
  bottomFormButtons: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'column',
      lg: 'row'
    },
    mt: 5,
    gap: 3,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#98A9BC',
    color: 'white',
    width: '200px',
    '&:hover': {
      backgroundColor: '#7899ac'
    }
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'transform 0.2s ease-in-out'
    }
  },
  continueButton: {
    backgroundColor: '#9747FF',
    color: 'white',
    width: '200px',
    '&:hover': {
      backgroundColor: '#9747FF'
    }
  },

  // Logo Styling
  input: {
    display: 'none'
  },
  upload: {
    backgroundColor: '#979797',
    padding: '8px 12px 8px 12px',
    borderRadius: '5px'
  }
}

CreateAccount.contentHeightFixed = false
CreateAccount.getLayout = (page: ReactNode) => (
  <UserLayoutNoPadding contentHeightFixed={CreateAccount.contentHeightFixed}>{page}</UserLayoutNoPadding>
)

export default CreateAccount
