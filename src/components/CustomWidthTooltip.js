import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/system';

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#F7F9FB',
    color: '#373C5D',
    fontSize: '14px',
    padding: '12px 16px',
    borderRadius: '6px',
    boxShadow: theme?.shadows?.[4] || '0px 4px 10px #F7F9FB', 
    maxWidth: 600,
    whiteSpace: 'pre-line', // Ensures multiline support
    fontWeight: 500,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#F7F9FB',
  },
}));

export default CustomWidthTooltip;
