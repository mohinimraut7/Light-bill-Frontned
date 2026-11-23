// // 14 July changes
// import React, { useEffect, useState } from 'react';
// import { Box, Typography, TextField, Button, Container, Divider, InputAdornment, IconButton, Paper, Avatar } from '@mui/material';
// import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import { toast } from "react-toastify";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../store/actions/loginActions';
// import MathCaptcha from "./MathCapcha"; // Import Captcha
// import { useNavigate } from 'react-router-dom';
// import vvcmclogo from '../../Images/vvcmclogo.jpg';

// import ajivpatil from '../../Images/ajivsir7.jpeg';
// import commissioner from '../../Images/commissioner.jpg';
// import dcm from '../../Images/dcm.jpg';


// import { baseUrl } from '../../config/config';
// import LoaderLottie from '../../components/LoaderLottie'; // Import Loader

// import './Auth.css';
// import './Login.css';

// const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     password: Yup.string().required('Password is required'),
// });

// const Login = () => {
//     const [captchaValid, setCaptchaValid] = useState(false);
//     const [showResend, setShowResend] = useState(false); // State to show resend button
//     const [userEmail, setUserEmail] = useState(""); // Store email for resend
//     const [loading, setLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
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
//         onSubmit: async (values, { resetForm, setSubmitting }) => {
//             if (!captchaValid) {
//                 toast.error("Incorrect CAPTCHA. Please try again.", { position: "top-center" });
//                 return;
//             }
//             setUserEmail(values.email); // Store email for resend verification
//             setLoading(true);

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
//             <Paper
//                 elevation={24}
//                 sx={{
//                     width: { xs: '95%', sm: '90%', md: '85%', lg: '80%' },
//                     maxWidth: '450px',
//                     margin: 'auto',
//                     padding: { xs: '15px 12px 20px 12px', sm: '18px 15px 22px 15px', md: '20px 18px 25px 18px' },
//                     borderRadius: '16px',
//                     bgcolor: 'rgba(255, 255, 255, 0.95)',
//                     backdropFilter: 'blur(10px)',
//                     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
//                     border: '1px solid rgba(255, 255, 255, 0.2)',
//                     position: 'relative',
//                     overflow: 'hidden',
//                     '&::before': {
//                         content: '""',
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         height: '4px',
//                         background: 'linear-gradient(90deg, #0866FF, #31A24C, #0866FF)',
//                         backgroundSize: '200% 100%',
//                         animation: 'gradient 3s ease infinite',
//                     },
//                     '@keyframes gradient': {
//                         '0%': { backgroundPosition: '0% 50%' },
//                         '50%': { backgroundPosition: '100% 50%' },
//                         '100%': { backgroundPosition: '0% 50%' },
//                     }
//                 }}
//                 component='form'
//                 onSubmit={formik.handleSubmit}
//             >
//                 {/* Logo Section */}
//                 <Box sx={{ 
//                     display: 'flex', 
//                     justifyContent: 'center', 
//                     alignItems: 'center', 
//                     mb: 2,
//                     position: 'relative'
//                 }}>
//                     <Box sx={{ 
//                         width: { xs: '70px', sm: '80px', md: '90px' }, 
//                         height: { xs: '70px', sm: '80px', md: '90px' },
//                         borderRadius: '50%',
//                         overflow: 'hidden',
//                         border: '3px solid rgba(8, 102, 255, 0.2)',
//                         boxShadow: '0 4px 16px rgba(8, 102, 255, 0.3)',
//                         transition: 'all 0.3s ease',
//                         '&:hover': {
//                             transform: 'scale(1.05)',
//                             boxShadow: '0 6px 24px rgba(8, 102, 255, 0.4)',
//                         }
//                     }}>
//                         <img 
//                             src={vvcmclogo} 
//                             style={{ 
//                                 height: '100%', 
//                                 width: '100%', 
//                                 objectFit: 'cover' 
//                             }} 
//                             alt="Logo" 
//                         />
//                     </Box>
//                 </Box>

//                 {/* Welcome Text */}
//                 <Box sx={{ textAlign: 'center', mb: 2 }}>
//                     <Typography 
//                         variant="h5" 
//                         sx={{ 
//                             fontWeight: 'bold', 
//                             color: '#333',
//                             mb: 0.5,
//                             fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.7rem' }
//                         }}
//                     >
//                         Welcome Back
//                     </Typography>
//                     <Typography 
//                         variant="body2" 
//                         sx={{ 
//                             color: '#666',
//                             fontSize: { xs: '0.8rem', sm: '0.9rem' }
//                         }}
//                     >
//                         Please sign in to your account
//                     </Typography>
//                 </Box>

//                 {/* Email Field */}
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
//                     sx={{
//                         mb: 1.5,
//                         '& .MuiOutlinedInput-root': {
//                             borderRadius: '12px',
//                             transition: 'all 0.3s ease',
//                             '&:hover': {
//                                 boxShadow: '0 2px 8px rgba(8, 102, 255, 0.15)',
//                             },
//                             '&.Mui-focused': {
//                                 boxShadow: '0 4px 16px rgba(8, 102, 255, 0.25)',
//                             }
//                         },
//                         '& .MuiInputLabel-root': {
//                             color: '#666',
//                             '&.Mui-focused': {
//                                 color: '#0866FF',
//                             }
//                         }
//                     }}
//                 />

//                 {/* Password Field */}
//                 <TextField
//                     fullWidth
//                     id="password"
//                     name="password"
//                     label="Password"
//                     type={showPassword ? 'text' : 'password'}
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     error={formik.touched.password && Boolean(formik.errors.password)}
//                     helperText={formik.touched.password && formik.errors.password}
//                     margin="normal"
//                     variant="outlined"
//                     size="small"
//                     sx={{
//                         mb: 1.5,
//                         '& .MuiOutlinedInput-root': {
//                             borderRadius: '12px',
//                             transition: 'all 0.3s ease',
//                             '&:hover': {
//                                 boxShadow: '0 2px 8px rgba(8, 102, 255, 0.15)',
//                             },
//                             '&.Mui-focused': {
//                                 boxShadow: '0 4px 16px rgba(8, 102, 255, 0.25)',
//                             }
//                         },
//                         '& .MuiInputLabel-root': {
//                             color: '#666',
//                             '&.Mui-focused': {
//                                 color: '#0866FF',
//                             }
//                         }
//                     }}
//                     InputProps={{
//                         endAdornment: (
//                             <InputAdornment position="end">
//                                 <IconButton 
//                                     onClick={handleTogglePassword} 
//                                     edge="end"
//                                     sx={{ 
//                                         color: '#666',
//                                         '&:hover': { color: '#0866FF' }
//                                     }}
//                                 >
//                                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                             </InputAdornment>
//                         ),
//                     }}
//                 />

//                 {/* CAPTCHA - Fixed Alignment */}
//                 <MathCaptcha onValidate={setCaptchaValid} />

//                 {/* Error Message */}
//                 {authError && (
//                     <Box sx={{ 
//                         mb: 1.5, 
//                         p: 1.5, 
//                         bgcolor: 'rgba(244, 67, 54, 0.1)', 
//                         borderRadius: '8px',
//                         border: '1px solid rgba(244, 67, 54, 0.2)'
//                     }}>
//                         <Typography variant="body2" color="error" align="center" sx={{ fontSize: '0.85rem' }}>
//                             {authError}
//                         </Typography>
//                     </Box>
//                 )}

//                 {/* Resend Verification */}
//                 {showResend && (
//                     <Box sx={{ 
//                         display: 'flex', 
//                         justifyContent: 'center', 
//                         mb: 1.5,
//                         p: 1.5,
//                         bgcolor: 'rgba(33, 150, 243, 0.1)',
//                         borderRadius: '8px',
//                         border: '1px solid rgba(33, 150, 243, 0.2)'
//                     }}>
//                         <Link
//                             className="anchorverificationlink"
//                             onClick={handleResendVerification}
//                             style={{
//                                 textDecoration: 'none',
//                                 color: '#0866FF',
//                                 fontWeight: '500',
//                                 cursor: 'pointer',
//                                 transition: 'all 0.3s ease',
//                                 padding: '6px 12px',
//                                 borderRadius: '6px',
//                                 fontSize: '0.9rem'
//                             }}
//                         >
//                             Resend Verification Link
//                         </Link>
//                     </Box>
//                 )}

//                 {/* Loader */}
//                 {loading && (
//                     <Box sx={{ 
//                         display: 'flex', 
//                         justifyContent: 'center', 
//                         alignItems: 'center', 
//                         mb: 1.5,
//                         py: 1
//                     }}>
//                         <LoaderLottie />
//                     </Box>
//                 )}

//                 {/* Login Button */}
//                 <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2,mt:2 }}>
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         size="medium"
//                         disabled={loading}
//                         sx={{
//                             width: { xs: '100%', sm: '80%' },
//                             py: 1,
//                             borderRadius: '12px',
//                             background: 'linear-gradient(135deg, #0866FF 0%, #1976D2 100%)',
//                             fontSize: { xs: '0.9rem', sm: '1rem' },
//                             fontWeight: 'bold',
//                             textTransform: 'none',
//                             boxShadow: '0 4px 16px rgba(8, 102, 255, 0.3)',
//                             transition: 'all 0.3s ease',
//                             '&:hover': {
//                                 background: 'linear-gradient(135deg, #1976D2 0%, #0866FF 100%)',
//                                 transform: 'translateY(-2px)',
//                                 boxShadow: '0 6px 24px rgba(8, 102, 255, 0.4)',
//                             },
//                             '&:active': {
//                                 transform: 'translateY(0)',
//                             },
//                             '&:disabled': {
//                                 background: 'rgba(8, 102, 255, 0.3)',
//                                 transform: 'none',
//                             }
//                         }}
//                     >
//                         {loading ? 'Signing in...' : 'Login'}
//                     </Button>
//                 </Box>

//                 {/* Divider */}
//                 <Box sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     justifyContent: 'center', 
//                     mb: 2,
//                     px: 2
//                 }}>
//                     <Divider sx={{ 
//                         flex: 1, 
//                         borderColor: 'rgba(0, 0, 0, 0.12)',
//                         '&::before, &::after': {
//                             borderColor: 'rgba(0, 0, 0, 0.12)',
//                         }
//                     }} />
//                     <Typography sx={{ 
//                         px: 2,
//                         fontSize: '0.8rem', 
//                         color: '#666', 
//                         fontWeight: '500',
//                         bgcolor: 'rgba(255, 255, 255, 0.8)',
//                         borderRadius: '20px',
//                         py: 0.3
//                     }}>
//                         Or
//                     </Typography>
//                     <Divider sx={{ 
//                         flex: 1, 
//                         borderColor: 'rgba(0, 0, 0, 0.12)',
//                         '&::before, &::after': {
//                             borderColor: 'rgba(0, 0, 0, 0.12)',
//                         }
//                     }} />
//                 </Box>

//                 {/* Sign Up Button - Fixed Link */}
//                 <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                     <Link 
//                         to="/register" 
//                         style={{ 
//                             textDecoration: 'none',
//                             width: '100%',
//                             display: 'flex',
//                             justifyContent: 'center'
//                         }}
//                     >
//                         <Button
//                             variant="contained"
//                             size="medium"
//                             sx={{
//                                 width: { xs: '100%', sm: '70%' },
//                                 py: 1,
//                                 borderRadius: '12px',
//                                 background: 'linear-gradient(135deg, #31A24C 0%, #4CAF50 100%)',
//                                 fontSize: { xs: '0.85rem', sm: '0.9rem' },
//                                 fontWeight: 'bold',
//                                 textTransform: 'none',
//                                 boxShadow: '0 4px 16px rgba(49, 162, 76, 0.3)',
//                                 transition: 'all 0.3s ease',
//                                 color: 'white',
//                                 '&:hover': {
//                                     background: 'linear-gradient(135deg, #4CAF50 0%, #31A24C 100%)',
//                                     transform: 'translateY(-2px)',
//                                     boxShadow: '0 6px 24px rgba(49, 162, 76, 0.4)',
//                                 },
//                                 '&:active': {
//                                     transform: 'translateY(0)',
//                                 }
//                             }}
//                         >
//                             Create new account
//                         </Button>
//                     </Link>
//                 </Box>

//                 {/* Already have account link */}
//                 {/* <Box sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     height: '20px',
//                     marginTop: '10px'
//                 }}>
//                     <Typography
//                         component={Link}
//                         to="/login"
//                         sx={{
//                             textDecoration: 'none',
//                             fontSize: '12px',
//                             color: '#797DF2',
//                             transition: 'color 0.3s ease',
//                             '&:hover': {
//                                 color: '#1976d2',
//                                 textDecoration: 'underline'
//                             }
//                         }}
//                     >
//                         Already have an account?
//                     </Typography>
//                 </Box> */}
//             </Paper>
//         </Container>
//     );
// };

// export default Login;




// 8-Oct-2026: NEW premium login UI (reference image pramane).
// Login logic (formik + yup, captcha check, redux login, resend verification, loader) jashi hoti tashich thevli aahe.
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   InputAdornment,
//   IconButton,
//   Checkbox,
//   FormControlLabel,
//   Link as MuiLink,
//   InputBase,
//   Tooltip,
//   GlobalStyles,
// } from '@mui/material';
// import {
//   Visibility,
//   VisibilityOff,
//   MailOutlineRounded,
//   LockOutlined,
//   ArrowForwardRounded,
//   PersonAddAltOutlined,
//   RefreshRounded as RefreshRoundedIcon,
// } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../store/actions/loginActions';
// import { useNavigate } from 'react-router-dom';
// import poleLoginBg from '../../Images/poleLoginBg.png';
// import vvcmclogo from '../../Images/vvcmclogo.jpg';
// import ajivpatil from '../../Images/ajivsir7.jpeg';
// import commissioner from '../../Images/commissioner.jpg';
// import dcm from '../../Images/dcm.jpg';

// import { baseUrl } from '../../config/config';
// import LoaderLottie from '../../components/LoaderLottie'; // Import Loader


// import './Auth.css';
// import './Login.css';

// const COLORS = {
//   deep: '#00165A',
//   blue: '#0066D9',
//   cyan: '#2FD8E8',
//   lightCyan: '#E3F8FC',
//   gold: '#F4C400',
//   muted: '#6B6F9A',
// };

// const REMEMBER_KEY = 'lb_remember_email';

// const safeGet = (k) => {
//   try { return window.localStorage.getItem(k); } catch (e) { return null; }
// };
// const safeSet = (k, v) => {
//   try {
//     if (v) window.localStorage.setItem(k, v);
//     else window.localStorage.removeItem(k);
//   } catch (e) { /* storage blocked — ignore */ }
// };


// // ================= Branding =================
// const GOLD = '#F4C400';

// const LoginBranding = () => (
//   <Box
//     className="lb-fade-up"
//     sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 2.5, lg: 3 } }}
//   >
//     {/* Logo */}
//     <Box
//       sx={{
//         flexShrink: 0,
//         width: { xs: 76, sm: 104, md: 118, lg: 140 },
//         height: { xs: 76, sm: 104, md: 118, lg: 140 },
//         borderRadius: '50%',
//         p: { xs: '4px', lg: '6px' },
//         background: 'linear-gradient(145deg, #ffffff 0%, #e3f8fc 100%)',
//         boxShadow: '0 10px 30px rgba(0, 22, 90, 0.28), 0 0 0 3px rgba(255,255,255,0.55)',
//       }}
//     >
//       <Box
//         component="img"
//         src={vvcmclogo}
//         alt="वसई-विरार शहर महानगरपालिका लोगो"
//         sx={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
//       />
//     </Box>

//     {/* Gold vertical accent */}
//     <Box
//       aria-hidden="true"
//       sx={{
//         alignSelf: 'stretch',
//         width: '3px',
//         my: { xs: 1, lg: 1.5 },
//         borderRadius: 2,
//         background: GOLD,
//         flexShrink: 0,
//       }}
//     />

//     {/* Text */}
//     <Box sx={{ minWidth: 0, fontFamily: 'Montserrat, sans-serif' }}>
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//         <Typography
//           component="span"
//           sx={{
//             fontFamily: 'inherit',
//             fontWeight: 600,
//             fontSize: { xs: 11, sm: 13, lg: 15 },
//             letterSpacing: { xs: '3px', lg: '5px' },
//             color: '#ffffff',
//             textTransform: 'uppercase',
//           }}
//         >
//           Welcome
//         </Typography>
//         <Box
//           aria-hidden="true"
//           sx={{
//             flex: 1,
//             maxWidth: 260,
//             height: '1.5px',
//             background: 'linear-gradient(90deg, rgba(255,255,255,0.85), rgba(255,255,255,0))',
//             display: { xs: 'none', sm: 'block' },
//           }}
//         />
//       </Box>
//       <Typography
//         component="h1"
//         sx={{
//           fontFamily: 'inherit',
//           fontWeight: 800,
//           color: '#ffffff',
//           lineHeight: 1.05,
//           fontSize: { xs: 30, sm: 44, md: 46, lg: 58, xl: 66 },
//           letterSpacing: '-0.5px',
//           textShadow: '0 4px 18px rgba(0, 22, 90, 0.35)',
//           mt: { xs: 0.5, lg: 0.75 },
//         }}
//       >
//         Vasai-Virar
//       </Typography>
//       <Typography
//         sx={{
//           fontFamily: 'inherit',
//           fontWeight: 500,
//           color: '#ffffff',
//           lineHeight: 1.2,
//           fontSize: { xs: 16, sm: 24, md: 24, lg: 32, xl: 38 },
//           textShadow: '0 3px 14px rgba(0, 22, 90, 0.35)',
//         }}
//       >
//         City Municipal Corporation
//       </Typography>
//     </Box>
//   </Box>
// );

// // ================= Leader cards =================
// const LEADERS = [
//   { img: ajivpatil, designation: 'मा. महापौर', name: 'श्री. अजीव पाटील' },
//   { img: commissioner, designation: 'मा. आयुक्त', name: 'डॉ. अनिल कुमार पवार' },
//   { img: dcm, designation: 'मा. अतिरिक्त आयुक्त', name: 'श्री. संजय कोंटे' },
// ];

// const LeaderCards = () => (
//   <Box
//     className="lb-leaders-scroll lb-fade-up lb-delay-1"
//     component="ul"
//     aria-label="मान्यवर"
//     sx={{
//       listStyle: 'none',
//       m: 0,
//       p: 0,
//       display: 'grid',
//       gridTemplateColumns: { xs: 'repeat(3, minmax(150px, 1fr))', sm: 'repeat(3, 1fr)' },
//       gap: { xs: 1.5, sm: 2, lg: 2.5 },
//       maxWidth: { sm: 640, lg: 700 },
//       overflowX: { xs: 'auto', sm: 'visible' },
//       scrollSnapType: { xs: 'x mandatory', sm: 'none' },
//       pb: { xs: 1, sm: 0 },
//     }}
//   >
//     {LEADERS.map((l) => (
//       <Box
//         component="li"
//         key={l.name}
//         sx={{
//           scrollSnapAlign: 'start',
//           bgcolor: '#FFFDF8',
//           borderRadius: '20px',
//           overflow: 'hidden',
//           boxShadow: '0 12px 32px rgba(0, 22, 90, 0.22)',
//           border: '1px solid rgba(255,255,255,0.9)',
//           display: 'flex',
//           flexDirection: 'column',
//           transition: 'transform 0.25s ease, box-shadow 0.25s ease',
//           '&:hover': {
//             transform: 'translateY(-3px)',
//             boxShadow: '0 16px 38px rgba(0, 22, 90, 0.28)',
//           },
//         }}
//       >
//         <Box
//           sx={{
//             m: { xs: '8px 8px 0', lg: '10px 10px 0' },
//             borderRadius: '14px 14px 6px 6px',
//             overflow: 'hidden',
//             aspectRatio: '4 / 3.4',
//             background: 'linear-gradient(180deg, #F6EFE2 0%, #EFE6D6 100%)',
//           }}
//         >
//           <Box
//             component="img"
//             src={l.img}
//             alt={`${l.designation} ${l.name}`}
//             loading="lazy"
//             sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
//           />
//         </Box>
//         <Box
//           sx={{
//             px: 1,
//             pt: { xs: 1, lg: 1.25 },
//             pb: { xs: 1.25, lg: 1.5 },
//             textAlign: 'center',
//             fontFamily: '"Noto Sans Devanagari", sans-serif',
//             flex: 1,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Typography
//             sx={{ fontFamily: 'inherit', fontWeight: 700, color: '#00165A', fontSize: { xs: 13, lg: 15, xl: 16 }, lineHeight: 1.35 }}
//           >
//             {l.designation}
//           </Typography>
//           <Typography
//             sx={{ fontFamily: 'inherit', fontWeight: 800, color: '#00165A', fontSize: { xs: 13, lg: 15, xl: 16 }, lineHeight: 1.35 }}
//           >
//             {l.name}
//           </Typography>
//           <Box aria-hidden="true" sx={{ mt: 0.75, width: 34, height: 3, borderRadius: 2, bgcolor: '#F4C400' }} />
//         </Box>
//       </Box>
//     ))}
//   </Box>
// );

// // ================= CAPTCHA =================
// // Gondhal hou naye mhanun 0/O, 1/I/L vagle aahet
// const CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
// const LENGTH = 4;

// const generateCode = () =>
//   Array.from({ length: LENGTH }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');

// const boxBase = {
//   height: { xs: 50, md: 60 },
//   bgcolor: '#ffffff',
//   borderRadius: '14px',
//   boxShadow: 'inset 0 1px 3px rgba(0, 22, 90, 0.06), 0 2px 8px rgba(0, 22, 90, 0.05)',
//   border: '1px solid rgba(0, 22, 90, 0.06)',
// };

// /**
//  * MathCaptcha sarkhach API: onValidate(true/false).
//  * `resetKey` badalla ki captcha navin hoto (login fail jhalyavar vaparu shakta).
//  */
// const LoginCaptcha = ({ onValidate, resetKey }) => {
//   const [code, setCode] = useState(generateCode);
//   const [value, setValue] = useState('');

//   const refresh = useCallback(() => {
//     setCode(generateCode());
//     setValue('');
//     onValidate(false);
//   }, [onValidate]);

//   useEffect(() => {
//     if (resetKey !== undefined) refresh();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [resetKey]);

//   const handleChange = (e) => {
//     const v = e.target.value.toUpperCase().replace(/\s/g, '').slice(0, LENGTH);
//     setValue(v);
//     onValidate(v === code);
//   };

//   return (
//     <Box
//       sx={{
//         display: 'grid',
//         gridTemplateColumns: { xs: '0.9fr 50px 1.25fr', md: '1fr 60px 1.2fr' },
//         gap: { xs: 1, md: 1.25 },
//         alignItems: 'center',
//       }}
//     >
//       <Box
//         aria-label={`CAPTCHA code: ${code.split('').join(' ')}`}
//         role="img"
//         sx={{
//           ...boxBase,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           userSelect: 'none',
//           fontFamily: 'Montserrat, sans-serif',
//           fontWeight: 800,
//           fontSize: { xs: 22, md: 26 },
//           letterSpacing: { xs: '6px', md: '9px' },
//           color: '#00165A',
//           pl: '6px',
//           backgroundImage:
//             'repeating-linear-gradient(135deg, rgba(0,102,217,0.045) 0 6px, transparent 6px 12px)',
//         }}
//       >
//         {code}
//       </Box>

//       <Tooltip title="Refresh CAPTCHA">
//         <IconButton
//           onClick={refresh}
//           aria-label="Refresh CAPTCHA"
//           sx={{
//             ...boxBase,
//             width: '100%',
//             color: '#00165A',
//             transition: 'all 0.25s ease',
//             '& svg': { transition: 'transform 0.4s ease' },
//             '&:hover': { bgcolor: '#E3F8FC', '& svg': { transform: 'rotate(180deg)' } },
//             '&.Mui-focusVisible': { outline: '2px solid #0066D9', outlineOffset: 2 },
//           }}
//         >
//           <RefreshRoundedIcon />
//         </IconButton>
//       </Tooltip>

//       <InputBase
//         value={value}
//         onChange={handleChange}
//         placeholder="Enter CAPTCHA"
//         inputProps={{ 'aria-label': 'Enter CAPTCHA', autoComplete: 'off', spellCheck: 'false' }}
//         sx={{
//           ...boxBase,
//           px: { xs: 1.5, md: 2 },
//           fontFamily: 'Montserrat, sans-serif',
//           fontSize: { xs: 14, md: 16 },
//           color: '#00165A',
//           fontWeight: 600,
//           letterSpacing: value ? '3px' : 0,
//           transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
//           '& input::placeholder': { color: '#6B6F9A', opacity: 1, fontWeight: 500, letterSpacing: 0 },
//           '&.Mui-focused': {
//             borderColor: '#0066D9',
//             boxShadow: '0 0 0 3px rgba(0, 102, 217, 0.15)',
//           },
//         }}
//       />
//     </Box>
//   );
// };

// // Fonts + animation (purvi LoginPage.css madhe hote)
// const loginGlobalStyles = (
//   <GlobalStyles
//     styles={`
//       @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@500;600;700;800&display=swap');
//       body.lb-login-body { margin: 0; overflow-x: hidden; }
//       @keyframes lbFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
//       .lb-fade-up { animation: lbFadeUp 0.6s ease-out both; }
//       .lb-delay-1 { animation-delay: 0.08s; }
//       .lb-delay-2 { animation-delay: 0.16s; }
//       @media (prefers-reduced-motion: reduce) { .lb-fade-up { animation: none; } }
//       .lb-leaders-scroll::-webkit-scrollbar { display: none; }
//       .lb-leaders-scroll { scrollbar-width: none; }
//     `}
//   />
// );

// const validationSchema = Yup.object({
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string().required('Password is required'),
// });

// // Email / Password input cha common style
// const inputSx = {
//   '& .MuiOutlinedInput-root': {
//     height: { xs: 56, md: 62 },
//     bgcolor: '#ffffff',
//     borderRadius: '15px',
//     fontFamily: 'Montserrat, sans-serif',
//     fontSize: { xs: 15, md: 16 },
//     color: COLORS.deep,
//     fontWeight: 500,
//     boxShadow: 'inset 0 1px 3px rgba(0, 22, 90, 0.06), 0 2px 8px rgba(0, 22, 90, 0.05)',
//     transition: 'box-shadow 0.2s ease',
//     '& fieldset': { borderColor: 'rgba(0, 22, 90, 0.06)' },
//     '&:hover fieldset': { borderColor: 'rgba(0, 102, 217, 0.35)' },
//     '&.Mui-focused fieldset': { borderColor: COLORS.blue, borderWidth: '1.5px' },
//     '&.Mui-focused': { boxShadow: '0 0 0 3px rgba(0, 102, 217, 0.15)' },
//     '&.Mui-error fieldset': { borderColor: '#d32f2f' },
//   },
//   '& .MuiOutlinedInput-input': { py: 0 },
//   '& .MuiOutlinedInput-input::placeholder': { color: COLORS.muted, opacity: 1 },
//   '& .MuiFormHelperText-root': { fontFamily: 'Montserrat, sans-serif', ml: 1, fontWeight: 500 },
//   '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: COLORS.deep, fontSize: 26 },
//   // Chrome autofill cha pivla background kadhaycha
//   '& input:-webkit-autofill': {
//     WebkitBoxShadow: '0 0 0 100px #ffffff inset',
//     WebkitTextFillColor: COLORS.deep,
//   },
// };

// const Login = () => {
//   const [captchaValid, setCaptchaValid] = useState(false);
//   const [showResend, setShowResend] = useState(false); // State to show resend button
//   const [userEmail, setUserEmail] = useState(''); // Store email for resend
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(() => Boolean(safeGet(REMEMBER_KEY)));
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const authError = useSelector((state) => state.auth.error);
//   // eslint-disable-next-line no-unused-vars
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   // Juna 'auth-body' background aata vaprat nahi — page cha swatahcha background aahe
//   useEffect(() => {
//     document.body.classList.add('lb-login-body');
//     return () => {
//       document.body.classList.remove('lb-login-body');
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     if (authError === 'Email is not verified. Please verify your email to login.') {
//       setShowResend(true);
//     } else {
//       setShowResend(false);
//     }
//   }, [authError]);

//   const formik = useFormik({
//     initialValues: {
//       email: safeGet(REMEMBER_KEY) || '',
//       password: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm, setSubmitting }) => {
//       if (!captchaValid) {
//         toast.error('Incorrect CAPTCHA. Please try again.', { position: 'top-center' });
//         return;
//       }
//       setUserEmail(values.email); // Store email for resend verification
//       safeSet(REMEMBER_KEY, rememberMe ? values.email : null);
//       setLoading(true);

//       try {
//         await dispatch(login(values, navigate));
//         resetForm({ values: { email: rememberMe ? values.email : '', password: '' } });
//       } catch (error) {
//         setSubmitting(false);
//       } finally {
//         setLoading(false); // ✅ Hide Loader
//       }
//     },
//   });

//   // **Function to Resend Verification Email**
//   const handleResendVerification = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${baseUrl}/resend-verification`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: userEmail }),
//       });

//       const data = await response.json();
//       setLoading(false);
//       toast.success(data.message || 'Verification link sent!', { position: 'top-center' });
//     } catch (error) {
//       setLoading(false);
//       toast.error('Something went wrong. Please try again.', { position: 'top-center' });
//     }
//   };

//   const handleTogglePassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   // Forgot password sathi abhi route nahi — tayar jhala ki ithe navigate('/forgot-password') kara
//   const handleForgotPassword = () => {
//     toast.info('Password reset sathi kripaya system administrator la samparka kara.', { position: 'top-center' });
//   };

//   return (
//     <>
//     {loginGlobalStyles}
//     <Box
//       sx={{
//         position: 'fixed',
//         inset: 0,
//         zIndex: 1,
//         overflowY: 'auto',
//         overflowX: 'hidden',
//         backgroundColor: '#5BB6EE',
//         backgroundImage: `url(${poleLoginBg})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center bottom',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <Box
//         sx={{
//           minHeight: '100%',
//           maxWidth: 1600,
//           mx: 'auto',
//           px: { xs: 2, sm: 4, md: 5, lg: 7, xl: 9 },
//           py: { xs: 3, sm: 4, md: 4 },
//           boxSizing: 'border-box',
//           display: 'grid',
//           alignContent: 'center',
//           gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 57fr) minmax(0, 43fr)' },
//           gridTemplateAreas: {
//             xs: '"brand" "login" "leaders" "title"',
//             md: '"brand login" "leaders login" "title login"',
//           },
//           columnGap: { md: 4, lg: 6 },
//           rowGap: { xs: 3, sm: 3.5, lg: 4 },
//         }}
//       >
//         {/* ===== LEFT: Branding ===== */}
//         <Box sx={{ gridArea: 'brand', alignSelf: 'end' }}>
//           <LoginBranding />
//         </Box>

//         {/* ===== LEFT: Leader cards ===== */}
//         <Box sx={{ gridArea: 'leaders', minWidth: 0 }}>
//           <LeaderCards />
//         </Box>

//         {/* ===== LEFT: System title ===== */}
//         <Box
//           className="lb-fade-up lb-delay-2"
//           sx={{
//             gridArea: 'title',
//             alignSelf: 'start',
//             fontFamily: 'Montserrat, sans-serif',
//             // Mobile var background ujwal asto — vachayla sopa mhanun halka glass
//             ...{
//               p: { xs: 2, md: 0 },
//               borderRadius: { xs: '16px', md: 0 },
//               bgcolor: { xs: 'rgba(255,255,255,0.55)', md: 'transparent' },
//               backdropFilter: { xs: 'blur(8px)', md: 'none' },
//             },
//           }}
//         >
//           <Box aria-hidden="true" sx={{ width: 84, height: 4, borderRadius: 2, bgcolor: COLORS.gold, mb: 1.5 }} />
//           <Typography
//             component="h2"
//             sx={{
//               fontFamily: 'inherit',
//               fontWeight: 800,
//               color: COLORS.deep,
//               fontSize: { xs: 22, sm: 26, lg: 30, xl: 34 },
//               lineHeight: 1.2,
//               letterSpacing: '-0.3px',
//             }}
//           >
//             Light Bill Management System
//           </Typography>
//           <Typography
//             sx={{
//               fontFamily: 'inherit',
//               fontWeight: 500,
//               color: '#0B2A7A',
//               fontSize: { xs: 15, sm: 18, lg: 21, xl: 23 },
//               lineHeight: 1.4,
//               mt: 0.5,
//               maxWidth: 440,
//             }}
//           >
//             Smart, secure and transparent control of every electricity bill.
//           </Typography>
//         </Box>

//         {/* ===== RIGHT: Login card ===== */}
//         <Box
//           sx={{
//             gridArea: 'login',
//             display: 'flex',
//             justifyContent: { xs: 'center', md: 'flex-end' },
//             alignItems: 'center',
//             minWidth: 0,
//           }}
//         >
//           <Box
//             component="form"
//             noValidate
//             onSubmit={formik.handleSubmit}
//             aria-labelledby="lb-login-title"
//             className="lb-fade-up lb-delay-1"
//             sx={{
//               width: '100%',
//               maxWidth: { xs: 520, lg: 540 },
//               boxSizing: 'border-box',
//               px: { xs: 2.5, sm: 4, lg: 5 },
//               py: { xs: 3.5, sm: 4.5, lg: 5.5 },
//               borderRadius: { xs: '24px', md: '30px' },
//               background:
//                 'linear-gradient(160deg, rgba(255,255,255,0.78) 0%, rgba(232,248,253,0.66) 55%, rgba(214,242,252,0.62) 100%)',
//               backdropFilter: 'blur(22px) saturate(140%)',
//               WebkitBackdropFilter: 'blur(22px) saturate(140%)',
//               border: '1px solid rgba(255,255,255,0.75)',
//               boxShadow:
//                 '0 30px 70px rgba(0, 40, 120, 0.22), 0 0 0 1px rgba(47,216,232,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
//               fontFamily: 'Montserrat, sans-serif',
//               // Laptop (1366x768) sarkhya kami height chya screen var card compact
//               '@media (min-width: 900px) and (max-height: 820px)': {
//                 py: 3.5,
//                 '& .lb-login-head': { mb: 2.5 },
//                 '& .lb-gap': { mt: 2 },
//               },
//             }}
//           >
//             {/* Header */}
//             <Box className="lb-login-head" sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
//               <Typography
//                 id="lb-login-title"
//                 component="h2"
//                 sx={{
//                   fontFamily: 'inherit',
//                   fontWeight: 800,
//                   color: COLORS.deep,
//                   fontSize: { xs: 34, md: 44 },
//                   lineHeight: 1.1,
//                   letterSpacing: '-0.5px',
//                 }}
//               >
//                 Login
//               </Typography>
//               <Typography
//                 sx={{ fontFamily: 'inherit', fontWeight: 500, color: '#0B3A9E', fontSize: { xs: 16, md: 19 }, mt: 1 }}
//               >
//                 Sign in to continue
//               </Typography>
//             </Box>

//             {/* Email */}
//             <TextField
//               fullWidth
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="username"
//               placeholder="Email"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={formik.touched.email && Boolean(formik.errors.email)}
//               helperText={formik.touched.email && formik.errors.email}
//               inputProps={{ 'aria-label': 'Email' }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start" sx={{ mr: 1.5 }}>
//                     <MailOutlineRounded />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{ ...inputSx, mb: 2.5 }}
//             />

//             {/* Password */}
//             <TextField
//               fullWidth
//               id="password"
//               name="password"
//               autoComplete="current-password"
//               placeholder="Password"
//               type={showPassword ? 'text' : 'password'}
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={formik.touched.password && Boolean(formik.errors.password)}
//               helperText={formik.touched.password && formik.errors.password}
//               inputProps={{ 'aria-label': 'Password' }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start" sx={{ mr: 1.5 }}>
//                     <LockOutlined />
//                   </InputAdornment>
//                 ),
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={handleTogglePassword}
//                       edge="end"
//                       aria-label={showPassword ? 'Hide password' : 'Show password'}
//                       sx={{ color: COLORS.deep, '&:hover': { color: COLORS.blue } }}
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{ ...inputSx, mb: 2.5 }}
//             />

//             {/* CAPTCHA */}
//             <LoginCaptcha onValidate={setCaptchaValid} />

//             {/* Remember me + Forgot password */}
//             <Box
//               sx={{
//                 mt: 2,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 flexWrap: 'wrap',
//                 gap: 1,
//               }}
//             >
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     sx={{
//                       color: '#21B5DE',
//                       '&.Mui-checked': { color: '#13A9D6' },
//                       '& .MuiSvgIcon-root': { fontSize: 28 },
//                     }}
//                   />
//                 }
//                 label="Remember me"
//                 sx={{
//                   ml: '-9px',
//                   mr: 0,
//                   '& .MuiFormControlLabel-label': {
//                     fontFamily: 'Montserrat, sans-serif',
//                     fontWeight: 500,
//                     color: COLORS.deep,
//                     fontSize: { xs: 14, md: 16 },
//                   },
//                 }}
//               />
//               <MuiLink
//                 component="button"
//                 type="button"
//                 onClick={handleForgotPassword}
//                 underline="hover"
//                 sx={{
//                   fontFamily: 'Montserrat, sans-serif',
//                   fontWeight: 600,
//                   color: COLORS.blue,
//                   fontSize: { xs: 14, md: 16 },
//                   '&:focus-visible': { outline: `2px solid ${COLORS.blue}`, outlineOffset: 3, borderRadius: 1 },
//                 }}
//               >
//                 Forgot Password?
//               </MuiLink>
//             </Box>

//             {/* Error Message */}
//             {authError && (
//               <Box
//                 role="alert"
//                 sx={{
//                   mt: 2,
//                   p: 1.5,
//                   bgcolor: 'rgba(244, 67, 54, 0.08)',
//                   borderRadius: '12px',
//                   border: '1px solid rgba(244, 67, 54, 0.25)',
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   color="error"
//                   align="center"
//                   sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.88rem', fontWeight: 500 }}
//                 >
//                   {authError}
//                 </Typography>
//               </Box>
//             )}

//             {/* Resend Verification */}
//             {showResend && (
//               <Box
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'center',
//                   mt: 1.5,
//                   p: 1,
//                   bgcolor: 'rgba(0, 102, 217, 0.08)',
//                   borderRadius: '12px',
//                   border: '1px solid rgba(0, 102, 217, 0.2)',
//                 }}
//               >
//                 <Link
//                   className="anchorverificationlink"
//                   onClick={handleResendVerification}
//                   style={{
//                     textDecoration: 'none',
//                     color: COLORS.blue,
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                     padding: '6px 12px',
//                     borderRadius: '6px',
//                     fontSize: '0.9rem',
//                   }}
//                 >
//                   Resend Verification Link
//                 </Link>
//               </Box>
//             )}

//             {/* Loader */}
//             {loading && (
//               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1.5 }}>
//                 <LoaderLottie />
//               </Box>
//             )}

//             {/* Login Button */}
//             <Button
//               type="submit"
//               fullWidth
//               disabled={loading}
//               endIcon={<ArrowForwardRounded sx={{ fontSize: '30px !important' }} />}
//               sx={{
//                 mt: 3,
//                 height: { xs: 56, md: 62 },
//                 borderRadius: '999px',
//                 position: 'relative',
//                 fontFamily: 'Montserrat, sans-serif',
//                 fontWeight: 800,
//                 fontSize: { xs: 19, md: 22 },
//                 textTransform: 'none',
//                 color: COLORS.deep,
//                 background: 'linear-gradient(90deg, #1E95F0 0%, #2FC6EC 48%, #7FE6F2 100%)',
//                 boxShadow: '0 10px 26px rgba(0, 102, 217, 0.32), inset 0 1px 0 rgba(255,255,255,0.45)',
//                 transition: 'transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease',
//                 '& .MuiButton-endIcon': { position: 'absolute', right: { xs: 22, md: 28 }, m: 0 },
//                 '&:hover': {
//                   background: 'linear-gradient(90deg, #1E95F0 0%, #2FC6EC 48%, #7FE6F2 100%)',
//                   filter: 'brightness(1.04)',
//                   transform: 'translateY(-2px)',
//                   boxShadow: '0 14px 32px rgba(0, 102, 217, 0.4), inset 0 1px 0 rgba(255,255,255,0.45)',
//                 },
//                 '&:active': { transform: 'translateY(0)' },
//                 '&.Mui-focusVisible': { outline: `3px solid ${COLORS.deep}`, outlineOffset: 3 },
//                 '&.Mui-disabled': {
//                   color: 'rgba(0, 22, 90, 0.55)',
//                   background: 'linear-gradient(90deg, #9fcff5 0%, #a9e6f4 100%)',
//                   boxShadow: 'none',
//                 },
//               }}
//             >
//               {loading ? 'Signing in...' : 'Login'}
//             </Button>

//             {/* OR divider */}
//             <Box className="lb-or" sx={{ display: 'flex', alignItems: 'center', gap: 2, my: { xs: 2.5, md: 3 } }} aria-hidden="true">
//               <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(0, 22, 90, 0.14)' }} />
//               <Typography sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, color: COLORS.deep, fontSize: 15 }}>
//                 OR
//               </Typography>
//               <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(0, 22, 90, 0.14)' }} />
//             </Box>

//             {/* Create New Account */}
//             <Button
//               component={Link}
//               to="/register"
//               fullWidth
//               startIcon={<PersonAddAltOutlined sx={{ fontSize: '26px !important' }} />}
//               sx={{
//                 height: { xs: 54, md: 60 },
//                 borderRadius: '16px',
//                 fontFamily: 'Montserrat, sans-serif',
//                 fontWeight: 600,
//                 fontSize: { xs: 16, md: 18 },
//                 textTransform: 'none',
//                 color: COLORS.deep,
//                 bgcolor: 'rgba(255,255,255,0.35)',
//                 border: '1px solid rgba(255,255,255,0.9)',
//                 boxShadow: 'inset 0 0 0 1px rgba(0, 102, 217, 0.08)',
//                 transition: 'all 0.2s ease',
//                 '&:hover': {
//                   bgcolor: 'rgba(255,255,255,0.6)',
//                   borderColor: 'rgba(0, 102, 217, 0.35)',
//                 },
//                 '&.Mui-focusVisible': { outline: `2px solid ${COLORS.blue}`, outlineOffset: 3 },
//               }}
//             >
//               Create New Account
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//     </>
//   );
// };

// export default Login;



// 8-Oct-2026 (v2): Premium enterprise login redesign.
// Fakt UI/UX layer badalla aahe. Login logic (formik + yup, captcha check, redux login,
// resend verification, loader, remember me, forgot password) aadhi sarkhich aahe.
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   InputBase,
//   Checkbox,
//   FormControlLabel,
//   Tooltip,
//   GlobalStyles,
//   ThemeProvider,
//   createTheme,
//   Link as MuiLink,
// } from '@mui/material';
// import {
//   Visibility,
//   VisibilityOff,
//   MailOutlineRounded,
//   LockOutlined,
//   ArrowForwardRounded,
//   PersonAddAltOutlined,
//   RefreshRounded,
//   ErrorOutlineRounded,
// } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../store/actions/loginActions';
// import { useNavigate } from 'react-router-dom';

// import poleLoginBg from '../../Images/poleLoginBg.png';
// import vvcmclogo from '../../Images/vvcmclogo.jpg';
// import ajivpatil from '../../Images/ajivsir7.jpeg';
// import commissioner from '../../Images/commissioner.jpg';
// import dcm from '../../Images/dcm.jpg';

// import { baseUrl } from '../../config/config';
// import LoaderLottie from '../../components/LoaderLottie'; // Import Loader

// import './Auth.css';
// import './Login.css';

// /* ============================================================
//    DESIGN TOKENS — 8px spacing system, restrained palette
//    ============================================================ */
// const C = {
//   navy: '#00165A',
//   blue: '#0066D9',
//   blueDark: '#0052B4',
//   cyan: '#2FD8E8',
//   lightCyan: '#E3F8FC',
//   white: '#FFFFFF',
//   gold: '#F4C400',
//   muted: '#5E6B85',
//   border: '#D5DEEA',
//   borderHover: '#A9BBD3',
//   text: '#1D2A4D',
// };
// const FONT_EN = '"Montserrat", "Segoe UI", system-ui, sans-serif';
// const FONT_MR = '"Noto Sans Devanagari", "Mangal", sans-serif';
// const RADIUS = { input: '14px', card: '24px', tile: '14px' };
// const FOCUS_RING = '0 0 0 4px rgba(0, 102, 217, 0.14)';
// const EASE = 'cubic-bezier(0.2, 0, 0, 1)';
// // Laptop (1366x768) sarkhya kami unchichya screen sathi
// const SHORT = '@media (min-width: 900px) and (max-height: 820px)';

// const loginTheme = createTheme({
//   palette: { primary: { main: C.blue, dark: C.blueDark }, text: { primary: C.text, secondary: C.muted } },
//   typography: { fontFamily: FONT_EN, button: { textTransform: 'none' } },
//   shape: { borderRadius: 14 },
//   components: { MuiButtonBase: { defaultProps: { disableRipple: false } } },
// });

// const pageGlobalStyles = (
//   <GlobalStyles
//     styles={`
//       @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');
//       body.lb-login-body { margin: 0; overflow-x: hidden; }
//       @keyframes lbRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
//       .lb-rise { animation: lbRise 480ms ${EASE} both; }
//       .lb-rise-1 { animation-delay: 60ms; } .lb-rise-2 { animation-delay: 120ms; } .lb-rise-3 { animation-delay: 180ms; }
//       @media (prefers-reduced-motion: reduce) { .lb-rise { animation: none; } * { transition: none !important; } }
//       .lb-noscroll::-webkit-scrollbar { display: none; } .lb-noscroll { scrollbar-width: none; }
//     `}
//   />
// );

// /* ============================================================
//    Storage helpers (Remember me) — private mode madhe pan crash nahi
//    ============================================================ */
// const REMEMBER_KEY = 'lb_remember_email';
// const safeGet = (k) => {
//   try { return window.localStorage.getItem(k); } catch (e) { return null; }
// };
// const safeSet = (k, v) => {
//   try {
//     if (v) window.localStorage.setItem(k, v);
//     else window.localStorage.removeItem(k);
//   } catch (e) { /* storage blocked — ignore */ }
// };

// /* ============================================================
//    LEFT COLUMN
//    ============================================================ */
// const BrandHeader = () => (
//   <Box className="lb-rise" sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 } }}>
//     <Box
//       sx={{
//         flexShrink: 0,
//         width: { xs: 64, md: 80, xl: 88 },
//         height: { xs: 64, md: 80, xl: 88 },
//         borderRadius: '50%',
//         p: '3px',
//         bgcolor: C.white,
//         boxShadow: '0 0 0 1px rgba(255,255,255,0.5), 0 8px 24px rgba(0, 22, 90, 0.28)',
//         [SHORT]: { width: 72, height: 72 },
//       }}
//     >
//       <Box
//         component="img"
//         src={vvcmclogo}
//         alt="Vasai-Virar City Municipal Corporation logo"
//         sx={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
//       />
//     </Box>

//     <Box aria-hidden="true" sx={{ alignSelf: 'stretch', width: '2px', my: 1, bgcolor: C.gold, borderRadius: 1 }} />

//     <Box sx={{ minWidth: 0 }}>
//       <Typography
//         sx={{
//           fontSize: 12,
//           fontWeight: 600,
//           letterSpacing: '0.24em',
//           color: 'rgba(255,255,255,0.85)',
//           textTransform: 'uppercase',
//           lineHeight: 1,
//           mb: 1,
//         }}
//       >
//         Welcome
//       </Typography>
//       <Typography
//         component="h1"
//         sx={{
//           fontWeight: 700,
//           color: C.white,
//           fontSize: { xs: 28, sm: 34, md: 38, lg: 42, xl: 46 },
//           lineHeight: 1.08,
//           letterSpacing: '-0.02em',
//           textShadow: '0 2px 12px rgba(0, 22, 90, 0.25)',
//           [SHORT]: { fontSize: 38 },
//         }}
//       >
//         Vasai-Virar
//       </Typography>
//       <Typography
//         sx={{
//           fontWeight: 500,
//           color: 'rgba(255,255,255,0.94)',
//           fontSize: { xs: 15, sm: 18, md: 20, xl: 22 },
//           lineHeight: 1.3,
//           mt: 0.5,
//           textShadow: '0 1px 8px rgba(0, 22, 90, 0.25)',
//         }}
//       >
//         City Municipal Corporation
//       </Typography>
//     </Box>
//   </Box>
// );

// const ProductIntro = () => (
//   <Box className="lb-rise lb-rise-1" sx={{ maxWidth: 520 }}>
//     <Box aria-hidden="true" sx={{ width: 40, height: 3, bgcolor: C.gold, borderRadius: 2, mb: 2 }} />
//     <Typography
//       component="h2"
//       sx={{
//         fontWeight: 700,
//         color: C.white,
//         fontSize: { xs: 22, sm: 26, md: 28, xl: 32 },
//         lineHeight: 1.2,
//         letterSpacing: '-0.01em',
//         textShadow: '0 2px 12px rgba(0, 22, 90, 0.3)',
//         [SHORT]: { fontSize: 26 },
//       }}
//     >
//       Light Bill Management System
//     </Typography>
//     <Typography
//       sx={{
//         mt: 1,
//         fontWeight: 400,
//         color: 'rgba(255,255,255,0.9)',
//         fontSize: { xs: 15, md: 16, xl: 17 },
//         lineHeight: 1.55,
//         textShadow: '0 1px 8px rgba(0, 22, 90, 0.3)',
//       }}
//     >
//       Smart, secure and transparent control
//       <Box component="br" sx={{ display: { xs: 'none', sm: 'block' } }} /> of every electricity bill.
//     </Typography>
//   </Box>
// );

// const LEADERS = [
//   { img: ajivpatil, designation: 'मा. महापौर', name: 'श्री. अजीव पाटील' },
//   { img: commissioner, designation: 'मा. आयुक्त', name: 'डॉ. अनिल कुमार पवार' },
//   { img: dcm, designation: 'मा. अतिरिक्त आयुक्त', name: 'श्री. संजय कोंटे' },
// ];

// // Tin vegle widgets nahi — ekach translucent panel madhe ek coordinated section
// const LeadershipCards = () => (
//   <Box
//     className="lb-rise lb-rise-2"
//     sx={{
//       p: 1,
//       maxWidth: { md: 560, xl: 600 },
//       borderRadius: '20px',
//       bgcolor: 'rgba(255,255,255,0.16)',
//       border: '1px solid rgba(255,255,255,0.32)',
//       backdropFilter: 'blur(12px)',
//       WebkitBackdropFilter: 'blur(12px)',
//       boxShadow: '0 12px 32px rgba(0, 22, 90, 0.16)',
//     }}
//   >
//     <Box
//       component="ul"
//       aria-label="Leadership"
//       className="lb-noscroll"
//       sx={{
//         listStyle: 'none',
//         m: 0,
//         p: 0,
//         display: 'grid',
//         gridTemplateColumns: { xs: 'repeat(3, minmax(132px, 1fr))', sm: 'repeat(3, 1fr)' },
//         gap: 1,
//         overflowX: { xs: 'auto', sm: 'visible' },
//         scrollSnapType: 'x mandatory',
//       }}
//     >
//       {LEADERS.map((l) => (
//         <Box
//           component="li"
//           key={l.name}
//           sx={{
//             scrollSnapAlign: 'start',
//             bgcolor: 'rgba(255,255,255,0.95)',
//             borderRadius: RADIUS.tile,
//             overflow: 'hidden',
//             border: '1px solid rgba(255,255,255,0.9)',
//             boxShadow: '0 1px 2px rgba(0, 22, 90, 0.06)',
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <Box
//             sx={{
//               height: { xs: 120, md: 136, xl: 160 },
//               bgcolor: '#EEF2F7',
//               [SHORT]: { height: 120 },
//             }}
//           >
//             <Box
//               component="img"
//               src={l.img}
//               alt={`${l.designation} ${l.name}`}
//               loading="lazy"
//               sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%', display: 'block' }}
//             />
//           </Box>
//           <Box
//             sx={{
//               px: 1,
//               py: 1.5,
//               textAlign: 'center',
//               fontFamily: FONT_MR,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               gap: 0.25,
//               [SHORT]: { py: 1 },
//             }}
//           >
//             <Typography sx={{ fontFamily: 'inherit', fontSize: 12, fontWeight: 500, color: C.muted, lineHeight: 1.4 }}>
//               {l.designation}
//             </Typography>
//             <Typography
//               sx={{ fontFamily: 'inherit', fontSize: { xs: 13, xl: 14 }, fontWeight: 700, color: C.navy, lineHeight: 1.4 }}
//             >
//               {l.name}
//             </Typography>
//             <Box aria-hidden="true" sx={{ mt: 0.5, width: 20, height: 2, borderRadius: 1, bgcolor: C.gold }} />
//           </Box>
//         </Box>
//       ))}
//     </Box>
//   </Box>
// );

// /* ============================================================
//    FORM FIELDS
//    ============================================================ */
// // Ekach field shell — Email, Password ani CAPTCHA sathi same border/focus/height
// const fieldShell = {
//   display: 'flex',
//   alignItems: 'center',
//   height: 56,
//   bgcolor: C.white,
//   border: `1px solid ${C.border}`,
//   borderRadius: RADIUS.input,
//   transition: `border-color 180ms ${EASE}, box-shadow 180ms ${EASE}`,
//   '&:hover': { borderColor: C.borderHover },
//   '&:focus-within': { borderColor: C.blue, boxShadow: FOCUS_RING },
//   '& .lb-field-icon': { color: C.muted, fontSize: 20, transition: `color 180ms ${EASE}` },
//   '&:focus-within .lb-field-icon': { color: C.blue },
//   [SHORT]: { height: 52 },
// };
// const errorShell = {
//   borderColor: '#D32F2F',
//   '&:hover': { borderColor: '#D32F2F' },
//   '&:focus-within': { borderColor: '#D32F2F', boxShadow: '0 0 0 4px rgba(211, 47, 47, 0.12)' },
// };
// const inputBaseSx = {
//   flex: 1,
//   height: '100%',
//   fontFamily: FONT_EN,
//   fontSize: 15,
//   fontWeight: 500,
//   color: C.text,
//   '& input': { height: '100%', p: 0 },
//   '& input::placeholder': { color: '#7A869E', opacity: 1, fontWeight: 400 },
//   '& input:-webkit-autofill': { WebkitBoxShadow: '0 0 0 100px #fff inset', WebkitTextFillColor: C.text },
// };

// const FieldError = ({ id, children }) =>
//   children ? (
//     <Typography
//       id={id}
//       role="alert"
//       sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.75, ml: 0.5, fontSize: 12.5, fontWeight: 500, color: '#C62828' }}
//     >
//       <ErrorOutlineRounded sx={{ fontSize: 15 }} /> {children}
//     </Typography>
//   ) : null;

// const EmailField = ({ formik }) => {
//   const err = formik.touched.email && formik.errors.email;
//   return (
//     <Box>
//       <Box sx={{ ...fieldShell, ...(err ? errorShell : {}), px: 2, gap: 1.5 }}>
//         <MailOutlineRounded className="lb-field-icon" aria-hidden="true" />
//         <InputBase
//           id="email"
//           name="email"
//           type="email"
//           autoComplete="username"
//           placeholder="Email address"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           inputProps={{ 'aria-label': 'Email address', 'aria-invalid': Boolean(err), 'aria-describedby': err ? 'email-err' : undefined }}
//           sx={inputBaseSx}
//         />
//       </Box>
//       <FieldError id="email-err">{err}</FieldError>
//     </Box>
//   );
// };

// const PasswordField = ({ formik, showPassword, onToggle }) => {
//   const err = formik.touched.password && formik.errors.password;
//   return (
//     <Box>
//       <Box sx={{ ...fieldShell, ...(err ? errorShell : {}), pl: 2, pr: 0.75, gap: 1.5 }}>
//         <LockOutlined className="lb-field-icon" aria-hidden="true" />
//         <InputBase
//           id="password"
//           name="password"
//           autoComplete="current-password"
//           placeholder="Password"
//           type={showPassword ? 'text' : 'password'}
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           inputProps={{ 'aria-label': 'Password', 'aria-invalid': Boolean(err), 'aria-describedby': err ? 'password-err' : undefined }}
//           sx={inputBaseSx}
//         />
//         <IconButton
//           onClick={onToggle}
//           aria-label={showPassword ? 'Hide password' : 'Show password'}
//           aria-pressed={showPassword}
//           size="small"
//           sx={{
//             width: 40,
//             height: 40,
//             borderRadius: '10px',
//             color: C.muted,
//             transition: `background-color 180ms ${EASE}, color 180ms ${EASE}`,
//             '&:hover': { bgcolor: '#F1F5FB', color: C.navy },
//             '&.Mui-focusVisible': { outline: `2px solid ${C.blue}`, outlineOffset: 1 },
//           }}
//         >
//           {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
//         </IconButton>
//       </Box>
//       <FieldError id="password-err">{err}</FieldError>
//     </Box>
//   );
// };

// // Gondhal hou naye mhanun 0/O, 1/I/L vagle aahet
// const CAPTCHA_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
// const CAPTCHA_LEN = 4;
// const makeCaptcha = () =>
//   Array.from({ length: CAPTCHA_LEN }, () => ({
//     ch: CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)],
//     rot: Math.round(Math.random() * 10 - 5), // halka visual noise
//   }));

// /** MathCaptcha sarkhach API: onValidate(true/false). Teen tukde → ekach unified field. */
// const CaptchaField = ({ onValidate }) => {
//   const [glyphs, setGlyphs] = useState(makeCaptcha);
//   const [value, setValue] = useState('');
//   const code = glyphs.map((g) => g.ch).join('');

//   const refresh = useCallback(() => {
//     setGlyphs(makeCaptcha());
//     setValue('');
//     onValidate(false);
//   }, [onValidate]);

//   const handleChange = (e) => {
//     const v = e.target.value.toUpperCase().replace(/\s/g, '').slice(0, CAPTCHA_LEN);
//     setValue(v);
//     onValidate(v === code);
//   };

//   return (
//     <Box sx={{ ...fieldShell, overflow: 'hidden' }}>
//       <Box
//         role="img"
//         aria-label={`CAPTCHA code: ${code.split('').join(' ')}`}
//         sx={{
//           height: '100%',
//           flex: { xs: '0 0 34%', sm: '0 0 40%' },
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: { xs: 1, sm: 1.5 },
//           userSelect: 'none',
//           bgcolor: '#F3F6FB',
//           backgroundImage:
//             'repeating-linear-gradient(135deg, rgba(0,22,90,0.035) 0 1px, transparent 1px 7px)',
//           borderRight: `1px solid ${C.border}`,
//         }}
//       >
//         {glyphs.map((g, i) => (
//           <Box
//             key={i}
//             component="span"
//             aria-hidden="true"
//             sx={{
//               display: 'inline-block',
//               transform: `rotate(${g.rot}deg)`,
//               fontFamily: FONT_EN,
//               fontWeight: 700,
//               fontSize: { xs: 18, sm: 20 },
//               color: C.navy,
//               lineHeight: 1,
//             }}
//           >
//             {g.ch}
//           </Box>
//         ))}
//       </Box>

//       <Tooltip title="New code" placement="top">
//         <IconButton
//           onClick={refresh}
//           aria-label="Refresh CAPTCHA"
//           size="small"
//           sx={{
//             mx: { xs: 0.5, sm: 0.75 },
//             width: 36,
//             height: 36,
//             borderRadius: '10px',
//             color: C.muted,
//             transition: `background-color 180ms ${EASE}, color 180ms ${EASE}`,
//             '& svg': { fontSize: 20, transition: `transform 320ms ${EASE}` },
//             '&:hover': { bgcolor: '#F1F5FB', color: C.navy, '& svg': { transform: 'rotate(180deg)' } },
//             '&.Mui-focusVisible': { outline: `2px solid ${C.blue}`, outlineOffset: 1 },
//           }}
//         >
//           <RefreshRounded />
//         </IconButton>
//       </Tooltip>

//       <Box aria-hidden="true" sx={{ width: '1px', alignSelf: 'stretch', my: 1.5, bgcolor: C.border }} />

//       <InputBase
//         value={value}
//         onChange={handleChange}
//         placeholder="Enter CAPTCHA"
//         inputProps={{ 'aria-label': 'Enter CAPTCHA code', autoComplete: 'off', spellCheck: 'false', maxLength: CAPTCHA_LEN }}
//         sx={{
//           ...inputBaseSx,
//           px: { xs: 1.5, sm: 2 },
//           minWidth: 0,
//           fontSize: { xs: 14, sm: 15 },
//           letterSpacing: value ? '0.2em' : 0,
//           fontWeight: value ? 600 : 500,
//         }}
//       />
//     </Box>
//   );
// };

// /* ============================================================
//    LOGIN CARD
//    ============================================================ */
// const LoginHeader = () => (
//   <Box sx={{ mb: 4, [SHORT]: { mb: 3 } }}>
//     <Typography
//       id="lb-login-title"
//       component="h2"
//       sx={{ fontWeight: 700, color: C.navy, fontSize: { xs: 32, md: 36 }, lineHeight: 1.15, letterSpacing: '-0.02em' }}
//     >
//       Login
//     </Typography>
//     <Typography sx={{ mt: 1, fontSize: 15, fontWeight: 400, color: C.muted }}>Sign in securely to continue</Typography>
//   </Box>
// );

// const LoginActions = ({ rememberMe, onRememberChange, onForgot }) => (
//   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
//     <FormControlLabel
//       control={
//         <Checkbox
//           checked={rememberMe}
//           onChange={(e) => onRememberChange(e.target.checked)}
//           size="small"
//           sx={{
//             p: 0.75,
//             color: '#9AAAC2',
//             '&.Mui-checked': { color: C.blue },
//             '& .MuiSvgIcon-root': { fontSize: 20 },
//             '&.Mui-focusVisible': { outline: `2px solid ${C.blue}`, outlineOffset: -2, borderRadius: '6px' },
//           }}
//         />
//       }
//       label="Remember me"
//       sx={{ ml: '-6px', mr: 0, '& .MuiFormControlLabel-label': { fontSize: 14, fontWeight: 500, color: C.text } }}
//     />
//     <MuiLink
//       component="button"
//       type="button"
//       onClick={onForgot}
//       underline="hover"
//       sx={{
//         fontFamily: FONT_EN,
//         fontSize: 14,
//         fontWeight: 600,
//         color: C.blue,
//         '&:focus-visible': { outline: `2px solid ${C.blue}`, outlineOffset: 3, borderRadius: '4px' },
//       }}
//     >
//       Forgot password?
//     </MuiLink>
//   </Box>
// );

// const PrimaryButton = ({ loading }) => (
//   <Button
//     type="submit"
//     fullWidth
//     disabled={loading}
//     aria-busy={loading}
//     sx={{
//       position: 'relative',
//       height: 56,
//       borderRadius: RADIUS.input,
//       fontSize: 16,
//       fontWeight: 600,
//       letterSpacing: '0.01em',
//       color: C.white,
//       background: `linear-gradient(180deg, #0A70E3 0%, ${C.blue} 55%, ${C.blueDark} 100%)`,
//       boxShadow: '0 1px 2px rgba(0, 22, 90, 0.16), inset 0 1px 0 rgba(255,255,255,0.18)',
//       transition: `transform 200ms ${EASE}, box-shadow 200ms ${EASE}, filter 200ms ${EASE}`,
//       '& .lb-arrow': { position: 'absolute', right: 20, fontSize: 20, transition: `transform 200ms ${EASE}` },
//       '&:hover': {
//         background: `linear-gradient(180deg, #0A70E3 0%, ${C.blue} 55%, ${C.blueDark} 100%)`,
//         filter: 'brightness(0.96) saturate(1.08)',
//         transform: 'translateY(-2px)',
//         boxShadow: '0 10px 24px rgba(0, 82, 180, 0.28), inset 0 1px 0 rgba(255,255,255,0.18)',
//         '& .lb-arrow': { transform: 'translateX(3px)' },
//       },
//       '&:active': { transform: 'translateY(0)' },
//       '&.Mui-focusVisible': { outline: `3px solid rgba(0, 102, 217, 0.35)`, outlineOffset: 2 },
//       '&.Mui-disabled': { color: 'rgba(255,255,255,0.85)', background: '#7FA9DA', boxShadow: 'none' },
//       [SHORT]: { height: 52 },
//     }}
//   >
//     {loading ? 'Signing in…' : 'Login'}
//     <ArrowForwardRounded className="lb-arrow" aria-hidden="true" />
//   </Button>
// );

// const SecondaryAction = () => (
//   <Button
//     component={Link}
//     to="/register"
//     fullWidth
//     startIcon={<PersonAddAltOutlined sx={{ fontSize: '20px !important' }} />}
//     sx={{
//       height: 48,
//       borderRadius: RADIUS.input,
//       fontSize: 14.5,
//       fontWeight: 600,
//       color: C.navy,
//       bgcolor: 'transparent',
//       border: `1px solid ${C.border}`,
//       transition: `background-color 180ms ${EASE}, border-color 180ms ${EASE}`,
//       '&:hover': { bgcolor: '#F3F7FC', borderColor: C.borderHover },
//       '&.Mui-focusVisible': { outline: `2px solid ${C.blue}`, outlineOffset: 2 },
//       [SHORT]: { height: 44 },
//     }}
//   >
//     Create New Account
//   </Button>
// );

// const OrDivider = () => (
//   <Box aria-hidden="true" sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 3, [SHORT]: { my: 2 } }}>
//     <Box sx={{ flex: 1, height: '1px', bgcolor: '#E3E9F2' }} />
//     <Typography sx={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: '#8A96AD' }}>OR</Typography>
//     <Box sx={{ flex: 1, height: '1px', bgcolor: '#E3E9F2' }} />
//   </Box>
// );

// /* ============================================================
//    PAGE
//    ============================================================ */
// const validationSchema = Yup.object({
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string().required('Password is required'),
// });

// const Login = () => {
//   const [captchaValid, setCaptchaValid] = useState(false);
//   const [showResend, setShowResend] = useState(false); // State to show resend button
//   const [userEmail, setUserEmail] = useState(''); // Store email for resend
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(() => Boolean(safeGet(REMEMBER_KEY)));
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const authError = useSelector((state) => state.auth.error);
//   // eslint-disable-next-line no-unused-vars
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   useEffect(() => {
//     document.body.classList.add('lb-login-body');
//     return () => {
//       document.body.classList.remove('lb-login-body');
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     if (authError === 'Email is not verified. Please verify your email to login.') {
//       setShowResend(true);
//     } else {
//       setShowResend(false);
//     }
//   }, [authError]);

//   const formik = useFormik({
//     initialValues: {
//       email: safeGet(REMEMBER_KEY) || '',
//       password: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm, setSubmitting }) => {
//       if (!captchaValid) {
//         toast.error('Incorrect CAPTCHA. Please try again.', { position: 'top-center' });
//         return;
//       }
//       setUserEmail(values.email); // Store email for resend verification
//       safeSet(REMEMBER_KEY, rememberMe ? values.email : null);
//       setLoading(true);

//       try {
//         await dispatch(login(values, navigate));
//         resetForm({ values: { email: rememberMe ? values.email : '', password: '' } });
//       } catch (error) {
//         setSubmitting(false);
//       } finally {
//         setLoading(false); // ✅ Hide Loader
//       }
//     },
//   });

//   // **Function to Resend Verification Email**
//   const handleResendVerification = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${baseUrl}/resend-verification`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: userEmail }),
//       });

//       const data = await response.json();
//       setLoading(false);
//       toast.success(data.message || 'Verification link sent!', { position: 'top-center' });
//     } catch (error) {
//       setLoading(false);
//       toast.error('Something went wrong. Please try again.', { position: 'top-center' });
//     }
//   };

//   const handleTogglePassword = () => setShowPassword((prev) => !prev);

//   // Forgot password sathi abhi route nahi — tayar jhala ki ithe navigate('/forgot-password') kara
//   const handleForgotPassword = () => {
//     toast.info('Password reset sathi kripaya system administrator la samparka kara.', { position: 'top-center' });
//   };

//   return (
//     <ThemeProvider theme={loginTheme}>
//       {pageGlobalStyles}
//       <Box
//         data-lb-scroll
//         sx={{
//           position: 'fixed',
//           inset: 0,
//           zIndex: 1,
//           overflowY: 'auto',
//           overflowX: 'hidden',
//           fontFamily: FONT_EN,
//           backgroundColor: '#2E7FD8',
//           // Image + halka brand overlay + dabya bajula readability gradient (blur nahi)
//           backgroundImage: [
//             'linear-gradient(90deg, rgba(0,22,90,0.50) 0%, rgba(0,30,100,0.30) 38%, rgba(0,40,110,0.06) 62%, rgba(0,22,90,0.10) 100%)',
//             'linear-gradient(180deg, rgba(0,22,90,0.10) 0%, rgba(0,22,90,0) 30%, rgba(0,22,90,0) 70%, rgba(0,22,90,0.22) 100%)',
//             `url(${poleLoginBg})`,
//           ].join(', '),
//           backgroundSize: 'cover',
//           backgroundPosition: 'center bottom',
//           backgroundRepeat: 'no-repeat',
//         }}
//       >
//         <Box
//           sx={{
//             minHeight: '100%',
//             maxWidth: 1360,
//             mx: 'auto',
//             boxSizing: 'border-box',
//             px: { xs: 2, sm: 4, md: 5, lg: 8 },
//             py: { xs: 3, sm: 5, md: 5 },
//             display: 'grid',
//             alignItems: 'center',
//             gridTemplateColumns: { xs: 'minmax(0,1fr)', md: 'minmax(0,58fr) minmax(0,42fr)' },
//             gridTemplateAreas: {
//               xs: '"brand" "login" "leaders"',
//               md: '"brand login"',
//             },
//             columnGap: { md: 5, lg: 8 },
//             rowGap: 4,
//             [SHORT]: { py: 3 },
//           }}
//         >
//           {/* ===== LEFT: identity → product → leadership ===== */}
//           <Box
//             sx={{
//               gridArea: 'brand',
//               display: 'flex',
//               flexDirection: 'column',
//               gap: { xs: 3, md: 5 },
//               [SHORT]: { gap: 4 },
//             }}
//           >
//             <BrandHeader />
//             <ProductIntro />
//             <Box sx={{ display: { xs: 'none', md: 'block' } }}>
//               <LeadershipCards />
//             </Box>
//           </Box>

//           {/* Mobile var leadership login nantar */}
//           <Box sx={{ gridArea: 'leaders', display: { xs: 'block', md: 'none' }, minWidth: 0 }}>
//             <LeadershipCards />
//           </Box>

//           {/* ===== RIGHT: Login card ===== */}
//           <Box sx={{ gridArea: 'login', display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, minWidth: 0 }}>
//             <Box
//               component="form"
//               noValidate
//               onSubmit={formik.handleSubmit}
//               aria-labelledby="lb-login-title"
//               className="lb-rise lb-rise-1"
//               sx={{
//                 width: '100%',
//                 maxWidth: 464,
//                 boxSizing: 'border-box',
//                 p: { xs: 3, sm: 5 },
//                 borderRadius: RADIUS.card,
//                 bgcolor: 'rgba(255,255,255,0.88)',
//                 backdropFilter: 'blur(20px) saturate(160%)',
//                 WebkitBackdropFilter: 'blur(20px) saturate(160%)',
//                 border: '1px solid rgba(255,255,255,0.65)',
//                 boxShadow: [
//                   '0 1px 2px rgba(0, 22, 90, 0.06)',
//                   '0 8px 24px rgba(0, 22, 90, 0.10)',
//                   '0 32px 64px rgba(0, 22, 90, 0.16)',
//                   'inset 0 1px 0 rgba(255,255,255,0.9)',
//                 ].join(', '),
//                 [SHORT]: { p: 4 },
//               }}
//             >
//               <LoginHeader />

//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                 <EmailField formik={formik} />
//                 <PasswordField formik={formik} showPassword={showPassword} onToggle={handleTogglePassword} />
//                 <CaptchaField onValidate={setCaptchaValid} />
//               </Box>

//               <Box sx={{ mt: 2 }}>
//                 <LoginActions rememberMe={rememberMe} onRememberChange={setRememberMe} onForgot={handleForgotPassword} />
//               </Box>

//               {/* Error Message */}
//               {authError && (
//                 <Box
//                   role="alert"
//                   sx={{
//                     mt: 2,
//                     px: 2,
//                     py: 1.5,
//                     display: 'flex',
//                     gap: 1,
//                     alignItems: 'flex-start',
//                     bgcolor: '#FDF2F2',
//                     borderRadius: '12px',
//                     border: '1px solid #F5C7C7',
//                   }}
//                 >
//                   <ErrorOutlineRounded sx={{ fontSize: 18, color: '#C62828', mt: '1px' }} aria-hidden="true" />
//                   <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: '#9B1C1C', lineHeight: 1.45 }}>
//                     {authError}
//                   </Typography>
//                 </Box>
//               )}

//               {/* Resend Verification */}
//               {showResend && (
//                 <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
//                   <Link
//                     className="anchorverificationlink"
//                     onClick={handleResendVerification}
//                     style={{
//                       textDecoration: 'none',
//                       color: C.blue,
//                       fontWeight: '600',
//                       cursor: 'pointer',
//                       padding: '6px 12px',
//                       borderRadius: '8px',
//                       fontSize: '0.875rem',
//                     }}
//                   >
//                     Resend Verification Link
//                   </Link>
//                 </Box>
//               )}

//               {/* Loader */}
//               {loading && (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
//                   <LoaderLottie />
//                 </Box>
//               )}

//               <Box sx={{ mt: 3, [SHORT]: { mt: 2.5 } }}>
//                 <PrimaryButton loading={loading} />
//               </Box>

//               <OrDivider />

//               <SecondaryAction />
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Login;



// 8-Oct-2026 (v2): Premium enterprise login redesign.
// Fakt UI/UX layer badalla aahe. Login logic (formik + yup, captcha check, redux login,
// resend verification, loader, remember me, forgot password) aadhi sarkhich aahe.
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   InputBase,
//   Checkbox,
//   FormControlLabel,
//   Tooltip,
//   GlobalStyles,
//   ThemeProvider,
//   createTheme,
//   Link as MuiLink,
// } from '@mui/material';
// import {
//   Visibility,
//   VisibilityOff,
//   MailOutlineRounded,
//   LockOutlined,
//   ArrowForwardRounded,
//   PersonAddAltOutlined,
//   RefreshRounded,
//   ErrorOutlineRounded,
// } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../store/actions/loginActions';
// import { useNavigate } from 'react-router-dom';

// import poleLoginBg from '../../Images/poleLoginBg.png';
// import vvcmclogo from '../../Images/vvcmclogo.jpg';
// import ajivpatil from '../../Images/ajivsir7.jpeg';
// import commissioner from '../../Images/commissioner.jpg';
// import dcm from '../../Images/dcm.jpg';

// import { baseUrl } from '../../config/config';
// import LoaderLottie from '../../components/LoaderLottie'; // Import Loader

// import './Auth.css';
// import './Login.css';

// /* ============================================================
//    DESIGN TOKENS — 8px spacing system, restrained palette
//    ============================================================ */
// const C = {
//   navy: '#00165A',
//   blue: '#0066D9',
//   blueDark: '#0052B4',
//   cyan: '#2FD8E8',
//   lightCyan: '#E3F8FC',
//   white: '#FFFFFF',
//   gold: '#F4C400',
//   muted: '#5E6B85',
//   border: '#D5DEEA',
//   borderHover: '#A9BBD3',
//   text: '#1D2A4D',
// };
// const FONT_EN = '"Montserrat", "Segoe UI", system-ui, sans-serif';
// const RADIUS = { input: '14px', card: '24px', tile: '14px' };
// const FOCUS_RING = '0 0 0 4px rgba(0, 102, 217, 0.14)';
// const EASE = 'cubic-bezier(0.2, 0, 0, 1)';
// // Laptop (1366x768) sarkhya kami unchichya screen sathi
// const SHORT = '@media (min-width: 900px) and (max-height: 820px)';

// const loginTheme = createTheme({
//   palette: { primary: { main: C.blue, dark: C.blueDark }, text: { primary: C.text, secondary: C.muted } },
//   typography: { fontFamily: FONT_EN, button: { textTransform: 'none' } },
//   shape: { borderRadius: 14 },
//   components: { MuiButtonBase: { defaultProps: { disableRipple: false } } },
// });

// const pageGlobalStyles = (
//   <GlobalStyles
//     styles={`
//       @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');
//       body.lb-login-body { margin: 0; overflow-x: hidden; }
//       @keyframes lbRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
//       .lb-rise { animation: lbRise 480ms ${EASE} both; }
//       .lb-rise-1 { animation-delay: 60ms; } .lb-rise-2 { animation-delay: 120ms; } .lb-rise-3 { animation-delay: 180ms; }
//       @media (prefers-reduced-motion: reduce) { .lb-rise { animation: none; } * { transition: none !important; } }
//       .lb-noscroll::-webkit-scrollbar { display: none; } .lb-noscroll { scrollbar-width: none; }
//     `}
//   />
// );

// /* ============================================================
//    Storage helpers (Remember me) — private mode madhe pan crash nahi
//    ============================================================ */
// const REMEMBER_KEY = 'lb_remember_email';
// const safeGet = (k) => {
//   try { return window.localStorage.getItem(k); } catch (e) { return null; }
// };
// const safeSet = (k, v) => {
//   try {
//     if (v) window.localStorage.setItem(k, v);
//     else window.localStorage.removeItem(k);
//   } catch (e) { /* storage blocked — ignore */ }
// };

// /* ============================================================
//    LEFT COLUMN
//    ============================================================ */
// const BrandHeader = () => (
//   <Box className="lb-rise" sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 } }}>
//     <Box
//       sx={{
//         flexShrink: 0,
//         width: { xs: 64, md: 80, xl: 88 },
//         height: { xs: 64, md: 80, xl: 88 },
//         borderRadius: '50%',
//         p: '3px',
//         bgcolor: C.white,
//         boxShadow: '0 0 0 1px rgba(255,255,255,0.5), 0 8px 24px rgba(0, 22, 90, 0.28)',
//         [SHORT]: { width: 72, height: 72 },
//       }}
//     >
//       <Box
//         component="img"
//         src={vvcmclogo}
//         alt="Vasai-Virar City Municipal Corporation logo"
//         sx={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
//       />
//     </Box>

//     <Box aria-hidden="true" sx={{ alignSelf: 'stretch', width: '2px', my: 1, bgcolor: C.gold, borderRadius: 1 }} />

//     <Box sx={{ minWidth: 0 }}>
//       <Typography
//         sx={{
//           fontSize: 12,
//           fontWeight: 600,
//           letterSpacing: '0.24em',
//           color: 'rgba(255,255,255,0.85)',
//           textTransform: 'uppercase',
//           lineHeight: 1,
//           mb: 1,
//         }}
//       >
//         Welcome
//       </Typography>
//       <Typography
//         component="h1"
//         sx={{
//           fontWeight: 700,
//           color: C.white,
//           fontSize: { xs: 28, sm: 34, md: 38, lg: 42, xl: 46 },
//           lineHeight: 1.08,
//           letterSpacing: '-0.02em',
//           textShadow: '0 2px 12px rgba(0, 22, 90, 0.25)',
//           [SHORT]: { fontSize: 38 },
//         }}
//       >
//         Vasai-Virar
//       </Typography>
//       <Typography
//         sx={{
//           fontWeight: 500,
//           color: 'rgba(255,255,255,0.94)',
//           fontSize: { xs: 15, sm: 18, md: 20, xl: 22 },
//           lineHeight: 1.3,
//           mt: 0.5,
//           textShadow: '0 1px 8px rgba(0, 22, 90, 0.25)',
//         }}
//       >
//         City Municipal Corporation
//       </Typography>
//     </Box>
//   </Box>
// );

// const ProductIntro = () => (
//   <Box className="lb-rise lb-rise-1" sx={{ maxWidth: 520 }}>
//     <Box aria-hidden="true" sx={{ width: 40, height: 3, bgcolor: C.gold, borderRadius: 2, mb: 2 }} />
//     <Typography
//       component="h2"
//       sx={{
//         fontWeight: 700,
//         color: C.white,
//         fontSize: { xs: 22, sm: 26, md: 28, xl: 32 },
//         lineHeight: 1.2,
//         letterSpacing: '-0.01em',
//         textShadow: '0 2px 12px rgba(0, 22, 90, 0.3)',
//         [SHORT]: { fontSize: 26 },
//       }}
//     >
//       Light Bill Management System
//     </Typography>
//     <Typography
//       sx={{
//         mt: 1,
//         fontWeight: 400,
//         color: 'rgba(255,255,255,0.9)',
//         fontSize: { xs: 15, md: 16, xl: 17 },
//         lineHeight: 1.55,
//         textShadow: '0 1px 8px rgba(0, 22, 90, 0.3)',
//       }}
//     >
//       Smart, secure and transparent control
//       <Box component="br" sx={{ display: { xs: 'none', sm: 'block' } }} /> of every electricity bill.
//     </Typography>
//   </Box>
// );

// // 8-Oct-2026: nav ani hudde official VVCMC mahiti pramane; kram — Mayor, Deputy Mayor, Commissioner
// const LEADERS = [
//   { img: ajivpatil, name: 'Shri. Ajiv Patil', designation: 'Mayor' },
//   { img: dcm, name: 'Shri. Marshal Lopes', designation: 'Deputy Mayor' },
//   { img: commissioner, name: 'Shri. Prithviraj B.P. (IAS)', designation: 'Commissioner' },
// ];

// // Tin vegle widgets nahi — ekach translucent panel madhe ek coordinated section
// const LeadershipCards = () => (
//   <Box
//     className="lb-rise lb-rise-2"
//     sx={{
//       p: 1,
//       maxWidth: { md: 560, xl: 600 },
//       borderRadius: '20px',
//       bgcolor: 'rgba(255,255,255,0.16)',
//       border: '1px solid rgba(255,255,255,0.32)',
//       backdropFilter: 'blur(12px)',
//       WebkitBackdropFilter: 'blur(12px)',
//       boxShadow: '0 12px 32px rgba(0, 22, 90, 0.16)',
//     }}
//   >
//     <Box
//       component="ul"
//       aria-label="Leadership"
//       className="lb-noscroll"
//       sx={{
//         listStyle: 'none',
//         m: 0,
//         p: 0,
//         display: 'grid',
//         gridTemplateColumns: { xs: 'repeat(3, minmax(132px, 1fr))', sm: 'repeat(3, 1fr)' },
//         gap: 1,
//         overflowX: { xs: 'auto', sm: 'visible' },
//         scrollSnapType: 'x mandatory',
//       }}
//     >
//       {LEADERS.map((l) => (
//         <Box
//           component="li"
//           key={l.name}
//           sx={{
//             scrollSnapAlign: 'start',
//             bgcolor: 'rgba(255,255,255,0.95)',
//             borderRadius: RADIUS.tile,
//             overflow: 'hidden',
//             border: '1px solid rgba(255,255,255,0.9)',
//             boxShadow: '0 1px 2px rgba(0, 22, 90, 0.06)',
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <Box
//             sx={{
//               height: { xs: 120, md: 136, xl: 160 },
//               bgcolor: '#EEF2F7',
//               [SHORT]: { height: 120 },
//             }}
//           >
//             <Box
//               component="img"
//               src={l.img}
//               alt={`${l.name}, ${l.designation}, Vasai-Virar City Municipal Corporation`}
//               loading="lazy"
//               sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%', display: 'block' }}
//             />
//           </Box>
//           <Box
//             sx={{
//               px: 1,
//               py: 1.5,
//               textAlign: 'center',
//               fontFamily: FONT_EN,
//               flex: 1,
//               justifyContent: 'center',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               gap: 0.25,
//               [SHORT]: { py: 1 },
//             }}
//           >
//             <Typography
//               sx={{ fontFamily: 'inherit', fontSize: { xs: 13, xl: 14 }, fontWeight: 700, color: C.navy, lineHeight: 1.35 }}
//             >
//               {l.name}
//             </Typography>
//             <Typography sx={{ fontFamily: 'inherit', fontSize: 12, fontWeight: 500, color: C.muted, lineHeight: 1.4 }}>
//               {l.designation}
//             </Typography>
//             <Box aria-hidden="true" sx={{ mt: 0.5, width: 20, height: 2, borderRadius: 1, bgcolor: C.gold }} />
//           </Box>
//         </Box>
//       ))}
//     </Box>
//   </Box>
// );

// /* ============================================================
//    FORM FIELDS
//    ============================================================ */
// // Ekach field shell — Email, Password ani CAPTCHA sathi same border/focus/height
// const fieldShell = {
//   display: 'flex',
//   alignItems: 'center',
//   height: 56,
//   bgcolor: C.white,
//   border: `1px solid ${C.border}`,
//   borderRadius: RADIUS.input,
//   transition: `border-color 180ms ${EASE}, box-shadow 180ms ${EASE}`,
//   '&:hover': { borderColor: C.borderHover },
//   '&:focus-within': { borderColor: C.blue, boxShadow: FOCUS_RING },
//   '& .lb-field-icon': { color: C.muted, fontSize: 20, transition: `color 180ms ${EASE}` },
//   '&:focus-within .lb-field-icon': { color: C.blue },
//   [SHORT]: { height: 52 },
// };
// const errorShell = {
//   borderColor: '#D32F2F',
//   '&:hover': { borderColor: '#D32F2F' },
//   '&:focus-within': { borderColor: '#D32F2F', boxShadow: '0 0 0 4px rgba(211, 47, 47, 0.12)' },
// };
// const inputBaseSx = {
//   flex: 1,
//   height: '100%',
//   fontFamily: FONT_EN,
//   fontSize: 15,
//   fontWeight: 500,
//   color: C.text,
//   '& input': { height: '100%', p: 0 },
//   '& input::placeholder': { color: '#7A869E', opacity: 1, fontWeight: 400 },
//   '& input:-webkit-autofill': { WebkitBoxShadow: '0 0 0 100px #fff inset', WebkitTextFillColor: C.text },
// };

// const FieldError = ({ id, children }) =>
//   children ? (
//     <Typography
//       id={id}
//       role="alert"
//       sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.75, ml: 0.5, fontSize: 12.5, fontWeight: 500, color: '#C62828' }}
//     >
//       <ErrorOutlineRounded sx={{ fontSize: 15 }} /> {children}
//     </Typography>
//   ) : null;

// const EmailField = ({ formik }) => {
//   const err = formik.touched.email && formik.errors.email;
//   return (
//     <Box>
//       <Box sx={{ ...fieldShell, ...(err ? errorShell : {}), px: 2, gap: 1.5 }}>
//         <MailOutlineRounded className="lb-field-icon" aria-hidden="true" />
//         <InputBase
//           id="email"
//           name="email"
//           type="email"
//           autoComplete="username"
//           placeholder="Email address"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           inputProps={{ 'aria-label': 'Email address', 'aria-invalid': Boolean(err), 'aria-describedby': err ? 'email-err' : undefined }}
//           sx={inputBaseSx}
//         />
//       </Box>
//       <FieldError id="email-err">{err}</FieldError>
//     </Box>
//   );
// };

// const PasswordField = ({ formik, showPassword, onToggle }) => {
//   const err = formik.touched.password && formik.errors.password;
//   return (
//     <Box>
//       <Box sx={{ ...fieldShell, ...(err ? errorShell : {}), pl: 2, pr: 0.75, gap: 1.5 }}>
//         <LockOutlined className="lb-field-icon" aria-hidden="true" />
//         <InputBase
//           id="password"
//           name="password"
//           autoComplete="current-password"
//           placeholder="Password"
//           type={showPassword ? 'text' : 'password'}
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           inputProps={{ 'aria-label': 'Password', 'aria-invalid': Boolean(err), 'aria-describedby': err ? 'password-err' : undefined }}
//           sx={inputBaseSx}
//         />
//         <IconButton
//           onClick={onToggle}
//           aria-label={showPassword ? 'Hide password' : 'Show password'}
//           aria-pressed={showPassword}
//           size="small"
//           sx={{
//             width: 40,
//             height: 40,
//             borderRadius: '10px',
//             color: C.muted,
//             transition: `background-color 180ms ${EASE}, color 180ms ${EASE}`,
//             '&:hover': { bgcolor: '#F1F5FB', color: C.navy },
//             '&.Mui-focusVisible': { outline: `2px solid ${C.blue}`, outlineOffset: 1 },
//           }}
//         >
//           {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
//         </IconButton>
//       </Box>
//       <FieldError id="password-err">{err}</FieldError>
//     </Box>
//   );
// };

// // Gondhal hou naye mhanun 0/O, 1/I/L vagle aahet
// const CAPTCHA_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
// const CAPTCHA_LEN = 4;
// const makeCaptcha = () =>
//   Array.from({ length: CAPTCHA_LEN }, () => ({
//     ch: CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)],
//     rot: Math.round(Math.random() * 10 - 5), // halka visual noise
//   }));

// /** MathCaptcha sarkhach API: onValidate(true/false). Teen tukde → ekach unified field. */
// const CaptchaField = ({ onValidate }) => {
//   const [glyphs, setGlyphs] = useState(makeCaptcha);
//   const [value, setValue] = useState('');
//   const code = glyphs.map((g) => g.ch).join('');

//   const refresh = useCallback(() => {
//     setGlyphs(makeCaptcha());
//     setValue('');
//     onValidate(false);
//   }, [onValidate]);

//   const handleChange = (e) => {
//     const v = e.target.value.toUpperCase().replace(/\s/g, '').slice(0, CAPTCHA_LEN);
//     setValue(v);
//     onValidate(v === code);
//   };

//   return (
//     <Box sx={{ ...fieldShell, overflow: 'hidden' }}>
//       <Box
//         role="img"
//         aria-label={`CAPTCHA code: ${code.split('').join(' ')}`}
//         sx={{
//           height: '100%',
//           flex: { xs: '0 0 34%', sm: '0 0 40%' },
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: { xs: 1, sm: 1.5 },
//           userSelect: 'none',
//           bgcolor: '#F3F6FB',
//           backgroundImage:
//             'repeating-linear-gradient(135deg, rgba(0,22,90,0.035) 0 1px, transparent 1px 7px)',
//           borderRight: `1px solid ${C.border}`,
//         }}
//       >
//         {glyphs.map((g, i) => (
//           <Box
//             key={i}
//             component="span"
//             aria-hidden="true"
//             sx={{
//               display: 'inline-block',
//               transform: `rotate(${g.rot}deg)`,
//               fontFamily: FONT_EN,
//               fontWeight: 700,
//               fontSize: { xs: 18, sm: 20 },
//               color: C.navy,
//               lineHeight: 1,
//             }}
//           >
//             {g.ch}
//           </Box>
//         ))}
//       </Box>

//       <Tooltip title="New code" placement="top">
//         <IconButton
//           onClick={refresh}
//           aria-label="Refresh CAPTCHA"
//           size="small"
//           sx={{
//             mx: { xs: 0.5, sm: 0.75 },
//             width: 36,
//             height: 36,
//             borderRadius: '10px',
//             color: C.muted,
//             transition: `background-color 180ms ${EASE}, color 180ms ${EASE}`,
//             '& svg': { fontSize: 20, transition: `transform 320ms ${EASE}` },
//             '&:hover': { bgcolor: '#F1F5FB', color: C.navy, '& svg': { transform: 'rotate(180deg)' } },
//             '&.Mui-focusVisible': { outline: `2px solid ${C.blue}`, outlineOffset: 1 },
//           }}
//         >
//           <RefreshRounded />
//         </IconButton>
//       </Tooltip>

//       <Box aria-hidden="true" sx={{ width: '1px', alignSelf: 'stretch', my: 1.5, bgcolor: C.border }} />

//       <InputBase
//         value={value}
//         onChange={handleChange}
//         placeholder="Enter CAPTCHA"
//         inputProps={{ 'aria-label': 'Enter CAPTCHA code', autoComplete: 'off', spellCheck: 'false', maxLength: CAPTCHA_LEN }}
//         sx={{
//           ...inputBaseSx,
//           px: { xs: 1.5, sm: 2 },
//           minWidth: 0,
//           fontSize: { xs: 14, sm: 15 },
//           letterSpacing: value ? '0.2em' : 0,
//           fontWeight: value ? 600 : 500,
//         }}
//       />
//     </Box>
//   );
// };

// /* ============================================================
//    LOGIN CARD
//    ============================================================ */
// const LoginHeader = () => (
//   <Box sx={{ mb: 4, [SHORT]: { mb: 3 } }}>
//     <Typography
//       id="lb-login-title"
//       component="h2"
//       sx={{ fontWeight: 700, color: C.navy, fontSize: { xs: 32, md: 36 }, lineHeight: 1.15, letterSpacing: '-0.02em' }}
//     >
//       Login
//     </Typography>
//     <Typography sx={{ mt: 1, fontSize: 15, fontWeight: 400, color: C.muted }}>Sign in securely to continue</Typography>
//   </Box>
// );

// const LoginActions = ({ rememberMe, onRememberChange, onForgot }) => (
//   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
//     <FormControlLabel
//       control={
//         <Checkbox
//           checked={rememberMe}
//           onChange={(e) => onRememberChange(e.target.checked)}
//           size="small"
//           sx={{
//             p: 0.75,
//             color: '#9AAAC2',
//             '&.Mui-checked': { color: C.blue },
//             '& .MuiSvgIcon-root': { fontSize: 20 },
//             '&.Mui-focusVisible': { outline: `2px solid ${C.blue}`, outlineOffset: -2, borderRadius: '6px' },
//           }}
//         />
//       }
//       label="Remember me"
//       sx={{ ml: '-6px', mr: 0, '& .MuiFormControlLabel-label': { fontSize: 14, fontWeight: 500, color: C.text } }}
//     />
//     <MuiLink
//       component="button"
//       type="button"
//       onClick={onForgot}
//       underline="hover"
//       sx={{
//         fontFamily: FONT_EN,
//         fontSize: 14,
//         fontWeight: 600,
//         color: C.blue,
//         '&:focus-visible': { outline: `2px solid ${C.blue}`, outlineOffset: 3, borderRadius: '4px' },
//       }}
//     >
//       Forgot password?
//     </MuiLink>
//   </Box>
// );

// const PrimaryButton = ({ loading }) => (
//   <Button
//     type="submit"
//     fullWidth
//     disabled={loading}
//     aria-busy={loading}
//     sx={{
//       position: 'relative',
//       height: 56,
//       borderRadius: RADIUS.input,
//       fontSize: 16,
//       fontWeight: 600,
//       letterSpacing: '0.01em',
//       color: C.white,
//       background: `linear-gradient(180deg, #0A70E3 0%, ${C.blue} 55%, ${C.blueDark} 100%)`,
//       boxShadow: '0 1px 2px rgba(0, 22, 90, 0.16), inset 0 1px 0 rgba(255,255,255,0.18)',
//       transition: `transform 200ms ${EASE}, box-shadow 200ms ${EASE}, filter 200ms ${EASE}`,
//       '& .lb-arrow': { position: 'absolute', right: 20, fontSize: 20, transition: `transform 200ms ${EASE}` },
//       '&:hover': {
//         background: `linear-gradient(180deg, #0A70E3 0%, ${C.blue} 55%, ${C.blueDark} 100%)`,
//         filter: 'brightness(0.96) saturate(1.08)',
//         transform: 'translateY(-2px)',
//         boxShadow: '0 10px 24px rgba(0, 82, 180, 0.28), inset 0 1px 0 rgba(255,255,255,0.18)',
//         '& .lb-arrow': { transform: 'translateX(3px)' },
//       },
//       '&:active': { transform: 'translateY(0)' },
//       '&.Mui-focusVisible': { outline: `3px solid rgba(0, 102, 217, 0.35)`, outlineOffset: 2 },
//       '&.Mui-disabled': { color: 'rgba(255,255,255,0.85)', background: '#7FA9DA', boxShadow: 'none' },
//       [SHORT]: { height: 52 },
//     }}
//   >
//     {loading ? 'Signing in…' : 'Login'}
//     <ArrowForwardRounded className="lb-arrow" aria-hidden="true" />
//   </Button>
// );

// const SecondaryAction = () => (
//   <Button
//     component={Link}
//     to="/register"
//     fullWidth
//     startIcon={<PersonAddAltOutlined sx={{ fontSize: '20px !important' }} />}
//     sx={{
//       height: 48,
//       borderRadius: RADIUS.input,
//       fontSize: 14.5,
//       fontWeight: 600,
//       color: C.navy,
//       bgcolor: 'transparent',
//       border: `1px solid ${C.border}`,
//       transition: `background-color 180ms ${EASE}, border-color 180ms ${EASE}`,
//       '&:hover': { bgcolor: '#F3F7FC', borderColor: C.borderHover },
//       '&.Mui-focusVisible': { outline: `2px solid ${C.blue}`, outlineOffset: 2 },
//       [SHORT]: { height: 44 },
//     }}
//   >
//     Create New Account
//   </Button>
// );

// const OrDivider = () => (
//   <Box aria-hidden="true" sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 3, [SHORT]: { my: 2 } }}>
//     <Box sx={{ flex: 1, height: '1px', bgcolor: '#E3E9F2' }} />
//     <Typography sx={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: '#8A96AD' }}>OR</Typography>
//     <Box sx={{ flex: 1, height: '1px', bgcolor: '#E3E9F2' }} />
//   </Box>
// );

// /* ============================================================
//    PAGE
//    ============================================================ */
// const validationSchema = Yup.object({
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string().required('Password is required'),
// });

// const Login = () => {
//   const [captchaValid, setCaptchaValid] = useState(false);
//   const [showResend, setShowResend] = useState(false); // State to show resend button
//   const [userEmail, setUserEmail] = useState(''); // Store email for resend
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(() => Boolean(safeGet(REMEMBER_KEY)));
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const authError = useSelector((state) => state.auth.error);
//   // eslint-disable-next-line no-unused-vars
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   useEffect(() => {
//     document.body.classList.add('lb-login-body');
//     return () => {
//       document.body.classList.remove('lb-login-body');
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     if (authError === 'Email is not verified. Please verify your email to login.') {
//       setShowResend(true);
//     } else {
//       setShowResend(false);
//     }
//   }, [authError]);

//   const formik = useFormik({
//     initialValues: {
//       email: safeGet(REMEMBER_KEY) || '',
//       password: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm, setSubmitting }) => {
//       if (!captchaValid) {
//         toast.error('Incorrect CAPTCHA. Please try again.', { position: 'top-center' });
//         return;
//       }
//       setUserEmail(values.email); // Store email for resend verification
//       safeSet(REMEMBER_KEY, rememberMe ? values.email : null);
//       setLoading(true);

//       try {
//         await dispatch(login(values, navigate));
//         resetForm({ values: { email: rememberMe ? values.email : '', password: '' } });
//       } catch (error) {
//         setSubmitting(false);
//       } finally {
//         setLoading(false); // ✅ Hide Loader
//       }
//     },
//   });

//   // **Function to Resend Verification Email**
//   const handleResendVerification = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${baseUrl}/resend-verification`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: userEmail }),
//       });

//       const data = await response.json();
//       setLoading(false);
//       toast.success(data.message || 'Verification link sent!', { position: 'top-center' });
//     } catch (error) {
//       setLoading(false);
//       toast.error('Something went wrong. Please try again.', { position: 'top-center' });
//     }
//   };

//   const handleTogglePassword = () => setShowPassword((prev) => !prev);

//   // Forgot password sathi abhi route nahi — tayar jhala ki ithe navigate('/forgot-password') kara
//   const handleForgotPassword = () => {
//     toast.info('Password reset sathi kripaya system administrator la samparka kara.', { position: 'top-center' });
//   };

//   return (
//     <ThemeProvider theme={loginTheme}>
//       {pageGlobalStyles}
//       <Box
//         data-lb-scroll
//         sx={{
//           position: 'fixed',
//           inset: 0,
//           zIndex: 1,
//           overflowY: 'auto',
//           overflowX: 'hidden',
//           fontFamily: FONT_EN,
//           backgroundColor: '#2E7FD8',
//           // Image + halka brand overlay + dabya bajula readability gradient (blur nahi)
//           backgroundImage: [
//             'linear-gradient(90deg, rgba(0,22,90,0.50) 0%, rgba(0,30,100,0.30) 38%, rgba(0,40,110,0.06) 62%, rgba(0,22,90,0.10) 100%)',
//             'linear-gradient(180deg, rgba(0,22,90,0.10) 0%, rgba(0,22,90,0) 30%, rgba(0,22,90,0) 70%, rgba(0,22,90,0.22) 100%)',
//             `url(${poleLoginBg})`,
//           ].join(', '),
//           backgroundSize: 'cover',
//           backgroundPosition: 'center bottom',
//           backgroundRepeat: 'no-repeat',
//         }}
//       >
//         <Box
//           sx={{
//             minHeight: '100%',
//             maxWidth: 1360,
//             mx: 'auto',
//             boxSizing: 'border-box',
//             px: { xs: 2, sm: 4, md: 5, lg: 8 },
//             py: { xs: 3, sm: 5, md: 5 },
//             display: 'grid',
//             alignItems: 'center',
//             gridTemplateColumns: { xs: 'minmax(0,1fr)', md: 'minmax(0,58fr) minmax(0,42fr)' },
//             gridTemplateAreas: {
//               xs: '"brand" "login" "leaders"',
//               md: '"brand login"',
//             },
//             columnGap: { md: 5, lg: 8 },
//             rowGap: 4,
//             [SHORT]: { py: 3 },
//           }}
//         >
//           {/* ===== LEFT: identity → product → leadership ===== */}
//           <Box
//             sx={{
//               gridArea: 'brand',
//               display: 'flex',
//               flexDirection: 'column',
//               gap: { xs: 3, md: 5 },
//               [SHORT]: { gap: 4 },
//             }}
//           >
//             <BrandHeader />
//             <ProductIntro />
//             <Box sx={{ display: { xs: 'none', md: 'block' } }}>
//               <LeadershipCards />
//             </Box>
//           </Box>

//           {/* Mobile var leadership login nantar */}
//           <Box sx={{ gridArea: 'leaders', display: { xs: 'block', md: 'none' }, minWidth: 0 }}>
//             <LeadershipCards />
//           </Box>

//           {/* ===== RIGHT: Login card ===== */}
//           <Box sx={{ gridArea: 'login', display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, minWidth: 0 }}>
//             <Box
//               component="form"
//               noValidate
//               onSubmit={formik.handleSubmit}
//               aria-labelledby="lb-login-title"
//               className="lb-rise lb-rise-1"
//               sx={{
//                 width: '100%',
//                 maxWidth: 464,
//                 boxSizing: 'border-box',
//                 p: { xs: 3, sm: 5 },
//                 borderRadius: RADIUS.card,
//                 bgcolor: 'rgba(255,255,255,0.88)',
//                 backdropFilter: 'blur(20px) saturate(160%)',
//                 WebkitBackdropFilter: 'blur(20px) saturate(160%)',
//                 border: '1px solid rgba(255,255,255,0.65)',
//                 boxShadow: [
//                   '0 1px 2px rgba(0, 22, 90, 0.06)',
//                   '0 8px 24px rgba(0, 22, 90, 0.10)',
//                   '0 32px 64px rgba(0, 22, 90, 0.16)',
//                   'inset 0 1px 0 rgba(255,255,255,0.9)',
//                 ].join(', '),
//                 [SHORT]: { p: 4 },
//               }}
//             >
//               <LoginHeader />

//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                 <EmailField formik={formik} />
//                 <PasswordField formik={formik} showPassword={showPassword} onToggle={handleTogglePassword} />
//                 <CaptchaField onValidate={setCaptchaValid} />
//               </Box>

//               <Box sx={{ mt: 2 }}>
//                 <LoginActions rememberMe={rememberMe} onRememberChange={setRememberMe} onForgot={handleForgotPassword} />
//               </Box>

//               {/* Error Message */}
//               {authError && (
//                 <Box
//                   role="alert"
//                   sx={{
//                     mt: 2,
//                     px: 2,
//                     py: 1.5,
//                     display: 'flex',
//                     gap: 1,
//                     alignItems: 'flex-start',
//                     bgcolor: '#FDF2F2',
//                     borderRadius: '12px',
//                     border: '1px solid #F5C7C7',
//                   }}
//                 >
//                   <ErrorOutlineRounded sx={{ fontSize: 18, color: '#C62828', mt: '1px' }} aria-hidden="true" />
//                   <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: '#9B1C1C', lineHeight: 1.45 }}>
//                     {authError}
//                   </Typography>
//                 </Box>
//               )}

//               {/* Resend Verification */}
//               {showResend && (
//                 <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
//                   <Link
//                     className="anchorverificationlink"
//                     onClick={handleResendVerification}
//                     style={{
//                       textDecoration: 'none',
//                       color: C.blue,
//                       fontWeight: '600',
//                       cursor: 'pointer',
//                       padding: '6px 12px',
//                       borderRadius: '8px',
//                       fontSize: '0.875rem',
//                     }}
//                   >
//                     Resend Verification Link
//                   </Link>
//                 </Box>
//               )}

//               {/* Loader */}
//               {loading && (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
//                   <LoaderLottie />
//                 </Box>
//               )}

//               <Box sx={{ mt: 3, [SHORT]: { mt: 2.5 } }}>
//                 <PrimaryButton loading={loading} />
//               </Box>

//               <OrDivider />

//               <SecondaryAction />
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Login;



// // 8-Oct-2026 (v2): Premium enterprise login redesign.
// // Fakt UI/UX layer badalla aahe. Login logic (formik + yup, captcha check, redux login,
// // resend verification, loader, remember me, forgot password) aadhi sarkhich aahe.
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   InputBase,
//   Checkbox,
//   FormControlLabel,
//   Tooltip,
//   GlobalStyles,
//   ThemeProvider,
//   createTheme,
//   Link as MuiLink,
// } from '@mui/material';
// import {
//   Visibility,
//   VisibilityOff,
//   MailOutlineRounded,
//   LockOutlined,
//   ArrowForwardRounded,
//   PersonAddAltOutlined,
//   RefreshRounded,
//   ErrorOutlineRounded,
// } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../store/actions/loginActions';
// import { useNavigate } from 'react-router-dom';

// import poleLoginBg from '../../Images/poleLoginBg.png';
// import vvcmclogo from '../../Images/vvcmclogo.jpg';
// import ajivpatil from '../../Images/ajivsir7.jpeg';
// import commissioner from '../../Images/commissioner.jpg';
// import dcm from '../../Images/dcm.jpg';

// import { baseUrl } from '../../config/config';
// import LoaderLottie from '../../components/LoaderLottie'; // Import Loader

// import './Auth.css';
// import './Login.css';

// /* ============================================================
//    DESIGN TOKENS — 8px spacing system, restrained palette
//    ============================================================ */
// const C = {
//   navy: '#00165A',
//   blue: '#0066D9',
//   blueDark: '#0052B4',
//   cyan: '#2FD8E8',
//   lightCyan: '#E3F8FC',
//   white: '#FFFFFF',
//   gold: '#F4C400',
//   muted: '#5E6B85',
//   border: '#D5DEEA',
//   borderHover: '#A9BBD3',
//   text: '#1D2A4D',
// };
// const FONT_EN = '"Montserrat", "Segoe UI", system-ui, sans-serif';
// const RADIUS = { input: '14px', card: '24px', tile: '14px' };
// const FOCUS_RING = '0 0 0 4px rgba(0, 102, 217, 0.14)';
// const EASE = 'cubic-bezier(0.2, 0, 0, 1)';
// // Laptop (1366x768) sarkhya kami unchichya screen sathi
// const SHORT = '@media (min-width: 900px) and (max-height: 820px)';

// const loginTheme = createTheme({
//   palette: { primary: { main: C.blue, dark: C.blueDark }, text: { primary: C.text, secondary: C.muted } },
//   typography: { fontFamily: FONT_EN, button: { textTransform: 'none' } },
//   shape: { borderRadius: 14 },
//   components: { MuiButtonBase: { defaultProps: { disableRipple: false } } },
// });

// const pageGlobalStyles = (
//   <GlobalStyles
//     styles={`
//       @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');
//       body.lb-login-body { margin: 0; overflow-x: hidden; }
//       @keyframes lbRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
//       .lb-rise { animation: lbRise 480ms ${EASE} both; }
//       .lb-rise-1 { animation-delay: 60ms; } .lb-rise-2 { animation-delay: 120ms; } .lb-rise-3 { animation-delay: 180ms; }
//       @media (prefers-reduced-motion: reduce) { .lb-rise { animation: none; } * { transition: none !important; } }
//       .lb-noscroll::-webkit-scrollbar { display: none; } .lb-noscroll { scrollbar-width: none; }
//     `}
//   />
// );

// /* ============================================================
//    Storage helpers (Remember me) — private mode madhe pan crash nahi
//    ============================================================ */
// const REMEMBER_KEY = 'lb_remember_email';
// const safeGet = (k) => {
//   try { return window.localStorage.getItem(k); } catch (e) { return null; }
// };
// const safeSet = (k, v) => {
//   try {
//     if (v) window.localStorage.setItem(k, v);
//     else window.localStorage.removeItem(k);
//   } catch (e) { /* storage blocked — ignore */ }
// };

// /* ============================================================
//    LEFT COLUMN
//    ============================================================ */
// const BrandHeader = () => (
//   <Box className="lb-rise" sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 } }}>
//     <Box
//       sx={{
//         flexShrink: 0,
//         width: { xs: 64, md: 80, xl: 88 },
//         height: { xs: 64, md: 80, xl: 88 },
//         borderRadius: '50%',
//         p: '3px',
//         bgcolor: C.white,
//         boxShadow: '0 0 0 1px rgba(255,255,255,0.5), 0 8px 24px rgba(0, 22, 90, 0.28)',
//         [SHORT]: { width: 72, height: 72 },
//       }}
//     >
//       <Box
//         component="img"
//         src={vvcmclogo}
//         alt="Vasai-Virar City Municipal Corporation logo"
//         sx={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
//       />
//     </Box>

//     <Box aria-hidden="true" sx={{ alignSelf: 'stretch', width: '2px', my: 1, bgcolor: C.gold, borderRadius: 1 }} />

//     <Box sx={{ minWidth: 0 }}>
//       <Typography
//         sx={{
//           fontSize: 12,
//           fontWeight: 600,
//           letterSpacing: '0.24em',
//           color: 'rgba(255,255,255,0.85)',
//           textTransform: 'uppercase',
//           lineHeight: 1,
//           mb: 1,
//         }}
//       >
//         Welcome
//       </Typography>
//       <Typography
//         component="h1"
//         sx={{
//           fontWeight: 700,
//           color: C.white,
//           fontSize: { xs: 28, sm: 34, md: 38, lg: 42, xl: 46 },
//           lineHeight: 1.08,
//           letterSpacing: '-0.02em',
//           textShadow: '0 2px 12px rgba(0, 22, 90, 0.25)',
//           [SHORT]: { fontSize: 38 },
//         }}
//       >
//         Vasai-Virar
//       </Typography>
//       <Typography
//         sx={{
//           fontWeight: 500,
//           color: 'rgba(255,255,255,0.94)',
//           fontSize: { xs: 15, sm: 18, md: 20, xl: 22 },
//           lineHeight: 1.3,
//           mt: 0.5,
//           textShadow: '0 1px 8px rgba(0, 22, 90, 0.25)',
//         }}
//       >
//         City Municipal Corporation
//       </Typography>
//     </Box>
//   </Box>
// );

// const ProductIntro = () => (
//   <Box className="lb-rise lb-rise-1" sx={{ maxWidth: 520 }}>
//     <Box aria-hidden="true" sx={{ width: 40, height: 3, bgcolor: C.gold, borderRadius: 2, mb: 2 }} />
//     <Typography
//       component="h2"
//       sx={{
//         fontWeight: 700,
//         color: C.white,
//         fontSize: { xs: 22, sm: 26, md: 28, xl: 32 },
//         lineHeight: 1.2,
//         letterSpacing: '-0.01em',
//         textShadow: '0 2px 12px rgba(0, 22, 90, 0.3)',
//         [SHORT]: { fontSize: 26 },
//       }}
//     >
//       Light Bill Management System
//     </Typography>
//     <Typography
//       sx={{
//         mt: 1,
//         fontWeight: 400,
//         color: 'rgba(255,255,255,0.9)',
//         fontSize: { xs: 15, md: 16, xl: 17 },
//         lineHeight: 1.55,
//         textShadow: '0 1px 8px rgba(0, 22, 90, 0.3)',
//       }}
//     >
//       Smart, secure and transparent control
//       <Box component="br" sx={{ display: { xs: 'none', sm: 'block' } }} /> of every electricity bill.
//     </Typography>
//   </Box>
// );

// // 8-Oct-2026: nav ani hudde official VVCMC mahiti pramane; kram — Mayor, Deputy Mayor, Commissioner
// const LEADERS = [
// //   { img: ajivpatil, name: 'Shri. Ajiv Patil', designation: 'Mayor', pos: 'center top' }, // dokyacha varcha bhag kapla jau naye
// { img: ajivpatil, name: 'Shri. Ajiv Patil', designation: 'Mayor', pos: 'center 8%' }, // dokyacha varcha bhag kapla jau naye
//   { img: dcm, name: 'Shri. Marshal Lopes', designation: 'Deputy Mayor' },
// //   { img: commissioner, name: 'Shri. Prithviraj B.P. (IAS)', designation: 'Commissioner' },

//   { img: commissioner, name: 'Shri. Prithviraj B.P. (IAS)', designation: 'Commissioner', pos: 'center calc(18% + 2px)' },
// ];

// // Tin vegle widgets nahi — ekach translucent panel madhe ek coordinated section
// const LeadershipCards = () => (
//   <Box
//     className="lb-rise lb-rise-2"
//     sx={{
//       p: 1,
//       maxWidth: { md: 560, xl: 600 },
//       borderRadius: '20px',
//       bgcolor: 'rgba(255,255,255,0.16)',
//       border: '1px solid rgba(255,255,255,0.32)',
//       backdropFilter: 'blur(12px)',
//       WebkitBackdropFilter: 'blur(12px)',
//       boxShadow: '0 12px 32px rgba(0, 22, 90, 0.16)',
//     }}
//   >
//     <Box
//       component="ul"
//       aria-label="Leadership"
//       className="lb-noscroll"
//       sx={{
//         listStyle: 'none',
//         m: 0,
//         p: 0,
//         display: 'grid',
//         gridTemplateColumns: { xs: 'repeat(3, minmax(132px, 1fr))', sm: 'repeat(3, 1fr)' },
//         gap: 1,
//         overflowX: { xs: 'auto', sm: 'visible' },
//         scrollSnapType: 'x mandatory',
//       }}
//     >
//       {LEADERS.map((l) => (
//         <Box
//           component="li"
//           key={l.name}
//           sx={{
//             scrollSnapAlign: 'start',
//             bgcolor: 'rgba(255,255,255,0.95)',
//             borderRadius: RADIUS.tile,
//             overflow: 'hidden',
//             border: '1px solid rgba(255,255,255,0.9)',
//             boxShadow: '0 1px 2px rgba(0, 22, 90, 0.06)',
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <Box
//             sx={{
//               height: { xs: 120, md: 136, xl: 160 },
//               bgcolor: '#EEF2F7',
//               [SHORT]: { height: 120 },
//             }}
//           >
//             <Box
//               component="img"
//               src={l.img}
//               alt={`${l.name}, ${l.designation}, Vasai-Virar City Municipal Corporation`}
//               loading="lazy"
//               sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: l.pos || 'center 18%', display: 'block' }}
//             />
//           </Box>
//           <Box
//             sx={{
//               px: 1,
//               py: 1.5,
//               textAlign: 'center',
//               fontFamily: FONT_EN,
//               flex: 1,
//               justifyContent: 'center',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               gap: 0.25,
//               [SHORT]: { py: 1 },
//             }}
//           >
//             <Typography
//               sx={{ fontFamily: 'inherit', fontSize: { xs: 13, xl: 14 }, fontWeight: 700, color: C.navy, lineHeight: 1.35 }}
//             >
//               {l.name}
//             </Typography>
//             <Typography sx={{ fontFamily: 'inherit', fontSize: 12, fontWeight: 500, color: C.muted, lineHeight: 1.4 }}>
//               {l.designation}
//             </Typography>
//             <Box aria-hidden="true" sx={{ mt: 0.5, width: 20, height: 2, borderRadius: 1, bgcolor: C.gold }} />
//           </Box>
//         </Box>
//       ))}
//     </Box>
//   </Box>
// );

// /* ============================================================
//    FORM FIELDS
//    ============================================================ */
// // Ekach field shell — Email, Password ani CAPTCHA sathi same border/focus/height
// const fieldShell = {
//   display: 'flex',
//   alignItems: 'center',
//   height: 56,
//   bgcolor: C.white,
//   border: `1px solid ${C.border}`,
//   borderRadius: RADIUS.input,
//   transition: `border-color 180ms ${EASE}, box-shadow 180ms ${EASE}`,
//   '&:hover': { borderColor: C.borderHover },
//   '&:focus-within': { borderColor: C.blue, boxShadow: FOCUS_RING },
//   '& .lb-field-icon': { color: C.muted, fontSize: 20, transition: `color 180ms ${EASE}` },
//   '&:focus-within .lb-field-icon': { color: C.blue },
//   [SHORT]: { height: 52 },
// };
// const errorShell = {
//   borderColor: '#D32F2F',
//   '&:hover': { borderColor: '#D32F2F' },
//   '&:focus-within': { borderColor: '#D32F2F', boxShadow: '0 0 0 4px rgba(211, 47, 47, 0.12)' },
// };
// const inputBaseSx = {
//   flex: 1,
//   height: '100%',
//   fontFamily: FONT_EN,
//   fontSize: 15,
//   fontWeight: 500,
//   color: C.text,
//   '& input': { height: '100%', p: 0 },
//   '& input::placeholder': { color: '#7A869E', opacity: 1, fontWeight: 400 },
//   '& input:-webkit-autofill': { WebkitBoxShadow: '0 0 0 100px #fff inset', WebkitTextFillColor: C.text },
// };

// const FieldError = ({ id, children }) =>
//   children ? (
//     <Typography
//       id={id}
//       role="alert"
//       sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.75, ml: 0.5, fontSize: 12.5, fontWeight: 500, color: '#C62828' }}
//     >
//       <ErrorOutlineRounded sx={{ fontSize: 15 }} /> {children}
//     </Typography>
//   ) : null;

// const EmailField = ({ formik }) => {
//   const err = formik.touched.email && formik.errors.email;
//   return (
//     <Box>
//       <Box sx={{ ...fieldShell, ...(err ? errorShell : {}), px: 2, gap: 1.5 }}>
//         <MailOutlineRounded className="lb-field-icon" aria-hidden="true" />
//         <InputBase
//           id="email"
//           name="email"
//           type="email"
//           autoComplete="username"
//           placeholder="Email address"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           inputProps={{ 'aria-label': 'Email address', 'aria-invalid': Boolean(err), 'aria-describedby': err ? 'email-err' : undefined }}
//           sx={inputBaseSx}
//         />
//       </Box>
//       <FieldError id="email-err">{err}</FieldError>
//     </Box>
//   );
// };

// const PasswordField = ({ formik, showPassword, onToggle }) => {
//   const err = formik.touched.password && formik.errors.password;
//   return (
//     <Box>
//       <Box sx={{ ...fieldShell, ...(err ? errorShell : {}), pl: 2, pr: 0.75, gap: 1.5 }}>
//         <LockOutlined className="lb-field-icon" aria-hidden="true" />
//         <InputBase
//           id="password"
//           name="password"
//           autoComplete="current-password"
//           placeholder="Password"
//           type={showPassword ? 'text' : 'password'}
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           inputProps={{ 'aria-label': 'Password', 'aria-invalid': Boolean(err), 'aria-describedby': err ? 'password-err' : undefined }}
//           sx={inputBaseSx}
//         />
//         <IconButton
//           onClick={onToggle}
//           aria-label={showPassword ? 'Hide password' : 'Show password'}
//           aria-pressed={showPassword}
//           size="small"
//           sx={{
//             width: 40,
//             height: 40,
//             borderRadius: '10px',
//             color: C.muted,
//             transition: `background-color 180ms ${EASE}, color 180ms ${EASE}`,
//             '&:hover': { bgcolor: '#F1F5FB', color: C.navy },
//             '&.Mui-focusVisible': { outline: `2px solid ${C.blue}`, outlineOffset: 1 },
//           }}
//         >
//           {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
//         </IconButton>
//       </Box>
//       <FieldError id="password-err">{err}</FieldError>
//     </Box>
//   );
// };

// // Gondhal hou naye mhanun 0/O, 1/I/L vagle aahet
// const CAPTCHA_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
// const CAPTCHA_LEN = 4;
// const makeCaptcha = () =>
//   Array.from({ length: CAPTCHA_LEN }, () => ({
//     ch: CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)],
//     rot: Math.round(Math.random() * 10 - 5), // halka visual noise
//   }));

// /** MathCaptcha sarkhach API: onValidate(true/false). Teen tukde → ekach unified field. */
// const CaptchaField = ({ onValidate }) => {
//   const [glyphs, setGlyphs] = useState(makeCaptcha);
//   const [value, setValue] = useState('');
//   const code = glyphs.map((g) => g.ch).join('');

//   const refresh = useCallback(() => {
//     setGlyphs(makeCaptcha());
//     setValue('');
//     onValidate(false);
//   }, [onValidate]);

//   const handleChange = (e) => {
//     const v = e.target.value.toUpperCase().replace(/\s/g, '').slice(0, CAPTCHA_LEN);
//     setValue(v);
//     onValidate(v === code);
//   };

//   return (
//     <Box sx={{ ...fieldShell, overflow: 'hidden' }}>
//       <Box
//         role="img"
//         aria-label={`CAPTCHA code: ${code.split('').join(' ')}`}
//         sx={{
//           height: '100%',
//           flex: { xs: '0 0 34%', sm: '0 0 40%' },
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: { xs: 1, sm: 1.5 },
//           userSelect: 'none',
//           bgcolor: '#F3F6FB',
//           backgroundImage:
//             'repeating-linear-gradient(135deg, rgba(0,22,90,0.035) 0 1px, transparent 1px 7px)',
//           borderRight: `1px solid ${C.border}`,
//         }}
//       >
//         {glyphs.map((g, i) => (
//           <Box
//             key={i}
//             component="span"
//             aria-hidden="true"
//             sx={{
//               display: 'inline-block',
//               transform: `rotate(${g.rot}deg)`,
//               fontFamily: FONT_EN,
//               fontWeight: 700,
//               fontSize: { xs: 18, sm: 20 },
//               color: C.navy,
//               lineHeight: 1,
//             }}
//           >
//             {g.ch}
//           </Box>
//         ))}
//       </Box>

//       <Tooltip title="New code" placement="top">
//         <IconButton
//           onClick={refresh}
//           aria-label="Refresh CAPTCHA"
//           size="small"
//           sx={{
//             mx: { xs: 0.5, sm: 0.75 },
//             width: 36,
//             height: 36,
//             borderRadius: '10px',
//             color: C.muted,
//             transition: `background-color 180ms ${EASE}, color 180ms ${EASE}`,
//             '& svg': { fontSize: 20, transition: `transform 320ms ${EASE}` },
//             '&:hover': { bgcolor: '#F1F5FB', color: C.navy, '& svg': { transform: 'rotate(180deg)' } },
//             '&.Mui-focusVisible': { outline: `2px solid ${C.blue}`, outlineOffset: 1 },
//           }}
//         >
//           <RefreshRounded />
//         </IconButton>
//       </Tooltip>

//       <Box aria-hidden="true" sx={{ width: '1px', alignSelf: 'stretch', my: 1.5, bgcolor: C.border }} />

//       <InputBase
//         value={value}
//         onChange={handleChange}
//         placeholder="Enter CAPTCHA"
//         inputProps={{ 'aria-label': 'Enter CAPTCHA code', autoComplete: 'off', spellCheck: 'false', maxLength: CAPTCHA_LEN }}
//         sx={{
//           ...inputBaseSx,
//           px: { xs: 1.5, sm: 2 },
//           minWidth: 0,
//           fontSize: { xs: 14, sm: 15 },
//           letterSpacing: value ? '0.2em' : 0,
//           fontWeight: value ? 600 : 500,
//         }}
//       />
//     </Box>
//   );
// };

// /* ============================================================
//    LOGIN CARD
//    ============================================================ */
// const LoginHeader = () => (
//   <Box sx={{ mb: 4, [SHORT]: { mb: 3 } }}>
//     <Typography
//       id="lb-login-title"
//       component="h2"
//       sx={{ fontWeight: 700, color: C.navy, fontSize: { xs: 32, md: 36 }, lineHeight: 1.15, letterSpacing: '-0.02em' }}
//     >
//       Login
//     </Typography>
//     <Typography sx={{ mt: 1, fontSize: 15, fontWeight: 400, color: C.muted }}>Sign in securely to continue</Typography>
//   </Box>
// );

// const LoginActions = ({ rememberMe, onRememberChange, onForgot }) => (
//   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
//     <FormControlLabel
//       control={
//         <Checkbox
//           checked={rememberMe}
//           onChange={(e) => onRememberChange(e.target.checked)}
//           size="small"
//           sx={{
//             p: 0.75,
//             color: '#9AAAC2',
//             '&.Mui-checked': { color: C.blue },
//             '& .MuiSvgIcon-root': { fontSize: 20 },
//             '&.Mui-focusVisible': { outline: `2px solid ${C.blue}`, outlineOffset: -2, borderRadius: '6px' },
//           }}
//         />
//       }
//       label="Remember me"
//       sx={{ ml: '-6px', mr: 0, '& .MuiFormControlLabel-label': { fontSize: 14, fontWeight: 500, color: C.text } }}
//     />
//     <MuiLink
//       component="button"
//       type="button"
//       onClick={onForgot}
//       underline="hover"
//       sx={{
//         fontFamily: FONT_EN,
//         fontSize: 14,
//         fontWeight: 600,
//         color: C.blue,
//         '&:focus-visible': { outline: `2px solid ${C.blue}`, outlineOffset: 3, borderRadius: '4px' },
//       }}
//     >
//       Forgot password?
//     </MuiLink>
//   </Box>
// );

// const PrimaryButton = ({ loading }) => (
//   <Button
//     type="submit"
//     fullWidth
//     disabled={loading}
//     aria-busy={loading}
//     sx={{
//       position: 'relative',
//       height: 56,
//       borderRadius: RADIUS.input,
//       fontSize: 16,
//       fontWeight: 600,
//       letterSpacing: '0.01em',
//       color: C.white,
//       background: `linear-gradient(180deg, #0A70E3 0%, ${C.blue} 55%, ${C.blueDark} 100%)`,
//       boxShadow: '0 1px 2px rgba(0, 22, 90, 0.16), inset 0 1px 0 rgba(255,255,255,0.18)',
//       transition: `transform 200ms ${EASE}, box-shadow 200ms ${EASE}, filter 200ms ${EASE}`,
//       '& .lb-arrow': { position: 'absolute', right: 20, fontSize: 20, transition: `transform 200ms ${EASE}` },
//       '&:hover': {
//         background: `linear-gradient(180deg, #0A70E3 0%, ${C.blue} 55%, ${C.blueDark} 100%)`,
//         filter: 'brightness(0.96) saturate(1.08)',
//         transform: 'translateY(-2px)',
//         boxShadow: '0 10px 24px rgba(0, 82, 180, 0.28), inset 0 1px 0 rgba(255,255,255,0.18)',
//         '& .lb-arrow': { transform: 'translateX(3px)' },
//       },
//       '&:active': { transform: 'translateY(0)' },
//       '&.Mui-focusVisible': { outline: `3px solid rgba(0, 102, 217, 0.35)`, outlineOffset: 2 },
//       '&.Mui-disabled': { color: 'rgba(255,255,255,0.85)', background: '#7FA9DA', boxShadow: 'none' },
//       [SHORT]: { height: 52 },
//     }}
//   >
//     {loading ? 'Signing in…' : 'Login'}
//     <ArrowForwardRounded className="lb-arrow" aria-hidden="true" />
//   </Button>
// );

// const SecondaryAction = () => (
//   <Button
//     component={Link}
//     to="/register"
//     fullWidth
//     startIcon={<PersonAddAltOutlined sx={{ fontSize: '20px !important' }} />}
//     sx={{
//       height: 48,
//       borderRadius: RADIUS.input,
//       fontSize: 14.5,
//       fontWeight: 600,
//       color: C.navy,
//       bgcolor: 'transparent',
//       border: `1px solid ${C.border}`,
//       transition: `background-color 180ms ${EASE}, border-color 180ms ${EASE}`,
//       '&:hover': { bgcolor: '#F3F7FC', borderColor: C.borderHover },
//       '&.Mui-focusVisible': { outline: `2px solid ${C.blue}`, outlineOffset: 2 },
//       [SHORT]: { height: 44 },
//     }}
//   >
//     Create New Account
//   </Button>
// );

// const OrDivider = () => (
//   <Box aria-hidden="true" sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 3, [SHORT]: { my: 2 } }}>
//     <Box sx={{ flex: 1, height: '1px', bgcolor: '#E3E9F2' }} />
//     <Typography sx={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: '#8A96AD' }}>OR</Typography>
//     <Box sx={{ flex: 1, height: '1px', bgcolor: '#E3E9F2' }} />
//   </Box>
// );

// /* ============================================================
//    PAGE
//    ============================================================ */
// const validationSchema = Yup.object({
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string().required('Password is required'),
// });

// const Login = () => {
//   const [captchaValid, setCaptchaValid] = useState(false);
//   const [showResend, setShowResend] = useState(false); // State to show resend button
//   const [userEmail, setUserEmail] = useState(''); // Store email for resend
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(() => Boolean(safeGet(REMEMBER_KEY)));
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const authError = useSelector((state) => state.auth.error);
//   // eslint-disable-next-line no-unused-vars
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   useEffect(() => {
//     document.body.classList.add('lb-login-body');
//     return () => {
//       document.body.classList.remove('lb-login-body');
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     if (authError === 'Email is not verified. Please verify your email to login.') {
//       setShowResend(true);
//     } else {
//       setShowResend(false);
//     }
//   }, [authError]);

//   const formik = useFormik({
//     initialValues: {
//       email: safeGet(REMEMBER_KEY) || '',
//       password: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm, setSubmitting }) => {
//       if (!captchaValid) {
//         toast.error('Incorrect CAPTCHA. Please try again.', { position: 'top-center' });
//         return;
//       }
//       setUserEmail(values.email); // Store email for resend verification
//       safeSet(REMEMBER_KEY, rememberMe ? values.email : null);
//       setLoading(true);

//       try {
//         await dispatch(login(values, navigate));
//         resetForm({ values: { email: rememberMe ? values.email : '', password: '' } });
//       } catch (error) {
//         setSubmitting(false);
//       } finally {
//         setLoading(false); // ✅ Hide Loader
//       }
//     },
//   });

//   // **Function to Resend Verification Email**
//   const handleResendVerification = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${baseUrl}/resend-verification`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: userEmail }),
//       });

//       const data = await response.json();
//       setLoading(false);
//       toast.success(data.message || 'Verification link sent!', { position: 'top-center' });
//     } catch (error) {
//       setLoading(false);
//       toast.error('Something went wrong. Please try again.', { position: 'top-center' });
//     }
//   };

//   const handleTogglePassword = () => setShowPassword((prev) => !prev);

//   // Forgot password sathi abhi route nahi — tayar jhala ki ithe navigate('/forgot-password') kara
//   const handleForgotPassword = () => {
//     toast.info('Password reset sathi kripaya system administrator la samparka kara.', { position: 'top-center' });
//   };

//   return (
//     <ThemeProvider theme={loginTheme}>
//       {pageGlobalStyles}
//       <Box
//         data-lb-scroll
//         sx={{
//           position: 'fixed',
//           inset: 0,
//           zIndex: 1,
//           overflowY: 'auto',
//           overflowX: 'hidden',
//           fontFamily: FONT_EN,
//           backgroundColor: '#2E7FD8',
//           // Image + halka brand overlay + dabya bajula readability gradient (blur nahi)
//           backgroundImage: [
//             'linear-gradient(90deg, rgba(0,22,90,0.50) 0%, rgba(0,30,100,0.30) 38%, rgba(0,40,110,0.06) 62%, rgba(0,22,90,0.10) 100%)',
//             'linear-gradient(180deg, rgba(0,22,90,0.10) 0%, rgba(0,22,90,0) 30%, rgba(0,22,90,0) 70%, rgba(0,22,90,0.22) 100%)',
//             `url(${poleLoginBg})`,
//           ].join(', '),
//           backgroundSize: 'cover',
//           backgroundPosition: 'center bottom',
//           backgroundRepeat: 'no-repeat',
//         }}
//       >
//         <Box
//           sx={{
//             minHeight: '100%',
//             maxWidth: 1360,
//             mx: 'auto',
//             boxSizing: 'border-box',
//             px: { xs: 2, sm: 4, md: 5, lg: 8 },
//             py: { xs: 3, sm: 5, md: 5 },
//             display: 'grid',
//             alignItems: 'center',
//             gridTemplateColumns: { xs: 'minmax(0,1fr)', md: 'minmax(0,58fr) minmax(0,42fr)' },
//             gridTemplateAreas: {
//               xs: '"brand" "login" "leaders"',
//               md: '"brand login"',
//             },
//             columnGap: { md: 5, lg: 8 },
//             rowGap: 4,
//             [SHORT]: { py: 3 },
//           }}
//         >
//           {/* ===== LEFT: identity → product → leadership ===== */}
//           <Box
//             sx={{
//               gridArea: 'brand',
//               display: 'flex',
//               flexDirection: 'column',
//               gap: { xs: 3, md: 5 },
//               [SHORT]: { gap: 4 },
//             }}
//           >
//             <BrandHeader />
//             <ProductIntro />
//             <Box sx={{ display: { xs: 'none', md: 'block' } }}>
//               <LeadershipCards />
//             </Box>
//           </Box>

//           {/* Mobile var leadership login nantar */}
//           <Box sx={{ gridArea: 'leaders', display: { xs: 'block', md: 'none' }, minWidth: 0 }}>
//             <LeadershipCards />
//           </Box>

//           {/* ===== RIGHT: Login card ===== */}
//           <Box sx={{ gridArea: 'login', display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, minWidth: 0 }}>
//             <Box
//               component="form"
//               noValidate
//               onSubmit={formik.handleSubmit}
//               aria-labelledby="lb-login-title"
//               className="lb-rise lb-rise-1"
//               sx={{
//                 width: '100%',
//                 maxWidth: 464,
//                 boxSizing: 'border-box',
//                 p: { xs: 3, sm: 5 },
//                 borderRadius: RADIUS.card,
//                 bgcolor: 'rgba(255,255,255,0.88)',
//                 backdropFilter: 'blur(20px) saturate(160%)',
//                 WebkitBackdropFilter: 'blur(20px) saturate(160%)',
//                 border: '1px solid rgba(255,255,255,0.65)',
//                 boxShadow: [
//                   '0 1px 2px rgba(0, 22, 90, 0.06)',
//                   '0 8px 24px rgba(0, 22, 90, 0.10)',
//                   '0 32px 64px rgba(0, 22, 90, 0.16)',
//                   'inset 0 1px 0 rgba(255,255,255,0.9)',
//                 ].join(', '),
//                 [SHORT]: { p: 4 },
//               }}
//             >
//               <LoginHeader />

//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                 <EmailField formik={formik} />
//                 <PasswordField formik={formik} showPassword={showPassword} onToggle={handleTogglePassword} />
//                 <CaptchaField onValidate={setCaptchaValid} />
//               </Box>

//               <Box sx={{ mt: 2 }}>
//                 <LoginActions rememberMe={rememberMe} onRememberChange={setRememberMe} onForgot={handleForgotPassword} />
//               </Box>

//               {/* Error Message */}
//               {authError && (
//                 <Box
//                   role="alert"
//                   sx={{
//                     mt: 2,
//                     px: 2,
//                     py: 1.5,
//                     display: 'flex',
//                     gap: 1,
//                     alignItems: 'flex-start',
//                     bgcolor: '#FDF2F2',
//                     borderRadius: '12px',
//                     border: '1px solid #F5C7C7',
//                   }}
//                 >
//                   <ErrorOutlineRounded sx={{ fontSize: 18, color: '#C62828', mt: '1px' }} aria-hidden="true" />
//                   <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: '#9B1C1C', lineHeight: 1.45 }}>
//                     {authError}
//                   </Typography>
//                 </Box>
//               )}

//               {/* Resend Verification */}
//               {showResend && (
//                 <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
//                   <Link
//                     className="anchorverificationlink"
//                     onClick={handleResendVerification}
//                     style={{
//                       textDecoration: 'none',
//                       color: C.blue,
//                       fontWeight: '600',
//                       cursor: 'pointer',
//                       padding: '6px 12px',
//                       borderRadius: '8px',
//                       fontSize: '0.875rem',
//                     }}
//                   >
//                     Resend Verification Link
//                   </Link>
//                 </Box>
//               )}

//               {/* Loader */}
//               {loading && (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
//                   <LoaderLottie />
//                 </Box>
//               )}

//               <Box sx={{ mt: 3, [SHORT]: { mt: 2.5 } }}>
//                 <PrimaryButton loading={loading} />
//               </Box>

//               <OrDivider />

//               <SecondaryAction />
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Login;



// 8-Oct-2026 (v2): Premium enterprise login redesign.
// Fakt UI/UX layer badalla aahe. Login logic (formik + yup, captcha check, redux login,
// resend verification, loader, remember me, forgot password) aadhi sarkhich aahe.
import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputBase,
  Checkbox,
  FormControlLabel,
  Tooltip,
  GlobalStyles,
  ThemeProvider,
  createTheme,
  Link as MuiLink,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  MailOutlineRounded,
  LockOutlined,
  ArrowForwardRounded,
  PersonAddAltOutlined,
  RefreshRounded,
  ErrorOutlineRounded,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/loginActions';
import { useNavigate } from 'react-router-dom';

import poleLoginBg from '../../Images/poleLoginBg.png';
import vvcmclogo from '../../Images/vvcmclogo.jpg';
import ajivpatil from '../../Images/ajivsir7.jpeg';
import commissioner from '../../Images/commissioner.jpg';
import dcm from '../../Images/dcm.jpg';

import { baseUrl } from '../../config/config';
import LoaderLottie from '../../components/LoaderLottie'; // Import Loader

import './Auth.css';
import './Login.css';

/* ============================================================
   DESIGN TOKENS — 8px spacing system, restrained palette
   ============================================================ */
const C = {
  navy: '#00165A',
  blue: '#0066D9',
  blueDark: '#0052B4',
  cyan: '#2FD8E8',
  lightCyan: '#E3F8FC',
  white: '#FFFFFF',
  gold: '#F4C400',
  muted: '#5E6B85',
  border: '#D5DEEA',
  borderHover: '#A9BBD3',
  text: '#1D2A4D',
};
const FONT_EN = '"Montserrat", "Segoe UI", system-ui, sans-serif';
const RADIUS = { input: '14px', card: '24px', tile: '14px' };
const FOCUS_RING = '0 0 0 4px rgba(0, 102, 217, 0.14)';
const EASE = 'cubic-bezier(0.2, 0, 0, 1)';
// Laptop (1366x768) sarkhya kami unchichya screen sathi
const SHORT = '@media (min-width: 900px) and (max-height: 820px)';

const loginTheme = createTheme({
  palette: { primary: { main: C.blue, dark: C.blueDark }, text: { primary: C.text, secondary: C.muted } },
  typography: { fontFamily: FONT_EN, button: { textTransform: 'none' } },
  shape: { borderRadius: 14 },
  components: { MuiButtonBase: { defaultProps: { disableRipple: false } } },
});

const pageGlobalStyles = (
  <GlobalStyles
    styles={`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');
      body.lb-login-body { margin: 0; overflow-x: hidden; }
      @keyframes lbRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      .lb-rise { animation: lbRise 480ms ${EASE} both; }
      .lb-rise-1 { animation-delay: 60ms; } .lb-rise-2 { animation-delay: 120ms; } .lb-rise-3 { animation-delay: 180ms; }
      @media (prefers-reduced-motion: reduce) { .lb-rise { animation: none; } * { transition: none !important; } }
      .lb-noscroll::-webkit-scrollbar { display: none; } .lb-noscroll { scrollbar-width: none; }
    `}
  />
);

/* ============================================================
   Storage helpers (Remember me) — private mode madhe pan crash nahi
   ============================================================ */
const REMEMBER_KEY = 'lb_remember_email';
const safeGet = (k) => {
  try { return window.localStorage.getItem(k); } catch (e) { return null; }
};
const safeSet = (k, v) => {
  try {
    if (v) window.localStorage.setItem(k, v);
    else window.localStorage.removeItem(k);
  } catch (e) { /* storage blocked — ignore */ }
};

/* ============================================================
   LEFT COLUMN
   ============================================================ */
const BrandHeader = () => (
  <Box className="lb-rise" sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 } }}>
    <Box
      sx={{
        flexShrink: 0,
        width: { xs: 64, md: 80, xl: 88 },
        height: { xs: 64, md: 80, xl: 88 },
        borderRadius: '50%',
        p: '3px',
        bgcolor: C.white,
        boxShadow: '0 0 0 1px rgba(255,255,255,0.5), 0 8px 24px rgba(0, 22, 90, 0.28)',
        [SHORT]: { width: 72, height: 72 },
      }}
    >
      <Box
        component="img"
        src={vvcmclogo}
        alt="Vasai-Virar City Municipal Corporation logo"
        sx={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
      />
    </Box>

    <Box aria-hidden="true" sx={{ alignSelf: 'stretch', width: '2px', my: 1, bgcolor: C.gold, borderRadius: 1 }} />

    <Box sx={{ minWidth: 0 }}>
      {/* <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.24em',
          color: 'rgba(255,255,255,0.85)',
          textTransform: 'uppercase',
          lineHeight: 1,
          mb: 1,
        }}
      >
        Welcome
      </Typography> */}
      <Typography
        component="h1"
        sx={{
          fontWeight: 700,
          color: C.white,
          fontSize: { xs: 28, sm: 34, md: 38, lg: 42, xl: 46 },
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
          textShadow: '0 2px 12px rgba(0, 22, 90, 0.25)',
          [SHORT]: { fontSize: 38 },
        }}
      >
        Vasai-Virar
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          color: 'rgba(255,255,255,0.94)',
          fontSize: { xs: 15, sm: 18, md: 20, xl: 22 },
          lineHeight: 1.3,
          mt: 0.5,
          textShadow: '0 1px 8px rgba(0, 22, 90, 0.25)',
        }}
      >
        City Municipal Corporation
      </Typography>
    </Box>
  </Box>
);

const ProductIntro = () => (
  <Box className="lb-rise lb-rise-1" sx={{ maxWidth: 520 }}>
    <Box aria-hidden="true" sx={{ width: 40, height: 3, bgcolor: C.gold, borderRadius: 2, mb: 2 }} />
    <Typography
      component="h2"
      sx={{
        fontWeight: 700,
        color: C.white,
        fontSize: { xs: 22, sm: 26, md: 28, xl: 32 },
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
        textShadow: '0 2px 12px rgba(0, 22, 90, 0.3)',
        [SHORT]: { fontSize: 26 },
      }}
    >
      Light Bill Management System
    </Typography>
    <Typography
      sx={{
        mt: 1,
        fontWeight: 400,
        color: 'rgba(255,255,255,0.9)',
        fontSize: { xs: 15, md: 16, xl: 17 },
        lineHeight: 1.55,
        textShadow: '0 1px 8px rgba(0, 22, 90, 0.3)',
      }}
    >
      Smart, secure and transparent control
      <Box component="br" sx={{ display: { xs: 'none', sm: 'block' } }} /> of every electricity bill.
    </Typography>
  </Box>
);

// 8-Oct-2026: nav ani hudde official VVCMC mahiti pramane; kram — Mayor, Deputy Mayor, Commissioner
const LEADERS = [
//   { img: ajivpatil, name: 'Shri. Ajiv Patil', designation: 'Mayor', pos: 'center top' }, // dokyacha varcha bhag kapla jau naye
{ img: ajivpatil, name: 'Shri. Ajiv Patil', designation: 'Mayor', pos: 'center 9%' }, // dokyacha varcha bhag kapla jau naye
  { img: dcm, name: 'Shri. Marshal Lopes', designation: 'Deputy Mayor' },
//   { img: commissioner, name: 'Shri. Prithviraj B.P. (IAS)', designation: 'Commissioner' },

  { img: commissioner, name: 'Shri. Prithviraj B.P. (IAS)', designation: 'Commissioner', pos: 'center calc(18% + 2px)' },
];

// Tin vegle widgets nahi — ekach translucent panel madhe ek coordinated section
const LeadershipCards = () => (
  <Box
    className="lb-rise lb-rise-2"
    sx={{
      p: 1,
      maxWidth: { md: 560, xl: 600 },
      borderRadius: '20px',
      bgcolor: 'rgba(255,255,255,0.16)',
      border: '1px solid rgba(255,255,255,0.32)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      boxShadow: '0 12px 32px rgba(0, 22, 90, 0.16)',
    }}
  >
    <Box
      component="ul"
      aria-label="Leadership"
      className="lb-noscroll"
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(3, minmax(132px, 1fr))', sm: 'repeat(3, 1fr)' },
        gap: 1,
        overflowX: { xs: 'auto', sm: 'visible' },
        scrollSnapType: 'x mandatory',
      }}
    >
      {LEADERS.map((l) => (
        <Box
          component="li"
          key={l.name}
          sx={{
            scrollSnapAlign: 'start',
            bgcolor: 'rgba(255,255,255,0.95)',
            borderRadius: RADIUS.tile,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.9)',
            boxShadow: '0 1px 2px rgba(0, 22, 90, 0.06)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              height: { xs: 120, md: 136, xl: 160 },
              bgcolor: '#EEF2F7',
              [SHORT]: { height: 120 },
            }}
          >
            <Box
              component="img"
              src={l.img}
              alt={`${l.name}, ${l.designation}, Vasai-Virar City Municipal Corporation`}
              loading="lazy"
              sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: l.pos || 'center 18%', display: 'block' }}
            />
          </Box>
          <Box
            sx={{
              px: 1,
              py: 1.5,
              textAlign: 'center',
              fontFamily: FONT_EN,
              flex: 1,
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.25,
              [SHORT]: { py: 1 },
            }}
          >
            <Typography
              sx={{ fontFamily: 'inherit', fontSize: { xs: 13, xl: 14 }, fontWeight: 700, color: C.navy, lineHeight: 1.35 }}
            >
              {l.name}
            </Typography>
            <Typography sx={{ fontFamily: 'inherit', fontSize: 12, fontWeight: 500, color: C.muted, lineHeight: 1.4 }}>
              {l.designation}
            </Typography>
            <Box aria-hidden="true" sx={{ mt: 0.5, width: 20, height: 2, borderRadius: 1, bgcolor: C.gold }} />
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

/* ============================================================
   FORM FIELDS
   ============================================================ */
// Ekach field shell — Email, Password ani CAPTCHA sathi same border/focus/height
const fieldShell = {
  display: 'flex',
  alignItems: 'center',
  height: 56,
  bgcolor: C.white,
  border: `1px solid ${C.border}`,
  borderRadius: RADIUS.input,
  transition: `border-color 180ms ${EASE}, box-shadow 180ms ${EASE}`,
  '&:hover': { borderColor: C.borderHover },
  '&:focus-within': { borderColor: C.blue, boxShadow: FOCUS_RING },
  '& .lb-field-icon': { color: C.muted, fontSize: 20, transition: `color 180ms ${EASE}` },
  '&:focus-within .lb-field-icon': { color: C.blue },
  [SHORT]: { height: 52 },
};
const errorShell = {
  borderColor: '#D32F2F',
  '&:hover': { borderColor: '#D32F2F' },
  '&:focus-within': { borderColor: '#D32F2F', boxShadow: '0 0 0 4px rgba(211, 47, 47, 0.12)' },
};
const inputBaseSx = {
  flex: 1,
  height: '100%',
  fontFamily: FONT_EN,
  fontSize: 15,
  fontWeight: 500,
  color: C.text,
  '& input': { height: '100%', p: 0 },
  '& input::placeholder': { color: '#7A869E', opacity: 1, fontWeight: 400 },
  '& input:-webkit-autofill': { WebkitBoxShadow: '0 0 0 100px #fff inset', WebkitTextFillColor: C.text },
};

const FieldError = ({ id, children }) =>
  children ? (
    <Typography
      id={id}
      role="alert"
      sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.75, ml: 0.5, fontSize: 12.5, fontWeight: 500, color: '#C62828' }}
    >
      <ErrorOutlineRounded sx={{ fontSize: 15 }} /> {children}
    </Typography>
  ) : null;

const EmailField = ({ formik }) => {
  const err = formik.touched.email && formik.errors.email;
  return (
    <Box>
      <Box sx={{ ...fieldShell, ...(err ? errorShell : {}), px: 2, gap: 1.5 }}>
        <MailOutlineRounded className="lb-field-icon" aria-hidden="true" />
        <InputBase
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          placeholder="Email address"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          inputProps={{ 'aria-label': 'Email address', 'aria-invalid': Boolean(err), 'aria-describedby': err ? 'email-err' : undefined }}
          sx={inputBaseSx}
        />
      </Box>
      <FieldError id="email-err">{err}</FieldError>
    </Box>
  );
};

const PasswordField = ({ formik, showPassword, onToggle }) => {
  const err = formik.touched.password && formik.errors.password;
  return (
    <Box>
      <Box sx={{ ...fieldShell, ...(err ? errorShell : {}), pl: 2, pr: 0.75, gap: 1.5 }}>
        <LockOutlined className="lb-field-icon" aria-hidden="true" />
        <InputBase
          id="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          inputProps={{ 'aria-label': 'Password', 'aria-invalid': Boolean(err), 'aria-describedby': err ? 'password-err' : undefined }}
          sx={inputBaseSx}
        />
        <IconButton
          onClick={onToggle}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          aria-pressed={showPassword}
          size="small"
          sx={{
            width: 40,
            height: 40,
            borderRadius: '10px',
            color: C.muted,
            transition: `background-color 180ms ${EASE}, color 180ms ${EASE}`,
            '&:hover': { bgcolor: '#F1F5FB', color: C.navy },
            '&.Mui-focusVisible': { outline: `2px solid ${C.blue}`, outlineOffset: 1 },
          }}
        >
          {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
        </IconButton>
      </Box>
      <FieldError id="password-err">{err}</FieldError>
    </Box>
  );
};

// Gondhal hou naye mhanun 0/O, 1/I/L vagle aahet
const CAPTCHA_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const CAPTCHA_LEN = 4;
const makeCaptcha = () =>
  Array.from({ length: CAPTCHA_LEN }, () => ({
    ch: CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)],
    rot: Math.round(Math.random() * 10 - 5), // halka visual noise
  }));

/** MathCaptcha sarkhach API: onValidate(true/false). Teen tukde → ekach unified field. */
const CaptchaField = ({ onValidate }) => {
  const [glyphs, setGlyphs] = useState(makeCaptcha);
  const [value, setValue] = useState('');
  const code = glyphs.map((g) => g.ch).join('');

  const refresh = useCallback(() => {
    setGlyphs(makeCaptcha());
    setValue('');
    onValidate(false);
  }, [onValidate]);

  const handleChange = (e) => {
    const v = e.target.value.toUpperCase().replace(/\s/g, '').slice(0, CAPTCHA_LEN);
    setValue(v);
    onValidate(v === code);
  };

  return (
    <Box sx={{ ...fieldShell, overflow: 'hidden' }}>
      <Box
        role="img"
        aria-label={`CAPTCHA code: ${code.split('').join(' ')}`}
        sx={{
          height: '100%',
          flex: { xs: '0 0 34%', sm: '0 0 40%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 1, sm: 1.5 },
          userSelect: 'none',
          bgcolor: '#F3F6FB',
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(0,22,90,0.035) 0 1px, transparent 1px 7px)',
          borderRight: `1px solid ${C.border}`,
        }}
      >
        {glyphs.map((g, i) => (
          <Box
            key={i}
            component="span"
            aria-hidden="true"
            sx={{
              display: 'inline-block',
              transform: `rotate(${g.rot}deg)`,
              fontFamily: FONT_EN,
              fontWeight: 700,
              fontSize: { xs: 18, sm: 20 },
              color: C.navy,
              lineHeight: 1,
            }}
          >
            {g.ch}
          </Box>
        ))}
      </Box>

      <Tooltip title="New code" placement="top">
        <IconButton
          onClick={refresh}
          aria-label="Refresh CAPTCHA"
          size="small"
          sx={{
            mx: { xs: 0.5, sm: 0.75 },
            width: 36,
            height: 36,
            borderRadius: '10px',
            color: C.muted,
            transition: `background-color 180ms ${EASE}, color 180ms ${EASE}`,
            '& svg': { fontSize: 20, transition: `transform 320ms ${EASE}` },
            '&:hover': { bgcolor: '#F1F5FB', color: C.navy, '& svg': { transform: 'rotate(180deg)' } },
            '&.Mui-focusVisible': { outline: `2px solid ${C.blue}`, outlineOffset: 1 },
          }}
        >
          <RefreshRounded />
        </IconButton>
      </Tooltip>

      <Box aria-hidden="true" sx={{ width: '1px', alignSelf: 'stretch', my: 1.5, bgcolor: C.border }} />

      <InputBase
        value={value}
        onChange={handleChange}
        placeholder="Enter CAPTCHA"
        inputProps={{ 'aria-label': 'Enter CAPTCHA code', autoComplete: 'off', spellCheck: 'false', maxLength: CAPTCHA_LEN }}
        sx={{
          ...inputBaseSx,
          px: { xs: 1.5, sm: 2 },
          minWidth: 0,
          fontSize: { xs: 14, sm: 15 },
          letterSpacing: value ? '0.2em' : 0,
          fontWeight: value ? 600 : 500,
        }}
      />
    </Box>
  );
};

/* ============================================================
   LOGIN CARD
   ============================================================ */
const LoginHeader = () => (
  <Box sx={{ mb: 4, [SHORT]: { mb: 3 } }}>
    <Typography
      id="lb-login-title"
      component="h2"
      sx={{ fontWeight: 700, color: C.navy, fontSize: { xs: 32, md: 36 }, lineHeight: 1.15, letterSpacing: '-0.02em' }}
    >
      Login
    </Typography>
    <Typography sx={{ mt: 1, fontSize: 15, fontWeight: 400, color: C.muted }}>Sign in securely to continue</Typography>
  </Box>
);

const LoginActions = ({ rememberMe, onRememberChange, onForgot }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
    <FormControlLabel
      control={
        <Checkbox
          checked={rememberMe}
          onChange={(e) => onRememberChange(e.target.checked)}
          size="small"
          sx={{
            p: 0.75,
            color: '#9AAAC2',
            '&.Mui-checked': { color: C.blue },
            '& .MuiSvgIcon-root': { fontSize: 20 },
            '&.Mui-focusVisible': { outline: `2px solid ${C.blue}`, outlineOffset: -2, borderRadius: '6px' },
          }}
        />
      }
      label="Remember me"
      sx={{ ml: '-6px', mr: 0, '& .MuiFormControlLabel-label': { fontSize: 14, fontWeight: 500, color: C.text } }}
    />
    <MuiLink
      component="button"
      type="button"
      onClick={onForgot}
      underline="hover"
      sx={{
        fontFamily: FONT_EN,
        fontSize: 14,
        fontWeight: 600,
        color: C.blue,
        '&:focus-visible': { outline: `2px solid ${C.blue}`, outlineOffset: 3, borderRadius: '4px' },
      }}
    >
      Forgot password?
    </MuiLink>
  </Box>
);

const PrimaryButton = ({ loading }) => (
  <Button
    type="submit"
    fullWidth
    disabled={loading}
    aria-busy={loading}
    sx={{
      position: 'relative',
      height: 56,
      borderRadius: RADIUS.input,
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: '0.01em',
      color: C.white,
      background: `linear-gradient(180deg, #0A70E3 0%, ${C.blue} 55%, ${C.blueDark} 100%)`,
      boxShadow: '0 1px 2px rgba(0, 22, 90, 0.16), inset 0 1px 0 rgba(255,255,255,0.18)',
      transition: `transform 200ms ${EASE}, box-shadow 200ms ${EASE}, filter 200ms ${EASE}`,
      '& .lb-arrow': { position: 'absolute', right: 20, fontSize: 20, transition: `transform 200ms ${EASE}` },
      '&:hover': {
        background: `linear-gradient(180deg, #0A70E3 0%, ${C.blue} 55%, ${C.blueDark} 100%)`,
        filter: 'brightness(0.96) saturate(1.08)',
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 24px rgba(0, 82, 180, 0.28), inset 0 1px 0 rgba(255,255,255,0.18)',
        '& .lb-arrow': { transform: 'translateX(3px)' },
      },
      '&:active': { transform: 'translateY(0)' },
      '&.Mui-focusVisible': { outline: `3px solid rgba(0, 102, 217, 0.35)`, outlineOffset: 2 },
      '&.Mui-disabled': { color: 'rgba(255,255,255,0.85)', background: '#7FA9DA', boxShadow: 'none' },
      [SHORT]: { height: 52 },
    }}
  >
    {loading ? 'Signing in…' : 'Login'}
    <ArrowForwardRounded className="lb-arrow" aria-hidden="true" />
  </Button>
);

const SecondaryAction = () => (
  <Button
    component={Link}
    to="/register"
    fullWidth
    startIcon={<PersonAddAltOutlined sx={{ fontSize: '20px !important' }} />}
    sx={{
      height: 48,
      borderRadius: RADIUS.input,
      fontSize: 14.5,
      fontWeight: 600,
      color: C.navy,
      bgcolor: 'transparent',
      border: `1px solid ${C.border}`,
      transition: `background-color 180ms ${EASE}, border-color 180ms ${EASE}`,
      '&:hover': { bgcolor: '#F3F7FC', borderColor: C.borderHover },
      '&.Mui-focusVisible': { outline: `2px solid ${C.blue}`, outlineOffset: 2 },
      [SHORT]: { height: 44 },
    }}
  >
    Create New Account
  </Button>
);

const OrDivider = () => (
  <Box aria-hidden="true" sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 3, [SHORT]: { my: 2 } }}>
    <Box sx={{ flex: 1, height: '1px', bgcolor: '#E3E9F2' }} />
    <Typography sx={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', color: '#8A96AD' }}>OR</Typography>
    <Box sx={{ flex: 1, height: '1px', bgcolor: '#E3E9F2' }} />
  </Box>
);

/* ============================================================
   PAGE
   ============================================================ */
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const [captchaValid, setCaptchaValid] = useState(false);
  const [showResend, setShowResend] = useState(false); // State to show resend button
  const [userEmail, setUserEmail] = useState(''); // Store email for resend
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => Boolean(safeGet(REMEMBER_KEY)));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.auth.error);
  // eslint-disable-next-line no-unused-vars
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    document.body.classList.add('lb-login-body');
    return () => {
      document.body.classList.remove('lb-login-body');
    };
  }, [dispatch]);

  useEffect(() => {
    if (authError === 'Email is not verified. Please verify your email to login.') {
      setShowResend(true);
    } else {
      setShowResend(false);
    }
  }, [authError]);

  const formik = useFormik({
    initialValues: {
      email: safeGet(REMEMBER_KEY) || '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      if (!captchaValid) {
        toast.error('Incorrect CAPTCHA. Please try again.', { position: 'top-center' });
        return;
      }
      setUserEmail(values.email); // Store email for resend verification
      safeSet(REMEMBER_KEY, rememberMe ? values.email : null);
      setLoading(true);

      try {
        await dispatch(login(values, navigate));
        resetForm({ values: { email: rememberMe ? values.email : '', password: '' } });
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();
      setLoading(false);
      toast.success(data.message || 'Verification link sent!', { position: 'top-center' });
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong. Please try again.', { position: 'top-center' });
    }
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  // Forgot password sathi abhi route nahi — tayar jhala ki ithe navigate('/forgot-password') kara
  const handleForgotPassword = () => {
    toast.info('Password reset sathi kripaya system administrator la samparka kara.', { position: 'top-center' });
  };

  return (
    <ThemeProvider theme={loginTheme}>
      {pageGlobalStyles}
      <Box
        data-lb-scroll
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          fontFamily: FONT_EN,
          backgroundColor: '#2E7FD8',
          // Image + halka brand overlay + dabya bajula readability gradient (blur nahi)
          backgroundImage: [
            'linear-gradient(90deg, rgba(0,22,90,0.50) 0%, rgba(0,30,100,0.30) 38%, rgba(0,40,110,0.06) 62%, rgba(0,22,90,0.10) 100%)',
            'linear-gradient(180deg, rgba(0,22,90,0.10) 0%, rgba(0,22,90,0) 30%, rgba(0,22,90,0) 70%, rgba(0,22,90,0.22) 100%)',
            `url(${poleLoginBg})`,
          ].join(', '),
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box
          sx={{
            minHeight: '100%',
            maxWidth: 1360,
            mx: 'auto',
            boxSizing: 'border-box',
            px: { xs: 2, sm: 4, md: 5, lg: 8 },
            py: { xs: 3, sm: 5, md: 5 },
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: { xs: 'minmax(0,1fr)', md: 'minmax(0,58fr) minmax(0,42fr)' },
            gridTemplateAreas: {
              xs: '"brand" "login" "leaders"',
              md: '"brand login"',
            },
            columnGap: { md: 5, lg: 8 },
            rowGap: 4,
            [SHORT]: { py: 3 },
          }}
        >
          {/* ===== LEFT: identity → product → leadership ===== */}
          <Box
            sx={{
              gridArea: 'brand',
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 3, md: 5 },
              [SHORT]: { gap: 4 },
            }}
          >
            <BrandHeader />
            <ProductIntro />
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <LeadershipCards />
            </Box>
          </Box>

          {/* Mobile var leadership login nantar */}
          <Box sx={{ gridArea: 'leaders', display: { xs: 'block', md: 'none' }, minWidth: 0 }}>
            <LeadershipCards />
          </Box>

          {/* ===== RIGHT: Login card ===== */}
          <Box sx={{ gridArea: 'login', display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, minWidth: 0 }}>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              aria-labelledby="lb-login-title"
              className="lb-rise lb-rise-1"
              sx={{
                width: '100%',
                maxWidth: 464,
                boxSizing: 'border-box',
                p: { xs: 3, sm: 5 },
                borderRadius: RADIUS.card,
                // 8-Oct-2026: card thoda transparent — maagche transmission towers halke distat
                bgcolor: 'rgba(255,255,255,0.62)',
                backdropFilter: 'blur(6px) saturate(140%)',
                WebkitBackdropFilter: 'blur(6px) saturate(140%)',
                border: '1px solid rgba(255,255,255,0.7)',
                boxShadow: [
                  '0 1px 2px rgba(0, 22, 90, 0.06)',
                  '0 8px 24px rgba(0, 22, 90, 0.10)',
                  '0 32px 64px rgba(0, 22, 90, 0.16)',
                  'inset 0 1px 0 rgba(255,255,255,0.9)',
                ].join(', '),
                [SHORT]: { p: 4 },
              }}
            >
              <LoginHeader />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <EmailField formik={formik} />
                <PasswordField formik={formik} showPassword={showPassword} onToggle={handleTogglePassword} />
                <CaptchaField onValidate={setCaptchaValid} />
              </Box>

              <Box sx={{ mt: 2 }}>
                <LoginActions rememberMe={rememberMe} onRememberChange={setRememberMe} onForgot={handleForgotPassword} />
              </Box>

              {/* Error Message */}
              {authError && (
                <Box
                  role="alert"
                  sx={{
                    mt: 2,
                    px: 2,
                    py: 1.5,
                    display: 'flex',
                    gap: 1,
                    alignItems: 'flex-start',
                    bgcolor: '#FDF2F2',
                    borderRadius: '12px',
                    border: '1px solid #F5C7C7',
                  }}
                >
                  <ErrorOutlineRounded sx={{ fontSize: 18, color: '#C62828', mt: '1px' }} aria-hidden="true" />
                  <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: '#9B1C1C', lineHeight: 1.45 }}>
                    {authError}
                  </Typography>
                </Box>
              )}

              {/* Resend Verification */}
              {showResend && (
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                  <Link
                    className="anchorverificationlink"
                    onClick={handleResendVerification}
                    style={{
                      textDecoration: 'none',
                      color: C.blue,
                      fontWeight: '600',
                      cursor: 'pointer',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                    }}
                  >
                    Resend Verification Link
                  </Link>
                </Box>
              )}

              {/* Loader */}
              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                  <LoaderLottie />
                </Box>
              )}

              <Box sx={{ mt: 3, [SHORT]: { mt: 2.5 } }}>
                <PrimaryButton loading={loading} />
              </Box>

              <OrDivider />

              <SecondaryAction />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Login;