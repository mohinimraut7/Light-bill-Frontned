import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, useMediaQuery,Avatar } from '@mui/material';
import CountUp from 'react-countup';
import './InfoCard.css';
const InfoCard = ({ title, count, avatarColor = '#1976d2', avatarIcon = 'A' }) => {
  const open = useSelector((state) => state.sidebar.isOpen);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Card
    className='container-infocard'
    sx={{
        display:'flex',
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
       {/* <Avatar
        sx={{
          backgroundColor: avatarColor,
          width: 51,
          height: 51,
        }}
      >
        {avatarIcon}
      </Avatar> */}
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="h5">
          <CountUp  style={{fontSize:'17px',color:'#9A9A9A'}} end={count} duration={3.5} />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
