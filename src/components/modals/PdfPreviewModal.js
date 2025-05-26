


// import React, { useEffect, useState } from 'react';
// import { Modal, Box, Typography, TextField, Snackbar, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
// import { Close as CloseIcon, Download as DownloadIcon, Save as SaveIcon } from '@mui/icons-material';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { addReport, fetchReports } from '../../store/actions/reportActions';
// import { baseUrl, billBaseUrl } from '../../config/config';

// import SignaturePad from '../SignaturePad';
// import SignatureUpload from '../SignatureUpload';
// import expstatus from '../../data/expstatus';
// import AddRemarkExpenditure from './AddRemarkExpenditure';

// import { toast } from "react-toastify";
// import FaultyMeterConsumerNumber from './FaultyMeterConsumerNumber';


// const modalStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: {
//     xs: '90%',
//     sm: '90%',
//     md: '95%',
//     lg: '95%',
//     xl: '95%',
//   },
//   height: {
//     xs: '95vh', // mobile साठी जवळपास full height
//     sm: '95vh',
//     md: '95vh',
//     lg: '95vh',
//     xl: '95vh',
//   },
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 2,
//   display: 'flex',
//   flexDirection: 'column',
//   overflowY: 'auto', // 👈 Add this line
// };

// const PdfPreviewModal = ({ open, onClose, pdfUrl, title, monthpassbackend,wardName,onDownload, mode }) => {
// console.log("title is >>>>",title)
//   const [reportRemarkOpen, setReportRemarkOpen] = useState(false);
//   const [currentReport, setCurrentReport] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [remark, setRemark] = useState('');
//   const [openRemarkModal, setOpenRemarkModal] = useState(false);
//    const [openFaultyMModal, setOpenFaultyMModal] = useState(false);

//   const dispatch = useDispatch();
//   const user = useSelector(state => state.auth.user);


//   useEffect(() => {
//     console.log("Current mode:", mode); 
//   }, [mode]);

//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = title || 'download.pdf';
//     link.click();
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Selected Remark:', remark);
//     setOpenRemarkModal(false);
//   };

//   const handleSaveRemark = async () => {
//     try {
      
//         if (!remark) {
//         setSnackbarMessage('Please add remark');
//         setSnackbarOpen(true);
//         return;
//       }

//       const url = `${baseUrl}/addRemarkReport`;

     
//       const formData = new FormData();

     
//       const pdfResponse = await fetch(pdfUrl);
//       const pdfBlob = await pdfResponse.blob();

     
//       formData.append('userId', user?._id || '');
//       formData.append('signature', user?.signature || '');
//       formData.append('pdfFile', pdfBlob, `${title || 'document'}.pdf`);
     
//       formData.append('formType', title ? title : 'PDF_REPORT');
//       formData.append('seleMonth', monthpassbackend);
//       formData.append('role', user?.role || '');
//       formData.append('ward', user?.ward || '');
//       formData.append('wardName',wardName)
//       formData.append('remark', remark);
     
//       formData.append('mode', mode);

//       const response = await fetch(url, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save report');
//       }

//       const data = await response.json();
//       console.log("data----",data)
//       setSnackbarMessage('Report saved successfully!');
//       setSnackbarOpen(true);
//       dispatch(fetchReports());

     
//       setRemark('');
     
//       onClose();
//     } catch (error) {
//       console.error('Error saving report:', error);
//       setSnackbarMessage('Failed to save report. Please try again.');
//       setSnackbarOpen(true);
//     }
//   };

 

  
//   useEffect(() => {
//     if (monthpassbackend && user?.ward) {
//       const fetchReport = async () => {
//         const response = await axios.post(`${baseUrl}/searchReport`, {
//           ward: user?.ward,
//           month: monthpassbackend,
//         });
//         if (response.data) {
//           setCurrentReport(response.data);
//         }
//       };
//       fetchReport();
//     }
//   }, [monthpassbackend, user?.ward]);


//  const getPdfUrl = () => {
//     if (!currentReport) return null;

   
//     const lipikRemark = currentReport[0]?.reportingRemarks?.find(remark => remark.role === 'Lipik');
//     if (lipikRemark) {
//       const document = lipikRemark.documents?.find(doc => doc.formType === title);
//       if (document) {
      
//         return `${billBaseUrl}/${document.pdfFile.replace('\\', '/')}`;
//       }
//     }
//     return null;
//   };

//   const pdfUrlnew = getPdfUrl();



//   const headingText =
//   title === 'karyalayintipani'
//     ? 'कार्यालयीन टिपणी'
//     : title === 'form22'
//     ? 'नमुना नं. २२'
//     : title === 'wardbilllist'
//     ? 'Ward Bills List'
//     : '';

//   return (
//     <>
//       <Modal open={open} onClose={onClose} aria-labelledby="pdf-preview-modal" aria-describedby="modal-to-preview-pdf-before-download">
//         <Box sx={modalStyle}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center',flexDirection:{
//             xs:'column',md:'row'
//           } }}>
//             <Typography variant="h6" component="h2">{headingText}</Typography>
//             <Box sx={{display:'flex',flexDirection:'row'}}>
              
//               <Button onClick={handleSaveRemark} size="small" startIcon={<SaveIcon />} variant="outlined" sx={{ mr: 1 }} disabled={!remark}>
//                 Save
//               </Button>
             

//     <Button 
//   sx={{ mr: 1 }} 
//   variant="outlined" 
//   onClick={() => setOpenRemarkModal(true)}
// >
//   Add Remark
// </Button>
// <Button 
//   sx={{ mr: 1 }} 
//   variant="outlined" 
//   onClick={() => setOpenFaultyMModal(true)}
// >
//   Add Consumer
// </Button>


//               <Button variant="outlined" size="small" startIcon={<DownloadIcon />} onClick={handleDownload} sx={{ mr: 1 }}>
//                 Download
//               </Button>
//               <Button variant="outlined" size="small" startIcon={<CloseIcon />} onClick={onClose}>
//                 Close
//               </Button>
//             </Box>
//           </Box>

//           <Box sx={{
//     display: 'flex',
//     flexDirection: {
//       xs: 'column',
//       sm: 'column',
//       md: 'row',
//     },
//     flexGrow: 1,
//     gap: 2,
//   }}>
//             <Box 
//            sx={{
//             flex: {
//               md: '1 1 60%',
//             },
//             width: {
//               xs: '100%',
//               sm: '100%',
//               md: '60%',
//             },
//             height: 'calc(100vh - 200px)',
//             overflow: 'hidden',
//             bgcolor: '#f5f5f5',
//             borderRadius: 1,
//           }}
//             >
//             <iframe
    
//     src={pdfUrlnew?pdfUrlnew:pdfUrl}
//     style={{ width: '100%', height: '100%', border: 'none' }}
//     title="PDF Preview"
//   />
      
  
           
//             </Box>


//             <AddRemarkExpenditure
//   open={openRemarkModal}
//   handleClose={() => setOpenRemarkModal(false)}
//   remark={remark}
//   setRemark={setRemark}
//   handleSubmit={handleSubmit}
// />


// <FaultyMeterConsumerNumber
// open={openFaultyMModal}
// handleClose={() => setOpenFaultyMModal(false)}
// />
           

            
//           </Box>
//         </Box>
//       </Modal>

//       <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
//     </>
//   );
// };

// export default PdfPreviewModal;

// ==========================================

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

import { toast } from "react-toastify";
import FaultyMeterConsumerNumber from './FaultyMeterConsumerNumber';

import jsPDF from 'jspdf';

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
    xs: '95vh',
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
  overflowY: 'auto',
};

const PdfPreviewModal = ({ open, onClose, pdfUrl, title, monthpassbackend, wardName, onDownload, mode }) => {
  console.log("title is >>>>", title);
  

  const [reportRemarkOpen, setReportRemarkOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [remark, setRemark] = useState('');
  const [openRemarkModal, setOpenRemarkModal] = useState(false);
  const [openFaultyMModal, setOpenFaultyMModal] = useState(false);
  
  // Consumer details state
  const [jakraKramank, setJakraKramank] = useState('');
  const [consumerNumber, setConsumerNumber] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    console.log("Current mode:", mode);
  }, [mode]);



//   useEffect(() => {
//   if (open && jakraKramank && consumerNumber && date) {
//     const doc = generatePdf({ jakraKramank, consumerNumber, date });
//     const pdfBlob = doc.output('blob');
//     const url = URL.createObjectURL(pdfBlob);
//     setPdfBlobUrl(url);

//     // Clean up URL object when modal closes
//     return () => {
//       URL.revokeObjectURL(url);
//       setPdfBlobUrl(null);
//     };
//   }
// }, [open, jakraKramank, consumerNumber, date]);

  


const handleDownload = () => {
  if (pdfBlobUrl) {
    const link = document.createElement('a');
    link.href = pdfBlobUrl;
    link.download = `${title || 'download'}.pdf`;
    link.click();
  } else if (pdfUrl) {
    // fallback if external pdfUrl exists
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title || 'download'}.pdf`;
    link.click();
  }
};

// const handleSaveConsumerDetails = () => {
//   if (!jakraKramank || !consumerNumber || !date) {
//     setSnackbarMessage('Please fill all consumer details');
//     setSnackbarOpen(true);
//     return;
//   }

//   const doc = generatePdf({ jakraKramank, consumerNumber, date });
//   const pdfBlob = doc.output('blob');
//   const url = URL.createObjectURL(pdfBlob);
//   setPdfBlobUrl(url);

//   setSnackbarMessage('Consumer details saved successfully!');
//   setSnackbarOpen(true);
//   setOpenFaultyMModal(false);
// };





// const handleDownload = () => {
//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = title || 'download.pdf';
//     link.click();
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Remark:', remark);
    setOpenRemarkModal(false);
  };

  const handleSaveRemark = async () => {
    try {
      if (!remark) {
        setSnackbarMessage('Please add remark');
        setSnackbarOpen(true);
        return;
      }

      const url = `${baseUrl}/addRemarkReport`;
      const formData = new FormData();
      const pdfResponse = await fetch(pdfUrl);
      const pdfBlob = await pdfResponse.blob();

      formData.append('userId', user?._id || '');
      formData.append('signature', user?.signature || '');
      formData.append('pdfFile', pdfBlob, `${title || 'document'}.pdf`);
      formData.append('formType', title ? title : 'PDF_REPORT');
      formData.append('seleMonth', monthpassbackend);
      formData.append('role', user?.role || '');
      formData.append('ward', user?.ward || '');
      formData.append('wardName', wardName);
      formData.append('remark', remark);
      formData.append('mode', mode);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to save report');
      }

      const data = await response.json();
      console.log("data----", data);
      setSnackbarMessage('Report saved successfully!');
      setSnackbarOpen(true);
      dispatch(fetchReports());
      setRemark('');
      onClose();
    } catch (error) {
      console.error('Error saving report:', error);
      setSnackbarMessage('Failed to save report. Please try again.');
      setSnackbarOpen(true);
    }
  };












  // const handleSaveConsumerDetails = () => {
  //   if (!jakraKramank || !consumerNumber || !date) {
  //     setSnackbarMessage('Please fill all consumer details');
  //     setSnackbarOpen(true);
  //     return;
  //   }
    
  //   console.log('Consumer details saved:', { jakraKramank, consumerNumber, date });
  //   setSnackbarMessage('Consumer details saved successfully!');
  //   setSnackbarOpen(true);
  //   setOpenFaultyMModal(false);
    
  //   // Here you would typically trigger the PDF regeneration with the new values
  //   // This could involve calling a function from the parent component
  //   if (onDownload) {
  //     onDownload({ jakraKramank, consumerNumber, date });
  //   }
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
      : title === 'faultymeter'
      ? 'Faulty Meter Report'
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
              
              <Button onClick={handleSaveRemark} size="small" startIcon={<SaveIcon />} variant="outlined" sx={{ mr: 1 }} disabled={!remark}>
                Save
              </Button>
             
              <Button 
                sx={{ mr: 1 }} 
                variant="outlined" 
                onClick={() => setOpenRemarkModal(true)}
              >
                Add Remark
              </Button>
              

               {/* {title === 'faultymeter' && (
    <>
     <Button 
                sx={{ mr: 1 }} 
                variant="outlined" 
                onClick={() => setOpenFaultyMModal(true)}
              >
                Add Consumer
              </Button>
    </>)} */}
             

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
                src={pdfUrlnew ? pdfUrlnew : pdfUrl}
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

            {/* <FaultyMeterConsumerNumber
              open={openFaultyMModal}
              handleClose={() => setOpenFaultyMModal(false)}
              jakraKramank={jakraKramank}
              setJakraKramank={setJakraKramank}
              consumerNumber={consumerNumber}
              setConsumerNumber={setConsumerNumber}
              date={date}
              setDate={setDate}
              handleSubmit={handleSaveConsumerDetails}
            /> */}
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