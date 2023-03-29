import React from 'react'

import { Box, Card, Grid } from '@mui/material'

function Container({ children }: any) {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box
            sx={[
              { mx: 5, mt: 5 },
              {
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                overflow: 'hidden'
              }
            ]}
          >
            {children}
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Container
