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

import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Container, Divider,InputAdornment,IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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
        onSubmit:async (values, { resetForm, setSubmitting }) => {
            if (!captchaValid) {
                toast.error("Incorrect CAPTCHA. Please try again.", { position: "top-center" });
                return;
            }
            setUserEmail(values.email); // Store email for resend verification
            setLoading(true); 

            // dispatch(login(values, navigate))
            //     .then(() => {
            //         resetForm();
            //     })
            //     .catch(() => {
            //         setSubmitting(false);
            //     });
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
           
            <Box
                sx={{
                    width: '80%',
                    margin: 'auto',
                    padding: '10px 30px 30px 30px',
                    border: '1px solid #d3d3d3',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    bgcolor: 'background.paper'
                }}
                component='form'
                onSubmit={formik.handleSubmit}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ width: '30%', height: '30%' }}>
                        <img src={vvcmclogo} height='100%' width='100%' alt="Logo" />
                    </Box>
                </Box>

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
                    InputLabelProps={{
                        sx: { color: 'gray' },
                    }}
                />

                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ?'password':'text'}  
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    margin="normal"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                        sx: { color: 'gray' },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <MathCaptcha onValidate={setCaptchaValid} />

                {authError && (
                    <Typography variant="body2" color="error" align="center" paragraph>
                        {authError}
                    </Typography>
                )}

                {/* Show Resend Verification Button if User is not verified */}
                {showResend && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Link
                          className="anchorverificationlink"
                            onClick={handleResendVerification}
                        >
                            Resend Verification Link
                        </Link>

                       
                    </Box>
                )}
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>{loading && <LoaderLottie />}</Box>

                

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                       className='Auth-Button'
                        size="small"
                        sx={{
                             width:'80%',
                            '&:hover': {
                                bgcolor: '#81c784',
                               
                            }
                        }}
                    >
                        Login
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
                    <Divider sx={{ width: '20%', borderColor: '#c3c3c3', borderWidth: '0.5px', mr: 1 }} />
                    <Typography sx={{ fontSize: '10px', color: 'gray', fontWeight: 'bold' }}>Or</Typography>
                    <Divider sx={{ width: '20%', borderColor: '#c3c3c3', borderWidth: '0.5px', ml: 1 }} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="submit"
                        variant="contained"
                      
                        className='Auth-Button-Signup'
                        sx={{
                            backgroundColor:'#rgb(49,162,76)',
                            '&:hover': {
                                bgcolor: '#81c784',
                            }
                        }}
                    >
                        <Typography
                            component={Link}
                            to="/register"
                            sx={{
                                fontSize: { xl: '12px', lg: '12px', md: '10px', sm: '9px', xs: '9px' },
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover': { fontWeight:'bold'},
                            }}
                        >
                            Create new account
                        </Typography>
                    </Button>
                </Box>
                
            </Box>
        </Container>
    );
};

export default Login;
