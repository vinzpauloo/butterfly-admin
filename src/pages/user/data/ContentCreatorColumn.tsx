import {Box} from "@mui/material";
import UnfoldMoreTwoToneIcon from "@mui/icons-material/UnfoldMoreTwoTone";
import React from "react";

interface ContentCreatorColumn {
  id: 'Username' | 'MobileNumber' | 'Email' | 'DateCreated' | 'LastUpdate' | 'Action'
  label: any;
  format?: (data: number) => string | JSX.Element;
}

const contentCreatorColumns: readonly ContentCreatorColumn[] = [
  { id: 'Username',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Username</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'MobileNumber',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Mobile Number</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'Email',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Email Address</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'DateCreated',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Date Created</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'LastUpdate',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Last Update</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  {
    id: 'Action',
    label: 'Action',
  },
];

export default contentCreatorColumns
