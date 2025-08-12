import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Close as CloseIcon, Download as DownloadIcon, Save as SaveIcon } from '@mui/icons-material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addReport, fetchReports } from '../../store/actions/reportActions';
import { baseUrl, billBaseUrl } from '../../config/config';

import SignaturePad from '../SignaturePad';
import SignatureUpload from '../SignatureUpload';
import expstatus from '../../data/expstatus';
import AddRemarkExpenditure from './AddRemarkExpenditure';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [remark, setRemark] = useState('');
  const [openRemarkModal, setOpenRemarkModal] = useState(false);
  const [openFaultyMModal, setOpenFaultyMModal] = useState(false);
  
  // Consumer details state
  const [jakraKramank, setJakraKramank] = useState('');
  const [consumerNumber, setConsumerNumber] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [signaturesData, setSignaturesData] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    console.log("Current mode:", mode);
  }, [mode]);

  // Generate signatures data for 6 users with proper status checking
  useEffect(() => {
    if (currentReport && currentReport[0]?.reportingRemarks) {
      const signatures = [
        {
          role: 'Lipik:',
          status: currentReport[0]?.reportingRemarks?.find(r => r.role === 'Lipik') ? 'verified' : 'unverified',
          ward: wardName || 'Ward A',
          month: monthpassbackend || 'MAR-2025',
          date: new Date().toLocaleDateString(),
          signature: currentReport[0]?.reportingRemarks?.find(r => r.role === 'Lipik')?.signature || ''
        },
        {
          role: 'Junior Engineer:',
          status: currentReport[0]?.reportingRemarks?.find(r => r.role === 'Junior Engineer' && r.ward !== 'Head Office') ? 'verified' : 'unverified',
          ward: wardName || 'Ward A',
          month: monthpassbackend || 'MAR-2025',
          date: new Date().toLocaleDateString(),
          signature: currentReport[0]?.reportingRemarks?.find(r => r.role === 'Junior Engineer')?.signature || ''
        },
        {
          role: 'Junior Engineer:',
          status: currentReport[0]?.reportingRemarks?.find(r => r.role === 'Junior Engineer' && r.userWard === 'Head Office') ? 'verified' : 'unverified',
          ward: '(via Head Office)',
          month: monthpassbackend || 'MAR-2025',
          date: new Date().toLocaleDateString(),
          signature: currentReport[0]?.reportingRemarks?.find(r => r.role === 'Junior Engineer' && r.ward === 'Head Office')?.signature || ''
        },
        {
          role: 'Accountant:',
          status: currentReport[0]?.reportingRemarks?.find(r => r.role === 'Accountant') ? 'verified' : 'unverified',
          ward: wardName || 'Ward A',
          month: monthpassbackend || 'MAR-2025',
          date: new Date().toLocaleDateString(),
          signature: currentReport[0]?.reportingRemarks?.find(r => r.role === 'Accountant')?.signature || ''
        },
        {
          role: 'Assistant Municipal Commissioner:',
          status: currentReport[0]?.reportingRemarks?.find(r => r.role === 'Assistant Municipal Commissioner') ? 'verified' : 'unverified',
          ward: wardName || 'Ward A',
          month: monthpassbackend || 'MAR-2025',
          date: new Date().toLocaleDateString(),
          signature: currentReport[0]?.reportingRemarks?.find(r => r.role === 'Assistant Municipal Commissioner')?.signature || ''
        },
        {
          role: 'Dy Municipal Commissioner:',
          status: currentReport[0]?.reportingRemarks?.find(r => r.role === 'Dy.Municipal Commissioner') ? 'verified' : 'unverified',
          ward: wardName || 'Ward A',
          month: monthpassbackend || 'MAR-2025',
          date: new Date().toLocaleDateString(),
          signature: currentReport[0]?.reportingRemarks?.find(r => r.role === 'Dy.Municipal Commissioner')?.signature || ''
        }
      ];
      setSignaturesData(signatures);
    }
  }, [currentReport, wardName, monthpassbackend]);

  const generateSignaturePdf = async () => {
    try {
      const doc = new jsPDF();
      
      // Add title for signatures page
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('APPROVAL SIGNATURES', 20, 20);
      
      // Add form details
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`Form: ${title} | Month: ${monthpassbackend}`, 20, 35);
      
      let yPosition = 50;
      
      // Add signatures in 2 columns layout
      for (let i = 0; i < signaturesData.length; i += 2) {
        // Left column
        if (signaturesData[i]) {
          const leftSig = signaturesData[i];
          
          // Draw border for left signature
          doc.rect(15, yPosition, 85, 80);
          
          // Add signature details
          doc.setFontSize(12);
          doc.setFont(undefined, 'bold');
          doc.text(leftSig.role, 20, yPosition + 10);
          
          doc.setFontSize(9);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(leftSig.status === 'verified' ? 0 : 255, leftSig.status === 'verified' ? 128 : 0, 0);
          doc.text(`Status: ${leftSig.status}`, 20, yPosition + 20);
          
          doc.setTextColor(0, 0, 0);
          doc.text(`Ward: ${leftSig.ward}`, 20, yPosition + 30);
          doc.text(`Month: ${leftSig.month}`, 20, yPosition + 40);
          doc.text(`Date: ${leftSig.date}`, 20, yPosition + 50);
          
          // Signature box
          doc.rect(20, yPosition + 55, 75, 20);
          doc.setFontSize(8);
          doc.setTextColor(102, 102, 102);
          doc.text(leftSig.signature ? 'Signature Present' : 'Signature Pending', 25, yPosition + 67);
        }
        
        // Right column
        if (signaturesData[i + 1]) {
          const rightSig = signaturesData[i + 1];
          
          // Draw border for right signature
          doc.rect(110, yPosition, 85, 80);
          
          // Add signature details
          doc.setFontSize(12);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(rightSig.role, 115, yPosition + 10);
          
          doc.setFontSize(9);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(rightSig.status === 'verified' ? 0 : 255, rightSig.status === 'verified' ? 128 : 0, 0);
          doc.text(`Status: ${rightSig.status}`, 115, yPosition + 20);
          
          doc.setTextColor(0, 0, 0);
          doc.text(`Ward: ${rightSig.ward}`, 115, yPosition + 30);
          doc.text(`Month: ${rightSig.month}`, 115, yPosition + 40);
          doc.text(`Date: ${rightSig.date}`, 115, yPosition + 50);
          
          // Signature box
          doc.rect(115, yPosition + 55, 75, 20);
          doc.setFontSize(8);
          doc.setTextColor(102, 102, 102);
          doc.text(rightSig.signature ? 'Signature Present' : 'Signature Pending', 120, yPosition + 67);
        }
        
        yPosition += 90;
      }
      
      return doc;
    } catch (error) {
      console.error('Error generating signature PDF:', error);
      throw error;
    }
  };

  // OLD CODE LOGIC - Proper download functionality like before
  const handleDownload = async () => {
    try {
      if (title === 'form22' || title === 'karyalayintipani' || title === 'wardbilllist') {
        // First download the original PDF (like old code)
        let currentPdfUrl = pdfUrlnew ? pdfUrlnew : pdfUrl;
        
       
 if (currentPdfUrl) {
          // Download original PDF first
          const link = document.createElement('a');
          link.href = currentPdfUrl;
          link.download = `${title || 'download'}.pdf`;
          link.click();
          
          // Wait a moment then download signatures only if data exists
          setTimeout(async () => {
            try {
              if (signaturesData && signaturesData.length > 0) {
                const signatureDoc = await generateSignaturePdf();
                signatureDoc.save(`${title || 'download'}_signatures.pdf`);
              }
            } catch (error) {
              console.error('Error generating signature PDF:', error);
              toast.error('Error generating signature PDF. Please try again.');
            }
          }, 1000);
        }
      


      }
      
      else if (pdfBlobUrl) {
        // For other forms, use old logic
        const link = document.createElement('a');
        link.href = pdfBlobUrl;
        link.download = `${title || 'download'}.pdf`;
        link.click();
      } else if (pdfUrl) {
        // Fallback to original pdfUrl
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `${title || 'download'}.pdf`;
        link.click();
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Error downloading PDF. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Remark:', remark);
    setOpenRemarkModal(false);
  };

  const handleSaveRemark = async () => {
    try {
      if (!remark) {
        toast.error('Please add remark');
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
      toast.success('Report saved successfully!');
      dispatch(fetchReports());
      setRemark('');
      onClose();
    } catch (error) {
      console.error('Error saving report:', error);

      const backendMessage = error.response?.data?.message;
      let finalMessage = 'Failed to save report. Please try again.';

      if (user?.role === 'Lipik') {
        finalMessage = 'Failed to save report. Please try again.';
      } else if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
        finalMessage = 'Lipik must approve all forms first. Missing forms: form22, karyalayintipani';
      } else if (user?.role === 'Junior Engineer' && user?.ward === 'Head Office') {
        finalMessage = 'Ward Junior Engineer must approve all forms first. Missing forms: form22, karyalayintipani';
      } else if (user?.role === 'Accountant') {
        finalMessage = 'Head Office Junior Engineer must approve all forms first. Missing forms: form22, karyalayintipani';
      } else if (user?.role === 'Assistant Municipal Commissioner') {
        finalMessage = 'Accountant must approve all forms first. Missing forms: form22, karyalayintipani';
      } else if (user?.role === 'Dy.Municipal Commissioner') {
        finalMessage = 'Assistant Municipal Commissioner must approve all forms first. Missing forms: form22, karyalayintipani';
      } else {
        finalMessage = backendMessage;
      }

      toast.error(finalMessage);
    }
  };
  
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

  const renderSignaturePreview = () => {
    if (title !== 'form22' && title !== 'karyalayintipani' && title !== 'wardbilllist') {
      return null;
    }

    return (
      <Box sx={{ 
        flex: { md: '1 1 40%' }, 
        width: { xs: '100%', sm: '100%', md: '40%' },
        height: 'calc(100vh - 200px)',
        overflow: 'auto',
        bgcolor: 'white',
        border: '1px solid #ddd',
        borderRadius: 1,
        p: 2
      }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
          APPROVAL SIGNATURES
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 2, fontSize: '12px' }}>
          Form: {title} | Month: {monthpassbackend}
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {signaturesData.map((sig, index) => (
            <Box key={index} sx={{ 
              border: '1px solid #ddd', 
              borderRadius: 1, 
              p: 1,
              bgcolor: 'white',
              minHeight: '120px'
            }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5, color: '#1976d2' }}>
                {sig.role}
              </Typography>
              <Typography variant="caption" sx={{ 
                color: sig.status === 'verified' ? 'green' : 'red', 
                display: 'block', 
                fontSize: '11px',
                fontWeight: 'bold'
              }}>
                Status: {sig.status}
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', fontSize: '11px' }}>
                Ward: {sig.ward}
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', fontSize: '11px' }}>
                Month: {sig.month}
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mb: 1, fontSize: '11px' }}>
                Date: {sig.date}
              </Typography>
              <Box sx={{ 
                border: '1px solid #ccc', 
                height: 50, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: '#f9f9f9',
                borderRadius: 0.5
              }}>
                <Typography variant="caption" sx={{ color: '#666', fontSize: '10px' }}>
                  {sig.signature ? 'Signature Present' : 'Signature Pending'}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

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
                  md: (title === 'form22' || title === 'karyalayintipani' || title === 'wardbilllist') ? '1 1 60%' : '1 1 100%',
                },
                width: {
                  xs: '100%',
                  sm: '100%',
                  md: (title === 'form22' || title === 'karyalayintipani' || title === 'wardbilllist') ? '60%' : '100%',
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

            {renderSignaturePreview()}

            <AddRemarkExpenditure
              open={openRemarkModal}
              handleClose={() => setOpenRemarkModal(false)}
              remark={remark}
              setRemark={setRemark}
              handleSubmit={handleSubmit}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PdfPreviewModal;