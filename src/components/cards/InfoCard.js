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

  return (
    <Card
      className='container-infocard'
      sx={{
        backgroundColor: backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        boxShadow: 4,
        minHeight: 120,
        color: 'white',
        borderRadius: 2,
        width: '100%', // Let Grid handle the width
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
        padding: 2,
      }}
      onClick={onClick}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        width: '100%'
      }}>
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontSize: '28px', 
              color: avatarColor, 
              fontWeight: 'bold',
              marginBottom: 1
            }}
          >
            <CountUp end={count} duration={2.5} />
          </Typography>
          <Typography 
            component="div" 
            sx={{ 
              fontWeight: 'bold', 
              color: avatarColor,
              fontSize: '14px',
              lineHeight: 1.2
            }}
          >
            {title}
          </Typography>
        </Box>
        
        {IconComponent && (
          <Box sx={{
            backgroundColor: avatarColor,
            borderRadius: '50%',
            padding: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 48,
            minHeight: 48,
          }}>
            <IconComponent sx={{ fontSize: 24, color: 'white' }} />
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default InfoCard;