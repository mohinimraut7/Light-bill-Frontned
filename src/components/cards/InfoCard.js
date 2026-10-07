// // import React from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Card, CardContent, Typography } from '@mui/material';
// // import { styled, useTheme } from '@mui/material/styles';
// // import { Box, Button, useMediaQuery,Avatar } from '@mui/material';
// // import CountUp from 'react-countup';
// // import './InfoCard.css';
// // const InfoCard = ({ title, count, avatarColor, avatarIcon = 'A',
// //   backgroundColor,IconComponent,onClick
// //  }) => {
// //   const open = useSelector((state) => state.sidebar.isOpen);
// //   const theme = useTheme();
// //   const isXs = useMediaQuery(theme.breakpoints.down('xs'));
// //   const isSm = useMediaQuery(theme.breakpoints.down('sm'));
// //   const isMd = useMediaQuery(theme.breakpoints.down('md'));
// //   return (
// //     <Card
// //     className='container-infocard'
// //     sx={{
// //       backgroundColor:backgroundColor,
// //         display:'flex',
// //         flexDirection:'column',
// //         justifyContent:'flex-start',
// //         alignItems:'flex-start',
// //         boxShadow:4,
// //         minHeight:100,
// //         // margin: 1,
// //         color: 'white',
// //         borderRadius:1,
// //         width: isSm ? '100%': '18%',
        
// //       }}
// //       onClick={onClick}
// //      >
// //         {/* {IconComponent && (
// //         <IconComponent sx={{ fontSize:30, color: avatarColor }} />
// //       )} */}
// //         <Typography variant="h6">
// //           <CountUp  style={{fontSize:'30px',color:avatarColor,fontWeight:'bold'}} end={count} duration={3.5} />
// //         </Typography>
// //       <CardContent>
// //         <Typography component="div" sx={{fontWeight:'bold',color:avatarColor}}>
// //           {title}
// //         </Typography>
// //       </CardContent>
// //     </Card>
// //   );
// // };
// // export default InfoCard;

// // ======================================

// // import React from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Card, CardContent, Typography } from '@mui/material';
// // import { styled, useTheme } from '@mui/material/styles';
// // import { Box, Button, useMediaQuery, Avatar } from '@mui/material';
// // import CountUp from 'react-countup';
// // import './InfoCard.css';

// // const InfoCard = ({ title, count, avatarColor, avatarIcon = 'A',
// //   backgroundColor, IconComponent, onClick
// // }) => {
// //   const open = useSelector((state) => state.sidebar.isOpen);
// //   const theme = useTheme();
// //   const isXs = useMediaQuery(theme.breakpoints.down('xs'));
// //   const isSm = useMediaQuery(theme.breakpoints.down('sm'));
// //   const isMd = useMediaQuery(theme.breakpoints.down('md'));

// //   return (
// //     <Card
// //       className='container-infocard'
// //       sx={{
// //         backgroundColor: backgroundColor,
// //         display: 'flex',
// //         flexDirection: 'column',
// //         justifyContent: 'space-between',
// //         alignItems: 'flex-start',
// //         boxShadow: 4,
// //         minHeight: 120,
// //         color: 'white',
// //         borderRadius: 2,
// //         width: '100%', // Let Grid handle the width
// //         cursor: 'pointer',
// //         transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
// //         '&:hover': {
// //           transform: 'translateY(-4px)',
// //           boxShadow: 6,
// //         },
// //         padding: 2,
// //       }}
// //       onClick={onClick}
// //     >
// //       <Box sx={{ 
// //         display: 'flex', 
// //         justifyContent: 'space-between', 
// //         alignItems: 'flex-start',
// //         width: '100%'
// //       }}>
// //         <Box sx={{ flex: 1 }}>
// //           <Typography 
// //             variant="h4" 
// //             sx={{ 
// //               fontSize: '28px', 
// //               color: avatarColor, 
// //               fontWeight: 'bold',
// //               marginBottom: 1
// //             }}
// //           >
// //             <CountUp end={count} duration={2.5} />
// //           </Typography>
// //           <Typography 
// //             component="div" 
// //             sx={{ 
// //               fontWeight: 'bold', 
// //               color: avatarColor,
// //               fontSize: '14px',
// //               lineHeight: 1.2
// //             }}
// //           >
// //             {title}
// //           </Typography>
// //         </Box>
        
// //         {IconComponent && (
// //           <Box sx={{
// //             backgroundColor: avatarColor,
// //             borderRadius: '50%',
// //             padding: 1.5,
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             minWidth: 48,
// //             minHeight: 48,
// //           }}>
// //             <IconComponent sx={{ fontSize: 24, color: 'white' }} />
// //           </Box>
// //         )}
// //       </Box>
// //     </Card>
// //   );
// // };

// // export default InfoCard;

// // ================================

// // import React from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Card, CardContent, Typography } from '@mui/material';
// // import { styled, useTheme } from '@mui/material/styles';
// // import { Box, Button, useMediaQuery, Avatar } from '@mui/material';
// // import CountUp from 'react-countup';
// // import './InfoCard.css';

// // const InfoCard = ({ title, count, avatarColor, avatarIcon = 'A',
// //   backgroundColor, IconComponent, onClick
// // }) => {
// //   const open = useSelector((state) => state.sidebar.isOpen);
// //   const theme = useTheme();
// //   const isXs = useMediaQuery(theme.breakpoints.down('xs'));
// //   const isSm = useMediaQuery(theme.breakpoints.down('sm'));
// //   const isMd = useMediaQuery(theme.breakpoints.down('md'));

// //   return (
// //     <Card
// //       className='container-infocard'
// //       sx={{
// //         backgroundColor: backgroundColor,
// //         display: 'flex',
// //         flexDirection: 'column',
// //         justifyContent: 'flex-start',
// //         alignItems: 'flex-start',
// //         boxShadow: 4,
// //         minHeight: 100,
// //         color: 'white',
// //         borderRadius: 1,
// //         width: '100%',
// //         cursor: 'pointer',
// //         padding: 2,
// //         '&:hover': {
// //           transform: 'translateY(-2px)',
// //           boxShadow: 6,
// //         },
// //       }}
// //       onClick={onClick}
// //     >
// //       <Box sx={{ 
// //         display: 'flex', 
// //         justifyContent: 'space-between', 
// //         alignItems: 'center',
// //         width: '100%'
// //       }}>
// //         <Box>
// //           <Typography variant="h6">
// //             <CountUp style={{ fontSize: '30px', color: avatarColor, fontWeight: 'bold' }} end={count} duration={3.5} />
// //           </Typography>
// //           <Typography component="div" sx={{ fontWeight: 'bold', color: avatarColor }}>
// //             {title}
// //           </Typography>
// //         </Box>
        
// //         {IconComponent && (
// //           <Box sx={{
// //             backgroundColor: avatarColor,
// //             borderRadius: '50%',
// //             padding: 1,
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             width: 40,
// //             height: 40,
// //           }}>
// //             <IconComponent sx={{ fontSize: 24, color: 'white' }} />
// //           </Box>
// //         )}
// //       </Box>
// //     </Card>
// //   );
// // };

// // export default InfoCard;
// // =================================

// // import React from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Card, CardContent, Typography } from '@mui/material';
// // import { styled, useTheme } from '@mui/material/styles';
// // import { Box, Button, useMediaQuery, Avatar } from '@mui/material';
// // import CountUp from 'react-countup';
// // import './InfoCard.css';

// // const InfoCard = ({ title, count, avatarColor, avatarIcon = 'A',
// //   backgroundColor, IconComponent, onClick
// // }) => {
// //   const open = useSelector((state) => state.sidebar.isOpen);
// //   const theme = useTheme();
// //   const isXs = useMediaQuery(theme.breakpoints.down('xs'));
// //   const isSm = useMediaQuery(theme.breakpoints.down('sm'));
// //   const isMd = useMediaQuery(theme.breakpoints.down('md'));

// //   return (
// //     <Card
// //       className='container-infocard'
// //       sx={{
// //         backgroundColor: backgroundColor,
// //         display: 'flex',
// //         flexDirection: 'column',
// //         justifyContent: 'flex-start',
// //         alignItems: 'flex-start',
// //         boxShadow: 4,
// //         minHeight: 100,
// //         color: 'white',
// //         borderRadius: 1,
// //         width: '100%',
// //         cursor: 'pointer',
// //         padding: 2,
// //         '&:hover': {
// //           transform: 'translateY(-2px)',
// //           boxShadow: 6,
// //         },
// //       }}
// //       onClick={onClick}
// //     >
// //       <Box sx={{ 
// //         display: 'flex', 
// //         justifyContent: 'space-between', 
// //         alignItems: 'center',
// //         width: '100%'
// //       }}>
// //         <Box>
// //           <Typography variant="h6">
// //             <CountUp style={{ fontSize: '30px', color: avatarColor, fontWeight: 'bold' }} end={count} duration={3.5} />
// //           </Typography>
// //           <Typography component="div" sx={{ fontWeight: 'bold', color: avatarColor }}>
// //             {title}
// //           </Typography>
// //         </Box>
        
// //         {IconComponent && (
// //           <Box sx={{
// //             backgroundColor: avatarColor,
// //             borderRadius: '50%',
// //             padding: 1,
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             width: 40,
// //             height: 40,
// //           }}>
// //             <IconComponent sx={{ fontSize: 24, color: 'white' }} />
// //           </Box>
// //         )}
// //       </Box>
// //     </Card>
// //   );
// // };

// // export default InfoCard;

// // =================================

// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Card, CardContent, Typography } from '@mui/material';
// import { styled, useTheme } from '@mui/material/styles';
// import { Box, Button, useMediaQuery, Avatar } from '@mui/material';
// import CountUp from 'react-countup';
// import './InfoCard.css';

// const InfoCard = ({ title, count, avatarColor, avatarIcon = 'A',
//   backgroundColor, IconComponent, onClick
// }) => {
//   const open = useSelector((state) => state.sidebar.isOpen);
//   const theme = useTheme();
//   const isXs = useMediaQuery(theme.breakpoints.down('xs'));
//   const isSm = useMediaQuery(theme.breakpoints.down('sm'));
//   const isMd = useMediaQuery(theme.breakpoints.down('md'));

//   // Screenshot च्या अनुसार exact colors
//   const getCardStyle = () => {
//     if (title.includes('Total Applications') || title.includes('Total Meters')) {
//       return {
//         backgroundColor: '#ffffff',
//         borderLeft: '4px solid #2196F3',
//         numberColor: '#2196F3',
//         iconBg: '#2196F3'
//       };
//     }
//     if (title.includes('Approved') || title.includes('Paid Bills')) {
//       return {
//         backgroundColor: '#ffffff',
//         borderLeft: '4px solid #4CAF50',
//         numberColor: '#4CAF50',
//         iconBg: '#4CAF50'
//       };
//     }
//     if (title.includes('Pending') || title.includes('Average')) {
//       return {
//         backgroundColor: '#ffffff',
//         borderLeft: '4px solid #FF9800',
//         numberColor: '#FF9800',
//         iconBg: '#FF9800'
//       };
//     }
//     if (title.includes('Provisionally') || title.includes('Upcoming')) {
//       return {
//         backgroundColor: '#ffffff',
//         borderLeft: '4px solid #00BCD4',
//         numberColor: '#00BCD4',
//         iconBg: '#00BCD4'
//       };
//     }
//     if (title.includes('Rejected') || title.includes('Faulty') || title.includes('Overdue')) {
//       return {
//         backgroundColor: '#ffffff',
//         borderLeft: '4px solid #F44336',
//         numberColor: '#F44336',
//         iconBg: '#F44336'
//       };
//     }
//     if (title.includes('Registered') || title.includes('Users')) {
//       return {
//         backgroundColor: '#ffffff',
//         borderLeft: '4px solid #9C27B0',
//         numberColor: '#9C27B0',
//         iconBg: '#9C27B0'
//       };
//     }
//     return {
//       backgroundColor: '#ffffff',
//       borderLeft: '4px solid #607D8B',
//       numberColor: '#607D8B',
//       iconBg: '#607D8B'
//     };
//   };

//   const cardStyle = getCardStyle();

//   return (
//     <Card
//       className='container-infocard'
//       sx={{
//         backgroundColor: cardStyle.backgroundColor,
//         borderLeft: cardStyle.borderLeft,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//         minHeight: 100,
//         borderRadius: 1,
//         width: '100%',
//         cursor: 'pointer',
//         padding: 2,
//         border: '1px solid #e0e0e0',
//         '&:hover': {
//           transform: 'translateY(-2px)',
//           boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
//         },
//       }}
//       onClick={onClick}
//     >
//       {/* Title section */}
//       <Box sx={{ width: '100%', mb: 1 }}>
//         <Typography 
//           variant="body2" 
//           sx={{ 
//             color: '#333', 
//             fontSize: '13px',
//             fontWeight: 600,
//             mb: 0.5
//           }}
//         >
//           {title}
//         </Typography>
//         <Typography 
//           variant="body2" 
//           sx={{ 
//             color: '#666', 
//             fontSize: '11px'
//           }}
//         >
//           All Roles
//         </Typography>
//       </Box>

//       {/* Bottom section with number and icon */}
//       <Box sx={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: 'center',
//         width: '100%'
//       }}>
//         <Typography 
//           variant="h4" 
//           sx={{ 
//             color: cardStyle.numberColor,
//             fontWeight: 'bold',
//             fontSize: '28px'
//           }}
//         >
//           <CountUp end={count} duration={2} />
//         </Typography>
        
//         {IconComponent && (
//           <Box sx={{
//             backgroundColor: cardStyle.iconBg,
//             borderRadius: '50%',
//             padding: 0.8,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: 32,
//             height: 32,
//           }}>
//             <IconComponent sx={{ fontSize: 18, color: 'white' }} />
//           </Box>
//         )}
//       </Box>

//       {/* Bottom text/status */}
//       <Box sx={{ width: '100%', mt: 1 }}>
//         <Typography 
//           variant="body2" 
//           sx={{ 
//             color: '#666', 
//             fontSize: '10px',
//             display: 'flex',
//             alignItems: 'center'
//           }}
//         >
//           {title.includes('Approved') && '✓ Workflow completed applications'}
//           {title.includes('Pending') && '⚠ Awaiting action in workflow'}
//           {title.includes('Provisionally') && '📋 Requires additional review'}
//           {title.includes('Rejected') && '✗ Applications not approved'}
//           {title.includes('Registered') && '📝 Incomplete applications'}
//           {(title.includes('Total') || title.includes('Users')) && 'Role: Admin | Actions: 0'}
//         </Typography>
//       </Box>
//     </Card>
//   );
// };

// export default InfoCard;

















// ===== OLD InfoCard (3-Oct-2026 पर्यंत active) — reference साठी जसाच्या तसा =====
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Card, CardContent, Typography } from '@mui/material';
// import { styled, useTheme } from '@mui/material/styles';
// import { Box, Button, useMediaQuery, Avatar } from '@mui/material';
// import CountUp from 'react-countup';
// import './InfoCard.css';

// const InfoCard = ({ title, count, avatarColor, avatarIcon = 'A',
//   backgroundColor, IconComponent, onClick
// }) => {
//   const open = useSelector((state) => state.sidebar.isOpen);
//   const theme = useTheme();
//   const isXs = useMediaQuery(theme.breakpoints.down('xs'));
//   const isSm = useMediaQuery(theme.breakpoints.down('sm'));
//   const isMd = useMediaQuery(theme.breakpoints.down('md'));

//   // Screenshot च्या अनुसार exact colors
//   const getCardStyle = () => {
//     if (title.includes('Total Applications') || title.includes('Total Meters')) {
//       return {
//         backgroundColor: '#ffffff',
//         borderLeft: '4px solid #2196F3',
//         numberColor: '#2196F3',
//         iconBg: '#2196F3'
//       };
//     }
//     if (title.includes('Approved') || title.includes('Paid Bills')) {
//       return {
//         backgroundColor: '#ffffff',
//         borderLeft: '4px solid #4CAF50',
//         numberColor: '#4CAF50',
//         iconBg: '#4CAF50'
//       };
//     }
//     if (title.includes('Pending') || title.includes('Average')) {
//       return {
//         backgroundColor: '#ffffff',
//         borderLeft: '4px solid #FF9800',
//         numberColor: '#FF9800',
//         iconBg: '#FF9800'
//       };
//     }
//     if (title.includes('Provisionally') || title.includes('Upcoming')) {
//       return {
//         backgroundColor: '#ffffff',
//         borderLeft: '4px solid #00BCD4',
//         numberColor: '#00BCD4',
//         iconBg: '#00BCD4'
//       };
//     }
//     if (title.includes('Rejected') || title.includes('Faulty') || title.includes('Overdue')) {
//       return {
//         backgroundColor: '#ffffff',
//         borderLeft: '4px solid #F44336',
//         numberColor: '#F44336',
//         iconBg: '#F44336'
//       };
//     }
//     if (title.includes('Registered') || title.includes('Users')) {
//       return {
//         backgroundColor: '#ffffff',
//         borderLeft: '4px solid #9C27B0',
//         numberColor: '#9C27B0',
//         iconBg: '#9C27B0'
//       };
//     }
//     return {
//       backgroundColor: '#ffffff',
//       borderLeft: '4px solid #607D8B',
//       numberColor: '#607D8B',
//       iconBg: '#607D8B'
//     };
//   };

//   const cardStyle = getCardStyle();

//   return (
//     <Card
//       className='container-infocard'
//       sx={{
//         backgroundColor: cardStyle.backgroundColor,
//         borderLeft: cardStyle.borderLeft,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//         minHeight: 100,
//         borderRadius: 1,
//         width: '100%',
//         cursor: 'pointer',
//         padding: 2,
//         border: '1px solid #e0e0e0',
//         '&:hover': {
//           transform: 'translateY(-2px)',
//           boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
//         },
//       }}
//       onClick={onClick}
//     >
//       {/* Title section */}
//       <Box sx={{ width: '100%', mb: 1 }}>
//         <Typography 
//           variant="body2" 
//           sx={{ 
//             color: '#333', 
//             fontSize: '13px',
//             fontWeight: 600,
//             mb: 0.5
//           }}
//         >
//           {title}
//         </Typography>
//         <Typography 
//           variant="body2" 
//           sx={{ 
//             color: '#666', 
//             fontSize: '11px'
//           }}
//         >
//           All Roles
//         </Typography>
//       </Box>

//       {/* Bottom section with number and icon */}
//       <Box sx={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: 'center',
//         width: '100%'
//       }}>
//         <Typography 
//           variant="h4" 
//           sx={{ 
//             color: cardStyle.numberColor,
//             fontWeight: 'bold',
//             fontSize: '28px'
//           }}
//         >
//           <CountUp end={count} duration={2} />
//         </Typography>

//         {IconComponent && (
//           <Box sx={{
//             backgroundColor: cardStyle.iconBg,
//             borderRadius: '50%',
//             padding: 0.8,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: 32,
//             height: 32,
//           }}>
//             <IconComponent sx={{ fontSize: 18, color: 'white' }} />
//           </Box>
//         )}
//       </Box>

//       {/* Bottom text/status */}
//       <Box sx={{ width: '100%', mt: 1 }}>
//         <Typography 
//           variant="body2" 
//           sx={{ 
//             color: '#666', 
//             fontSize: '10px',
//             display: 'flex',
//             alignItems: 'center'
//           }}
//         >
//           {title.includes('Approved') && '✓ Workflow completed applications'}
//           {title.includes('Pending') && '⚠ Awaiting action in workflow'}
//           {title.includes('Provisionally') && '📋 Requires additional review'}
//           {title.includes('Rejected') && '✗ Applications not approved'}
//           {title.includes('Registered') && '📝 Incomplete applications'}
//           {(title.includes('Total') || title.includes('Users')) && 'Role: Admin | Actions: 0'}
//         </Typography>
//       </Box>
//     </Card>
//   );
// };

// export default InfoCard;


// ----------------------------------------------------------------------


// =============================================================================
// NEW InfoCard (3-Oct-2026) — Premium dashboard card design
// Props अगदी तसेच: title, count, avatarColor, avatarIcon, backgroundColor, IconComponent, onClick
// Home.js मध्ये काहीही बदल लागत नाही. Title → रंग mapping, "All Roles" आणि तळाची माहिती तशीच.
// =============================================================================
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';
import CountUp from 'react-countup';
import './InfoCard.css';

// Montserrat — CSS @import ने load केल्यास font block झाल्यावर Home page चा CSS chunk fail
// होऊन page blank होतो. म्हणून runtime <link> ने load: font न मिळाल्यास फक्त fallback font.
const MONTSERRAT_HREF = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap';
const ensureMontserrat = () => {
  if (typeof document === 'undefined') return;
  if (document.querySelector('link[data-font="montserrat"]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = MONTSERRAT_HREF;
  link.setAttribute('data-font', 'montserrat');
  document.head.appendChild(link);
};

const FONT_HEADING = "'Montserrat', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif";
const FONT_BODY = "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif";

// Sidebar च्या orange/cream theme शी जुळणारे हलके gradients (orange फक्त primary card ला)
const VARIANTS = {
  primary: { from: '#FFFFFF', to: '#FFF5E8', accent: '#F08A00' },
  success: { from: '#FFFFFF', to: '#EFF9F2', accent: '#16A34A' },
  info:    { from: '#FFFFFF', to: '#EEF6FF', accent: '#2563EB' },
  warning: { from: '#FFFFFF', to: '#FFF7E9', accent: '#D97706' },
  danger:  { from: '#FFFFFF', to: '#FFF0EF', accent: '#DC2626' },
  neutral: { from: '#FFFFFF', to: '#F3F5F9', accent: '#475569' },
};

// "OCT-2026" सारखे hyphen असलेले शब्द मधेच तुटू नयेत — text तोच, फक्त wrap नियंत्रित
const renderTitle = (title = '') =>
  String(title)
    .split(/(\s+)/)
    .map((part, i) =>
      part.includes('-') ? (
        <span key={i} style={{ whiteSpace: 'nowrap' }}>{part}</span>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      )
    );

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const InfoCard = ({ title, count, avatarColor, avatarIcon = 'A',
  backgroundColor, IconComponent, onClick
}) => {
  const open = useSelector((state) => state.sidebar.isOpen);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const reduceMotion = useMemo(prefersReducedMotion, []);
  const clickable = typeof onClick === 'function';

  useEffect(() => {
    ensureMontserrat();
  }, []);

  // जुन्या getCardStyle प्रमाणेच title → रंग नियम (तोच क्रम), फक्त नवीन palette
  const getCardStyle = () => {
    // if (title.includes('Total Applications') || title.includes('Total Meters')) return VARIANTS.primary;
    // if (title.includes('Approved') || title.includes('Paid Bills')) return VARIANTS.success;
    if (title.includes('Total Applications') || title.includes('Total Meters')) return VARIANTS.primary;
    // NEW (7-Oct-2026): "Paid Bills Penalty" — 'Paid Bills' mule hirva hot hota; Faulty sarkha laal (danger)
    if (title.includes('Penalty')) return VARIANTS.danger;
    if (title.includes('Approved') || title.includes('Paid Bills')) return VARIANTS.success;



    if (title.includes('Pending') || title.includes('Average')) return VARIANTS.warning;
    if (title.includes('Provisionally') || title.includes('Upcoming')) return VARIANTS.info;
    if (title.includes('Rejected') || title.includes('Faulty') || title.includes('Overdue')) return VARIANTS.danger;
    if (title.includes('Registered') || title.includes('Users')) return VARIANTS.neutral;
    return VARIANTS.neutral;
  };

  const v = getCardStyle();

  const handleKeyDown = (e) => {
    if (!clickable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Box
      className='container-infocard'
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={`${title}: ${count ?? 0}`}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        minHeight: 148,
        p: '20px',
        borderRadius: '18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        backgroundColor: '#FFFFFF',
        backgroundImage: `linear-gradient(135deg, ${v.from} 0%, ${v.from} 35%, ${v.to} 100%)`,
        backgroundSize: '160% 160%',
        backgroundPosition: '0% 0%',
        border: `1px solid ${alpha(v.accent, 0.14)}`,
        boxShadow: `0 1px 2px ${alpha('#0F172A', 0.04)}, 0 8px 24px ${alpha('#0F172A', 0.06)}`,
        transition: 'transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease, background-position 600ms ease',
        outline: 'none',
        // हलका accent glow — वरच्या उजव्या कोपऱ्यात
        '&::after': {
          content: '""',
          position: 'absolute',
          top: -48,
          right: -48,
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(v.accent, 0.10)} 0%, ${alpha(v.accent, 0)} 70%)`,
          pointerEvents: 'none',
        },
        '&:hover, &:focus-visible': {
          transform: 'translateY(-5px)',
          borderColor: alpha(v.accent, 0.35),
          backgroundPosition: '100% 100%',
          boxShadow: `0 2px 4px ${alpha('#0F172A', 0.06)}, 0 16px 32px ${alpha(v.accent, 0.16)}`,
        },
        '&:focus-visible': {
          boxShadow: `0 0 0 3px ${alpha(v.accent, 0.25)}, 0 16px 32px ${alpha(v.accent, 0.16)}`,
        },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '&:hover, &:focus-visible': { transform: 'none', backgroundPosition: '0% 0%' },
        },
      }}
    >
      {/* Title section + icon */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.5, position: 'relative', zIndex: 1 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            title={title}
            sx={{
              fontFamily: FONT_HEADING,
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: 1.35,
              color: '#1E293B',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {renderTitle(title)}
          </Typography>
          <Typography sx={{ fontFamily: FONT_BODY, fontSize: '12px', color: '#64748B', mt: 0.4 }}>
            All Roles
          </Typography>
        </Box>

        {IconComponent && (
          <Box
            sx={{
              flexShrink: 0,
              width: 44,
              height: 44,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: alpha(v.accent, 0.12),
              border: `1px solid ${alpha(v.accent, 0.12)}`,
              boxShadow: `0 4px 10px ${alpha(v.accent, 0.12)}`,
            }}
          >
            <IconComponent sx={{ fontSize: 22, color: v.accent }} />
          </Box>
        )}
      </Box>

      {/* KPI number + bottom text/status */}
      <Box sx={{ position: 'relative', zIndex: 1, mt: 1.5 }}>
        <Typography
          component="div"
          sx={{
            fontFamily: FONT_HEADING,
            fontSize: '32px',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#0F172A',
            letterSpacing: '-0.5px',
          }}
        >
          <CountUp end={Number(count) || 0} duration={reduceMotion ? 0 : 1.6} separator="," preserveValue />
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, minHeight: 16 }}>
          <Box sx={{ width: 28, height: 3, borderRadius: 2, backgroundColor: v.accent, opacity: 0.85, flexShrink: 0 }} />
          <Typography
            variant="body2"
            sx={{
              fontFamily: FONT_BODY,
              color: '#64748B',
              fontSize: '11px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title.includes('Approved') && '✓ Workflow completed applications'}
            {title.includes('Pending') && '⚠ Awaiting action in workflow'}
            {title.includes('Provisionally') && '📋 Requires additional review'}
            {title.includes('Rejected') && '✗ Applications not approved'}
            {title.includes('Registered') && '📝 Incomplete applications'}
            {(title.includes('Total') || title.includes('Users')) && 'Role: Admin | Actions: 0'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoCard;