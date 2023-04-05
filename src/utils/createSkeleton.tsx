// ** React imports
import React from 'react'

// ** MUI imports
import Skeleton from '@mui/material/Skeleton'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

const createSkeletons = (numberOfElements: number) => {
  var elements = []
  for (let i = 0; i < numberOfElements; i++) {
    elements.push(
      <Grid key={i} item sm={6}>
        <Card sx={{ m: 2 }}>
          <CardHeader
            avatar={<Skeleton animation='wave' variant='circular' width={40} height={40} />}
            title={<Skeleton animation='wave' height={10} width='80%' style={{ marginBottom: 6 }} />}
            subheader={<Skeleton animation='wave' height={10} width='40%' />}
          />
          <Skeleton sx={{ height: 190 }} animation='wave' variant='rectangular' />
          <CardContent>
            <React.Fragment>
              <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
              <Skeleton animation='wave' height={10} width='80%' />
            </React.Fragment>
          </CardContent>
        </Card>
      </Grid>
    )
  }
  return elements
}

export default createSkeletons;