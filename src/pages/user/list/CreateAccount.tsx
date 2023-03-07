import React, {ReactNode, useEffect, useState} from "react";

// ** MUI Imports
import {
  Box,
  Button,
  Checkbox, InputAdornment, MenuItem,
  TextField,
  Typography,
  BoxProps
} from "@mui/material";
import { styled } from '@mui/system';

// ** Next Imports
import Image from 'next/image';
import { useRouter } from 'next/router';

import CreatedSuccessful from "../components/form/CreatedSuccessful";
import UserLayoutNoPadding from "@/layouts/UserLayoutNoPadding";

const bgPath = '/images/pages/bitcoin-bg.png'
const bgPathTwo = '/images/pages/operator-create-bg.png'
const CreateAccount = () => {

  // ** Styled Components
  const BoxBG = styled(Box)<BoxProps>(({ theme }) => ({
    backgroundImage: submitted || continueBtnTwo ? `url("${bgPathTwo}")` : `url("${bgPath}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '100% 75%',
    backgroundColor: '#d3d6df',
    padding: 10,
    height: 'auto',

    [theme.breakpoints.up('sm')]: {
      padding: 80,
      height: '100vh'
    }
  }))

  const [submitted, setSubmitted] = useState(false);
  const [continueBtn, setContinueBtn] = useState(false);
  const [continueBtnTwo, setContinueBtnTwo] = useState(false);

  const router = useRouter();
  const param = router.query;

  console.log(param.activeBtn)

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setSubmitted(true);
    setTimeout(()=>{
      router.push('/user/list')
    },1000)
  }

  const superAgentContinueBtn = (event: any) => {
    event.preventDefault();

    setContinueBtn(true);
  }

  const superAgentContinueBtnTwo = (event: any) => {
    event.preventDefault();

    setContinueBtnTwo(true);
    setTimeout(()=>{
      router.push('/user/list')
    },1000)
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

  const [isMobile, setIsMobile] = useState(false);
  const [activeBtn, setActiveBtn] = useState('')
  useEffect(() => {
    setActiveBtn(`${param.activeBtn}`)
    console.log('operator')
    setSubmitted(false)
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <BoxBG>
    <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], justifyContent: ['flex-start', 'center'], gap: 10, }}>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            sx={{
            border: 1,
            height: '62px',
            minWidth: '332px',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            borderColor: 'black',
            transition: 'background-color 0.1s',
            backgroundColor: activeBtn === 'operators' ? '#9747FF' : 'white',
            color: activeBtn === 'operators' ? 'white' : 'black',
            '&:hover': {
              backgroundColor: `#9747FF`,
              color: 'white',
            },
          }}
            onClick={handleOperatorClick}
          >
            <Image src='/images/icons/project-icons/operator-icon.png' width={40} height={40} alt='operator-icon'/>
            <Typography sx={{ flexGrow: 1, color: activeBtn === 'operators' ? 'white' : 'black' }}>Operator</Typography>
          </Button>
          <Button
            sx={{
              border: 1,
              height: '62px',
              minWidth: '332px',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              borderColor: 'black',
              transition: 'background-color 0.1s',
              backgroundColor: activeBtn === 'superagent' ? '#9747FF' : 'white',
              color: activeBtn === 'superagent' ? 'white' : 'black',
              '&:hover': {
                backgroundColor: `#9747FF`,
                color: 'white',
              },
          }}
            onClick={handleSuperAgentClick}
          >
            <Image src='/images/icons/project-icons/superagent-icon.png' width={40} height={40} alt='operator-icon'/>
            <Typography sx={{ flexGrow: 1, color: activeBtn === 'superagent' ? 'white' : 'black' }}>Super Agent</Typography>
          </Button>
          <Button
            sx={{
              border: 1,
              height: '62px',
              minWidth: '332px',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              borderColor: 'black',
              transition: 'background-color 0.1s',
              backgroundColor: activeBtn === 'contentcreators' ? '#9747FF' : 'white',
              color: activeBtn === 'contentcreators' ? 'white' : 'black',
              '&:hover': {
                backgroundColor: `#9747FF`,
                color: 'white',
              },
            }}
            onClick={handleCreatorClick}
          >
            <Image src='/images/icons/project-icons/creator-icon.png' width={40} height={40} alt='operator-icon'/>
            <Typography sx={{ flexGrow: 1, color: activeBtn === 'contentcreators' ? 'white' : 'black' }}>Content Creator</Typography>
          </Button>
        </Box>
      </Box>

      {activeBtn === 'operators' ? (
        <Box>
          {!submitted ? (
            <Box sx={{border: '1px solid grey', borderRadius: '5px',}}>
              <Box sx={{display: 'flex', backgroundColor: '#A459D1', padding: 2}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Typography sx={{color: 'white'}}>Operator</Typography>
                  <Checkbox
                    name="operator"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    sx={{color: 'white'}}
                    color="default"
                  />
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Typography sx={{color: 'white'}}>Supervisor</Typography>
                  <Checkbox
                    name="supervisor"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    sx={{color: 'white'}}
                    color="default"
                  />
                </Box>
              </Box>
              <Box sx={{padding: 4, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <form>
                  <Box sx={{width: '100%'}}>
                    <Typography>Username</Typography>
                    <TextField
                      label="Entire Desired Username"
                      variant="outlined"
                      fullWidth
                      name="username"
                    />
                  </Box>
                  <Box style={{display: 'flex', gap: 20, marginTop: 20, marginBottom: 20}}>
                    <Box sx={{width: '50%'}}>
                      <Typography>Password</Typography>
                      <TextField
                        label="Enter Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        name="password"
                      />
                    </Box>
                    <Box sx={{width: '50%'}}>
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
                  <Box style={{display: 'flex', gap: 20, marginBottom: 20}}>
                    <Box sx={{width: '50%'}}>
                      <Typography>Mobile No.</Typography>
                      <TextField
                        label="Mobile No."
                        variant="outlined"
                        fullWidth
                        name="mobileNo"
                      />
                    </Box>
                    <Box sx={{width: '50%'}}>
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
                  <Box sx={{display: 'flex', flexDirection: ['column', 'row'] ,mt: 5, gap:3, justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box>
                      <Button sx={{ backgroundColor: '#98A9BC', color: 'white', width: '200px', '&:hover': {
                          backgroundColor: '#7899ac',
                        }, }}>
                        <Typography sx={{color: 'white', textTransform: 'uppercase','&:hover': {transform: 'scale(1.1)',
                            transition: 'transform 0.2s ease-in-out',
                          },}}>Cancel</Typography>
                      </Button>
                    </Box>

                    <Box>
                      <Button
                        type="submit"
                        sx={{
                          backgroundColor: '#9747FF',
                          color: 'white',
                          width: '200px',
                          '&:hover': {
                            backgroundColor: '#9747FF',
                          },
                        }}
                        onClick={handleSubmit}
                      >
                        <Typography sx={{color: 'white', textTransform: 'uppercase','&:hover': {transform: 'scale(1.1)',
                            transition: 'transform 0.2s ease-in-out',
                          },}}>Continue</Typography>
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Box>
            </Box>
          ):(
            <CreatedSuccessful/>
          )}
        </Box>
      ): activeBtn === 'superagent' ? (
        <Box>
          {
            !continueBtn
              ? (
                <Box sx={{border: '1px solid grey', borderRadius: '5px',}}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between',backgroundColor: '#A459D1', padding: 4}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      <Typography sx={{color: 'white'}}>Step 1</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      <Typography sx={{color: 'white'}}>Create Super Agent</Typography>
                    </Box>
                  </Box>
                  <Box sx={{padding: 4, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <form>
                      <Box style={{display: 'flex', gap: 20, marginTop: 20, marginBottom: 20}}>
                        <Box sx={{width: '50%'}}>
                          <Typography>Company Name</Typography>
                          <TextField
                            label="Enter Company Name"
                            variant="outlined"
                            fullWidth
                            type="companyName"
                            name="companyName"
                          />
                        </Box>
                        <Box sx={{width: '50%'}}>
                          <Typography>Company Code</Typography>
                          <TextField
                            label="Enter Company Code"
                            variant="outlined"
                            fullWidth
                            type="password"
                            name="confirmPassword"
                          />
                        </Box>
                      </Box>
                      <Box sx={{width: '100%'}}>
                        <Typography>Username</Typography>
                        <TextField
                          label="Entire Desired Username"
                          variant="outlined"
                          fullWidth
                          name="username"
                        />
                      </Box>
                      <Box style={{display: 'flex', gap: 20, marginTop: 20, marginBottom: 20}}>
                        <Box sx={{width: '50%'}}>
                          <Typography>Password</Typography>
                          <TextField
                            label="Enter Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            name="password"
                          />
                        </Box>
                        <Box sx={{width: '50%'}}>
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
                      <Box style={{display: 'flex', gap: 20, marginBottom: 20, marginTop: 20}}>
                        <Box sx={{width: '50%'}}>
                          <Typography>Mobile No.</Typography>
                          <TextField
                            label="Mobile No."
                            variant="outlined"
                            fullWidth
                            name="mobileNo"
                          />
                        </Box>
                        <Box sx={{width: '50%'}}>
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
                      <Box sx={{display: 'flex', flexDirection: ['column', 'row'] ,mt: 5, gap:3, justifyContent: 'space-between', alignItems: 'center'}}>
                        <Box>
                          <Button sx={{ backgroundColor: '#98A9BC', color: 'white', width: '200px', '&:hover': {
                              backgroundColor: '#7899ac',
                            }, }}>
                            <Typography sx={{color: 'white', textTransform: 'uppercase','&:hover': {transform: 'scale(1.1)',
                                transition: 'transform 0.2s ease-in-out',
                              },}}>Cancel</Typography>
                          </Button>
                        </Box>

                        <Box>
                          <Button
                            type="submit"
                            sx={{
                              backgroundColor: '#9747FF',
                              color: 'white',
                              width: '200px',
                              '&:hover': {
                                backgroundColor: '#9747FF',
                              },
                            }}
                            onClick={superAgentContinueBtn}
                          >
                            <Typography sx={{color: 'white', textTransform: 'uppercase','&:hover': {transform: 'scale(1.1)',
                                transition: 'transform 0.2s ease-in-out',
                              },}}>Continue</Typography>
                          </Button>
                        </Box>
                      </Box>
                    </form>
                  </Box>
                </Box>
              )
              : !continueBtnTwo ? (
                  <Box sx={{border: '1px solid grey', borderRadius: '5px',}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between',backgroundColor: '#A459D1', padding: 4}}>
                      <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography sx={{color: 'white'}}>Step 2</Typography>
                      </Box>
                      <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography sx={{color: 'white'}}>Create Site</Typography>
                      </Box>
                    </Box>
                    <Box sx={{padding: 4, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      <form>
                        <Box style={{display: 'flex', gap: 20, marginTop: 20, marginBottom: 20}}>
                          <Box sx={{width: '50%'}}>
                            <Typography>Name of Site</Typography>
                            <TextField
                              label="Please input site name"
                              variant="outlined"
                              fullWidth
                              type="password"
                              name="confirmPassword"
                            />
                          </Box>
                          <Box sx={{width: '50%'}}>
                            <Typography>Language</Typography>
                            <TextField
                              select
                              label="Choose Language"
                              variant="outlined"
                              fullWidth
                              name="language"
                            >
                              <MenuItem value="en">English</MenuItem>
                              <MenuItem value="es">Spanish</MenuItem>
                              <MenuItem value="fr">French</MenuItem>
                            </TextField>
                          </Box>
                        </Box>
                        <Box style={{display: 'flex', gap: 20, marginTop: 20, marginBottom: 20}}>
                          <Box sx={{width: '50%'}}>
                            <Typography>Currency</Typography>
                            <TextField
                              select
                              label="Choose Currency"
                              variant="outlined"
                              fullWidth
                              name="currency"
                            >
                              <MenuItem value="usd">USD</MenuItem>
                              <MenuItem value="eur">EUR</MenuItem>
                              <MenuItem value="gbp">GBP</MenuItem>
                            </TextField>
                          </Box>
                          <Box sx={{width: '50%'}}>
                            <Typography>Access URL</Typography>
                            <TextField
                              label=""
                              variant="outlined"
                              fullWidth
                              type="password"
                              name="confirmPassword"
                            />
                          </Box>
                        </Box>
                        <Box style={{display: 'flex', gap: 20, marginBottom: 20, marginTop: 20}}>
                          <Box sx={{width: '50%'}}>
                            <Typography>Add Security Funds</Typography>
                            <TextField
                              label="Amount"
                              variant="outlined"
                              fullWidth
                              name="mobileNo"
                            />
                          </Box>
                          <Box sx={{width: '50%'}}>
                            <Typography>Logo</Typography>
                            <Box>
                              <input
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                style={{ display: 'none' }}
                                name="logo"
                                id="logo"
                              />
                              <label htmlFor="logo">
                                <TextField
                                  variant="outlined"
                                  fullWidth
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end" sx={{position: 'absolute', right: 5}}>
                                        <Box sx={{backgroundColor: '#979797', padding: "8px 15px 8px 15px", borderRadius: '5px'}}>
                                          <Typography sx={{color: '#FFF'}}>UPLOAD</Typography>
                                        </Box>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </label>
                            </Box>
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
                        <Box sx={{display: 'flex', flexDirection: ['column', 'row'] ,mt: 5, gap:3, justifyContent: 'space-between', alignItems: 'center'}}>
                          <Box>
                            <Button sx={{ backgroundColor: '#98A9BC', color: 'white', width: '200px', '&:hover': {
                                backgroundColor: '#7899ac',
                              }, }}>
                              <Typography sx={{color: 'white', textTransform: 'uppercase','&:hover': {transform: 'scale(1.1)',
                                  transition: 'transform 0.2s ease-in-out',
                                },}}>Cancel</Typography>
                            </Button>
                          </Box>

                          <Box>
                            <Button
                              type="submit"
                              sx={{
                                backgroundColor: '#9747FF',
                                color: 'white',
                                width: '200px',
                                '&:hover': {
                                  backgroundColor: '#9747FF',
                                },
                              }}
                              onClick={superAgentContinueBtnTwo}
                            >
                              <Typography sx={{color: 'white', textTransform: 'uppercase','&:hover': {transform: 'scale(1.1)',
                                  transition: 'transform 0.2s ease-in-out',
                                },}}>Continue</Typography>
                            </Button>
                          </Box>
                        </Box>
                      </form>
                    </Box>
                  </Box>
              )
                : (
                  <CreatedSuccessful/>
              )
          }
        </Box>
      ): activeBtn === 'contentcreators' && (
        <Box>
          {!submitted ? (
            <Box sx={{border: '1px solid grey', borderRadius: '5px',}}>
              <Box sx={{display: 'flex', backgroundColor: '#A459D1', padding: 4}}>
                <Typography sx={{color: 'white'}}>Content Creator</Typography>
              </Box>
              <Box sx={{padding: 4, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <form>
                  <Box sx={{width: '100%'}}>
                    <Typography>Username</Typography>
                    <TextField
                      label="Entire Desired Username"
                      variant="outlined"
                      fullWidth
                      name="username"
                    />
                  </Box>
                  <Box style={{display: 'flex', gap: 20, marginTop: 20, marginBottom: 20}}>
                    <Box sx={{width: '50%'}}>
                      <Typography>Password</Typography>
                      <TextField
                        label="Enter Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        name="password"
                      />
                    </Box>
                    <Box sx={{width: '50%'}}>
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
                  <Box style={{display: 'flex', gap: 20, marginBottom: 20}}>
                    <Box sx={{width: '50%'}}>
                      <Typography>Mobile No.</Typography>
                      <TextField
                        label="Mobile No."
                        variant="outlined"
                        fullWidth
                        name="mobileNo"
                      />
                    </Box>
                    <Box sx={{width: '50%'}}>
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
                  <Box sx={{display: 'flex', flexDirection: ['column', 'row'] ,mt: 5, gap:3, justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box>
                      <Button sx={{ backgroundColor: '#98A9BC', color: 'white', width: '200px', '&:hover': {
                          backgroundColor: '#7899ac',
                        }, }}>
                        <Typography sx={{color: 'white', textTransform: 'uppercase','&:hover': {transform: 'scale(1.1)',
                            transition: 'transform 0.2s ease-in-out',
                          },}}>Cancel</Typography>
                      </Button>
                    </Box>

                    <Box>
                      <Button
                        type="submit"
                        sx={{
                          backgroundColor: '#9747FF',
                          color: 'white',
                          width: '200px',
                          '&:hover': {
                            backgroundColor: '#9747FF',
                          },
                        }}
                        onClick={handleSubmit}
                      >
                        <Typography sx={{color: 'white', textTransform: 'uppercase','&:hover': {transform: 'scale(1.1)',
                            transition: 'transform 0.2s ease-in-out',
                          },}}>Continue</Typography>
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Box>
            </Box>
          ):(
            <CreatedSuccessful/>
          )}
        </Box>
      )}
    </Box>
    </BoxBG>
  )
}

CreateAccount.contentHeightFixed = false
CreateAccount.getLayout = (page: ReactNode) => <UserLayoutNoPadding contentHeightFixed={CreateAccount.contentHeightFixed}>{page}</UserLayoutNoPadding>

export default CreateAccount
