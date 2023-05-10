// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme, darken } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import UserBlankLayoutWithAppBar from 'src/layouts/UserBlankLayoutWithAppBar'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from '@/services/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'

interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '40rem' },
  [theme.breakpoints.up('lg')]: { width: '60rem' }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.75rem',
  textDecoration: 'none',
  color: theme.customBflyColors.grayInputText
}))

const RightLogoImage = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('xs')]: { width: '172px' },
  // [theme.breakpoints.up('sm')]: { width: '125px' },
  [theme.breakpoints.up('md')]: { width: '182px' },
  [theme.breakpoints.up('xl')]: { width: '220px' }
}))

const LoginButton = styled(Button)<ButtonProps>(({ theme }) => ({
  display: 'block',
  mb: 7,
  width: '100%',
  maxWidth: '170px',
  marginInline: 'auto',
  '&:hover': {
    backgroundColor: darken(theme.palette.primary.main, 0.5)
  }
}))

// ** Yup Schema
const schema = yup.object().shape({
  // email: yup.string().email('Email must be a valid email.').required('Email is a required field.'),
  email: yup.string().min(1).required('Email is required'),
  password: yup.string().min(5).required('Password is required')
})

//remove default values if you want no initial values on render page
const defaultValues: FormData = {
  password: 'password',
  email: 'kratos916'
}

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  // ** State
  const [rememberMe, setRememberMe] = useState<boolean>(true)

  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })

  // ** Hook
  const auth = useAuth()
  const theme = useTheme()
  const { settings } = useSettings()

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

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
    const { email, password } = data
    auth.login({ email, password, rememberMe }, () => {
      setError('email', {
        type: 'manual',
        message: 'Invalid login details'
      })
    })
  }

  return (
    <Box
      className='content-center'
      sx={{
        backgroundSize: ['contain', 'contain', 'cover'],
        backgroundColor: theme.customBflyColors.darkBg,
        backgroundImage: 'url("/images/login/loginbg.png")'
      }}
    >
      <Card sx={{ zIndex: 1, borderRadius: 0, border: '1px solid #fff' }}>
        <CardContent sx={{ padding: '0 !important' }}>
          <Grid className='loginFormGrid' container spacing={1}>
            <Grid xs={12} sm={7} lg={6} item order={{ xs: 2, sm: 1 }}>
              <Box
                gap={6}
                sx={{
                  p: '2rem',
                  mb: [0, null, null, 8],
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: [null, null, null, '5rem 3rem']
                }}
              >
                <Typography
                  variant='h5'
                  fontWeight='normal'
                  color={theme.palette.common.black}
                  sx={{
                    ml: 3,
                    lineHeight: 1.5,
                    textTransform: 'uppercase'
                  }}
                >
                  LOG IN DETAILS (TEST)
                </Typography>

                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label='Email'
                        fullWidth
                        id='email'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.email)}
                        placeholder=''
                        sx={{ mb: 4 }}
                        variant='filled'
                      />
                    )}
                  />

                  <FormControl fullWidth>
                    <InputLabel htmlFor='auth-login-password'>Password</InputLabel>

                    <Controller
                      name='password'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <OutlinedInput
                          sx={{ marginTop: [4, 4, 4, 4, 6] }}
                          value={value}
                          onBlur={onBlur}
                          label='Password'
                          onChange={onChange}
                          id='auth-login-v2-password'
                          error={Boolean(errors.password)}
                          type={values.showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onMouseDown={e => e.preventDefault()}
                                onClick={handleClickShowPassword}
                              >
                                <Icon
                                  icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                                  fontSize={20}
                                />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                  </FormControl>
                  <Box
                    sx={{
                      mt: 2,
                      mb: 4,
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography color={theme.palette.error.main} variant='caption'>
                      {errors.email && errors.email.message}
                    </Typography>
                    <LinkStyled href='/forgot-password'>Forgot Password?</LinkStyled>
                  </Box>
                  <LoginButton color='primary' size='large' type='submit' variant='contained'>
                    Login
                  </LoginButton>
                </form>
              </Box>
            </Grid>
            <Grid xs={12} sm={5} lg={6} item order={{ xs: 1, sm: 2 }} sx={{ height: ['230px', 'initial', 'initial'] }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  backgroundSize: 'cover',
                  backgroundImage: 'url("/images/login/smallbg.png")'
                }}
              >
                <RightLogoImage src='/images/logo_image.png' />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <UserBlankLayoutWithAppBar>{page}</UserBlankLayoutWithAppBar>

LoginPage.guestGuard = true

export default LoginPage
