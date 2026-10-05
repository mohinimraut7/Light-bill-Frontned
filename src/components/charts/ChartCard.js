// src/components/charts/ChartCard.js
import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { FONT_FAMILY, COLORS } from './chartTheme';

const ChartCard = ({ title, subtitle, periodLabel, loading, empty, emptyText, children }) => (
  <Box
    component="section"
    aria-label={title}
    sx={{
      width: '100%',
    //   height: { xs: 380, sm: 360, md: 340 },
    height: { xs: 380, sm: 360, md: 360 },
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      p: { xs: '16px 16px 12px', md: '20px 22px 14px' },
      borderRadius: '20px',
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(15,23,42,0.05)',
      boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
      fontFamily: FONT_FAMILY,
      transition: 'box-shadow 0.25s ease',
      animation: 'vvChartIn 0.5s ease both',
      '@keyframes vvChartIn': {
        from: { opacity: 0, transform: 'translateY(10px)' },
        to: { opacity: 1, transform: 'none' },
      },
      '&:hover': { boxShadow: '0 12px 30px rgba(15,23,42,0.10)' },
      '@media (prefers-reduced-motion: reduce)': { animation: 'none', transition: 'none' },
    }}
  >
    {/* Header */}
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5, minHeight: 44, flexShrink: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
        <Box sx={{ width: 4, height: 28, borderRadius: 2, backgroundColor: COLORS.orange, flexShrink: 0 }} />
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: FONT_FAMILY,
              fontWeight: 600,
              fontSize: { xs: '13.5px', md: '15.5px' },
              lineHeight: 1.25,
              color: COLORS.navy,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: '11.5px', color: COLORS.faint, lineHeight: 1.4, mt: 0.2 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      {periodLabel && (
        <Box
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            alignItems: 'center',
            gap: 0.75,
            flexShrink: 0,
            px: 1.25,
            py: 0.75,
            borderRadius: '10px',
            backgroundColor: '#fff',
            border: '1px solid rgba(15,23,42,0.08)',
            color: COLORS.slate,
            fontFamily: FONT_FAMILY,
            fontSize: '12px',
            fontWeight: 500,
          }}
        >
          <CalendarTodayOutlinedIcon sx={{ fontSize: 15, color: COLORS.muted }} />
          {periodLabel}
        </Box>
      )}
    </Box>

    {/* Body: canvas ithe absolute basto (parent position:relative) */}
    {/* <Box sx={{ position: 'relative', flex: 1, minHeight: 0, mt: 1 }}> */}

        {/* Body = ChartContainer: chart ची खरी उंची हाच ठरवतो */}
    <Box
      className="vv-chart-container"
      sx={{
        position: 'relative',
        flex: '1 1 auto',
        minHeight: 0,
        width: '100%',
        mt: 1,
        overflow: 'hidden',
        '&& canvas': {
          position: 'absolute !important',
          inset: '0 !important',
          display: 'block !important',
          width: '100% !important',
          height: '100% !important',
          maxHeight: 'none !important',
          margin: '0 !important',
          transform: 'none !important',
        },
      }}
    >
      {loading ? (
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size={28} sx={{ color: COLORS.orange }} />
        </Box>
      ) : empty ? (
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.faint, fontSize: '13px' }}>
          {emptyText || 'No data available'}
        </Box>
      ) : (
        children
      )}
    </Box>
  </Box>
);

export default ChartCard;