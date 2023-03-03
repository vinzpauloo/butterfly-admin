import * as yup from "yup";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  MenuItem,
  InputAdornment
} from "@mui/material";

interface FormValues {
  companyName: string;
  companyCode: string;
  accessURL: string;
  siteName: string;
  username: string;
  password: string;
  confirmPassword: string;
  mobileNo: string;
  emailAddress: string;
  notes: string;
  language: string;
  currency: string;
  securityFunds: string;
  logo: FileList | null | any;
}

const schema = yup.object().shape({
  companyName: yup.string().required(),
  companyCode: yup.string().required(),
  accessURL: yup.string().required(),
  siteName: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
  mobileNo: yup.string().required(),
  emailAddress: yup.string().email().required(),
  language: yup.string().required(),
  currency: yup.string().required(),
  securityFunds: yup.string().required(),

  // logo: yup.mixed().test("fileSize", "File size is too large", (value) => {
  //   return !value || value[0].size <= 1024 * 1024;
  // }),
  logo: yup.mixed().required('A logo is required')
});

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
  const [formValue, setFormValue] = useState<FormValues>({
    companyName: '',
    companyCode: '',
    accessURL: '',
    siteName: '',
    username: '',
    password: '',
    confirmPassword: '',
    mobileNo: '',
    emailAddress: '',
    notes: '',
    language: '',
    currency: '',
    securityFunds: '',
    logo: null,
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
    console.log(formValue.logo.name)
    onClose();
  };

  const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    setFormValue((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="lg">
      <Box sx={{backgroundColor: '#A459D1', width: {md: '70em'}}}>
        <DialogTitle sx={{color: 'white', textTransform: 'uppercase'}}>Super Agent</DialogTitle>
      </Box>
      <DialogContent sx={{width: {md: '70em'}, height: {md: '40em'}}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: { xs: 2 },
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: {xs: 2} }}>
                    <Box sx={{width: '100%'}}>
                      <Typography>Company Name</Typography>
                      <TextField
                        label="Company Name"
                        variant="outlined"
                        fullWidth
                        {...register('companyName')}
                        error={!!errors.companyName}
                        helperText={errors.companyName?.message}
                        value={formValue.companyName}
                        onChange={handleFormInputChange}
                        name="companyName"
                      />
                    </Box>
                    <Box sx={{width: '100%'}}>
                      <Typography>Company Code</Typography>
                      <TextField
                        label="Company Code"
                        variant="outlined"
                        fullWidth
                        {...register('companyCode')}
                        error={!!errors.companyCode}
                        helperText={errors.companyCode?.message}
                        value={formValue.companyCode}
                        onChange={handleFormInputChange}
                        name="companyCode"
                      />
                    </Box>
                  </Box>

                  <Typography>Username</Typography>
                  <TextField
                    label="Enter Desired Username"
                    variant="outlined"
                    fullWidth
                    {...register('username')}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    value={formValue.username}
                    onChange={handleFormInputChange}
                    name="username"
                  />

                  <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: {xs: 2} }}>
                    <Box sx={{width: '100%'}}>
                      <Typography>Password</Typography>
                      <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        value={formValue.password}
                        onChange={handleFormInputChange}
                        name="password"
                      />
                    </Box>
                    <Box sx={{width: '100%'}}>
                      <Typography>Re-enter Password</Typography>
                      <TextField
                        label="Re-enter Password"
                        variant="outlined"
                        fullWidth
                        {...register('confirmPassword')}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        value={formValue.confirmPassword}
                        onChange={handleFormInputChange}
                        name="confirmPassword"
                      />
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: {xs: 2} }}>
                    <Box sx={{width: '100%'}}>
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
                    <Box sx={{width: '100%'}}>
                      <Typography>Email Address</Typography>
                      <TextField
                        label="Enter Your Email Address"
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

                  <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: {xs: 2} }}>
                    <Box sx={{width: '100%'}}>
                      <Typography>Name of Site</Typography>
                      <TextField
                        label="Name of Site"
                        variant="outlined"
                        fullWidth
                        {...register('siteName')}
                        error={!!errors.siteName}
                        helperText={errors.siteName?.message}
                        value={formValue.siteName}
                        onChange={handleFormInputChange}
                        name="siteName"
                      />
                    </Box>
                    <Box sx={{width: '100%'}}>
                      <Typography>Language</Typography>
                      <TextField
                        select
                        label="Language"
                        variant="outlined"
                        fullWidth
                        {...register('language')}
                        error={!!errors.language}
                        helperText={errors.language?.message}
                        value={formValue.language}
                        onChange={handleFormInputChange}
                        name="language"
                      >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                      </TextField>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: {xs: 2} }}>
                    <Box sx={{width: '100%'}}>
                      <Typography>Currency</Typography>
                      <TextField
                        select
                        label="Currency"
                        variant="outlined"
                        fullWidth
                        {...register('currency')}
                        error={!!errors.currency}
                        helperText={errors.currency?.message}
                        value={formValue.currency}
                        onChange={handleFormInputChange}
                        name="currency"
                      >
                        <MenuItem value="usd">USD</MenuItem>
                        <MenuItem value="eur">EUR</MenuItem>
                        <MenuItem value="gbp">GBP</MenuItem>
                      </TextField>
                    </Box>
                    <Box sx={{width: '100%'}}>
                      <Typography>Access URL</Typography>
                      <TextField
                        label="Access URL"
                        variant="outlined"
                        fullWidth
                        {...register('accessURL')}
                        error={!!errors.accessURL}
                        helperText={errors.accessURL?.message}
                        value={formValue.accessURL}
                        onChange={handleFormInputChange}
                        name="accessURL"
                      />
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ flexGrow: 1, marginLeft: {md: 20} }}>
                  <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: {xs: 2} }}>
                    <Box sx={{width: '100%'}}>
                      <Typography>Add Security Funds</Typography>
                      <TextField
                        label="Amount"
                        variant="outlined"
                        fullWidth
                        {...register('securityFunds')}
                        error={!!errors.securityFunds}
                        helperText={errors.securityFunds?.message}
                        value={formValue.securityFunds}
                        onChange={handleFormInputChange}
                        name="securityFunds"
                      />
                    </Box>
                    <Box sx={{width: '100%'}}>
                      <Typography>Logo</Typography>
                      <Box>
                        <input
                          type="file"
                          {...register('logo', { required: 'Logo is required' })}
                          accept=".jpg, .jpeg, .png"
                          style={{ display: 'none' }}
                          onChange={handleFormInputChange}
                          name="logo"
                          id="logo"
                        />
                        <label htmlFor="logo">
                          <TextField
                            variant="outlined"
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end" sx={{position: 'absolute', right: 5}}>
                                  <Box sx={{backgroundColor: '#979797', padding: "8px 15px 8px 15px", borderRadius: '5px'}}>
                                    <Typography sx={{color: '#FFF'}}>UPLOAD</Typography>
                                  </Box>
                                </InputAdornment>
                              ),
                            }}
                            error={!!errors.logo}
                          />
                        </label>
                      </Box>
                      {formValue?.logo === null || undefined ? (
                        <Typography>AWWW</Typography>
                      ):(
                        <Typography>{formValue?.logo.name}</Typography>
                      )}
                    </Box>
                  </Box>

                  <Typography sx={{marginTop: {md: 15}}}>Notes (Optional)</Typography>
                  <TextField
                    label="Notes"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={12}
                    {...register('notes')}
                    value={formValue.notes}
                    onChange={handleFormInputChange}
                    name="notes"
                  />

                  <Box sx={{marginTop: {md: 8}}}>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'space-between'}}>
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
                  </Box>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
