// import React,{useEffect,useState} from 'react';
// import { Box, Typography, TextField, Button, Container,Divider } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { toast } from "react-toastify";

// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../store/actions/loginActions';
// import MathCaptcha from "./MathCapcha"; 

// import { useNavigate } from 'react-router-dom';
// import './Auth.css';
// import '../../Images/vasaivirarmahangarpalika.jpg';
// import vvcmclogo from '../../Images/vvcmclogo.jpg';
// const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     password: Yup.string().required('Password is required'),
// });

// const Login = () => {
//     const [captchaValid, setCaptchaValid] = useState(false); 

//     const dispatch = useDispatch();
//     const navigate=useNavigate();
//     const authError = useSelector((state) => state.auth.error);
//     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//     useEffect(() => {
   
//         document.body.classList.add('auth-body');
//         return () => {
//           document.body.classList.remove('auth-body');
//         };
    
//       }, [dispatch]);

   

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: '',
//         },
//         validationSchema: validationSchema,
//         onSubmit: (values,{resetForm,setSubmitting}) => {
//              if (!captchaValid) {
//         toast.error("Incorrect CAPTCHA. Please try again.", { position: "top-center" });
//         return;
//       }
//             dispatch(login(values, navigate))
            
//             .then(()=>{
//                 resetForm();
//             }).catch(()=>{
//                setSubmitting(false);
//             })
//         },
//     });

//     return (
//         <Container className="Auth-Container" maxWidth="sm">
//             <Box
//                 sx={{
//                     width: '80%',
//                     margin: 'auto',
//                     padding: '10px 30px 30px 30px',
//                     border: '1px solid #d3d3d3',
//                     borderRadius: '8px',
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                     bgcolor: 'background.paper'
//                 }}
//                 component='form'
//                 onSubmit={formik.handleSubmit}
                
//             >


// <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
// <Box sx={{ width: '30%', height: '30%',}}>
//     <img src={vvcmclogo} height='100%' width='100%' /></Box>
// </Box>


             
//                 <Box className="Auth-LIB" >
             
//                 <TextField
//                     fullWidth
//                     id="email"
//                     name="email"
//                     label="Enter email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     error={formik.touched.email && Boolean(formik.errors.email)}
//                     helperText={formik.touched.email && formik.errors.email}
//                     margin="normal"
//                     variant="outlined"
//                     className="Auth-Input"
//                    size="small"
//                     InputLabelProps={{
//                         sx: {
//                             color: 'gray', 
//                         },
//                     }}
//                 />
//                 </Box>

//                 <Box className="Auth-LIB" >
               
//                 <TextField
//                     fullWidth
//                     id="password"
//                     name="password"
//                     label="Password"
//                     type="password"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     error={formik.touched.password && Boolean(formik.errors.password)}
//                     helperText={formik.touched.password && formik.errors.password}
//                     margin="normal"
//                     variant="outlined"
//                     className="Auth-Input"
//                    size="small"
//                     InputLabelProps={{
//                         sx: {
//                             color: 'gray',
//                         },

//                     }}
//                 />
//                 </Box>

//                 <MathCaptcha onValidate={setCaptchaValid} />

                
//                 {authError && (
//                     <Typography variant="body2" color="error" align="center" paragraph>
//                         {authError}
//                     </Typography>
//                 )}
//                 <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         className='Auth-Button'
//                         sx={{
                            
//                             '&:hover': {
//                                 bgcolor: '#81c784',
//                             }
//                         }}
//                     >
//                         Login
//                     </Button>
                    
//                 </Box>

//                 <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       mt:3
//       }}
//     >
//       <Divider
//         sx={{
//           width: '20%', 
//           borderColor: '#c3c3c3', 
//           borderWidth: '0.5px', 
//           mr:1
//         }}
//       />
//       <Typography sx={{fontSize:'10px',color:'gray',fontWeight:'bold'}}>Or</Typography>
//       <Divider
//         sx={{
//           width: '20%',
//           borderColor: '#c3c3c3', 
//           borderWidth: '0.5px', 
//           ml:1
//         }}
//       />
//     </Box>


//                 <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         className='Auth-Button-Signup'
//                         sx={{
                            
//                             '&:hover': {
//                                 bgcolor: '#81c784',
//                             }
//                         }}
//                     >
//                         <Typography
//         component={Link}
//         to="/register"
//         sx={{
//             fontSize:{
//              xl:'12px',
//              lg:'12px',
//              md:'10px',
//              sm:'9px',
//              xs:'9px'
//             },
//           textDecoration: 'none', 
//           color: 'inherit',       
//           '&:hover': {
//             color: '#1976d2',     
//           }
//         }}
//       >
//         Create new account
//       </Typography>

//                     </Button>
                    
//                 </Box>
                
                
//             </Box>
            
//         </Container>
//     );
// };

// export default Login;

// ======================================================

// import React, { useEffect, useState } from 'react';
// import { Box, Typography, TextField, Button, Container, Divider,InputAdornment,IconButton } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import { toast } from "react-toastify";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../store/actions/loginActions';
// import MathCaptcha from "./MathCapcha"; // Import Captcha
// import { useNavigate } from 'react-router-dom';
// import vvcmclogo from '../../Images/vvcmclogo.jpg';
// import { baseUrl } from '../../config/config';
// import LoaderLottie from '../../components/LoaderLottie'; // Import Loader

// import './Auth.css';
// const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     password: Yup.string().required('Password is required'),
// });

// const Login = () => {
//     const [captchaValid, setCaptchaValid] = useState(false);
//     const [showResend, setShowResend] = useState(false); // State to show resend button
//     const [userEmail, setUserEmail] = useState(""); // Store email for resend
//     const [loading, setLoading] = useState(false);
//      const [showPassword, setShowPassword] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const authError = useSelector((state) => state.auth.error);
//     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//     useEffect(() => {
//         document.body.classList.add('auth-body');
//         return () => {
//             document.body.classList.remove('auth-body');
//         };
//     }, [dispatch]);

//     useEffect(() => {
//         if (authError === "Email is not verified. Please verify your email to login.") {
//             setShowResend(true);
//         } else {
//             setShowResend(false);
//         }
//     }, [authError]);

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: '',
//         },
//         validationSchema: validationSchema,
//         onSubmit:async (values, { resetForm, setSubmitting }) => {
//             if (!captchaValid) {
//                 toast.error("Incorrect CAPTCHA. Please try again.", { position: "top-center" });
//                 return;
//             }
//             setUserEmail(values.email); // Store email for resend verification
//             setLoading(true); 

//             // dispatch(login(values, navigate))
//             //     .then(() => {
//             //         resetForm();
//             //     })
//             //     .catch(() => {
//             //         setSubmitting(false);
//             //     });
//             try {
//                 await dispatch(login(values, navigate));
//                 resetForm();
//             } catch (error) {
//                 setSubmitting(false);
//             } finally {
//                 setLoading(false); // ✅ Hide Loader
//             }
//         },
//     });

//     // **Function to Resend Verification Email**
//     const handleResendVerification = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch(`${baseUrl}/resend-verification`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email: userEmail }),
//             });

//             const data = await response.json();
//             setLoading(false); 
//             toast.success(data.message || "Verification link sent!", { position: "top-center" });
//         } catch (error) {
//             setLoading(false); 
//             toast.error("Something went wrong. Please try again.", { position: "top-center" });
//         }
//     };
//     const handleTogglePassword = () => {
//         setShowPassword((prev) => !prev);
//     };

//     return (
//         <Container className="Auth-Container" maxWidth="sm">
           
//             <Box
//                 sx={{
//                     width: '80%',
//                     margin: 'auto',
//                     padding: '10px 30px 30px 30px',
//                     border: '1px solid #d3d3d3',
//                     borderRadius: '8px',
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                     bgcolor: 'background.paper'
//                 }}
//                 component='form'
//                 onSubmit={formik.handleSubmit}
//             >
//                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                     <Box sx={{ width: '30%', height: '30%' }}>
//                         <img src={vvcmclogo} height='100%' width='100%' alt="Logo" />
//                     </Box>
//                 </Box>

//                 <TextField
//                     fullWidth
//                     id="email"
//                     name="email"
//                     label="Enter email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     error={formik.touched.email && Boolean(formik.errors.email)}
//                     helperText={formik.touched.email && formik.errors.email}
//                     margin="normal"
//                     variant="outlined"
//                     size="small"
//                     InputLabelProps={{
//                         sx: { color: 'gray' },
//                     }}
//                 />

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
//                     size="small"
//                     InputLabelProps={{
//                         sx: { color: 'gray' },
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

//                 <MathCaptcha onValidate={setCaptchaValid} />

//                 {authError && (
//                     <Typography variant="body2" color="error" align="center" paragraph>
//                         {authError}
//                     </Typography>
//                 )}

//                 {/* Show Resend Verification Button if User is not verified */}
//                 {showResend && (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//                         <Link
//                           className="anchorverificationlink"
//                             onClick={handleResendVerification}
//                         >
//                             Resend Verification Link
//                         </Link>

                       
//                     </Box>
//                 )}
// <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>{loading && <LoaderLottie />}</Box>

                

//                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                        className='Auth-Button'
//                         size="small"
//                         sx={{
//                              width:'80%',
//                             '&:hover': {
//                                 bgcolor: '#81c784',
                               
//                             }
//                         }}
//                     >
//                         Login
//                     </Button>
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
//                     <Divider sx={{ width: '20%', borderColor: '#c3c3c3', borderWidth: '0.5px', mr: 1 }} />
//                     <Typography sx={{ fontSize: '10px', color: 'gray', fontWeight: 'bold' }}>Or</Typography>
//                     <Divider sx={{ width: '20%', borderColor: '#c3c3c3', borderWidth: '0.5px', ml: 1 }} />
//                 </Box>

//                 <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                     <Button
//                         type="submit"
//                         variant="contained"
                      
//                         className='Auth-Button-Signup'
//                         sx={{
//                             backgroundColor:'#rgb(49,162,76)',
//                             '&:hover': {
//                                 bgcolor: '#81c784',
//                             }
//                         }}
//                     >
//                         <Typography
//                             component={Link}
//                             to="/register"
//                             sx={{
//                                 fontSize: { xl: '12px', lg: '12px', md: '10px', sm: '9px', xs: '9px' },
//                                 textDecoration: 'none',
//                                 color: 'inherit',
//                                 '&:hover': { fontWeight:'bold'},
//                             }}
//                         >
//                             Create new account
//                         </Typography>
//                     </Button>
//                 </Box>
                
//             </Box>
//         </Container>
//     );
// };

// export default Login;

// ============================================
// 14 July changes
import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Container, Divider, InputAdornment, IconButton, Paper, Avatar } from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/loginActions';
import MathCaptcha from "./MathCapcha"; // Import Captcha
import { useNavigate } from 'react-router-dom';
import vvcmclogo from '../../Images/vvcmclogo.jpg';
import { baseUrl } from '../../config/config';
import LoaderLottie from '../../components/LoaderLottie'; // Import Loader

import './Auth.css';
import './Login.css';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const [captchaValid, setCaptchaValid] = useState(false);
    const [showResend, setShowResend] = useState(false); // State to show resend button
    const [userEmail, setUserEmail] = useState(""); // Store email for resend
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authError = useSelector((state) => state.auth.error);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        document.body.classList.add('auth-body');
        return () => {
            document.body.classList.remove('auth-body');
        };
    }, [dispatch]);

    useEffect(() => {
        if (authError === "Email is not verified. Please verify your email to login.") {
            setShowResend(true);
        } else {
            setShowResend(false);
        }
    }, [authError]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            if (!captchaValid) {
                toast.error("Incorrect CAPTCHA. Please try again.", { position: "top-center" });
                return;
            }
            setUserEmail(values.email); // Store email for resend verification
            setLoading(true);

            try {
                await dispatch(login(values, navigate));
                resetForm();
            } catch (error) {
                setSubmitting(false);
            } finally {
                setLoading(false); // ✅ Hide Loader
            }
        },
    });

    // **Function to Resend Verification Email**
    const handleResendVerification = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/resend-verification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail }),
            });

            const data = await response.json();
            setLoading(false);
            toast.success(data.message || "Verification link sent!", { position: "top-center" });
        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong. Please try again.", { position: "top-center" });
        }
    };

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Container className="Auth-Container" maxWidth="sm">
            <Paper
                elevation={24}
                sx={{
                    width: { xs: '95%', sm: '90%', md: '85%', lg: '80%' },
                    maxWidth: '450px',
                    margin: 'auto',
                    padding: { xs: '15px 12px 20px 12px', sm: '18px 15px 22px 15px', md: '20px 18px 25px 18px' },
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
                component='form'
                onSubmit={formik.handleSubmit}
            >
                {/* Logo Section */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    mb: 2,
                    position: 'relative'
                }}>
                    <Box sx={{ 
                        width: { xs: '70px', sm: '80px', md: '90px' }, 
                        height: { xs: '70px', sm: '80px', md: '90px' },
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
                        <img 
                            src={vvcmclogo} 
                            style={{ 
                                height: '100%', 
                                width: '100%', 
                                objectFit: 'cover' 
                            }} 
                            alt="Logo" 
                        />
                    </Box>
                </Box>

                {/* Welcome Text */}
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            fontWeight: 'bold', 
                            color: '#333',
                            mb: 0.5,
                            fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.7rem' }
                        }}
                    >
                        Welcome Back
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: '#666',
                            fontSize: { xs: '0.8rem', sm: '0.9rem' }
                        }}
                    >
                        Please sign in to your account
                    </Typography>
                </Box>

                {/* Email Field */}
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Enter email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                    variant="outlined"
                    size="small"
                    sx={{
                        mb: 1.5,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            transition: 'all 0.3s ease',
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

                {/* Password Field */}
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
                            transition: 'all 0.3s ease',
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
                                <IconButton 
                                    onClick={handleTogglePassword} 
                                    edge="end"
                                    sx={{ 
                                        color: '#666',
                                        '&:hover': { color: '#0866FF' }
                                    }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* CAPTCHA - Fixed Alignment */}
                <MathCaptcha onValidate={setCaptchaValid} />

                {/* Error Message */}
                {authError && (
                    <Box sx={{ 
                        mb: 1.5, 
                        p: 1.5, 
                        bgcolor: 'rgba(244, 67, 54, 0.1)', 
                        borderRadius: '8px',
                        border: '1px solid rgba(244, 67, 54, 0.2)'
                    }}>
                        <Typography variant="body2" color="error" align="center" sx={{ fontSize: '0.85rem' }}>
                            {authError}
                        </Typography>
                    </Box>
                )}

                {/* Resend Verification */}
                {showResend && (
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mb: 1.5,
                        p: 1.5,
                        bgcolor: 'rgba(33, 150, 243, 0.1)',
                        borderRadius: '8px',
                        border: '1px solid rgba(33, 150, 243, 0.2)'
                    }}>
                        <Link
                            className="anchorverificationlink"
                            onClick={handleResendVerification}
                            style={{
                                textDecoration: 'none',
                                color: '#0866FF',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                fontSize: '0.9rem'
                            }}
                        >
                            Resend Verification Link
                        </Link>
                    </Box>
                )}

                {/* Loader */}
                {loading && (
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        mb: 1.5,
                        py: 1
                    }}>
                        <LoaderLottie />
                    </Box>
                )}

                {/* Login Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2,mt:2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        size="medium"
                        disabled={loading}
                        sx={{
                            width: { xs: '100%', sm: '80%' },
                            py: 1,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #0866FF 0%, #1976D2 100%)',
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            fontWeight: 'bold',
                            textTransform: 'none',
                            boxShadow: '0 4px 16px rgba(8, 102, 255, 0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #1976D2 0%, #0866FF 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 24px rgba(8, 102, 255, 0.4)',
                            },
                            '&:active': {
                                transform: 'translateY(0)',
                            },
                            '&:disabled': {
                                background: 'rgba(8, 102, 255, 0.3)',
                                transform: 'none',
                            }
                        }}
                    >
                        {loading ? 'Signing in...' : 'Login'}
                    </Button>
                </Box>

                {/* Divider */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    mb: 2,
                    px: 2
                }}>
                    <Divider sx={{ 
                        flex: 1, 
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                        '&::before, &::after': {
                            borderColor: 'rgba(0, 0, 0, 0.12)',
                        }
                    }} />
                    <Typography sx={{ 
                        px: 2,
                        fontSize: '0.8rem', 
                        color: '#666', 
                        fontWeight: '500',
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '20px',
                        py: 0.3
                    }}>
                        Or
                    </Typography>
                    <Divider sx={{ 
                        flex: 1, 
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                        '&::before, &::after': {
                            borderColor: 'rgba(0, 0, 0, 0.12)',
                        }
                    }} />
                </Box>

                {/* Sign Up Button - Fixed Link */}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Link 
                        to="/register" 
                        style={{ 
                            textDecoration: 'none',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Button
                            variant="contained"
                            size="medium"
                            sx={{
                                width: { xs: '100%', sm: '70%' },
                                py: 1,
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #31A24C 0%, #4CAF50 100%)',
                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                fontWeight: 'bold',
                                textTransform: 'none',
                                boxShadow: '0 4px 16px rgba(49, 162, 76, 0.3)',
                                transition: 'all 0.3s ease',
                                color: 'white',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #4CAF50 0%, #31A24C 100%)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 24px rgba(49, 162, 76, 0.4)',
                                },
                                '&:active': {
                                    transform: 'translateY(0)',
                                }
                            }}
                        >
                            Create new account
                        </Button>
                    </Link>
                </Box>

                {/* Already have account link */}
                {/* <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '20px',
                    marginTop: '10px'
                }}>
                    <Typography
                        component={Link}
                        to="/login"
                        sx={{
                            textDecoration: 'none',
                            fontSize: '12px',
                            color: '#797DF2',
                            transition: 'color 0.3s ease',
                            '&:hover': {
                                color: '#1976d2',
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        Already have an account?
                    </Typography>
                </Box> */}
            </Paper>
        </Container>
    );
};

export default Login;
