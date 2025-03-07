import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, useMediaQuery,Avatar } from '@mui/material';
import CountUp from 'react-countup';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import './InfoCard.css';
const InfoCard = ({ title, count, avatarColor = '#1976d2', avatarIcon = 'A',
  backgroundColor
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
      backgroundColor:backgroundColor,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        boxShadow:4,
        minHeight:150,
        margin: 2,
        color: 'white',
        borderRadius:2,
        width: isSm ? '100%': '25%',
        
      }}
     >
     
        <Person2OutlinedIcon sx={{ color: 'dodgerblue' }} />
        <Typography variant="h6">
          <CountUp  style={{fontSize:'20px',color:'#9A9A9A',fontWeight:'bold',color:'black'}} end={count} duration={3.5} />
        </Typography>
      <CardContent>
        <Typography component="div" sx={{fontWeight:'bold',color:'black'}}>
          {title}
        </Typography>
       
      </CardContent>
    </Card>
  );
};

export default InfoCard;
