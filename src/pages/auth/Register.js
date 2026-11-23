


// // -------------------------------------------

// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Container,
//   InputAdornment,
//   IconButton,
//   Paper
// } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { addUser } from '../../store/actions/userActions';
// import LoaderLottie from '../../components/LoaderLottie';
// import vvcmclogo from '../../Images/vvcmclogo.jpg';

// const validationSchema = Yup.object({
//   username: Yup.string().required('User Name is required'),
//   email: Yup.string().required('Email is required'),
//   password: Yup.string()
//     .min(8, 'Password must be at least 8 characters')
//     .matches(/[A-Z]/, 'Must contain uppercase')
//     .matches(/[a-z]/, 'Must contain lowercase')
//     .matches(/[0-9]/, 'Must contain number')
//     .matches(/[@$!%*?&#]/, 'Must contain special char')
//     .required('Password is required'),
//   contactNumber: Yup.string()
//     .matches(/^\d{10}$/, 'Must be 10 digits')
//     .required('Contact number is required'),
//   address: Yup.string().required('Address is required'),
// });

// const Register = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     document.body.classList.add('auth-body');
//     return () => document.body.classList.remove('auth-body');
//   }, []);

//   const formik = useFormik({
//     initialValues: {
//       username: '',
//       email: '',
//       password: '',
//       contactNumber: '',
//       address: '',
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       setLoading(true);
//       try {
//         await dispatch(addUser(values));
//       } finally {
//         setLoading(false);
//       }
//     }
//   });

//   return (
//     <Container className="Auth-Container" maxWidth="sm">
//       <Paper
//         elevation={24}
//         sx={{
//           width: { xs: '95%', sm: '90%', md: '85%', lg: '80%' },
//           maxWidth: '450px',
//           margin: 'auto',
//           padding: { xs: '15px 12px 20px', sm: '20px 18px 25px' },
//           borderRadius: '16px',
//           bgcolor: 'rgba(255, 255, 255, 0.95)',
//           backdropFilter: 'blur(10px)',
//           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
//           border: '1px solid rgba(255, 255, 255, 0.2)',
//           position: 'relative',
//           overflow: 'hidden',
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             height: '4px',
//             background: 'linear-gradient(90deg, #0866FF, #31A24C, #0866FF)',
//             backgroundSize: '200% 100%',
//             animation: 'gradient 3s ease infinite',
//           },
//           '@keyframes gradient': {
//             '0%': { backgroundPosition: '0% 50%' },
//             '50%': { backgroundPosition: '100% 50%' },
//             '100%': { backgroundPosition: '0% 50%' },
//           }
//         }}
//         component="form"
//         onSubmit={formik.handleSubmit}
//       >
//         {/* Logo */}
//         <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//           <Box sx={{
//             width: { xs: '70px', sm: '80px' },
//             height: { xs: '70px', sm: '80px' },
//             borderRadius: '50%',
//             overflow: 'hidden',
//             border: '3px solid rgba(8, 102, 255, 0.2)',
//             boxShadow: '0 4px 16px rgba(8, 102, 255, 0.3)',
//             transition: 'all 0.3s ease',
//             '&:hover': {
//               transform: 'scale(1.05)',
//               boxShadow: '0 6px 24px rgba(8, 102, 255, 0.4)',
//             }
//           }}>
//             <img src={vvcmclogo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//           </Box>
//         </Box>

//         {/* Title */}
//         <Box sx={{ textAlign: 'center', mb: 2 }}>
//           <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 0.5 }}>
//             Create New Account
//           </Typography>
//           <Typography variant="body2" sx={{ color: '#666' }}>
//             Please fill the details to register
//           </Typography>
//         </Box>

//         {/* Form Fields */}
//         {[
//           { id: 'username', label: 'Username' },
//           { id: 'email', label: 'Email' },
//           { id: 'contactNumber', label: 'Contact Number' },
//           { id: 'address', label: 'Address', multiline: true, minRows: 2 }
//         ].map(({ id, label, multiline, minRows }) => (
//           <TextField
//             key={id}
//             fullWidth
//             id={id}
//             name={id}
//             label={label}
//             value={formik.values[id]}
//             onChange={formik.handleChange}
//             error={formik.touched[id] && Boolean(formik.errors[id])}
//             helperText={formik.touched[id] && formik.errors[id]}
//             margin="normal"
//             variant="outlined"
//             size="small"
//             multiline={multiline}
//             minRows={minRows}
//             sx={{
//               mb: 1.5,
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: '12px',
//                 '&:hover': {
//                   boxShadow: '0 2px 8px rgba(8, 102, 255, 0.15)',
//                 },
//                 '&.Mui-focused': {
//                   boxShadow: '0 4px 16px rgba(8, 102, 255, 0.25)',
//                 }
//               },
//               '& .MuiInputLabel-root': {
//                 color: '#666',
//                 '&.Mui-focused': {
//                   color: '#0866FF',
//                 }
//               }
//             }}
//           />
//         ))}

//         {/* Password */}
//         <TextField
//           fullWidth
//           id="password"
//           name="password"
//           label="Password"
//           type={showPassword ? 'text' : 'password'}
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           error={formik.touched.password && Boolean(formik.errors.password)}
//           helperText={formik.touched.password && formik.errors.password}
//           margin="normal"
//           variant="outlined"
//           size="small"
//           sx={{
//             mb: 1.5,
//             '& .MuiOutlinedInput-root': {
//               borderRadius: '12px',
//               '&:hover': {
//                 boxShadow: '0 2px 8px rgba(8, 102, 255, 0.15)',
//               },
//               '&.Mui-focused': {
//                 boxShadow: '0 4px 16px rgba(8, 102, 255, 0.25)',
//               }
//             },
//             '& .MuiInputLabel-root': {
//               color: '#666',
//               '&.Mui-focused': {
//                 color: '#0866FF',
//               }
//             }
//           }}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             )
//           }}
//         />

//         {/* Register Button */}
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
//           {loading ? <LoaderLottie /> : (
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{
//                 width: { xs: '100%', sm: '80%' },
//                 py: 1,
//                 borderRadius: '12px',
//                 background: 'linear-gradient(135deg, #31A24C 0%, #4CAF50 100%)',
//                 fontWeight: 'bold',
//                 fontSize: { xs: '0.9rem', sm: '1rem' },
//                 textTransform: 'none',
//                 color: '#fff',
//                 boxShadow: '0 4px 16px rgba(49, 162, 76, 0.3)',
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   background: 'linear-gradient(135deg, #4CAF50 0%, #31A24C 100%)',
//                   transform: 'translateY(-2px)',
//                   boxShadow: '0 6px 24px rgba(49, 162, 76, 0.4)',
//                 }
//               }}
//             >
//               Register
//             </Button>
//           )}
//         </Box>

//         {/* Already have account link */}
//         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//           <Link
//             to="/login"
//             style={{
//               textDecoration: 'none',
//               fontWeight: '500',
//               fontSize: '0.9rem',
//               color: '#0866FF',
//               padding: '6px 12px',
//               borderRadius: '6px',
//               transition: 'all 0.3s ease',
//             }}
//           >
//             Already have an account?
//           </Link>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default Register;



// 8-Oct-2026: Registration page — Login page sarkhach premium UI.
// Fakt UI/UX layer badalla aahe. Register logic (formik + yup validation, addUser dispatch,
// loader, /login link) aadhi sarkhich aahe.
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputBase,
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
  ErrorOutlineRounded,
  PersonOutlineRounded,
  PhoneIphoneRounded,
  HomeOutlined,
  LoginRounded,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUser } from '../../store/actions/userActions';
import LoaderLottie from '../../components/LoaderLottie';

import poleLoginBg from '../../Images/poleLoginBg.png';
import vvcmclogo from '../../Images/vvcmclogo.jpg';
import ajivpatil from '../../Images/ajivsir7.jpeg';
import commissioner from '../../Images/commissioner.jpg';
import dcm from '../../Images/dcm.jpg';

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

const RegField = ({ formik, id, placeholder, icon: Icon, type = 'text', inputMode, autoComplete, multiline }) => {
  const err = formik.touched[id] && formik.errors[id];
  return (
    <Box>
      <Box
        sx={{
          ...fieldShell,
          ...(err ? errorShell : {}),
          px: 2,
          gap: 1.5,
          ...(multiline
            ? { height: 'auto', minHeight: 76, alignItems: 'flex-start', py: 1.5, [SHORT]: { height: 'auto', minHeight: 64 } }
            : {}),
        }}
      >
        <Icon className="lb-field-icon" aria-hidden="true" sx={multiline ? { mt: '2px' } : undefined} />
        <InputBase
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={formik.values[id]}
          onChange={formik.handleChange}
          multiline={multiline}
          minRows={multiline ? 2 : undefined}
          maxRows={multiline ? 3 : undefined}
          inputProps={{
            'aria-label': placeholder,
            'aria-invalid': Boolean(err),
            'aria-describedby': err ? `${id}-err` : undefined,
            inputMode,
          }}
          sx={{
            ...inputBaseSx,
            ...(multiline ? { height: 'auto', '& textarea': { p: 0, lineHeight: 1.5 } } : {}),
          }}
        />
      </Box>
      <FieldError id={`${id}-err`}>{err}</FieldError>
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
          autoComplete="new-password"
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          inputProps={{
            'aria-label': 'Password',
            'aria-invalid': Boolean(err),
            'aria-describedby': err ? 'password-err' : 'password-hint',
          }}
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
      {err ? (
        <FieldError id="password-err">{err}</FieldError>
      ) : (
        <Typography id="password-hint" sx={{ mt: 0.75, ml: 0.5, fontSize: 12, color: C.muted }}>
          Min 8 characters with A–Z, a–z, 0–9 and a symbol (@$!%*?&#)
        </Typography>
      )}
    </Box>
  );
};

/* ============================================================
   REGISTER CARD
   ============================================================ */
const RegisterHeader = () => (
  <Box sx={{ mb: 3, [SHORT]: { mb: 2 } }}>
    <Typography
      id="lb-register-title"
      component="h2"
      sx={{ fontWeight: 700, color: C.navy, fontSize: { xs: 28, md: 32 }, lineHeight: 1.15, letterSpacing: '-0.02em' }}
    >
      Create New Account
    </Typography>
    <Typography sx={{ mt: 1, fontSize: 15, fontWeight: 400, color: C.muted }}>Please fill the details to register</Typography>
  </Box>
);

const PrimaryButton = () => (
  <Button
    type="submit"
    fullWidth
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
      [SHORT]: { height: 52 },
    }}
  >
    Register
    <ArrowForwardRounded className="lb-arrow" aria-hidden="true" />
  </Button>
);

const SecondaryAction = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75, mt: 2.5, [SHORT]: { mt: 2 } }}>
    <Typography sx={{ fontSize: 14, color: C.muted }}>Already have an account?</Typography>
    <MuiLink
      component={Link}
      to="/login"
      underline="hover"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        fontFamily: FONT_EN,
        fontSize: 14,
        fontWeight: 600,
        color: C.blue,
        '&:focus-visible': { outline: `2px solid ${C.blue}`, outlineOffset: 3, borderRadius: '4px' },
      }}
    >
      <LoginRounded sx={{ fontSize: 18 }} aria-hidden="true" /> Login
    </MuiLink>
  </Box>
);

/* ============================================================
   PAGE
   ============================================================ */
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

  // Login page sarkhach body class (juna 'auth-body' background aata vaprat nahi)
  useEffect(() => {
    document.body.classList.add('lb-login-body');
    return () => document.body.classList.remove('lb-login-body');
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
    },
  });

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
          {/* ===== LEFT: Login page sarkhach ===== */}
          <Box sx={{ gridArea: 'brand', display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 5 }, [SHORT]: { gap: 4 } }}>
            <BrandHeader />
            <ProductIntro />
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <LeadershipCards />
            </Box>
          </Box>

          <Box sx={{ gridArea: 'leaders', display: { xs: 'block', md: 'none' }, minWidth: 0 }}>
            <LeadershipCards />
          </Box>

          {/* ===== RIGHT: Register card ===== */}
          <Box sx={{ gridArea: 'login', display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, minWidth: 0 }}>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              aria-labelledby="lb-register-title"
              className="lb-rise lb-rise-1"
              sx={{
                width: '100%',
                maxWidth: 464,
                boxSizing: 'border-box',
                p: { xs: 3, sm: 5 },
                borderRadius: RADIUS.card,
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
                [SHORT]: { p: 3.5 },
              }}
            >
              <RegisterHeader />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, [SHORT]: { gap: 1.5 } }}>
                <RegField formik={formik} id="username" placeholder="Username" icon={PersonOutlineRounded} autoComplete="username" />
                <RegField formik={formik} id="email" placeholder="Email address" icon={MailOutlineRounded} type="email" autoComplete="email" />
                <RegField
                  formik={formik}
                  id="contactNumber"
                  placeholder="Contact Number"
                  icon={PhoneIphoneRounded}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                />
                <RegField formik={formik} id="address" placeholder="Address" icon={HomeOutlined} multiline autoComplete="street-address" />
                <PasswordField formik={formik} showPassword={showPassword} onToggle={() => setShowPassword(!showPassword)} />
              </Box>

              {/* Register Button / Loader — aadhi sarkhech */}
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', [SHORT]: { mt: 2.5 } }}>
                {loading ? <LoaderLottie /> : <PrimaryButton />}
              </Box>

              <SecondaryAction />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Register;
