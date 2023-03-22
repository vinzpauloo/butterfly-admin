import { Box, Typography } from "@mui/material";
import React from "react";

const CreatedSuccessful = () => {
  return (
    <Box sx={{ border: '1px solid grey', borderRadius: '5px', height: '604px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#FFF' }}>
      <Box sx={{ display: 'flex', backgroundColor: '#A459D1', height: 50 }} />

      <Box sx={{ padding: 4, backgroundColor: '#FFF' }}>
        <Box sx={{ height: '245px', width: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', border: '1px solid black', padding: 5 }}>
          <Typography sx={{ fontWeight: '600', fontSize: ['18px', '30px'] }}>CREATED SUCCESSFULLY!</Typography>
          <Box sx={{ display: 'flex', gap: 10, mt: 5 }}>
            <Box sx={{ backgroundColor: '#60FF00', height: ['18px', '25px'], width: ['40px', '90px'] }} />
            <Box sx={{ backgroundColor: '#6DD230', height: ['18px', '25px'], width: ['40px', '90px'] }} />
            <Box sx={{ backgroundColor: '#41A207', height: ['18px', '25px'], width: ['40px', '90px'] }} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', backgroundColor: '#A459D1', height: 50 }} />
    </Box>
  )
}

export default CreatedSuccessful;
