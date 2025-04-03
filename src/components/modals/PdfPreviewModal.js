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

// ===========================================================================




// =======================================================

// import React, { useState } from 'react';
// import { Modal, Box, Button, Typography } from '@mui/material';
// import { Close as CloseIcon, Download as DownloadIcon, Add as AddIcon } from '@mui/icons-material';
// import { AddRemarkReport } from './AddRemarkReport';
// import { addReport, fetchReports } from '../../store/actions/reportActions';
// import { useDispatch } from 'react-redux';

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

// const PdfPreviewModal = ({ open, onClose, pdfUrl, title }) => {
//   const [reportRemarkOpen, setReportRemarkOpen] = useState(false);
//   const [currentReport, setCurrentReport] = useState(null);
//   const dispatch = useDispatch();

//   const handleDownload = () => {
//     if (pdfUrl) {
//       const link = document.createElement('a');
//       link.href = pdfUrl;
//       link.download = title || 'download.pdf';
//       link.click();
//     }
//   };

//   const handleAddReportRemark = () => {
//     setReportRemarkOpen(true);
//   };

//   const handleAddReportRemarkClose = () => setReportRemarkOpen(false);

//   const handleSaveRemark = async (values) => {
//     try {
//       const baseUrl = "https://your-api-url.com";
//       const url = `${baseUrl}/addRemarkReport`;
//       const method = "POST";

//       const payload = { ...values };

//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) throw new Error("Failed to save report");

//       const data = await response.json();
//       console.log("✅ Remark Saved:", data);

//       dispatch(fetchReports()); // Refresh reports list after save
//       handleAddReportRemarkClose(); // Close modal after save
//     } catch (error) {
//       console.error("🚨 Error saving remark:", error);
//     }
//   };

//   return (
//     <>
//       <Modal 
//         open={open} 
//         onClose={onClose}
//         aria-labelledby="pdf-preview-modal"
//         aria-describedby="modal-to-preview-pdf-before-download"
//       >
//         <Box sx={modalStyle}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
//             <Typography variant="h6" component="h2">
//               {title}
//             </Typography>
//             <Box>
//               <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={handleAddReportRemark}>
//                 Remark
//               </Button>
//               <Button
//                 variant="contained"
//                 startIcon={<DownloadIcon />}
//                 onClick={handleDownload}
//                 sx={{ mr: 2 }}
//               >
//                 Download
//               </Button>
//               <Button
//                 variant="outlined"
//                 startIcon={<CloseIcon />}
//                 onClick={onClose}
//               >
//                 Close
//               </Button>
//             </Box>
//           </Box>

//           <Box sx={{ flexGrow: 1, overflow: 'hidden', bgcolor: '#f5f5f5', borderRadius: 1 }}>
//             {pdfUrl ? (
//               <iframe
//                 src={pdfUrl}
//                 style={{ width: '100%', height: '100%', border: 'none' }}
//                 title="PDF Preview"
//               />
//             ) : (
//               <Typography sx={{ textAlign: 'center', mt: 4 }}>No PDF Available</Typography>
//             )}
//           </Box>
//         </Box>
//       </Modal>

//       {reportRemarkOpen && (
//         <AddRemarkReport 
//           open={reportRemarkOpen} 
//           handleClose={handleAddReportRemarkClose} 
//           handleAddReport={handleSaveRemark} // ✅ Save function added
//           currentReport={currentReport}
//         />
//       )}
//     </>
//   );
// };

// export default PdfPreviewModal;
// ===================================================
// import React, { useEffect, useState } from 'react';

// import { Modal, Box, Button, Typography } from '@mui/material';
// import { Close as CloseIcon, Download as DownloadIcon, Add as AddIcon } from '@mui/icons-material';
// import { AddRemarkReport } from './AddRemarkReport';
// import { addReport, fetchReports } from '../../store/actions/reportActions';
// import { useDispatch, useSelector } from 'react-redux';
// import { baseUrl } from '../../config/config';

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

//   const [reportRemarkOpen, setReportRemarkOpen] = useState(false);
  
//    const [currentReport, setCurrentReport] = useState(null);
//     const dispatch = useDispatch();
//     const handleDownload = () => {
//         const link = document.createElement('a');
//         link.href = pdfUrl;
//         link.download = title || 'download.pdf'; // Optional: set the default file name
//         link.click();
//       };

//       const handleAddReportRemark = () => {
//         // console.log("ahshashahshas>>>>>>>>",)
//         // setCurrentReport(report);
//         setReportRemarkOpen(true);
//       };


//       const handleSaveRemark = async (values) => {
//         try {
          
//           const url = `${baseUrl}/addRemarkReport`;
//           const method = "POST";
    
//           const payload = { ...values };
    
//           const response = await fetch(url, {
//             method,
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload),
//           });
    
//           if (!response.ok) throw new Error("Failed to save report");
    
//           const data = await response.json();
//           console.log("✅ Remark Saved:", data);
    
//           dispatch(fetchReports()); // Refresh reports list after save
//           handleAddReportRemarkClose(); // Close modal after save
//         } catch (error) {
//           console.error("🚨 Error saving remark:", error);
//         }
//       };

//       const handleAddReportRemarkClose = () => setReportRemarkOpen(false);

//   return (
//     <>
//      <Modal 
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
//             <Button onClick={handleSaveRemark} size="small" sx={{mr:1}}
//             variant="outlined"
//             >Save</Button>
//             <Button
//               size="small"
//               sx={{ color: '#000' }}
//               onClick={() => handleAddReportRemark()}
//               startIcon={<AddIcon size="small" />}
//               variant="outlined"
//               sx={{ mr: 2 }}
//             >
//               Remark
//             </Button>
//             <Button
//               variant="contained"
//               startIcon={<DownloadIcon />}
//               onClick={handleDownload} // Trigger download on click
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

// <Modal open={reportRemarkOpen} onClose={handleAddReportRemarkClose}>
// <AddRemarkReport 
//   open={reportRemarkOpen} 
//   handleClose={handleAddReportRemarkClose} 
//   handleAddReport={handleAddReportRemark}
//   currentReport={currentReport}
//   addReport={(reportId, reportData) => {
//     dispatch(addReport(reportId, reportData));
//     dispatch(fetchReports());
//   }}
// />
// </Modal>
//     </>
//   );
// };

// export default PdfPreviewModal;

// ======================================================

// import React, { useEffect, useState } from 'react';
// import { Modal, Box, Button, Typography, Snackbar } from '@mui/material';
// import { 
//   Close as CloseIcon, 
//   Download as DownloadIcon, 
//   Add as AddIcon,
//   Save as SaveIcon 
// } from '@mui/icons-material';
// import { AddRemarkReport } from './AddRemarkReport';
// import { addReport, fetchReports } from '../../store/actions/reportActions';
// import { useDispatch, useSelector } from 'react-redux';
// import { baseUrl } from '../../config/config';

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
//   const [reportRemarkOpen, setReportRemarkOpen] = useState(false);
//   const [currentReport, setCurrentReport] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.auth.user);

//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = title || 'download.pdf';
//     link.click();
//   };

//   const handleAddReportRemark = () => {
//     setReportRemarkOpen(true);
//   };

//   const handleSaveRemark = async () => {
//     try {
//       const url = `${baseUrl}/addRemarkReport`;
      
//       const payload = {
//         pdfData: pdfUrl,
//         formType: 'PDF_REPORT',
//         role: user?.role,
//         ward: user?.ward,
//         remark: 'PDF Document',
//       };

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save report');
//       }

//       const data = await response.json();
//       console.log('✅ Report Saved:', data);
      
//       setSnackbarMessage('PDF saved successfully!');
//       setSnackbarOpen(true);
      
//       dispatch(fetchReports());
//     } catch (error) {
//       console.error('🚨 Error saving report:', error);
//       setSnackbarMessage('Failed to save PDF. Please try again.');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleAddReportRemarkClose = () => setReportRemarkOpen(false);

//   return (
//     <>
//       <Modal 
//         open={open} 
//         onClose={onClose}
//         aria-labelledby="pdf-preview-modal"
//         aria-describedby="modal-to-preview-pdf-before-download"
//       >
//         <Box sx={modalStyle}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
//             <Typography variant="h6" component="h2">
//               {title}
//             </Typography>
//             <Box>
//               <Button
//                 onClick={handleSaveRemark}
//                 size="small"
//                 startIcon={<SaveIcon />}
//                 variant="contained"
//                 sx={{ mr: 1 }}
//               >
//                 Save
//               </Button>
//               <Button
//                 size="small"
//                 onClick={() => handleAddReportRemark()}
//                 startIcon={<AddIcon />}
//                 variant="outlined"
//                 sx={{ mr: 2 }}
//               >
//                 Remark
//               </Button>
//               <Button
//                 variant="contained"
//                 startIcon={<DownloadIcon />}
//                 onClick={handleDownload}
//                 sx={{ mr: 2 }}
//               >
//                 Download
//               </Button>
//               <Button
//                 variant="outlined"
//                 startIcon={<CloseIcon />}
//                 onClick={onClose}
//               >
//                 Close
//               </Button>
//             </Box>
//           </Box>
//           <Box sx={{ flexGrow: 1, overflow: 'hidden', bgcolor: '#f5f5f5', borderRadius: 1 }}>
//             <iframe
//               src={pdfUrl}
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 border: 'none',
//               }}
//               title="PDF Preview"
//             />
//           </Box>
//         </Box>
//       </Modal>

//       <Modal open={reportRemarkOpen} onClose={handleAddReportRemarkClose}>
//         <AddRemarkReport 
//           open={reportRemarkOpen} 
//           handleClose={handleAddReportRemarkClose} 
//           handleAddReport={handleAddReportRemark}
//           currentReport={currentReport}
//           addReport={(reportId, reportData) => {
//             dispatch(addReport(reportId, reportData));
//             dispatch(fetchReports());
//           }}
//         />
//       </Modal>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//         message={snackbarMessage}
//       />
//     </>
//   );
// };

// export default PdfPreviewModal;
// ====================================================

// import React, { useEffect, useState } from 'react';
// import { Modal, Box, Button, Typography, Snackbar, TextField } from '@mui/material';
// import { 
//   Close as CloseIcon, 
//   Download as DownloadIcon, 
//   Add as AddIcon,
//   Save as SaveIcon 
// } from '@mui/icons-material';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchReports } from '../../store/actions/reportActions';
// import { baseUrl } from '../../config/config';

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
//   const [remark, setRemark] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.auth.user);

//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = title || 'download.pdf';
//     link.click();
//   };

//   const handleSaveRemark = async () => {
//     try {
//       const url = `${baseUrl}/addRemarkReport`;
      
//       const payload = {
//         pdfData: pdfUrl,
//         formType: 'PDF_REPORT',
//         role: user?.role,
//         ward: user?.ward,
//         remark: remark || 'PDF Document',
//       };

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save report');
//       }

//       const data = await response.json();
//       console.log('✅ Report Saved:', data);
      
//       setSnackbarMessage('PDF saved successfully!');
//       setSnackbarOpen(true);
//       dispatch(fetchReports());
//     } catch (error) {
//       console.error('🚨 Error saving report:', error);
//       setSnackbarMessage('Failed to save PDF. Please try again.');
//       setSnackbarOpen(true);
//     }
//   };

//   return (
//     <>
//       <Modal 
//         open={open} 
//         onClose={onClose}
//         aria-labelledby="pdf-preview-modal"
//         aria-describedby="modal-to-preview-pdf-before-download"
//       >
//         <Box sx={modalStyle}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
//             <Typography variant="h6" component="h2">
//               {title}
//             </Typography>
//             <Box>
//               <Button
//                 onClick={handleSaveRemark}
//                 size="small"
//                 startIcon={<SaveIcon />}
//                 variant="contained"
//                 sx={{ mr: 1 }}
//               >
//                 Save
//               </Button>
//               <Button
//                 variant="contained"
//                 startIcon={<DownloadIcon />}
//                 onClick={handleDownload}
//                 sx={{ mr: 2 }}
//               >
//                 Download
//               </Button>
//               <Button
//                 variant="outlined"
//                 startIcon={<CloseIcon />}
//                 onClick={onClose}
//               >
//                 Close
//               </Button>
//             </Box>
//           </Box>
//           <Box sx={{ flexGrow: 1, overflow: 'hidden', bgcolor: '#f5f5f5', borderRadius: 1 }}>
//             <iframe
//               src={pdfUrl}
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 border: 'none',
//               }}
//               title="PDF Preview"
//             />
//           </Box>

//           <Box sx={{ mt: 2 }}>
//             <Typography variant="subtitle1">Add Remark</Typography>
//             <TextField
//               fullWidth
//               id="remark"
//               name="remark"
//               label="Enter Remark"
//               value={remark}
//               onChange={(e) => setRemark(e.target.value)}
//               margin="normal"
//               variant="outlined"
//             />
//           </Box>
//         </Box>
//       </Modal>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//         message={snackbarMessage}
//       />
//     </>
//   );
// };

// export default PdfPreviewModal;
// ========================================================
// import React, { useState } from 'react';
// import { Modal, Box, Button, Typography, Snackbar, TextField } from '@mui/material';
// import { Close as CloseIcon, Download as DownloadIcon, Save as SaveIcon } from '@mui/icons-material';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchReports } from '../../store/actions/reportActions';
// import { baseUrl } from '../../config/config';
// import SignaturePad from '../SignaturePad';
// import SignatureUpload from '../SignatureUpload';

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

// const PdfPreviewModal = ({ open, onClose, pdfUrl, title }) => {
//   const [remark, setRemark] = useState('');
//   const [signature, setSignature] = useState('');
//   const [signatureMethod, setSignatureMethod] = useState('draw');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.auth.user);

//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = title || 'download.pdf';
//     link.click();
//   };

//   const handleSaveRemark = async () => {
//     try {
//       const url = `${baseUrl}/addRemarkReport`;
//       const payload = {
//         pdfData: pdfUrl,
//         formType: 'PDF_REPORT',
//         role: user?.role,
//         ward: user?.ward,
//         remark: remark || 'PDF Document',
//         signature: signature
//       };

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save report');
//       }

//       const data = await response.json();
//       setSnackbarMessage('PDF saved successfully!');
//       setSnackbarOpen(true);
//       dispatch(fetchReports());
//     } catch (error) {
//       setSnackbarMessage('Failed to save PDF. Please try again.');
//       setSnackbarOpen(true);
//     }
//   };

//   return (
//     <>
//       <Modal open={open} onClose={onClose}>
//         <Box sx={modalStyle}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
//             <Typography variant="h6">{title}</Typography>
//             <Box>
//               <Button onClick={handleSaveRemark} size="small" startIcon={<SaveIcon />} variant="contained" sx={{ mr: 1 }}>
//                 Save
//               </Button>
//               <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload} sx={{ mr: 2 }}>
//                 Download
//               </Button>
//               <Button variant="outlined" startIcon={<CloseIcon />} onClick={onClose}>
//                 Close
//               </Button>
//             </Box>
//           </Box>
//           <Box sx={{ flexGrow: 1, overflow: 'hidden', bgcolor: '#f5f5f5', borderRadius: 1 }}>
//             <iframe src={pdfUrl} style={{ width: '100%', height: '100%', border: 'none' }} title="PDF Preview" />
//           </Box>
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="subtitle1">Add Remark</Typography>
//             <TextField fullWidth id="remark" name="remark" label="Enter Remark" value={remark} onChange={(e) => setRemark(e.target.value)} margin="normal" variant="outlined" />
//           </Box>
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="subtitle1">Signature</Typography>
//             <Box sx={{ mb: 2 }}>
//               <Button variant={signatureMethod === 'draw' ? 'contained' : 'outlined'} onClick={() => setSignatureMethod('draw')} sx={{ mr: 1 }}>
//                 Draw Signature
//               </Button>
//               <Button variant={signatureMethod === 'upload' ? 'contained' : 'outlined'} onClick={() => setSignatureMethod('upload')}>
//                 Upload Signature
//               </Button>
//             </Box>
//             {signatureMethod === 'draw' ? (
//               <SignaturePad setSignature={setSignature} />
//             ) : (
//               <SignatureUpload setSignature={setSignature} />
//             )}
//             {signature && (
//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="subtitle2">Preview:</Typography>
//                 <img src={signature} alt="Signature Preview" style={{ maxWidth: '100%', maxHeight: '100px' }} />
//               </Box>
//             )}
//           </Box>
//         </Box>
//       </Modal>
//       <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
//     </>
//   );
// };

// export default PdfPreviewModal;
// =============================================================
// import React, { useEffect, useState } from 'react';
// import { Modal, Box, Button, Typography, Snackbar, TextField } from '@mui/material';
// import { 
//   Close as CloseIcon, 
//   Download as DownloadIcon, 
//   Add as AddIcon,
//   Save as SaveIcon 
// } from '@mui/icons-material';
// import { AddRemarkReport } from './AddRemarkReport';
// import { addReport, fetchReports } from '../../store/actions/reportActions';
// import { useDispatch, useSelector } from 'react-redux';
// import { baseUrl } from '../../config/config';
// import SignaturePad from '../SignaturePad';
// import SignatureUpload from '../SignatureUpload';

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
//   const [reportRemarkOpen, setReportRemarkOpen] = useState(false);
//   const [currentReport, setCurrentReport] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [remark, setRemark] = useState('');
//   const [signature, setSignature] = useState('');
//   const [signatureMethod, setSignatureMethod] = useState('draw');
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.auth.user);

//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = title || 'download.pdf';
//     link.click();
//   };

//   const handleSaveRemark = async () => {
//     try {
//       const url = `${baseUrl}/addRemarkReport`;
      
//       const payload = {
//         pdfData: pdfUrl,
//         formType: 'PDF_REPORT',
//         role: user?.role,
//         ward: user?.ward,
//         remark,
//         signature
//       };

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save report');
//       }

//       const data = await response.json();
//       setSnackbarMessage('PDF saved successfully!');
//       setSnackbarOpen(true);
//       dispatch(fetchReports());
//     } catch (error) {
//       console.error('Error saving report:', error);
//       setSnackbarMessage('Failed to save PDF. Please try again.');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleSignatureChange = (signatureData) => {
//     setSignature(signatureData);
//   };

//   return (
//     <>
//       <Modal 
//         open={open} 
//         onClose={onClose}
//         aria-labelledby="pdf-preview-modal"
//         aria-describedby="modal-to-preview-pdf-before-download"
//       >
//         <Box sx={modalStyle}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
//             <Typography variant="h6" component="h2">
//               {title}
//             </Typography>
//             <Box>
//               <Button onClick={handleSaveRemark} size="small" startIcon={<SaveIcon />} variant="contained" sx={{ mr: 1 }}>
//                 Save
//               </Button>
//               <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload} sx={{ mr: 2 }}>
//                 Download
//               </Button>
//               <Button variant="outlined" startIcon={<CloseIcon />} onClick={onClose}>
//                 Close
//               </Button>
//             </Box>
//           </Box>
//           <Box sx={{ flexGrow: 1, overflow: 'hidden', bgcolor: '#f5f5f5', borderRadius: 1 }}>
//             <iframe src={pdfUrl} style={{ width: '100%', height: '100%', border: 'none' }} title="PDF Preview" />
//           </Box>

//           <Box sx={{ mt: 3 }}>
//             <Typography variant="subtitle1" gutterBottom>
//               Add Remark
//             </Typography>
//             <TextField fullWidth id="remark" name="remark" label="Enter Remark" value={remark} onChange={(e) => setRemark(e.target.value)} margin="normal" variant="outlined" />
//           </Box>

//           <Box sx={{ mt: 3 }}>
//             <Typography variant="subtitle1" gutterBottom>
//               Signature
//             </Typography>
//             <Box sx={{ mb: 2 }}>
//               <Button variant={signatureMethod === 'draw' ? 'contained' : 'outlined'} onClick={() => setSignatureMethod('draw')} sx={{ mr: 1 }}>
//                 Draw Signature
//               </Button>
//               <Button variant={signatureMethod === 'upload' ? 'contained' : 'outlined'} onClick={() => setSignatureMethod('upload')}>
//                 Upload Signature
//               </Button>
//             </Box>
//             {signatureMethod === 'draw' ? (
//               <SignaturePad setSignature={handleSignatureChange} />
//             ) : (
//               <SignatureUpload setSignature={handleSignatureChange} />
//             )}
//             {signature && (
//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="subtitle2" gutterBottom>
//                   Preview:
//                 </Typography>
//                 <img src={signature} alt="Signature Preview" style={{ maxWidth: '100%', maxHeight: '100px' }} />
//               </Box>
//             )}
//           </Box>
//         </Box>
//       </Modal>

//       <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
//     </>
//   );
// };

// export default PdfPreviewModal;
// ==================================================

// import React, { useEffect, useState } from 'react';
// import { Modal, Box, Button, Typography, Snackbar, TextField } from '@mui/material';
// import { 
//   Close as CloseIcon, 
//   Download as DownloadIcon, 
//   Add as AddIcon,
//   Save as SaveIcon 
// } from '@mui/icons-material';
// import { AddRemarkReport } from './AddRemarkReport';
// import { addReport, fetchReports } from '../../store/actions/reportActions';
// import { useDispatch, useSelector } from 'react-redux';
// import { baseUrl } from '../../config/config';
// import SignaturePad from '../SignaturePad';
// import SignatureUpload from '../SignatureUpload';

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
//   const [reportRemarkOpen, setReportRemarkOpen] = useState(false);
//   const [currentReport, setCurrentReport] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [remark, setRemark] = useState('');
//   const [signature, setSignature] = useState('');
//   const [signatureMethod, setSignatureMethod] = useState('draw');
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.auth.user);

//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = title || 'download.pdf';
//     link.click();
//   };

//   const handleSaveRemark = async () => {
//     try {
//       const url = `${baseUrl}/addRemarkReport`;
      
//       const payload = {
//         pdfData: pdfUrl,
//         formType: 'PDF_REPORT',
//         role: user?.role,
//         ward: user?.ward,
//         remark,
//         signature
//       };

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save report');
//       }

//       const data = await response.json();
//       setSnackbarMessage('PDF saved successfully!');
//       setSnackbarOpen(true);
//       dispatch(fetchReports());
//     } catch (error) {
//       console.error('Error saving report:', error);
//       setSnackbarMessage('Failed to save PDF. Please try again.');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleSignatureChange = (signatureData) => {
//     setSignature(signatureData);
//   };

//   return (
//     <>
//       <Modal 
//         open={open} 
//         onClose={onClose}
//         aria-labelledby="pdf-preview-modal"
//         aria-describedby="modal-to-preview-pdf-before-download"
//       >
//         <Box sx={modalStyle}>
//           {/* Header */}
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
//             <Typography variant="h6" component="h2">
//               {title}
//             </Typography>
//             <Box>
//               <Button onClick={handleSaveRemark} size="small" startIcon={<SaveIcon />} variant="contained" sx={{ mr: 1 }}>
//                 Save
//               </Button>
//               <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload} sx={{ mr: 2 }}>
//                 Download
//               </Button>
//               <Button variant="outlined" startIcon={<CloseIcon />} onClick={onClose}>
//                 Close
//               </Button>
//             </Box>
//           </Box>

//           {/* Main Content Area - Split into two columns */}
//           <Box sx={{ display: 'flex', flexGrow: 1, gap: 2 }}>
//             {/* Left Column - PDF Preview */}
//             <Box sx={{ flex: '1 1 60%', height: 'calc(100vh - 200px)', overflow: 'hidden', bgcolor: '#f5f5f5', borderRadius: 1 }}>
//               <iframe 
//                 src={pdfUrl} 
//                 style={{ width: '100%', height: '100%', border: 'none' }} 
//                 title="PDF Preview" 
//               />
//             </Box>

//             {/* Right Column - Remark and Signature */}
//             <Box sx={{ 
//               flex: '1 1 40%', 
//               height: 'calc(100vh - 200px)', 
//               overflow: 'auto',
//               bgcolor: '#f5f5f5',
//               borderRadius: 1,
//               p: 2
//             }}>
//               {/* Remark Section */}
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Add Remark
//                 </Typography>
//                 <TextField 
//                   fullWidth 
//                   id="remark" 
//                   name="remark" 
//                   label="Enter Remark" 
//                   value={remark} 
//                   onChange={(e) => setRemark(e.target.value)} 
//                   margin="normal" 
//                   variant="outlined"
//                   multiline
//                   rows={4}
//                 />
//               </Box>

//               {/* Signature Section */}
//               <Box>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Signature
//                 </Typography>
//                 <Box sx={{ mb: 2 }}>
//                   <Button 
//                     variant={signatureMethod === 'draw' ? 'contained' : 'outlined'} 
//                     onClick={() => setSignatureMethod('draw')} 
//                     sx={{ mr: 1 }}
//                   >
//                     Draw Signature
//                   </Button>
//                   <Button 
//                     variant={signatureMethod === 'upload' ? 'contained' : 'outlined'} 
//                     onClick={() => setSignatureMethod('upload')}
//                   >
//                     Upload Signature
//                   </Button>
//                 </Box>

//                 <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 1 }}>
//                   {signatureMethod === 'draw' ? (
//                     <SignaturePad setSignature={handleSignatureChange} />
//                   ) : (
//                     <SignatureUpload setSignature={handleSignatureChange} />
//                   )}
//                 </Box>

//                 {signature && (
//                   <Box sx={{ mt: 2 }}>
//                     <Typography variant="subtitle2" gutterBottom>
//                       Preview:
//                     </Typography>
//                     <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 1 }}>
//                       <img 
//                         src={signature} 
//                         alt="Signature Preview" 
//                         style={{ maxWidth: '100%', maxHeight: '100px' }} 
//                       />
//                     </Box>
//                   </Box>
//                 )}
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Modal>

//       <Snackbar 
//         open={snackbarOpen} 
//         autoHideDuration={6000} 
//         onClose={() => setSnackbarOpen(false)} 
//         message={snackbarMessage} 
//       />
//     </>
//   );
// };

// export default PdfPreviewModal;
// ===============================================

import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Typography, Snackbar, TextField } from '@mui/material';
import { 
  Close as CloseIcon, 
  Download as DownloadIcon, 
  Add as AddIcon,
  Save as SaveIcon 
} from '@mui/icons-material';
import { AddRemarkReport } from './AddRemarkReport';
import { addReport, fetchReports } from '../../store/actions/reportActions';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../config/config';
import SignaturePad from '../SignaturePad';
import SignatureUpload from '../SignatureUpload';

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [remark, setRemark] = useState('');
  const [signature, setSignature] = useState('');
  const [signatureMethod, setSignatureMethod] = useState('draw');
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title || 'download.pdf';
    link.click();
  };

  const handleSaveRemark = async () => {
    try {
      if (!remark || !signature) {
        setSnackbarMessage('Please add both remark and signature');
        setSnackbarOpen(true);
        return;
      }

      const url = `${baseUrl}/addRemarkReport`;
      
      // Create FormData to handle both text and file data
      const formData = new FormData();
      
      // Convert base64 PDF URL to Blob
      const pdfResponse = await fetch(pdfUrl);
      const pdfBlob = await pdfResponse.blob();
      
      // Add the PDF file to FormData
      formData.append('pdfFile', pdfBlob, `${title || 'document'}.pdf`);
      
      // Add other fields
      formData.append('formType', 'PDF_REPORT');
      formData.append('role', user?.role || '');
      formData.append('ward', user?.ward || '');
      formData.append('remark', remark);
      formData.append('signature', signature);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to save report');
      }

      const data = await response.json();
      setSnackbarMessage('Report saved successfully!');
      setSnackbarOpen(true);
      dispatch(fetchReports());
      
      // Clear form
      setRemark('');
      setSignature('');
      
      // Close modal after successful save
      onClose();
    } catch (error) {
      console.error('Error saving report:', error);
      setSnackbarMessage('Failed to save report. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleSignatureChange = (signatureData) => {
    setSignature(signatureData);
  };

  return (
    <>
      <Modal 
        open={open} 
        onClose={onClose}
        aria-labelledby="pdf-preview-modal"
        aria-describedby="modal-to-preview-pdf-before-download"
      >
        <Box sx={modalStyle}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
            <Box>
              <Button 
                onClick={handleSaveRemark} 
                size="small" 
                startIcon={<SaveIcon />} 
                variant="contained" 
                sx={{ mr: 1 }}
                disabled={!remark || !signature}
              >
                Save
              </Button>
              <Button 
                variant="contained" 
                startIcon={<DownloadIcon />} 
                onClick={handleDownload} 
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

          {/* Main Content Area - Split into two columns */}
          <Box sx={{ display: 'flex', flexGrow: 1, gap: 2 }}>
            {/* Left Column - PDF Preview */}
            <Box sx={{ flex: '1 1 60%', height: 'calc(100vh - 200px)', overflow: 'hidden', bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <iframe 
                src={pdfUrl} 
                style={{ width: '100%', height: '100%', border: 'none' }} 
                title="PDF Preview" 
              />
            </Box>

            {/* Right Column - Remark and Signature */}
            <Box sx={{ 
              flex: '1 1 40%', 
              height: 'calc(100vh - 200px)', 
              overflow: 'auto',
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              p: 2
            }}>
              {/* Remark Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Add Remark
                </Typography>
                <TextField 
                  fullWidth 
                  id="remark" 
                  name="remark" 
                  label="Enter Remark" 
                  value={remark} 
                  onChange={(e) => setRemark(e.target.value)} 
                  margin="normal" 
                  variant="outlined"
                  multiline
                  rows={4}
                  required
                  error={!remark}
                  helperText={!remark ? "Remark is required" : ""}
                />
              </Box>

              {/* Signature Section */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Signature
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Button 
                    variant={signatureMethod === 'draw' ? 'contained' : 'outlined'} 
                    onClick={() => setSignatureMethod('draw')} 
                    sx={{ mr: 1 }}
                  >
                    Draw Signature
                  </Button>
                  <Button 
                    variant={signatureMethod === 'upload' ? 'contained' : 'outlined'} 
                    onClick={() => setSignatureMethod('upload')}
                  >
                    Upload Signature
                  </Button>
                </Box>

                <Box sx={{ 
                  bgcolor: 'white', 
                  p: 2, 
                  borderRadius: 1,
                  border: !signature ? '1px solid #d32f2f' : 'none'
                }}>
                  {signatureMethod === 'draw' ? (
                    <SignaturePad setSignature={handleSignatureChange} />
                  ) : (
                    <SignatureUpload setSignature={handleSignatureChange} />
                  )}
                </Box>

                {!signature && (
                  <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                    Signature is required
                  </Typography>
                )}

                {signature && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Preview:
                    </Typography>
                    <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 1 }}>
                      <img 
                        src={signature} 
                        alt="Signature Preview" 
                        style={{ maxWidth: '100%', maxHeight: '100px' }} 
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)} 
        message={snackbarMessage} 
      />
    </>
  );
};

export default PdfPreviewModal;