// 1May 2025
// -----------------------------------
// import React, { useEffect, useState } from 'react';

// import { Modal, Box, Typography, TextField,Snackbar,Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

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
// import expstatus from '../../data/expstatus';
// const modalStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: {
//     xs: '80%', // default for small devices
//     lg: '100%',
//     xl: '100%',
//   },
//   height: {
//     xs: '80%', // default for small devices
//     lg: '100%',
//     xl: '100%',
//   },
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 2,
//   display: 'flex',
//   flexDirection: 'column',
// };

// const PdfPreviewModal = ({ open, onClose, pdfUrl, title,monthpassbackend,onDownload,mode }) => {
//   const [reportRemarkOpen, setReportRemarkOpen] = useState(false);
//   const [currentReport, setCurrentReport] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [remark, setRemark] = useState('');
//   const [signature, setSignature] = useState('');
//   const [signatureMethod, setSignatureMethod] = useState('draw');
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.auth.user);

//   useEffect(() => {
//     console.log("Current mode:", mode); // Log to see the mode in modal
//   }, [mode]);  // Track mode changes in modal

//   console.log("title>>>>>",title)

//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = title || 'download.pdf';
//     link.click();
//   };

//   const handleSaveRemark = async () => {
//     try {
//       if (!remark || !signature) {
//         setSnackbarMessage('Please add both remark and signature');
//         setSnackbarOpen(true);
//         return;
//       }

//       const url = `${baseUrl}/addRemarkReport`;
      
//       // Create FormData to handle both text and file data
//       const formData = new FormData();
      
//       // Convert base64 PDF URL to Blob
//       const pdfResponse = await fetch(pdfUrl);
//       const pdfBlob = await pdfResponse.blob();
      
//       // Add the PDF file to FormData
      
//       formData.append('userId', user?._id || '');
//       formData.append('pdfFile', pdfBlob, `${title || 'document'}.pdf`);
//       // Add other fields
//       formData.append('formType',title?title:'PDF_REPORT');
//       formData.append('seleMonth',monthpassbackend);
//       formData.append('role', user?.role || '');
//       formData.append('ward', user?.ward || '');
//       formData.append('remark', remark);
//       formData.append('signature', signature);
//       formData.append('mode', mode);
//       const response = await fetch(url, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save report');
//       }

//       const data = await response.json();
//       setSnackbarMessage('Report saved successfully!');
//       setSnackbarOpen(true);
//       dispatch(fetchReports());
      
//       // Clear form
//       setRemark('');
//       setSignature('');
      
//       // Close modal after successful save
//       onClose();
//     } catch (error) {
//       console.error('Error saving report:', error);
//       setSnackbarMessage('Failed to save report. Please try again.');
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
//               <Button 
//                 onClick={handleSaveRemark} 
//                 size="small" 
//                 startIcon={<SaveIcon />} 
//                 variant="contained" 
//                 sx={{ mr: 1 }}
//                 disabled={!remark || !signature}
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

//               {/* <Box sx={{ mb: 3 }}>
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
//                   required
//                   error={!remark}
//                   helperText={!remark ? "Remark is required" : ""}
//                 />
//               </Box> */}

// <Box>
//  <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
//   STATUS NAME
//   </Typography>
                                          
// <FormControl
//         fullWidth
//         margin="normal"
//         variant="outlined"
//         className='A-B-Input'
//       >
//         <InputLabel id="remark-label">Status Name</InputLabel>
//         <Select
//           labelId="remark-label"
//           id="remark"
//           name="remark"
//           size="small"
//           value={remark}
//           onChange={(e) => setRemark(e.target.value)}
//           label="Enter Remark"
//         >
//           {expstatus.map((item, index) => (
//             <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>



//                                          </Box>




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

//                 <Box sx={{ 
//                   bgcolor: 'white', 
//                   p: 2, 
//                   borderRadius: 1,
//                   border: !signature ? '1px solid #d32f2f' : 'none'
//                 }}>
//                   {signatureMethod === 'draw' ? (
//                     <SignaturePad setSignature={handleSignatureChange} />
//                   ) : (
//                     <SignatureUpload setSignature={handleSignatureChange} />
//                   )}
//                 </Box>

//                 {!signature && (
//                   <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
//                     Signature is required
//                   </Typography>
//                 )}

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

// ------------------------------------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from 'react';
// import { Modal, Box, Typography, TextField, Snackbar, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
// import { Close as CloseIcon, Download as DownloadIcon, Save as SaveIcon } from '@mui/icons-material';
// import axios from 'axios';

// import { useDispatch, useSelector } from 'react-redux';
// import { addReport, fetchReports } from '../../store/actions/reportActions';
// import { baseUrl } from '../../config/config';

// import SignaturePad from '../SignaturePad';
// import SignatureUpload from '../SignatureUpload';
// import expstatus from '../../data/expstatus';

// const modalStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: {
//     xs: '80%', // default for small devices
//     lg: '100%',
//     xl: '100%',
//   },
//   height: {
//     xs: '80%', // default for small devices
//     lg: '100%',
//     xl: '100%',
//   },
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 2,
//   display: 'flex',
//   flexDirection: 'column',
// };

// const PdfPreviewModal = ({ open, onClose, pdfUrl, title, monthpassbackend, onDownload, mode }) => {
//   const [reportRemarkOpen, setReportRemarkOpen] = useState(false);
//   const [currentReport, setCurrentReport] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [remark, setRemark] = useState('');
//   const [signature, setSignature] = useState('');

  

  
//   const [signatureMethod, setSignatureMethod] = useState('draw');
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.auth.user);

//   useEffect(() => {
//     console.log("Current mode:", mode); // Log to see the mode in modal
//   }, [mode]);  // Track mode changes in modal

//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = title || 'download.pdf';
//     link.click();
//   };

//   const handleSaveRemark = async () => {
//     try {
//       if (!remark || !signature) {
//         setSnackbarMessage('Please add both remark and signature');
//         setSnackbarOpen(true);
//         return;
//       }

//       const url = `${baseUrl}/addRemarkReport`;

//       // Create FormData to handle both text and file data
//       const formData = new FormData();

//       // Convert base64 PDF URL to Blob
//       const pdfResponse = await fetch(pdfUrl);
//       const pdfBlob = await pdfResponse.blob();

//       // Add the PDF file to FormData
//       formData.append('userId', user?._id || '');
//       formData.append('pdfFile', pdfBlob, `${title || 'document'}.pdf`);
//       // Add other fields
//       formData.append('formType', title ? title : 'PDF_REPORT');
//       formData.append('seleMonth', monthpassbackend);
//       formData.append('role', user?.role || '');
//       formData.append('ward', user?.ward || '');
//       formData.append('remark', remark);
//       formData.append('signature', signature);
//       formData.append('mode', mode);

//       const response = await fetch(url, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save report');
//       }

//       const data = await response.json();
//       setSnackbarMessage('Report saved successfully!');
//       setSnackbarOpen(true);
//       dispatch(fetchReports());

//       // Clear form
//       setRemark('');
//       setSignature('');

//       // Close modal after successful save
//       onClose();
//     } catch (error) {
//       console.error('Error saving report:', error);
//       setSnackbarMessage('Failed to save report. Please try again.');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleSignatureChange = (signatureData) => {
//     setSignature(signatureData);
//   };

//   // Fetch existing report on component mount
//   useEffect(() => {
//     if (monthpassbackend && user?.ward) {
//       const fetchReport = async () => {
//         const response = await axios.post(`${baseUrl}/searchReport`, {
//           month: monthpassbackend,
//           ward: user.ward,
//         });

//         const foundReport = response.data;
//         if (foundReport && foundReport[0] && foundReport[0].monthReport === monthpassbackend && foundReport[0].ward === user.ward) {
//           setMode('edit');
//           setPdfUrl(foundReport[0].pdfFile); // Assuming pdfFile contains the URL for the existing PDF
//         } else {
//           setMode('create');
//         }
//       };
//       fetchReport();
//     }
//   }, [monthpassbackend, user?.ward]);

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
//               <Button 
//                 onClick={handleSaveRemark} 
//                 size="small" 
//                 startIcon={<SaveIcon />} 
//                 variant="contained" 
//                 sx={{ mr: 1 }}
//                 disabled={!remark || !signature}
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
//               <Box>
//                 <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
//                   STATUS NAME
//                 </Typography>
//                 <FormControl
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   className='A-B-Input'
//                 >
//                   <InputLabel id="remark-label">Status Name</InputLabel>
//                   <Select
//                     labelId="remark-label"
//                     id="remark"
//                     name="remark"
//                     size="small"
//                     value={remark}
//                     onChange={(e) => setRemark(e.target.value)}
//                     label="Enter Remark"
//                   >
//                     {expstatus.map((item, index) => (
//                       <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
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

//                 <Box sx={{ 
//                   bgcolor: 'white', 
//                   p: 2, 
//                   borderRadius: 1,
//                   border: !signature ? '1px solid #d32f2f' : 'none'
//                 }}>
//                   {signatureMethod === 'draw' ? (
//                     <SignaturePad setSignature={handleSignatureChange} />
//                   ) : (
//                     <SignatureUpload setSignature={handleSignatureChange} />
//                   )}
//                 </Box>

//                 {!signature && (
//                   <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
//                     Signature is required
//                   </Typography>
//                 )}

//                 {signature && (
//                   <Box sx={{ mt: 2 }}>
//                     <Typography variant="subtitle2" gutterBottom>
//                       Preview:
//                     </Typography>
//                     <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 1 }}>
//                       <img 
//                         src={signature} 
//                         alt="Signature Preview" 
//                         style={{ width: '100%', height: 'auto' }} 
//                       />
//                     </Box>
//                   </Box>
//                 )}
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Snackbar for success/error messages */}
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

// -------------------------------------------------




import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Snackbar, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Close as CloseIcon, Download as DownloadIcon, Save as SaveIcon } from '@mui/icons-material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addReport, fetchReports } from '../../store/actions/reportActions';
import { baseUrl, billBaseUrl } from '../../config/config';

import SignaturePad from '../SignaturePad';
import SignatureUpload from '../SignatureUpload';
import expstatus from '../../data/expstatus';
import AddRemarkExpenditure from './AddRemarkExpenditure';



const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '90%',
    sm: '90%',
    md: '95%',
    lg: '95%',
    xl: '95%',
  },
  height: {
    xs: '95vh', // mobile साठी जवळपास full height
    sm: '95vh',
    md: '95vh',
    lg: '95vh',
    xl: '95vh',
  },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto', // 👈 Add this line
};

const PdfPreviewModal = ({ open, onClose, pdfUrl, title, monthpassbackend,wardName,onDownload, mode }) => {
console.log("title is >>>>",title)
  const [reportRemarkOpen, setReportRemarkOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [remark, setRemark] = useState('');
  const [openRemarkModal, setOpenRemarkModal] = useState(false);
  // const [signature, setSignature] = useState('');
  // const [signatureMethod, setSignatureMethod] = useState('draw');
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);


  useEffect(() => {
    console.log("Current mode:", mode); // Log to see the mode in modal
  }, [mode]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title || 'download.pdf';
    link.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Remark:', remark);
    setOpenRemarkModal(false);
  };

  const handleSaveRemark = async () => {
    try {
      // if (!remark || !signature) {
        if (!remark) {
        setSnackbarMessage('Please add remark');
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
      formData.append('userId', user?._id || '');
      formData.append('signature', user?.signature || '');
      formData.append('pdfFile', pdfBlob, `${title || 'document'}.pdf`);
      // Add other fields
      formData.append('formType', title ? title : 'PDF_REPORT');
      formData.append('seleMonth', monthpassbackend);
      formData.append('role', user?.role || '');
      formData.append('ward', user?.ward || '');
      formData.append('wardName',wardName)
      formData.append('remark', remark);
      // formData.append('signature', signature);
      formData.append('mode', mode);

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
      // setSignature('');

      // Close modal after successful save
      onClose();
    } catch (error) {
      console.error('Error saving report:', error);
      setSnackbarMessage('Failed to save report. Please try again.');
      setSnackbarOpen(true);
    }
  };

  // const handleSignatureChange = (signatureData) => {
  //   setSignature(signatureData);
  // };

  
  useEffect(() => {
    if (monthpassbackend && user?.ward) {
      const fetchReport = async () => {
        const response = await axios.post(`${baseUrl}/searchReport`, {
          ward: user?.ward,
          month: monthpassbackend,
        });
        if (response.data) {
          setCurrentReport(response.data);
        }
      };
      fetchReport();
    }
  }, [monthpassbackend, user?.ward]);


 const getPdfUrl = () => {
    if (!currentReport) return null;

   
    const lipikRemark = currentReport[0]?.reportingRemarks?.find(remark => remark.role === 'Lipik');
    if (lipikRemark) {
      const document = lipikRemark.documents?.find(doc => doc.formType === title);
      if (document) {
      
        return `${billBaseUrl}/${document.pdfFile.replace('\\', '/')}`;
      }
    }
    return null;
  };

  const pdfUrlnew = getPdfUrl();



  const headingText =
  title === 'karyalayintipani'
    ? 'कार्यालयीन टिपणी'
    : title === 'form22'
    ? 'नमुना नं. २२'
    : title === 'wardbilllist'
    ? 'Ward Bills List'
    : '';

  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="pdf-preview-modal" aria-describedby="modal-to-preview-pdf-before-download">
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center',flexDirection:{
            xs:'column',md:'row'
          } }}>
            <Typography variant="h6" component="h2">{headingText}</Typography>
            <Box sx={{display:'flex',flexDirection:'row'}}>
              {/* <Button onClick={handleSaveRemark} size="small" startIcon={<SaveIcon />} variant="contained" sx={{ mr: 1 }} disabled={!remark || !signature}> */}
              <Button onClick={handleSaveRemark} size="small" startIcon={<SaveIcon />} variant="outlined" sx={{ mr: 1 }} disabled={!remark}>
                Save
              </Button>
              {/* <Button sx={{ mr: 1 }} variant="outlined">Add Remark</Button> */}

              <Button 
  sx={{ mr: 1 }} 
  variant="outlined" 
  onClick={() => setOpenRemarkModal(true)}
>
  Add Remark
</Button>
              <Button variant="outlined" size="small" startIcon={<DownloadIcon />} onClick={handleDownload} sx={{ mr: 1 }}>
                Download
              </Button>
              <Button variant="outlined" size="small" startIcon={<CloseIcon />} onClick={onClose}>
                Close
              </Button>
            </Box>
          </Box>

          <Box sx={{
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
    },
    flexGrow: 1,
    gap: 2,
  }}>
            <Box 
           sx={{
            flex: {
              md: '1 1 60%',
            },
            width: {
              xs: '100%',
              sm: '100%',
              md: '60%',
            },
            height: 'calc(100vh - 200px)',
            overflow: 'hidden',
            bgcolor: '#f5f5f5',
            borderRadius: 1,
          }}
            >
            <iframe
    // src={user.role === 'Lipik' ? pdfUrl : `${billBaseUrl}/uploads/${currentReport?.pdfUrl}`}
    // src={user.role==='Lipik'?pdfUrl:pdfUrlnew}
    // src={pdfUrlnew}
    src={pdfUrlnew?pdfUrlnew:pdfUrl}
    style={{ width: '100%', height: '100%', border: 'none' }}
    title="PDF Preview"
  />
      
  
           
            </Box>


            <AddRemarkExpenditure
  open={openRemarkModal}
  handleClose={() => setOpenRemarkModal(false)}
  remark={remark}
  setRemark={setRemark}
  handleSubmit={handleSubmit}
/>



            {/* <Box 
           sx={{
            flex: {
              md: '1 1 40%',
            },
            width: {
              xs: '100%',
              sm: '100%',
              md: '40%',
            },
            height: 'calc(100vh - 200px)',
            overflow: 'auto',
            bgcolor: '#f5f5f5',
            borderRadius: 1,
            p: 2,
          }}
            > */}



              {/* Replaced it by Modal AddRemarkExpenditure Modal */}
              {/* <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>Add Remark</Typography>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel id="remark-label">Status Name</InputLabel>
                  <Select
                    labelId="remark-label"
                    id="remark"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    label="Enter Remark"
                  >
                    {expstatus.map((item, index) => (
                      <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box> */}

{/* -------------------------------------------------- */}




              {/* <Box>
                <Typography variant="subtitle1" gutterBottom>Signature</Typography>
                <Box sx={{ mb: 2 }}>
                  <Button variant={signatureMethod === 'draw' ? 'contained' : 'outlined'} onClick={() => setSignatureMethod('draw')} sx={{ mr: 1 }}>
                    Draw Signature
                  </Button>
                  <Button variant={signatureMethod === 'upload' ? 'contained' : 'outlined'} onClick={() => setSignatureMethod('upload')}>
                    Upload Signature
                  </Button>
                </Box>

                <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 1, border: !signature ? '1px solid #d32f2f' : 'none' }}>
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
                    <Typography variant="subtitle2" gutterBottom>Preview:</Typography>
                    <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 1 }}>
                      <img src={signature} alt="Signature Preview" style={{ maxWidth: '100%', maxHeight: '100px' }} />
                    </Box>
                  </Box>
                )}
              </Box> */}
            {/* </Box> */}


            
          </Box>
        </Box>
      </Modal>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
    </>
  );
};

export default PdfPreviewModal;

