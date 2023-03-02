// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// ** Layout Import
import UserBlankLayoutWithAppBar from 'src/layouts/UserBlankLayoutWithAppBar'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import Grid from '@mui/material/Grid'


// ** DEMO DIALOG ONLY Components Imports
import DialogTransition from 'src/views/components/dialogs/DialogTransition'
interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '40rem' },
  [theme.breakpoints.up('lg')]: { width: '60rem' },
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.customBflyColors.grayInputText
}))

const RightLogoImage = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('xs')]: { width: '172px' },
  // [theme.breakpoints.up('sm')]: { width: '125px' },
  [theme.breakpoints.up('md')]: { width: '182px' },
  [theme.breakpoints.up('xl')]: { width: '220px' },
}))


const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
  })

  //remove default values if you want no initial values on render page
  const defaultValues : FormData = {
    email: ''
  }
  
  interface FormData {
    email: string
  }

const ForgotPassword = () => {

  // ** State
 
  // ** Hook
  const theme = useTheme()

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    const { email } = data
    // reset password link
  }

  return (
    <Box className='content-center' sx={{ 
      
      backgroundSize:['contain','contain','cover'],
      backgroundColor: theme.customBflyColors.darkBg, 
      backgroundImage: 'url("/images/login/loginbg.png")' }}>

      <Card sx={{ zIndex: 1, borderRadius:0, border:'1px solid #fff' }}>
        <CardContent sx={{ padding:'0 !important' }}>

        <Grid className='loginFormGrid' container spacing={1}>
          <Grid xs={12} sm={7} lg={6} item order={{ xs:2, sm:1 }}>
            <Box gap={7} sx={{ 
              p:'2rem', 
              mb: [0,null,null,8], 
              display: 'flex', 
              flexDirection:'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: [null,null,null,'5rem 3rem'] 

              }}>
              <Typography
                variant='h6'
                color={theme.palette.common.black}
                sx={{
                  ml: 3,
                  lineHeight: 1.5,
                  textTransform: 'uppercase',
                }}
              >
                FORGOT PASSWORD
              </Typography>

              <form style={{width:'100%'}} noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>

                <Controller
                      name='email'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          autoFocus
                          label='Enter Email'
                          fullWidth
                          id='email' 
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.email)}
                          placeholder=''
                          sx={{ mb: 4, backgroundColor:theme.customBflyColors.grayInputBG, borderRadius:1 }} 
                          variant="filled"
                        />
                      )}
                />
                <Button color='primary' size='large' type='submit' variant='contained' sx={{ display:'block', mb: 7, width:'100%', maxWidth:'170px', marginInline:'auto' }}>
                  Send
                </Button>
              </form>
            </Box>
          </Grid>
          <Grid xs={12} sm={5} lg={6} item order={{ xs:1, sm:2 }} sx={{ height:['230px','initial', 'initial'] }}>
            <Box sx={{ 
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              height: '100%',
              backgroundSize:'cover',
              backgroundImage:'url("/images/login/smallbg.png")'}}>
              <RightLogoImage src="/images/logo_image.png" />
            </Box>                       
          </Grid>
        </Grid>

        </CardContent>
      </Card>
    </Box>
  )
}

ForgotPassword.getLayout = (page: ReactNode) => <UserBlankLayoutWithAppBar>{page}</UserBlankLayoutWithAppBar>

ForgotPassword.guestGuard = true

export default ForgotPassword
