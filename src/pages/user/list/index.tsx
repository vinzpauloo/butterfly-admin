// ** React Imports
import React, {useState, ChangeEvent, useEffect} from 'react'

import Image from 'next/image'

// ** MUI Imports
import {
  Box,
  TablePagination,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
} from '@mui/material';
import UnfoldMoreTwoToneIcon from '@mui/icons-material/UnfoldMoreTwoTone';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

//Forms
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormValues {
  operator: boolean;
  supervisor: boolean;
  username: string;
  password: string;
  confirmPassword: string;
  mobileNo: string;
  emailAddress: string;
  notes: string;
}

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
  mobileNo: yup.string().required(),
  emailAddress: yup.string().email().required(),
});

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
  const [formValue, setFormValue] = useState<FormValues>({
    operator: false,
    supervisor: false,
    username: '',
    password: '',
    confirmPassword: '',
    mobileNo: '',
    emailAddress: '',
    notes: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = () => {
    alert(JSON.stringify(formValue));
    onClose();
  };

  const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (name === 'operator' && checked) {
      setFormValue((prevState) => ({
        ...prevState,
        operator: true,
        supervisor: false,
      }));
    } else if (name === 'supervisor' && checked) {
      setFormValue((prevState) => ({
        ...prevState,
        operator: false,
        supervisor: true,
      }));
    } else {
      setFormValue((prevState) => ({
        ...prevState,
        [name]:
          event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      }));
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div style={{display: 'flex', backgroundColor: '#A459D1'}}>
        <DialogTitle sx={{color: 'white'}}>Operator</DialogTitle>
        <Checkbox
          name="operator"
          checked={formValue.operator}
          onChange={handleFormInputChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
          sx={{color: 'white'}}
          color="default"
        />
        <DialogTitle sx={{color: 'white'}}>Supervisor</DialogTitle>
        <Checkbox
          name="supervisor"
          checked={formValue.supervisor}
          onChange={handleFormInputChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
          sx={{color: 'white'}}
          color="default"
        />
      </div>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Typography>Username</Typography>
          <TextField
            label="Entire Desired Username"
            variant="outlined"
            fullWidth
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
            value={formValue.username}
            onChange={handleFormInputChange}
            name="username"
          />
          <Box style={{display: 'flex', gap: 20, marginTop: 20, marginBottom: 20}}>
            <Box sx={{width: '50%'}}>
              <Typography>Password</Typography>
              <TextField
                label="Enter Password"
                variant="outlined"
                fullWidth
                type="password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                value={formValue.password}
                onChange={handleFormInputChange}
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
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                value={formValue.confirmPassword}
                onChange={handleFormInputChange}
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
                {...register('mobileNo')}
                error={!!errors.mobileNo}
                helperText={errors.mobileNo?.message}
                value={formValue.mobileNo}
                onChange={handleFormInputChange}
                name="mobileNo"
              />
            </Box>
            <Box sx={{width: '50%'}}>
              <Typography>Email Address</Typography>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                {...register('emailAddress')}
                error={!!errors.emailAddress}
                helperText={errors.emailAddress?.message}
                value={formValue.emailAddress}
                onChange={handleFormInputChange}
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
            {...register('notes')}
            value={formValue.notes}
            onChange={handleFormInputChange}
            name="notes"
          />
          <DialogActions>
            <Button onClick={onClose} sx={{ backgroundColor: '#98A9BC', color: 'white', width: '200px', '&:hover': {
                backgroundColor: '#7899ac',
              }, }}>
              <Typography sx={{color: 'white', textTransform: 'uppercase','&:hover': {transform: 'scale(1.1)',
                  transition: 'transform 0.2s ease-in-out',
                },}}>Cancel</Typography>
            </Button>
            <Button type="submit" sx={{ backgroundColor: '#9747FF', color: 'white', width: '200px', '&:hover': {
                backgroundColor: '#9747FF',
              }, }}>
              <Typography sx={{color: 'white', textTransform: 'uppercase','&:hover': {transform: 'scale(1.1)',
                  transition: 'transform 0.2s ease-in-out',
                },}}>Update</Typography>
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    setIsOn(!isOn);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'center', sm: 'unset'}, justifyContent: 'center', gap: 2}}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        <button
          style={{
            display: 'inline-block',
            position: 'relative',
            width: '52px',
            height: '20px',
            border: '1px solid transparent',
            borderRadius: '25px',
            backgroundColor: isOn ? `#60FF00` : `#F03738`,
            cursor: 'pointer'
          }}
          className={`toggle ${isOn ? 'on' : 'off'}`}
          onClick={handleClick}
        >
          <div
            style={{
              position: 'absolute',
              top: '0px',
              left: isOn ? '32px' : '0px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: 'white',
              color: 'black',
              textAlign: 'center',
              lineHeight: '21px',
              fontSize: '12px',
              transition: 'transform 0.2s ease',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {isOn ? (
              <Typography sx={{fontSize: 7}}>ON</Typography>
            ): (
              <Typography sx={{fontSize: 7}}>OFF</Typography>
            )}
          </div>
        </button>
      </Box>
      <Box>
        <button style={{background: 'transparent', border: 'none'}} onClick={handleModalOpen}>
          <EditOutlinedIcon sx={{color: '#98A9BC', fontSize: 30}}/>
        </button>
        <FormModal isOpen={isModalOpen} onClose={handleModalClose} />
      </Box>
    </Box>
  );
}

interface OperatorColumn {
  id: 'UserProfile' | 'MobileNumber' | 'Email' | 'DateCreated' | 'LastLogin' | 'Action';
  label: any;
  minWidth?: number;
  align?: 'right';
  format?: (data: number) => string | JSX.Element;
}

interface SuperAgentColumn {
  id: 'SuperAgent' | 'SiteName' | 'MobileNumber' | 'Email' | 'DateCreated' | 'LastUpdate' | 'SecurityFunds' | 'Action';
  label: any;
  format?: (data: number) => string | JSX.Element;
}

interface ContentCreatorColumn {
  id: 'Username' | 'MobileNumber' | 'Email' | 'DateCreated' | 'LastUpdate' | 'Action'
  label: any;
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

interface operatorData {
  UserProfile: string;
  MobileNumber: any;
  Email: string;
  DateCreated: any;
  LastLogin: any;
  Action: JSX.Element
}

function createOperatorData(
  UserProfile: string,
  MobileNumber: number,
  Email: string,
  DateCreated: number,
  LastLogin: number,
  Action: JSX.Element,
): operatorData {
  const formattedMobileNumber = `+${MobileNumber.toString().substring(0, 2)} ${MobileNumber.toString().substring(2, 5)} ${MobileNumber.toString().substring(5, 8)} ${MobileNumber.toString().substring(8)}`
  const date = new Date(DateCreated);
  const lastLog = new Date(LastLogin);
  const hours = date.getHours();
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  const formattedDateCreated = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${formattedHours}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
  const formattedLastLog = `${lastLog.getFullYear()}-${(lastLog.getMonth() + 1).toString().padStart(2, '0')}-${lastLog.getDate().toString().padStart(2, '0')} ${formattedHours}:${lastLog.getMinutes().toString().padStart(2, '0')}:${lastLog.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;


  return { UserProfile, MobileNumber: formattedMobileNumber, Email, DateCreated: formattedDateCreated, LastLogin: formattedLastLog, Action};
}

interface superAgentData {
  SuperAgent: string;
  SiteName: any;
  MobileNumber: string;
  Email: any;
  DateCreated: any;
  LastUpdate: any;
  SecurityFunds: any;
  Action: JSX.Element
}

function createSuperAgentRows(
  SuperAgent: string,
  SiteName: any,
  MobileNumber: any,
  Email: any,
  DateCreated: any,
  LastUpdate: any,
  SecurityFunds: any,
  Action: JSX.Element
): superAgentData {
  const formattedMobileNumber = `+${MobileNumber.toString().substring(0, 2)} ${MobileNumber.toString().substring(2, 5)} ${MobileNumber.toString().substring(5, 8)} ${MobileNumber.toString().substring(8)}`
  const date = new Date(DateCreated);
  const lastUp = new Date(LastUpdate);
  const hours = date.getHours();
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  const formattedDateCreated = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${formattedHours}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
  const formattedLastUpdate = `${lastUp.getFullYear()}-${(lastUp.getMonth() + 1).toString().padStart(2, '0')}-${lastUp.getDate().toString().padStart(2, '0')} ${formattedHours}:${lastUp.getMinutes().toString().padStart(2, '0')}:${lastUp.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;


  return { SuperAgent, SiteName, MobileNumber: formattedMobileNumber, Email, DateCreated: formattedDateCreated, LastUpdate: formattedLastUpdate, SecurityFunds, Action};
}

interface contentCreatorData {
  Username: string;
  MobileNumber: any;
  Email: string;
  DateCreated: any;
  LastUpdate: any;
  Action: JSX.Element
}

function createContentCreatorData(
  Username: string,
  MobileNumber: number,
  Email: string,
  DateCreated: number,
  LastUpdate: number,
  Action: JSX.Element,
): contentCreatorData {
  const formattedMobileNumber = `+${MobileNumber.toString().substring(0, 2)} ${MobileNumber.toString().substring(2, 5)} ${MobileNumber.toString().substring(5, 8)} ${MobileNumber.toString().substring(8)}`
  const date = new Date(DateCreated);
  const lastLog = new Date(LastUpdate);
  const hours = date.getHours();
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  const formattedDateCreated = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${formattedHours}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
  const formattedLastLog = `${lastLog.getFullYear()}-${(lastLog.getMonth() + 1).toString().padStart(2, '0')}-${lastLog.getDate().toString().padStart(2, '0')} ${formattedHours}:${lastLog.getMinutes().toString().padStart(2, '0')}:${lastLog.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;


  return { Username, MobileNumber: formattedMobileNumber, Email, DateCreated: formattedDateCreated, LastUpdate: formattedLastLog, Action};
}

const operatorRows = [
  createOperatorData('Mèng yáo', +639176543210, `my@account.com`, 1643620222000, 1643620222000, <ToggleButton/>),
  createOperatorData('Xiāng', +639176543210, `my@account.com`, 1641812403000, 1643620222000, <ToggleButton/>),
  createOperatorData('Niang Meng', +639176543210, `my@account.com`, 1661640621000, 1643620222000, <ToggleButton/>),
  createOperatorData('Yao Wun', +639176543210, `my@account.com`, 1645137632000, 1643620222000, <ToggleButton/>),
  createOperatorData('Lee Tok Hee', +639176543210, `my@account.com`, 1648314258000, 1643620222000, <ToggleButton/>),
  createOperatorData('Aoxiang Sy', +639176543210, `my@account.com`, 1643239492000, 1643620222000, <ToggleButton/>),
  createOperatorData('Xiao Ma', +639176543210, `my@account.com`, 1695217173000, 1643620222000, <ToggleButton/>),
  createOperatorData('Li Mei', +639176543210, `my@account.com`, 1643220692000, 1643620222000, <ToggleButton/>),
  createOperatorData('Jun Tao', +639176543210, `my@account.com`, 1695217173000, 1643620222000, <ToggleButton/>),
  createOperatorData('Wang Fei', +639176543210, `my@account.com`, 1641811602000, 1643620222000, <ToggleButton/>),
  createOperatorData('Chun Lee', +639176543210, `my@account.com`, 1641811602000, 1643620222000, <ToggleButton/>),
  createOperatorData('Fei Long', +639176543210, `my@account.com`, 1641811602000, 1643620222000, <ToggleButton/>),
  createOperatorData('Jackie Chan', +639176543210, `my@account.com`, 1644326766000, 1643620222000, <ToggleButton/>),
  createOperatorData('Pai Long', +639176543210, `my@account.com`, 1644326766000, 1643620222000, <ToggleButton/>),
];

const superagentRows = [
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', <ToggleButton/>),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', <ToggleButton/>),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', <ToggleButton/>),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', <ToggleButton/>),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', <ToggleButton/>),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', <ToggleButton/>),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', <ToggleButton/>),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', <ToggleButton/>),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', <ToggleButton/>),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', <ToggleButton/>),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', <ToggleButton/>),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', <ToggleButton/>),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', <ToggleButton/>),
  createSuperAgentRows('SA-01', 'sample.com', +639176543210, 'sa@account.com', 1644326766000, 1643620222000, '333,000 CN¥', <ToggleButton/>),
];

const contentcreatorRows = [
  createContentCreatorData('Yuxuan Hu', +639173263512, `cc@account.com`, 1632620222000, 1643320222000, <ToggleButton/>),
  createContentCreatorData('Wei Tao Bambang', +639276562210, `cc@account.com`, 1321812403000, 1323620222000, <ToggleButton/>),
  createContentCreatorData('Shi Kai Ding Bang', +639476545510, `cc@account.com`, 1662240621000, 1644420222000, <ToggleButton/>),
  createContentCreatorData('Fu Dong Da-Fu', +639276522210, `cc@account.com`, 1645137632000, 1643620222000, <ToggleButton/>),
  createContentCreatorData('Aiguo Chen', +639066523310, `cc@account.com`, 1648314228000, 1643621122000, <ToggleButton/>),
  createContentCreatorData('Syaoran Taio', +639276573810, `cc@account.com`, 1643229492000, 1643330222000, <ToggleButton/>),
  createContentCreatorData('Ming Longwei', +639066523410, `cc@account.com`, 1692217173000, 1642220222000, <ToggleButton/>),
  createContentCreatorData('Lee Jiao-Long', +639976599210, `cc@account.com`, 1643223292000, 1643632222000, <ToggleButton/>),
  createContentCreatorData('Hua Mu Lan', +639176246210, `cc@account.com`, 1695227173000, 1643330222000, <ToggleButton/>),
  createContentCreatorData('Zhe Huang Ti', +639176543210, `cc@account.com`, 1641811602000, 1643620222000, <ToggleButton/>),
  createContentCreatorData('Gong Xi', +639176543210, `cc@account.com`, 1641811602000, 1643620222000, <ToggleButton/>),
  createContentCreatorData('Fei Long', +639176543210, `cc@account.com`, 1641811602000, 1643620222000, <ToggleButton/>),
  createContentCreatorData('Jackie Chan', +639176543210, `cc@account.com`, 1644326766000, 1643620222000, <ToggleButton/>),
  createContentCreatorData('Pai Long', +639176543210, `cc@account.com`, 1644326766000, 1643620222000, <ToggleButton/>),
]

const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    border-collapse: separate;
    width: 100%;
    border-spacing: 0 15px;
    table-layout: fixed;
  }

  td,
  th {
    padding: 8px;
  }

  th {
    background-color: black;
    color: white;
  }
  tr {
    border: 1px solid black;
    height: 40px;
    text-align: center;
    background: ghostwhite;
  }
  td {
    max-width: 300px;
    overflow-wrap: break-word;
  }
`;

const UserList = () => {

  const [dataType, setDataType] = useState('operators');
  const [columnType, setColumnType] = useState('operators');
  const [activeBtn, setActiveBtn] = useState('')
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOperatorsClick = () => {
    setDataType('operators');
    setColumnType('operators');
    setActiveBtn('operators')
  }

  const handleSuperAgentClick = () => {
    setDataType('super-agent');
    setColumnType('super-agent');
    setActiveBtn('superagent')
  }

  const handleContentCreatorsClick = () => {
    setDataType('content-creators');
    setColumnType('content-creators');
    setActiveBtn('contentcreators')
  }

  let filteredColumns: any = [];
  if (columnType === 'operators') {
    filteredColumns = operatorColumns;
  } else if (columnType === 'super-agent') {
    filteredColumns = superAgentColumns;
  } else if (columnType === 'content-creators') {
    filteredColumns = contentCreatorColumns;
  }

  let filteredRows: any = [];

  if (dataType === 'operators') {
    filteredRows = operatorRows;
  } else if (dataType === 'super-agent') {
    filteredRows = superagentRows;
  } else if (dataType === 'content-creators') {
    filteredRows = contentcreatorRows;
  }

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setActiveBtn('operators')
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'auto', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], justifyContent: ['flex-start', 'space-between'], mb: 5 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5 }}>
          <Button onClick={handleOperatorsClick} sx={{
            border: 1,
            height: '56px',
            minWidth: '224px',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'black',
            backgroundColor: activeBtn === 'operators' ? '#9747FF' : null,
            color: activeBtn === 'operators' ? '#FFF' : 'black',
            transition: 'background-color 0.1s',
            '&:hover': {
              backgroundColor: `#9747FF`,
              color: 'white',
            },
            textTransform: 'uppercase',
          }}>
            Operators
          </Button>
          <Button onClick={handleSuperAgentClick} sx={{
            border: 1,
            height: '56px',
            minWidth: '224px',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'black',
            backgroundColor: activeBtn === 'superagent' ? '#9747FF' : null,
            color: activeBtn === 'superagent' ? '#FFF' : 'black',
            transition: 'background-color 0.1s',
            '&:hover': {
              backgroundColor: `#9747FF`,
              color: 'white',
            },
            textTransform: 'uppercase'
          }}>
            Super Agent
          </Button>
          <Button onClick={handleContentCreatorsClick} sx={{
            border: 1,
            height: '56px',
            minWidth: '224px',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'black',
            backgroundColor: activeBtn === 'contentcreators' ? '#9747FF' : null,
            color: activeBtn === 'contentcreators' ? '#FFF' : 'black',
            transition: 'background-color 0.1s',
            '&:hover': {
              backgroundColor: `#9747FF`,
              color: 'white',
            },
            textTransform: 'uppercase',
          }}>
            Content Creators
          </Button>
        </Box>

        <Button sx={{ border: 1, height: '56px', minWidth: '224px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderColor: 'black', textTransform: 'uppercase', color: 'black' }}>
          Create Account
        </Button>
      </Box>
      <Root sx={{ minHeight: 540 }}>
        <table aria-label="custom pagination table" style={{ overflowX: 'auto', maxWidth: '100%', marginBottom: '1rem', tableLayout: 'fixed' }}> {/* add tableLayout: 'fixed' style to enable setting a fixed width for each column */}
          <colgroup>
            {filteredColumns.map((column: any) => (
              <col key={column.id} style={{ minWidth: column.minWidth }} />
              ))}
          </colgroup>
          <thead>
          <tr>
            <th style={{display: isMobile ? 'none' : 'table-cell', width: '120px'}}><Image src='/images/icons/project-icons/user-table-icon.png' alt="icon" width={50} height={50}/></th>
            {filteredColumns.map((column: any) => (
              <th key={column.id} style={{fontSize: isMobile? 12 : 17}}>
                {column.label}
              </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {filteredRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row: any) => {
              return (
                <tr role="checkbox" tabIndex={-1} key={row.UserProfile}>
                  <td style={{display: isMobile ? 'none' : 'table-cell', width: '120px'}}></td>
                  {filteredColumns.map((column: any) => {
                    const value = row[column.id];

                    return (
                      <td key={column.id} align={column.align} style={{fontSize: isMobile? 12 : 15}}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Root>
      <Box style={{ margin: '0 auto' }}>
        <TablePagination
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={() => ""}
          labelRowsPerPage=""
          rowsPerPageOptions={[]}
          ActionsComponent={(props) => {
            const { onPageChange, page } = props;

            return (
              <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <IconButton
                  onClick={() => onPageChange(null, page - 1)}
                  disabled={page === 0}
                  aria-label="previous page"
                >
                  <ArrowBackIos sx={{ fontSize: 12, color: 'black' }} />
                  <Typography style={{color: 'black', fontSize: 12, paddingLeft: '4px'}}>Prev</Typography>
                </IconButton>
                {[0, 1].map((pageNumber) => (
                  <Box
                    key={pageNumber}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 24,
                      height: 24,
                      borderRadius: 2,
                      backgroundColor: page === pageNumber ? 'black' : 'white',
                      color: page === pageNumber ? 'white' : 'black',
                      marginLeft: 2,
                      marginRight: 2,
                      cursor: 'pointer',
                    }}
                    onClick={() => onPageChange(null, pageNumber)}
                  >
                    {pageNumber + 1}
                  </Box>
                ))}
                <IconButton
                  onClick={() => onPageChange(null, page + 1)}
                  disabled={page >= Math.ceil(filteredRows.length / rowsPerPage) - 1}
                  aria-label="next page"
                  sx={{ fontSize: 12, color: 'black' }}
                >
                  <Typography sx={{color: 'black', fontSize: 12, paddingRight: '4px'}}>Next</Typography>
                  <ArrowForwardIos sx={{ fontSize: 12, color: 'black' }} />
                </IconButton>
              </Box>
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default UserList
