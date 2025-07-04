// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Card, CardContent, Typography } from '@mui/material';
// import { styled, useTheme } from '@mui/material/styles';
// import { Box, Button, useMediaQuery,Avatar } from '@mui/material';
// import CountUp from 'react-countup';
// import './InfoCard.css';
// const InfoCard = ({ title, count, avatarColor, avatarIcon = 'A',
//   backgroundColor,IconComponent,onClick
//  }) => {
//   const open = useSelector((state) => state.sidebar.isOpen);
//   const theme = useTheme();
//   const isXs = useMediaQuery(theme.breakpoints.down('xs'));
//   const isSm = useMediaQuery(theme.breakpoints.down('sm'));
//   const isMd = useMediaQuery(theme.breakpoints.down('md'));
//   return (
//     <Card
//     className='container-infocard'
//     sx={{
//       backgroundColor:backgroundColor,
//         display:'flex',
//         flexDirection:'column',
//         justifyContent:'flex-start',
//         alignItems:'flex-start',
//         boxShadow:4,
//         minHeight:100,
//         // margin: 1,
//         color: 'white',
//         borderRadius:1,
//         width: isSm ? '100%': '18%',
        
//       }}
//       onClick={onClick}
//      >
//         {/* {IconComponent && (
//         <IconComponent sx={{ fontSize:30, color: avatarColor }} />
//       )} */}
//         <Typography variant="h6">
//           <CountUp  style={{fontSize:'30px',color:avatarColor,fontWeight:'bold'}} end={count} duration={3.5} />
//         </Typography>
//       <CardContent>
//         <Typography component="div" sx={{fontWeight:'bold',color:avatarColor}}>
//           {title}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };
// export default InfoCard;

// ======================================

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

//   return (
//     <Card
//       className='container-infocard'
//       sx={{
//         backgroundColor: backgroundColor,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         boxShadow: 4,
//         minHeight: 120,
//         color: 'white',
//         borderRadius: 2,
//         width: '100%', // Let Grid handle the width
//         cursor: 'pointer',
//         transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
//         '&:hover': {
//           transform: 'translateY(-4px)',
//           boxShadow: 6,
//         },
//         padding: 2,
//       }}
//       onClick={onClick}
//     >
//       <Box sx={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: 'flex-start',
//         width: '100%'
//       }}>
//         <Box sx={{ flex: 1 }}>
//           <Typography 
//             variant="h4" 
//             sx={{ 
//               fontSize: '28px', 
//               color: avatarColor, 
//               fontWeight: 'bold',
//               marginBottom: 1
//             }}
//           >
//             <CountUp end={count} duration={2.5} />
//           </Typography>
//           <Typography 
//             component="div" 
//             sx={{ 
//               fontWeight: 'bold', 
//               color: avatarColor,
//               fontSize: '14px',
//               lineHeight: 1.2
//             }}
//           >
//             {title}
//           </Typography>
//         </Box>
        
//         {IconComponent && (
//           <Box sx={{
//             backgroundColor: avatarColor,
//             borderRadius: '50%',
//             padding: 1.5,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             minWidth: 48,
//             minHeight: 48,
//           }}>
//             <IconComponent sx={{ fontSize: 24, color: 'white' }} />
//           </Box>
//         )}
//       </Box>
//     </Card>
//   );
// };

// export default InfoCard;

// ================================

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

//   return (
//     <Card
//       className='container-infocard'
//       sx={{
//         backgroundColor: backgroundColor,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'flex-start',
//         alignItems: 'flex-start',
//         boxShadow: 4,
//         minHeight: 100,
//         color: 'white',
//         borderRadius: 1,
//         width: '100%',
//         cursor: 'pointer',
//         padding: 2,
//         '&:hover': {
//           transform: 'translateY(-2px)',
//           boxShadow: 6,
//         },
//       }}
//       onClick={onClick}
//     >
//       <Box sx={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: 'center',
//         width: '100%'
//       }}>
//         <Box>
//           <Typography variant="h6">
//             <CountUp style={{ fontSize: '30px', color: avatarColor, fontWeight: 'bold' }} end={count} duration={3.5} />
//           </Typography>
//           <Typography component="div" sx={{ fontWeight: 'bold', color: avatarColor }}>
//             {title}
//           </Typography>
//         </Box>
        
//         {IconComponent && (
//           <Box sx={{
//             backgroundColor: avatarColor,
//             borderRadius: '50%',
//             padding: 1,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: 40,
//             height: 40,
//           }}>
//             <IconComponent sx={{ fontSize: 24, color: 'white' }} />
//           </Box>
//         )}
//       </Box>
//     </Card>
//   );
// };

// export default InfoCard;
// =================================

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

//   return (
//     <Card
//       className='container-infocard'
//       sx={{
//         backgroundColor: backgroundColor,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'flex-start',
//         alignItems: 'flex-start',
//         boxShadow: 4,
//         minHeight: 100,
//         color: 'white',
//         borderRadius: 1,
//         width: '100%',
//         cursor: 'pointer',
//         padding: 2,
//         '&:hover': {
//           transform: 'translateY(-2px)',
//           boxShadow: 6,
//         },
//       }}
//       onClick={onClick}
//     >
//       <Box sx={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: 'center',
//         width: '100%'
//       }}>
//         <Box>
//           <Typography variant="h6">
//             <CountUp style={{ fontSize: '30px', color: avatarColor, fontWeight: 'bold' }} end={count} duration={3.5} />
//           </Typography>
//           <Typography component="div" sx={{ fontWeight: 'bold', color: avatarColor }}>
//             {title}
//           </Typography>
//         </Box>
        
//         {IconComponent && (
//           <Box sx={{
//             backgroundColor: avatarColor,
//             borderRadius: '50%',
//             padding: 1,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: 40,
//             height: 40,
//           }}>
//             <IconComponent sx={{ fontSize: 24, color: 'white' }} />
//           </Box>
//         )}
//       </Box>
//     </Card>
//   );
// };

// export default InfoCard;

// =================================

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, useMediaQuery, Avatar } from '@mui/material';
import CountUp from 'react-countup';
import './InfoCard.css';

const InfoCard = ({ title, count, avatarColor, avatarIcon = 'A',
  backgroundColor, IconComponent, onClick
}) => {
  const open = useSelector((state) => state.sidebar.isOpen);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  // Screenshot च्या अनुसार exact colors
  const getCardStyle = () => {
    if (title.includes('Total Applications') || title.includes('Total Meters')) {
      return {
        backgroundColor: '#ffffff',
        borderLeft: '4px solid #2196F3',
        numberColor: '#2196F3',
        iconBg: '#2196F3'
      };
    }
    if (title.includes('Approved') || title.includes('Paid Bills')) {
      return {
        backgroundColor: '#ffffff',
        borderLeft: '4px solid #4CAF50',
        numberColor: '#4CAF50',
        iconBg: '#4CAF50'
      };
    }
    if (title.includes('Pending') || title.includes('Average')) {
      return {
        backgroundColor: '#ffffff',
        borderLeft: '4px solid #FF9800',
        numberColor: '#FF9800',
        iconBg: '#FF9800'
      };
    }
    if (title.includes('Provisionally') || title.includes('Upcoming')) {
      return {
        backgroundColor: '#ffffff',
        borderLeft: '4px solid #00BCD4',
        numberColor: '#00BCD4',
        iconBg: '#00BCD4'
      };
    }
    if (title.includes('Rejected') || title.includes('Faulty') || title.includes('Overdue')) {
      return {
        backgroundColor: '#ffffff',
        borderLeft: '4px solid #F44336',
        numberColor: '#F44336',
        iconBg: '#F44336'
      };
    }
    if (title.includes('Registered') || title.includes('Users')) {
      return {
        backgroundColor: '#ffffff',
        borderLeft: '4px solid #9C27B0',
        numberColor: '#9C27B0',
        iconBg: '#9C27B0'
      };
    }
    return {
      backgroundColor: '#ffffff',
      borderLeft: '4px solid #607D8B',
      numberColor: '#607D8B',
      iconBg: '#607D8B'
    };
  };

  const cardStyle = getCardStyle();

  return (
    <Card
      className='container-infocard'
      sx={{
        backgroundColor: cardStyle.backgroundColor,
        borderLeft: cardStyle.borderLeft,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        minHeight: 100,
        borderRadius: 1,
        width: '100%',
        cursor: 'pointer',
        padding: 2,
        border: '1px solid #e0e0e0',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        },
      }}
      onClick={onClick}
    >
      {/* Title section */}
      <Box sx={{ width: '100%', mb: 1 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#333', 
            fontSize: '13px',
            fontWeight: 600,
            mb: 0.5
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#666', 
            fontSize: '11px'
          }}
        >
          All Roles
        </Typography>
      </Box>

      {/* Bottom section with number and icon */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%'
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: cardStyle.numberColor,
            fontWeight: 'bold',
            fontSize: '28px'
          }}
        >
          <CountUp end={count} duration={2} />
        </Typography>
        
        {IconComponent && (
          <Box sx={{
            backgroundColor: cardStyle.iconBg,
            borderRadius: '50%',
            padding: 0.8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
          }}>
            <IconComponent sx={{ fontSize: 18, color: 'white' }} />
          </Box>
        )}
      </Box>

      {/* Bottom text/status */}
      <Box sx={{ width: '100%', mt: 1 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#666', 
            fontSize: '10px',
            display: 'flex',
            alignItems: 'center'
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
    </Card>
  );
};

export default InfoCard;