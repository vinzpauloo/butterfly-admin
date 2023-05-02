// ** React Imports
import React from 'react'

// ** MUI Imports
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material'

import CustomAvatar from 'src/@core/components/mui/avatar'

const notifications = [
  {
    id: 0,
    label: 'First notification'
  },
  {
    id: 1,
    label: 'Second notification'
  },
  {
    id: 3,
    label: 'Third Notification'
  }
]

const NotificationsPage = () => {
  return (
    <div>
      <h1>Notifications</h1>
      <Card>
        <CardContent>
          <Typography color='textSecondary' gutterBottom>
            Recent Notifications
          </Typography>
          <List>
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem>
                  <CustomAvatar color='primary' sx={{ mr: { xs: 4, sm: 4, md: 4, lg: 10 } }} />
                  <ListItemText primary={notification.label} secondary={`Received ${index + 1} hour ago`} />
                  <Typography variant='caption'>{index + 1} hour ago</Typography>
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
        <CardActions>
          <Button size='small' color='primary'>
            View All
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default NotificationsPage
