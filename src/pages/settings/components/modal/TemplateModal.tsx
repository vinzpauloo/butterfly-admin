// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { Box, Dialog, DialogContent, DialogTitle, Backdrop, Grid, Paper } from '@mui/material'

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
  onActiveBtnChange: (activeBtn: string) => void
}

const TemplateModal: React.FC<FormModalProps> = ({ isOpen, onClose, onActiveBtnChange }) => {
  const handleBackdropClick = () => {
    onClose()
  }

  const [backgroundColor, setBackgroundColor] = useState(Array(5).fill('grey'))

  const [activeBtn, setActiveBtn] = useState('')

  const handleHoverIn = (index: any) => {
    setBackgroundColor(prevColors => {
      const newColors = [...prevColors]
      newColors[index] = 'purple'

      return newColors
    })
  }

  const handleHoverOut = (index: any) => {
    setBackgroundColor(prevColors => {
      const newColors = [...prevColors]
      newColors[index] = 'grey'

      return newColors
    })
  }

  const handleTemplateClick = (templateName: string) => {
    setActiveBtn(templateName)
    onActiveBtnChange(templateName)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} BackdropComponent={Backdrop}>
      <Backdrop sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} open={isOpen} onClick={handleBackdropClick}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: [400, 700, 900], padding: 0 }}>
            <DialogTitle sx={{ color: '#FFF', textAlign: 'center', textTransform: 'uppercase' }}>
              Select Template
            </DialogTitle>
            <DialogContent sx={{}}>
              {/* Templates */}
              <Box
                sx={{
                  display: 'flex',
                  position: 'relative',
                  flexDirection: 'column',
                  gap: 10,
                  overflow: 'auto',
                  maxHeight: '70vh',
                  scrollbarWidth: 'thin',
                  '&::-webkit-scrollbar': {
                    width: '4px'
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(0,0,0,0.1)'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: '20px'
                  }
                }}
              >
                {/* First Template */}
                <Box
                  sx={{
                    margin: '0 50px 0 50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                  onClick={() => {
                    handleTemplateClick('template1')
                  }}
                  onMouseEnter={() => handleHoverIn(0)}
                  onMouseLeave={() => handleHoverOut(0)}
                >
                  <Box
                    sx={{
                      backgroundColor: backgroundColor[0],
                      width: '100%',
                      height: ['200px', '300px'],
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Image
                      src='/images/icons/butterfly-template-icon.png'
                      width={100}
                      height={100}
                      alt='operator-icon'
                    />
                  </Box>
                </Box>

                {/* Second Template */}
                <Box
                  sx={{
                    margin: '0 50px 0 50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 10,
                    overFlow: 'auto',
                    minWidth: ['100%', '90%']
                  }}
                  onClick={() => handleTemplateClick(`template2`)}
                  onMouseEnter={() => handleHoverIn(1)}
                  onMouseLeave={() => handleHoverOut(1)}
                >
                  <Box
                    sx={{
                      backgroundColor: backgroundColor[1],
                      width: '90px',
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Image src='/images/icons/butterfly-template-icon.png' width={50} height={50} alt='operator-icon' />
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: backgroundColor[1],
                      width: '90px',
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Image src='/images/icons/butterfly-template-icon.png' width={50} height={50} alt='operator-icon' />
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: backgroundColor[1],
                      width: '90px',
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Image src='/images/icons/butterfly-template-icon.png' width={50} height={50} alt='operator-icon' />
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: backgroundColor[1],
                      width: '90px',
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Image src='/images/icons/butterfly-template-icon.png' width={50} height={50} alt='operator-icon' />
                  </Box>
                </Box>

                {/* Third Template */}
                <Box
                  sx={{
                    margin: '0 50px 0 50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                  onClick={() => handleTemplateClick(`template3`)}
                  onMouseEnter={() => handleHoverIn(2)}
                  onMouseLeave={() => handleHoverOut(2)}
                >
                  <Box
                    sx={{
                      backgroundColor: backgroundColor[2],
                      width: '100%',
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Image
                      src='/images/icons/butterfly-template-icon.png'
                      width={100}
                      height={100}
                      alt='operator-icon'
                    />
                  </Box>

                  <Grid container spacing={3} mt={1}>
                    <Grid item xs={6}>
                      <Paper style={{ backgroundColor: backgroundColor[2], padding: '20px', textAlign: 'center' }}>
                        {' '}
                        <Image
                          src='/images/icons/butterfly-template-icon.png'
                          width={50}
                          height={50}
                          alt='operator-icon'
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper style={{ backgroundColor: backgroundColor[2], padding: '20px', textAlign: 'center' }}>
                        {' '}
                        <Image
                          src='/images/icons/butterfly-template-icon.png'
                          width={50}
                          height={50}
                          alt='operator-icon'
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper style={{ backgroundColor: backgroundColor[2], padding: '20px', textAlign: 'center' }}>
                        {' '}
                        <Image
                          src='/images/icons/butterfly-template-icon.png'
                          width={50}
                          height={50}
                          alt='operator-icon'
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper style={{ backgroundColor: backgroundColor[2], padding: '20px', textAlign: 'center' }}>
                        {' '}
                        <Image
                          src='/images/icons/butterfly-template-icon.png'
                          width={50}
                          height={50}
                          alt='operator-icon'
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>

                {/* Fourth Template */}
                <Box
                  sx={{
                    margin: '0 50px 0 50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                  onClick={() => handleTemplateClick(`template4`)}
                  onMouseEnter={() => handleHoverIn(3)}
                  onMouseLeave={() => handleHoverOut(3)}
                >
                  <Grid container spacing={3} mt={1}>
                    <Grid item xs={6}>
                      <Paper style={{ backgroundColor: backgroundColor[3], padding: '20px', textAlign: 'center' }}>
                        {' '}
                        <Image
                          src='/images/icons/butterfly-template-icon.png'
                          width={50}
                          height={50}
                          alt='operator-icon'
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper style={{ backgroundColor: backgroundColor[3], padding: '20px', textAlign: 'center' }}>
                        {' '}
                        <Image
                          src='/images/icons/butterfly-template-icon.png'
                          width={50}
                          height={50}
                          alt='operator-icon'
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper style={{ backgroundColor: backgroundColor[3], padding: '20px', textAlign: 'center' }}>
                        {' '}
                        <Image
                          src='/images/icons/butterfly-template-icon.png'
                          width={50}
                          height={50}
                          alt='operator-icon'
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper style={{ backgroundColor: backgroundColor[3], padding: '20px', textAlign: 'center' }}>
                        {' '}
                        <Image
                          src='/images/icons/butterfly-template-icon.png'
                          width={50}
                          height={50}
                          alt='operator-icon'
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper style={{ backgroundColor: backgroundColor[3], padding: '20px', textAlign: 'center' }}>
                        {' '}
                        <Image
                          src='/images/icons/butterfly-template-icon.png'
                          width={50}
                          height={50}
                          alt='operator-icon'
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper style={{ backgroundColor: backgroundColor[3], padding: '20px', textAlign: 'center' }}>
                        {' '}
                        <Image
                          src='/images/icons/butterfly-template-icon.png'
                          width={50}
                          height={50}
                          alt='operator-icon'
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>

                {/* Fifth Template */}
                <Box
                  sx={{
                    margin: '0 50px 50px 50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 10,
                    overFlow: 'auto',
                    minWidth: ['150%', '100%']
                  }}
                  onClick={() => handleTemplateClick(`template5`)}
                  onMouseEnter={() => handleHoverIn(4)}
                  onMouseLeave={() => handleHoverOut(4)}
                >
                  <Box
                    sx={{
                      backgroundColor: backgroundColor[4],
                      width: ['650px', '600px'],
                      height: ['80px', '120px'],
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Image src='/images/icons/butterfly-template-icon.png' width={50} height={50} alt='operator-icon' />
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: backgroundColor[4],
                      width: ['650px', '600px'],
                      height: ['80px', '120px'],
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Image src='/images/icons/butterfly-template-icon.png' width={50} height={50} alt='operator-icon' />
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: backgroundColor[4],
                      width: ['650px', '600px'],
                      height: ['80px', '120px'],
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Image src='/images/icons/butterfly-template-icon.png' width={50} height={50} alt='operator-icon' />
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: backgroundColor[4],
                      width: ['650px', '600px'],
                      height: ['80px', '120px'],
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Image src='/images/icons/butterfly-template-icon.png' width={50} height={50} alt='operator-icon' />
                  </Box>
                </Box>
              </Box>
            </DialogContent>
          </Box>
        </Box>
      </Backdrop>
    </Dialog>
  )
}

export default TemplateModal
