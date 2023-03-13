import {Box, Typography, Button} from "@mui/material";

const WorkGroupings = () => {
  return (
    <Box sx={{margin: [`0 0 0 0`,`0 0 0 0`,`2px 200px 2px 200px`]}}>
      <Box sx={{
        background: 'radial-gradient(circle at 49.81% 51.23%, #00BDD4, #00AABE 5%, #007D8C 18%, #005761 31%, #00373E 45%, #001F23 58%, #000E0F 72%, #000304 86%, #000000 100%, #E21C25 0%, #BE181F 8%, #8C1117 21%, #610C10 33%, #3E080A 46%, #FFD700 58%, #230406 60%, #0F0203 73%, #040001 86%, #FF4500 85%, #000000 100%, #FCEE21 3%, #DDD11D 10%, #A49A15 24%, #726B0F 38%, #49450A 51%, #292705 65%, #121102 77%, #050401 89%, #000000 100%)',
        height: '100dvh',
        position: 'relative'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 20,
          gap: 5,
        }}>
          <Typography sx={{textTransform: 'uppercase', marginTop: 10}}>Work Grouping Titles</Typography>

          <Button sx={{backgroundColor: '#FFF'}}>Grouping Title</Button>
          <Button sx={{backgroundColor: '#FFF'}}>Grouping Title</Button>
          <Button sx={{backgroundColor: '#FFF'}}>Grouping Title</Button>
          <Button sx={{backgroundColor: '#FFF'}}>Grouping Title</Button>
          <Button sx={{backgroundColor: '#FFF'}}>Grouping Title</Button>
          <Button sx={{backgroundColor: '#FFF'}}>Grouping Title</Button>
        </Box>


      </Box>
    </Box>
  )
}

export default WorkGroupings
