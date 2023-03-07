import {Box} from "@mui/material";
import UnfoldMoreTwoToneIcon from "@mui/icons-material/UnfoldMoreTwoTone";
import React from "react";

interface OperatorColumn {
  id: 'UserProfile' | 'MobileNumber' | 'Email' | 'DateCreated' | 'LastLogin' | 'Action';
  label: any;
  minWidth?: number;
  align?: 'right';
  format?: (data: number) => string | JSX.Element;
}

const operatorColumns: readonly OperatorColumn[] = [
  { id: 'UserProfile',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>User Profile</span>
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
  { id: 'LastLogin',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Last Log in</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  {
    id: 'Action',
    label: 'Action',
  },
];

export default operatorColumns
