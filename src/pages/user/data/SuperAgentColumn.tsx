import {Box} from "@mui/material";
import UnfoldMoreTwoToneIcon from "@mui/icons-material/UnfoldMoreTwoTone";
import React from "react";

interface SuperAgentColumn {
  id: 'SuperAgent' | 'SiteName' | 'MobileNumber' | 'Email' | 'DateCreated' | 'LastUpdate' | 'SecurityFunds' | 'Action';
  label: any;
  format?: (data: number) => string | JSX.Element;
}

const superAgentColumns: readonly SuperAgentColumn[] = [
  { id: 'SuperAgent',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Super Agent</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  { id: 'SiteName',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Site Name</span>
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
        <span>Email</span>
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
  { id: 'SecurityFunds',
    label: (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
        <span>Security Funds</span>
        <UnfoldMoreTwoToneIcon/>
      </Box>
    )},
  {
    id: 'Action',
    label: 'Action',
  },
];

export default superAgentColumns
