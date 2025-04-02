// import React from 'react';
// import { Modal, Box, Button, Typography } from '@mui/material';
// import { Close as CloseIcon, Download as DownloadIcon } from '@mui/icons-material';

// const modalStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '80%',
//   height: '80%',
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 2,
//   display: 'flex',
//   flexDirection: 'column',
// };

// const PdfPreviewModal = ({ open, onClose, pdfUrl, title, onDownload }) => {
//     const handleDownload = () => {
//         const link = document.createElement('a');
//         link.href = pdfUrl;
//         link.download = title || 'download.pdf'; // Optional: set the default file name
//         link.click();
//       };
//   return (
//     <Modal 
//       open={open} 
//       onClose={onClose}
//       aria-labelledby="pdf-preview-modal"
//       aria-describedby="modal-to-preview-pdf-before-download"
//     >
//       <Box sx={modalStyle}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
//           <Typography variant="h6" component="h2">
//             {title}
//           </Typography>
//           <Box>
//             <Button
//               variant="contained"
//               startIcon={<DownloadIcon />}
//             //   onClick={onDownload}
//             onClick={handleDownload} // Trigger download on click
//               sx={{ mr: 2 }}
//             >
//               Download
//             </Button>
//             <Button
//               variant="outlined"
//               startIcon={<CloseIcon />}
//               onClick={onClose}
//             >
//               Close
//             </Button>
//           </Box>
//         </Box>
//         <Box sx={{ flexGrow: 1, overflow: 'hidden', bgcolor: '#f5f5f5', borderRadius: 1 }}>
//           <iframe
//             src={pdfUrl}
//             style={{
//               width: '100%',
//               height: '100%',
//               border: 'none',
//             }}
//             title="PDF Preview"
//           />
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default PdfPreviewModal;




import React, { useEffect, useState } from 'react';

import { Modal, Box, Button, Typography } from '@mui/material';
import { Close as CloseIcon, Download as DownloadIcon, Add as AddIcon } from '@mui/icons-material';
import { AddRemarkReport } from './AddRemarkReport';
import { addReport, fetchReports } from '../../store/actions/reportActions';
import { useDispatch, useSelector } from 'react-redux';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
};

const PdfPreviewModal = ({ open, onClose, pdfUrl, title, onDownload }) => {

  const [reportRemarkOpen, setReportRemarkOpen] = useState(false);
  
   const [currentReport, setCurrentReport] = useState(null);
    const dispatch = useDispatch();
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = title || 'download.pdf'; // Optional: set the default file name
        link.click();
      };

      const handleAddReportRemark = () => {
        // console.log("ahshashahshas>>>>>>>>",)
        // setCurrentReport(report);
        setReportRemarkOpen(true);
      };

      const handleAddReportRemarkClose = () => setReportRemarkOpen(false);

  return (
    <>
     <Modal 
      open={open} 
      onClose={onClose}
      aria-labelledby="pdf-preview-modal"
      aria-describedby="modal-to-preview-pdf-before-download"
    >
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Box>
            <Button
              size="small"
              sx={{ color: '#000' }}
              onClick={() => handleAddReportRemark()}
              startIcon={<AddIcon size="small" />}
              variant="outlined"
              sx={{ mr: 2 }}
            >
              Remark
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownload} // Trigger download on click
              sx={{ mr: 2 }}
            >
              Download
            </Button>
            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={onClose}
            >
              Close
            </Button>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, overflow: 'hidden', bgcolor: '#f5f5f5', borderRadius: 1 }}>
          <iframe
            src={pdfUrl}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            title="PDF Preview"
          />
        </Box>
      </Box>
    </Modal>

<Modal open={reportRemarkOpen} onClose={handleAddReportRemarkClose}>
<AddRemarkReport 
  open={reportRemarkOpen} 
  handleClose={handleAddReportRemarkClose} 
  handleAddReport={handleAddReportRemark}
  currentReport={currentReport}
  addReport={(reportId, reportData) => {
    dispatch(addReport(reportId, reportData));
    dispatch(fetchReports());
  }}
/>
</Modal>
    </>
  );
};

export default PdfPreviewModal;
