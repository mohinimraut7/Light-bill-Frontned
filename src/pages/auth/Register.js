// import React,{useEffect,useState} from 'react';
// import { Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, Container,InputAdornment,IconButton} from '@mui/material';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import vvcmclogo from '../../Images/vvcmclogo.jpg'; 
// import wardData from '../../data/warddata';
// import { addUser } from '../../store/actions/userActions';
// import LoaderLottie from '../../components/LoaderLottie';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// // import './Register.css';
// const validationSchema = Yup.object({
//     username: Yup.string().required('User Name is required'),
//     email: Yup.string().required('Email is required'),
//     // password: Yup.string().required('Password is required'),
//      password: Yup.string()
//             .min(8, 'Password must be at least 8 characters long')
//             .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
//             .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
//             .matches(/[0-9]/, 'Password must contain at least one number')
//             .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
//             .required('Password is required'),
//     // contactNumber: Yup.string().required('Contact Number is required'),
//     contactNumber: Yup.string()
//         .matches(/^\d{10}$/, "Contact number must be 10 digits")
//         .required("Contact number is required"),
//     address: Yup.string().required('Address is required'),

//     // role: Yup.string().required('Role is required'),
//     // ward: Yup.string().required('Ward is required'), // Add validation for ward
// });
// const Register = () => {
//     const dispatch = useDispatch();
//     const [loading, setLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);

//     useEffect(() => {
   
//         document.body.classList.add('auth-body');
//         return () => {
//           document.body.classList.remove('auth-body');
//         };
    
//       }, [dispatch]);
//     const formik = useFormik({
//         initialValues: {
//             username:'',
//             email:'',
//             password:'',
//             contactNumber:'',
//             address:'',
//             role:'',
//             ward:''
//         },
//         validationSchema: validationSchema,
//         // onSubmit: (values) => {
//         //         dispatch(addUser(values));
//         //       }
//         onSubmit: async (values) => {
//             setLoading(true); // Loader सुरू करणे
//             try {
//                 await dispatch(addUser(values));
//             } finally {
//                 setLoading(false); // Loader बंद करणे
//             }
//         }
//     });

//     const handleTogglePassword = () => {
//         setShowPassword((prev) => !prev);
//     };

//     return (
//         <Container maxWidth="xs">
//             <Box
//                 sx={{
//                     width: '80%',
//                     margin: 'auto',
//                     padding: '15px 30px 30px 30px',
//                     border: '1px solid #d3d3d3',
//                     borderRadius: '8px',
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                     bgcolor: 'background.paper',
                    
//                 }}
//                 component='form'
//                     onSubmit={formik.handleSubmit}
//             >
//                 <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
// <Box sx={{ width: '100%',display:'flex',justifyContent:'center',mb:1.2}}>
//     <Typography sx={{fontWeight:'bold',fontSize:'20px'}}>Create a new account</Typography>
//     </Box>
// </Box>

                
//                  {/* <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
//                         USER NAME
//                     </Typography> */}
//                 <TextField
//                     fullWidth
//                     id="username"
//                     name="username"
//                     label="Username"
//                     value={formik.values.username}
//                     onChange={formik.handleChange}
//                     error={formik.touched.username && Boolean(formik.errors.username)}
//                     helperText={formik.touched.username && formik.errors.username}
//                     margin="normal"
//                     variant="outlined"
//                     className='Auth-Input'
//                     sx={{marginBottom:'14px'}}
//                     size="small"
//                     InputLabelProps={{
//                         sx: {
//                             color: '#DDDDDD', // Change this to the desired color
//                         },
//                     }}
//                 />
//                  {/* <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
//                         EMAIL
//                     </Typography> */}
//                 <TextField
//                     fullWidth
//                     id="email"
//                     name="email"
//                     label="Email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     error={formik.touched.email && Boolean(formik.errors.email)}
//                     helperText={formik.touched.email && formik.errors.email}
//                     margin="normal"
//                     variant="outlined"
//                     className='Auth-Input'
//                     sx={{marginBottom:'14px'}}
//                    size="small"
//                     InputLabelProps={{
//                         sx: {
//                             color: '#DDDDDD', // Change this to the desired color
//                         },
//                     }}
//                 />
//                 {/* <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
//                   PASSWORD
//                  </Typography> */}
//                 <TextField
//                     fullWidth
//                     id="password"
//                     name="password"
//                     label="Password"
//                     type={showPassword ?'password':'text'}  
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     error={formik.touched.password && Boolean(formik.errors.password)}
//                     helperText={formik.touched.password && formik.errors.password}
//                     margin="normal"
//                     variant="outlined"
//                     className='Auth-Input'
//                     sx={{marginBottom:'14px'}}
//                     size="small"
//                     InputLabelProps={{
//                         sx: {
//                             color: '#DDDDDD', // Change this to the desired color
//                         },
//                     }}
//                     InputProps={{
//                         endAdornment: (
//                             <InputAdornment position="end">
//                                 <IconButton onClick={handleTogglePassword} edge="end">
//                                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//                 {/* <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
//                  CONTACT NUMBER
//                  </Typography> */}
//                 <TextField
//                     fullWidth
//                     id="contactNumber"
//                     name="contactNumber"
//                     label="Contact Number"
//                     value={formik.values.contactNumber}
//                     onChange={formik.handleChange}
//                     error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
//                     helperText={formik.touched.contactNumber && formik.errors.contactNumber}
//                     margin="normal"
//                     variant="outlined"
//                     className='Auth-Input'
//                     sx={{marginBottom:'14px'}}
//                     size="small"
//                     inputProps={{ maxLength: 10 }} 
//                     InputLabelProps={{
//                         sx: {
//                             color: '#DDDDDD', // Change this to the desired color
//                         },
//                     }}
//                 />
//                 {/* <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
//                  ADDRESS
//                  </Typography> */}
//                  <TextField
//                         fullWidth
//                         id="address"
//                         name="address"
//                         label="address"
//                         value={formik.values.address}
//                         onChange={formik.handleChange}
//                         error={formik.touched.address && Boolean(formik.errors.address)}
//                         helperText={formik.touched.address && formik.errors.address}
//                         margin="normal"
//                         variant="outlined"
//                         multiline
//                         minRows={1}
//                        size="small"
                        
//                         InputLabelProps={{
//                             sx: {
//                                 color: '#DDDDDD', // Change this to the desired color
//                             },
//                         }}
//     maxRows={10} 
//     className='Auth-Input'
//     sx={{
//         '& .MuiOutlinedInput-root': {
//             '& textarea': {
//                 overflow: 'auto',
//                 '&::-webkit-scrollbar': {
//                     width: '8px',
//                 },
//                 '&::-webkit-scrollbar-track': {
//                     background: '#f1f1f1',
//                 },
//                 '&::-webkit-scrollbar-thumb': {
//                     background: '#888',
//                     borderRadius: '10px', 
//                 },
//                 '&::-webkit-scrollbar-thumb:hover': {
//                     background: '#555', 
//                 },
//             },
//         },
//         marginBottom:'14px'
//     }}
//                     />
//                 {/* <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
//                  ROLE
//                  </Typography>
//                 <FormControl fullWidth margin="normal" variant="outlined" className='Auth-Input' sx={{marginBottom:'14px'}}>
//                     <InputLabel id="role-label" sx={{color:"#DDDDDD"}}>Role</InputLabel>
//                     <Select
//                         labelId="role-label"
//                         id="role"
//                         name="role"
//                         value={formik.values.role}
//                         onChange={formik.handleChange}
//                         label="Role"
//                         error={formik.touched.role && Boolean(formik.errors.role)}
//                     >
//                         <MenuItem value="Super Admin">Super Admin</MenuItem>
//                         <MenuItem value="Additional Commissioner">Additional Commissioner</MenuItem>
//                         <MenuItem value="Deputy Commissioner">Deputy Commissioner</MenuItem>
//                         <MenuItem value="Executive Engineer">Executive Engineer</MenuItem>
//                         <MenuItem value="Junior Engineer">Junior Engineer</MenuItem>
//                         <MenuItem value="Consumer">Consumer</MenuItem>
//                     </Select>
//                     {formik.touched.role && formik.errors.role && (
//                         <Typography color="error" variant="caption">{formik.errors.role}</Typography>
//                     )}
//                 </FormControl> */}

//                 {/* <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
//                  WARD
//                  </Typography> */}
//                 {/* <FormControl fullWidth margin="normal" variant="outlined" className='Auth-Input' size="small">
//                         <InputLabel id="ward-label" sx={{color:"#DDDDDD"}}>Ward</InputLabel>
//                         <Select
//                             labelId="ward-label"
//                             id="ward"
//                             name="ward"
//                             value={formik.values.ward}
//                             onChange={formik.handleChange}
//                             label="Ward"
//                             error={formik.touched.ward && Boolean(formik.errors.ward)}

                            
//                         >
//                             {wardData.map((ward, index) => (
//                                 <MenuItem key={index} value={ward.ward}>{ward.ward}</MenuItem>
//                             ))}
//                         </Select>
                       
//                     </FormControl> */}
//                 <Box sx={{display: 'flex', justifyContent: 'center' }}>


//                 {loading ? <LoaderLottie /> : (
//     <Button
//     type="submit"
//     variant="contained"
//     color="primary"
//     className='Auth-Button-Signup'
//     sx={{
//        backgroundColor:'#00A400',
//         '&:hover': {
//             bgcolor: '#81c784',
//         }
//     }}
// >
//     Register
// </Button>

// )}


                   
//                 </Box>
//                 {/* <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',height:'20px',marginTop:'10px'}}>
//                 <Typography
//         component={Link}
//         to="/login"
//         sx={{
//           textDecoration: 'none', // Remove underline
//           fontSize:'12px',
//           color: '#797DF2',       // Inherit the color from parent, or you can set custom color here
//           '&:hover': {
//             color: '#1976d2',     // Set hover color if needed
//           }
//         }}
//       >
//         Already have an account?
//       </Typography>
//                 </Box> */}

//                 {/* ------------------------------------------------------------- */}

//  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                     <Link 
//                         to="/login" 
//                         style={{ 
//                             textDecoration: 'none',
//                             width: '100%',
//                             display: 'flex',
//                             justifyContent: 'center'
//                         }}
//                     >
//                         <Button
//                             // variant="outlined"
//                             size="medium"
//                             sx={{
//                                 width: { xs: '100%', sm: '70%',md:'100%' },
//                                 py: 1,
//                                 // borderRadius: '12px',
//                                 // background: 'linear-gradient(135deg, #31A24C 0%, #4CAF50 100%)',
//                                 fontSize: { xs: '0.85rem', sm: '0.9rem' },
//                                 fontWeight: 'bold',
//                                 textTransform: 'none',
//                                 // boxShadow: '0 4px 16px rgba(49, 162, 76, 0.3)',
//                                 transition: 'all 0.3s ease',
//                                 color: '#000',
//                                 // '&:hover': {
//                                 //     background: 'linear-gradient(135deg, #4CAF50 0%, #31A24C 100%)',
//                                 //     transform: 'translateY(-2px)',
//                                 //     boxShadow: '0 6px 24px rgba(49, 162, 76, 0.4)',
//                                 // },
//                                 // '&:active': {
//                                 //     transform: 'translateY(0)',
//                                 // }
//                             }}
//                         >
//                             Already have an account?
//                         </Button>
//                     </Link>
//                 </Box>
// {/* ---------------------------------------------------------------------------- */}

//             </Box>
//         </Container>
//     );
// };
// export default Register;



// -------------------------------------------

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  InputAdornment,
  IconButton,
  Paper
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUser } from '../../store/actions/userActions';
import LoaderLottie from '../../components/LoaderLottie';
import vvcmclogo from '../../Images/vvcmclogo.jpg';

const validationSchema = Yup.object({
  username: Yup.string().required('User Name is required'),
  email: Yup.string().required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain uppercase')
    .matches(/[a-z]/, 'Must contain lowercase')
    .matches(/[0-9]/, 'Must contain number')
    .matches(/[@$!%*?&#]/, 'Must contain special char')
    .required('Password is required'),
  contactNumber: Yup.string()
    .matches(/^\d{10}$/, 'Must be 10 digits')
    .required('Contact number is required'),
  address: Yup.string().required('Address is required'),
});

const Register = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.body.classList.add('auth-body');
    return () => document.body.classList.remove('auth-body');
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      contactNumber: '',
      address: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await dispatch(addUser(values));
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <Container className="Auth-Container" maxWidth="sm">
      <Paper
        elevation={24}
        sx={{
          width: { xs: '95%', sm: '90%', md: '85%', lg: '80%' },
          maxWidth: '450px',
          margin: 'auto',
          padding: { xs: '15px 12px 20px', sm: '20px 18px 25px' },
          borderRadius: '16px',
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #0866FF, #31A24C, #0866FF)',
            backgroundSize: '200% 100%',
            animation: 'gradient 3s ease infinite',
          },
          '@keyframes gradient': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          }
        }}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box sx={{
            width: { xs: '70px', sm: '80px' },
            height: { xs: '70px', sm: '80px' },
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid rgba(8, 102, 255, 0.2)',
            boxShadow: '0 4px 16px rgba(8, 102, 255, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 6px 24px rgba(8, 102, 255, 0.4)',
            }
          }}>
            <img src={vvcmclogo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
        </Box>

        {/* Title */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 0.5 }}>
            Create New Account
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Please fill the details to register
          </Typography>
        </Box>

        {/* Form Fields */}
        {[
          { id: 'username', label: 'Username' },
          { id: 'email', label: 'Email' },
          { id: 'contactNumber', label: 'Contact Number' },
          { id: 'address', label: 'Address', multiline: true, minRows: 2 }
        ].map(({ id, label, multiline, minRows }) => (
          <TextField
            key={id}
            fullWidth
            id={id}
            name={id}
            label={label}
            value={formik.values[id]}
            onChange={formik.handleChange}
            error={formik.touched[id] && Boolean(formik.errors[id])}
            helperText={formik.touched[id] && formik.errors[id]}
            margin="normal"
            variant="outlined"
            size="small"
            multiline={multiline}
            minRows={minRows}
            sx={{
              mb: 1.5,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&:hover': {
                  boxShadow: '0 2px 8px rgba(8, 102, 255, 0.15)',
                },
                '&.Mui-focused': {
                  boxShadow: '0 4px 16px rgba(8, 102, 255, 0.25)',
                }
              },
              '& .MuiInputLabel-root': {
                color: '#666',
                '&.Mui-focused': {
                  color: '#0866FF',
                }
              }
            }}
          />
        ))}

        {/* Password */}
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
          variant="outlined"
          size="small"
          sx={{
            mb: 1.5,
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '&:hover': {
                boxShadow: '0 2px 8px rgba(8, 102, 255, 0.15)',
              },
              '&.Mui-focused': {
                boxShadow: '0 4px 16px rgba(8, 102, 255, 0.25)',
              }
            },
            '& .MuiInputLabel-root': {
              color: '#666',
              '&.Mui-focused': {
                color: '#0866FF',
              }
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {/* Register Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
          {loading ? <LoaderLottie /> : (
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                width: { xs: '100%', sm: '80%' },
                py: 1,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #31A24C 0%, #4CAF50 100%)',
                fontWeight: 'bold',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                textTransform: 'none',
                color: '#fff',
                boxShadow: '0 4px 16px rgba(49, 162, 76, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4CAF50 0%, #31A24C 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 24px rgba(49, 162, 76, 0.4)',
                }
              }}
            >
              Register
            </Button>
          )}
        </Box>

        {/* Already have account link */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '0.9rem',
              color: '#0866FF',
              padding: '6px 12px',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
            }}
          >
            Already have an account?
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
