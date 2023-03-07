import * as yup from "yup";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from "@mui/material";

interface FormValues {
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
    const { name } = event.target;

    setFormValue((prevState) => ({
      ...prevState,
      [name]:
        event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    }));
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div style={{display: 'flex', backgroundColor: '#A459D1'}}>
        <DialogTitle sx={{color: 'white'}}>Content Creator</DialogTitle>
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

export default FormModal;
