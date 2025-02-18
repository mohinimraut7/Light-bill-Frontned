import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/system';

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#2A3F8E',
    color: '#FFFFFF',
    fontSize: '14px',
    padding: '12px 16px',
    borderRadius: '6px',
    boxShadow: theme?.shadows?.[4] || '0px 4px 10px rgba(0,0,0,0.2)', 
    maxWidth: 600,
    whiteSpace: 'pre-line', // Ensures multiline support
    fontWeight: 500,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#2A3F8E',
  },
}));

export default CustomWidthTooltip;
