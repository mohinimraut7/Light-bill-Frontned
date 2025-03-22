import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills, addBill,deleteBill, editBill } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box,Modal,Button,TextField,MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import AddBill from '../components/modals/AddBill';
import AddPayment from '../components/modals/AddPayment';
import AddForm22 from '../components/modals/Form22modal';

import BillDatePicker from '../components/BillDatePicker';
import wardDataAtoI from '../data/warddataAtoI';
import meterPurposeData from '../data/meterpurpose';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {loadDevanagariFont,notoserifbase} from '../fonts/NotoSerifbase';

import "react-toastify/dist/ReactToastify.css";
import './ConsumerBill.css';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';
import { CircularProgress} from '@mui/material';
import { baseUrl } from '../config/config';
import axios from 'axios';





import 'jspdf-autotable';









import { fetchConsumers } from '../store/actions/consumerActions';

const rowColors = ['#F7F9FB', 'white'];

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-cell': {
    padding: theme.spacing(1),
  },
  '& .MuiDataGrid-row': {
    '&:nth-of-type(odd)': {
      backgroundColor: rowColors[0],
    },
    '&:nth-of-type(even)': {
      backgroundColor: rowColors[1],
    },
  },
  '& .total-row': {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    color: '#1976d2',
  },
}));

const RegionalEnergyExpenditure = () => {
  const dispatch = useDispatch();
  const { bills, loading, error } = useSelector((state) => state.bills);
  const { consumers } = useSelector((state) => state.consumers);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector(state => state.auth.user);

  const [billOpen, setBillOpen] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [addFormTtOpen, setAddFormTtOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedBillTt, setSelectedBillTt] = useState(null);

  const [wardName, setWardName] = useState('');
  const [meterPurposeName, setMeterPurposeName] = useState('');
  const [selectedMonthYear, setSelectedMonthYear] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchBills());
    dispatch(fetchConsumers());
  }, [dispatch, data]);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getFilteredBills = () => {
    if (!bills || !consumers) return [];

    const consumerMap = new Map(
      consumers.map(consumer => [consumer.consumerNumber, consumer])
    );

    let filteredBills = bills;

    if (user?.role.startsWith('Junior Engineer')) {
      const specificWard = user?.ward;
      filteredBills = bills.filter((bill) => bill.ward === specificWard);
    }

    return filteredBills.map(bill => ({
      ...bill,
      meterPurpose: consumerMap.get(bill.consumerNumber)?.meterPurpose || 'N/A'
    }));
  };

  const handleAddBillClose = () => setBillOpen(false);
  const handleAddPaymentClose = () => setAddPaymentOpen(false);

  const handleAddFormTtClose = () => setAddFormTtOpen(false);

  
  const handleAddBill = (billData) => {
    dispatch(addBill(billData));
    handleAddBillClose();
  };

  const handleChangeWard = (event) => setWardName(event.target.value);
  const handleChangeMeterPurpose = (event) => setMeterPurposeName(event.target.value);
  
  const handleDateChange = (value) => {
    const formattedValue = dayjs(value).format("MMM-YYYY").toUpperCase();
    setSelectedMonthYear(formattedValue);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setData(json);
      json.forEach((bill) => {
        dispatch(addBill(bill));
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF('landscape');
    
    // doc.setFontSize(16);
    // doc.text("Energy Expenditure Report", 140, 20, { align: "center" });
  
    // Ensure rows array is not empty before accessing its values
    const meterPurpose = rows.length > 0 ? rows[0].meterPurpose : "N/A";
    const ward = rows.length > 0 ? rows[0].ward : "N/A";
    const monthYear = rows.length > 0 ? rows[0].monthAndYear : "N/A";
  
    doc.setFontSize(14);
    const lineHeight = 10; // Space between lines
    let yPosition = 20; // Initial Y position
  
    doc.text(`Meter Purpose: ${meterPurpose}`, 140, yPosition, { align: "center" });
    yPosition += lineHeight; // Move down
    doc.text(`Ward: ${ward}`, 140, yPosition, { align: "center" });
    yPosition += lineHeight; // Move down
    doc.text(`Month & Year: ${monthYear}`, 140, yPosition, { align: "center" });
  
  
    const tableData = rows.map(row => [
      row.consumerNumber,
      row.consumerAddress,
      row.monthAndYear,
      row.ward,
      row.meterPurpose,
      row.netBillAmount,
      row.dueDate
    ]);

    doc.autoTable({
      head: [['Consumer No.', 'Address', 'Month', 'Ward', 'Meter Purpose', 'Amount', 'Due Date']],
      body: tableData,
      startY: 50,
    });

    doc.save('energy-expenditure-report.pdf');
  };


  // const handleDownloadForm22 = () => {
  //   try {
  //     const doc = new jsPDF();
  
  //     // Add Devanagari font
  //     doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
  //     doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
  //     loadDevanagariFont(doc);
  //     doc.setFont("NotoSerifDevanagari");
  
  //     // Set initial positions
  //     let yPos = 20;
  
  //     // Add header text
  //     doc.setFontSize(12);
  //     doc.text("M.S.C. Form 22 (Rule (1))", 20, yPos);
  //     doc.text("M.S.C. 22", 170, yPos);
      
  //     yPos += 15;
  //     doc.setFontSize(14);
  //     doc.text("नमुना नं. २२", 90, yPos);
      
  //     yPos += 10;
  //     doc.text("(नियम २२ (१))", 90, yPos);
      
  //     yPos += 10;
  //     doc.setFontSize(16);
  //     doc.text("वसई विरार शहर महानगरपालिका", 70, yPos);
  
  //     // Add current date
  //     const currentDate = new Date().toLocaleDateString('en-IN');
  //     doc.text(`दिनांक ${currentDate}`, 150, yPos);
  
  //     yPos += 20;
      
  //     // Add form details
  //     doc.setFontSize(12);
  //     doc.text("बिल क्रमांक:", 20, yPos);
  //     doc.text("प्रमाणक क्रमांक:", 100, yPos);
      
  //     yPos += 10;
  //     doc.text("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी", 20, yPos);
      
  //     yPos += 10;
  //     doc.text("पत्ता : प्रभाग समिती (अ)", 20, yPos);
      
  //     yPos += 10;
  //     doc.text("माल : विद्युत विभाग", 20, yPos);
  
  //     yPos += 20;
  
  //     // Add table headers
  //     const headers = [
  //       "अनु. क्रमांक",
  //       "कामाचा किंवा वस्तूंचा तपशील",
  //       "परिमाण किंवा वजन",
  //       "दर",
  //       "युनिट",
  //       "रक्कम रु."
  //     ];
  
  //     // Calculate total amount for current month/year
  //     const totalAmount = rows
  //       .filter(row => row.monthAndYear === selectedMonthYear)
  //       .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);
  
  //     // Add table content
  //     doc.autoTable({
  //       head: [headers],
  //       body: [[
  //         "१",
  //         `वसई विरार शहर महानगरपालिका कार्यक्षेत्रातील प्रभाग समिती (अ) विभागातील विरार पश्चिम विभागाचे म.रा.वि.वि. कंपनीचे माहे ${selectedMonthYear} चे विद्युत देयक.`,
  //         "",
  //         "",
  //         "",
  //         totalAmount.toFixed(2)
  //       ]],
  //       startY: yPos,
  //       theme: 'grid',
  //       styles: {
  //         font: "NotoSerifDevanagari",
  //         fontSize: 10
  //       },
  //       headStyles: {
  //         fillColor: [255, 255, 255],
  //         textColor: [0, 0, 0],
  //         lineWidth: 0.1
  //       },
  //       columnStyles: {
  //         0: { cellWidth: 20 },
  //         1: { cellWidth: 80 },
  //         2: { cellWidth: 25 },
  //         3: { cellWidth: 20 },
  //         4: { cellWidth: 20 },
  //         5: { cellWidth: 25 }
  //       }
  //     });
  
  //     // Add total in words
  //     yPos = doc.autoTable.previous.finalY + 20;
  //     doc.text(`एकूण रक्कम रुपये (अक्षरी ${totalAmount.toFixed(2)} मात्र)`, 20, yPos);
  
  //     // Add signature section
  //     yPos += 30;
  //     doc.text("प्रमाणित करण्यांत येते की या बिलांत दर्शविलेले दर व", 20, yPos);
  //     yPos += 10;
  //     doc.text("परिमाणे ही अचूक आहेत आणि सामुग्री, वस्तु यांच्या", 20, yPos);
  //     yPos += 10;
  //     doc.text("स्थितीत मिळाल्या असून त्या पुरवठादार यांच्या", 20, yPos);
  //     yPos += 10;
  //     doc.text("संख्यात्मक लेख्याच्या समर्थित पुरवठा नोंदवहीत नमूद", 20, yPos);
  //     yPos += 10;
  //     doc.text("करण्यात आल्या आहेत.", 20, yPos);
  
  //     doc.save('form22-report.pdf');
  //   } catch (error) {
  //     console.error('Error generating Form 22 PDF:', error);
  //   }
  // };

// =========================================================================
  // const handleDownloadForm22 = () => {
  //   try {
  //     // Create PDF in portrait mode
  //     const doc = new jsPDF({
  //       orientation: 'portrait',
  //       unit: 'mm',
  //       format: 'a4'
  //     });
  
  //     // Add Devanagari font
  //     doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
  //     doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
  //     loadDevanagariFont(doc);
  //     doc.setFont("NotoSerifDevanagari");
  
  //     // Set initial positions
  //     let yPos = 15;
  
  //     // Add header text
  //     doc.setFontSize(10);
  //     doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
  //     doc.text("M.S.C. 22", 170, yPos);
      
  //     yPos += 20;
  //     doc.setFontSize(12);
  //     doc.text("नमुना नं. २२", 85, yPos);
      
  //     yPos += 8;
  //     doc.text("(नियम २२ (१))", 85, yPos);
      
  //     yPos += 10;
  //     doc.setFontSize(14);
  //     doc.text("वसई विरार शहर महानगरपालिका", 65, yPos);
  
  //     yPos += 15;
  //     doc.setFontSize(11);
      
  //     // Add form details with lines
  //     doc.text("बिल क्रमांक:", 15, yPos);
  //     doc.line(40, yPos, 100, yPos);
      
  //     doc.text("प्रमाणक क्रमांक:", 105, yPos);
  //     doc.line(140, yPos, 170, yPos);
      
  //     const currentDate = new Date().toLocaleDateString('en-IN');
  //     doc.text(`दिनांक ${currentDate}`, 150, yPos);
      
  //     yPos += 10;
  //     doc.text("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी", 15, yPos);
      
  //     yPos += 8;
  //     doc.text("पत्ता : प्रभाग समिती (अ)", 15, yPos);
      
  //     yPos += 8;
  //     doc.text("माल : विद्युत विभाग", 15, yPos);
      
  //     yPos += 8;
  //     doc.text("मागणी पुस्तकाचा संदर्भ : लेखा शिर्ष विद्यावती विभाग विद्युत देयक", 15, yPos);
  
  //     // Calculate total amount for current month/year
  //     const totalAmount = rows
  //       .filter(row => row.monthAndYear === selectedMonthYear)
  //       .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);
  
  //     // Add table
  //     yPos += 10;
  //     doc.autoTable({
  //       startY: yPos,
  //       head: [[
  //         'अनु.\nक्रमांक',
  //         'कामाचा किंवा वस्तूंचा तपशील',
  //         'परिमाण\nकिंवा वजन',
  //         'दर',
  //         'युनिट',
  //         'रक्कम\nरु.    पै.'
  //       ]],
  //       body: [[
  //         '१',
  //         `वसई विरार शहर महानगरपालिका कार्यक्षेत्रातील प्रभाग समिती (अ) विभागातील विरार पश्चिम विभागाचे म.रा.वि.वि. कंपनीचे माहे ${selectedMonthYear} चे विद्युत देयक.`,
  //         '',
  //         '',
  //         '',
  //         `${totalAmount.toFixed(2)}/-`
  //       ]],
  //       styles: {
  //         font: 'NotoSerifDevanagari',
  //         fontSize: 10,
  //         cellPadding: 2,
  //       },
  //       columnStyles: {
  //         0: { cellWidth: 15 },
  //         1: { cellWidth: 90 },
  //         2: { cellWidth: 20 },
  //         3: { cellWidth: 15 },
  //         4: { cellWidth: 15 },
  //         5: { cellWidth: 25 }
  //       },
  //       theme: 'plain',
  //       tableLineWidth: 0.1,
  //       tableLineColor: [0, 0, 0]
  //     });
  
  //     // Add total section at bottom
  //     yPos = doc.autoTable.previous.finalY + 15;
      
  //     // Add total in words
  //     doc.setFontSize(10);
  //     doc.text(`एकूण रक्कम रुपये (अक्षरी ${totalAmount.toFixed(2)}/-) मात्र`, 15, yPos);
      
  //     yPos += 15;
  //     // Add breakdown lines
  //     doc.text("१) रक्कमेचे नियम वाट्य _______________ रु.", 15, yPos);
  //     yPos += 8;
  //     doc.text("२) पूर्वीचा खर्च _______________ रु.", 15, yPos);
  //     yPos += 8;
  //     doc.text(`३) या बिलांत दर्शविलेला खर्च ${totalAmount.toFixed(2)}/-`, 15, yPos);
  //     yPos += 8;
  //     doc.text("२ व ३ यांची बेरीज _______________ रु.", 15, yPos);
  //     yPos += 8;
  //     doc.text("उपलब्ध शिल्लक _______________ रु.", 15, yPos);
  
  //     // Add certification text
  //     yPos += 15;
  //     doc.setFontSize(9);
  //     const certText = [
  //       "प्रमाणित करण्यांत येते की या बिलांत दर्शविलेले दर व",
  //       "परिमाणे ही अचूक आहेत आणि सामुग्री, वस्तु यांच्या",
  //       "स्थितीत मिळाल्या असून त्या पुरवठादार यांच्या",
  //       "संख्यात्मक लेख्याच्या समर्थित पुरवठा नोंदवहीत नमूद",
  //       "करण्यात आल्या आहेत."
  //     ];
      
  //     certText.forEach(line => {
  //       doc.text(line, 100, yPos);
  //       yPos += 5;
  //     });
  
  //     // Add signature line
  //     yPos += 10;
  //     doc.text("दिनांक", 15, yPos);
  //     doc.text("वस्तु पुरवठा अधिकाऱ्याची सही", 140, yPos);
  
  //     doc.save('form22-report.pdf');
  //   } catch (error) {
  //     console.error('Error generating Form 22 PDF:', error);
  //   }
  // };
  
//  ====================================================================== 
// const handleDownloadForm22 = () => {
//   try {
//     // Create PDF in portrait mode
//     const doc = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     // Add Devanagari font
//     doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
//     doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
//     loadDevanagariFont(doc);
//     doc.setFont("NotoSerifDevanagari");

//     // Set initial positions
//     let yPos = 15;

//     // Add header text
//     doc.setFontSize(10);
//     doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
//     doc.text("M.S.C. 22", 170, yPos);
    
//     yPos += 20;
//     doc.setFontSize(12);
//     doc.text("नमुना नं. २२", 85, yPos);
    
//     yPos += 8;
//     doc.text("(नियम २२ (१))", 85, yPos);
    
//     yPos += 10;
//     doc.setFontSize(14);
//     doc.text("वसई विरार शहर महानगरपालिका", 65, yPos);

//     yPos += 15;
//     doc.setFontSize(11);

//     // Add form details with lines
//     doc.text("बिल क्रमांक:", 15, yPos);
//     doc.line(40, yPos, 100, yPos);

//     doc.text("प्रमाणक क्रमांक:", 105, yPos);
//     doc.line(140, yPos, 170, yPos);

//     const currentDate = new Date().toLocaleDateString('en-IN');
//     doc.text(`दिनांक ${currentDate}`, 150, yPos);

//     yPos += 10;
//     doc.text("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी", 15, yPos);

//     yPos += 8;
//     doc.text("पत्ता : प्रभाग समिती (अ)", 15, yPos);

//     yPos += 8;
//     doc.text("माल : विद्युत विभाग", 15, yPos);

//     yPos += 8;
//     doc.text("मागणी पुस्तकाचा संदर्भ : लेखा शिर्ष विद्यावती विभाग विद्युत देयक", 15, yPos);

//     // Calculate total amount for current month/year
//     // (Assuming you have rows and selectedMonthYear from context or props)
//     const totalAmount = rows
//       .filter(row => row.monthAndYear === selectedMonthYear)
//       .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);

//     // Add table
//     yPos += 10;
//     doc.autoTable({
//       startY: yPos,
//       head: [[
//         'अनु.\nक्रमांक',
//         'कामाचा किंवा वस्तूंचा तपशील',
//         'परिमाण\nकिंवा वजन',
//         'दर',
//         'युनिट',
//         'रक्कम\nरु.    पै.'
//       ]],
//       body: [[
//         '१',
//         `वसई विरार शहर महानगरपालिका कार्यक्षेत्रातील प्रभाग समिती (अ) विभागातील विरार पश्चिम विभागाचे म.रा.वि.वि. कंपनीचे माहे ${selectedMonthYear} चे विद्युत देयक.`,
//         '',
//         '',
//         '',
//         `${totalAmount.toFixed(2)}/-`
//       ]],
//       styles: {
//         font: 'NotoSerifDevanagari',
//         fontSize: 10,
//         cellPadding: 2,
//       },
//       headerStyles: {
//         fillColor: [255, 255, 255],  // White background to remove colored header
//         textColor: 0
//       },
//       columnStyles: {
//         0: { cellWidth: 15 },
//         1: { cellWidth: 90 },
//         2: { cellWidth: 20 },
//         3: { cellWidth: 15 },
//         4: { cellWidth: 15 },
//         5: { cellWidth: 25 }
//       },
//       theme: 'grid',              // Use 'grid' to get vertical & horizontal lines
//       tableLineWidth: 0.1,
//       tableLineColor: [0, 0, 0]
//     });

//     // Add total section at bottom
//     yPos = doc.autoTable.previous.finalY + 15;

//     // Add total in words
//     doc.setFontSize(10);
//     doc.text(`एकूण रक्कम रुपये (अक्षरी ${totalAmount.toFixed(2)}/-) मात्र`, 15, yPos);

//     yPos += 15;
//     // Add breakdown lines
//     doc.text("१) रक्कमेचे नियम वाट्य _______________ रु.", 15, yPos);
//     yPos += 8;
//     doc.text("२) पूर्वीचा खर्च _______________ रु.", 15, yPos);
//     yPos += 8;
//     doc.text(`३) या बिलांत दर्शविलेला खर्च ${totalAmount.toFixed(2)}/-`, 15, yPos);
//     yPos += 8;
//     doc.text("२ व ३ यांची बेरीज _______________ रु.", 15, yPos);
//     yPos += 8;
//     doc.text("उपलब्ध शिल्लक _______________ रु.", 15, yPos);

//     // Add certification text
//     yPos += 15;
//     doc.setFontSize(9);
//     const certText = [
//       "प्रमाणित करण्यांत येते की या बिलांत दर्शविलेले दर व",
//       "परिमाणे ही अचूक आहेत आणि सामुग्री, वस्तु यांच्या",
//       "स्थितीत मिळाल्या असून त्या पुरवठादार यांच्या",
//       "संख्यात्मक लेख्याच्या समर्थित पुरवठा नोंदवहीत नमूद",
//       "करण्यात आल्या आहेत."
//     ];
    
//     certText.forEach(line => {
//       doc.text(line, 100, yPos);
//       yPos += 5;
//     });

//     // Add signature line
//     yPos += 10;
//     doc.text("दिनांक", 15, yPos);
//     doc.text("वस्तु पुरवठा अधिकाऱ्याची सही", 140, yPos);

//     // Finally, save the PDF
//     doc.save('form22-report.pdf');
//   } catch (error) {
//     console.error('Error generating Form 22 PDF:', error);
//   }
// };
  // ====================================================================
  // const handleDownloadForm22 = () => {
  //   try {
  //     // Create PDF in portrait mode
  //     const doc = new jsPDF({
  //       orientation: 'portrait',
  //       unit: 'mm',
  //       format: 'a4'
  //     });
  
  //     // Add Devanagari font
  //     doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
  //     doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
  //     loadDevanagariFont(doc);
  //     doc.setFont("NotoSerifDevanagari");
  
  //     // Set initial positions
  //     let yPos = 15;
  
  //     // Add header text
  //     doc.setFontSize(10);
  //     doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
  //     doc.text("M.S.C. 22", 170, yPos);
      
  //     yPos += 20;
  //     doc.setFontSize(12);
  //     doc.text("नमुना नं. २२", 85, yPos);
      
  //     yPos += 8;
  //     doc.text("(नियम २२ (१))", 85, yPos);
      
  //     yPos += 10;
  //     doc.setFontSize(14);
  //     doc.text("वसई विरार शहर महानगरपालिका", 65, yPos);
  
  //     yPos += 15;
  //     doc.setFontSize(11);
  
  //     // Add form details with lines
  //     doc.text("बिल क्रमांक:", 15, yPos);
  //     doc.line(40, yPos, 100, yPos);
  
  //     doc.text("प्रमाणक क्रमांक:", 105, yPos);
  //     doc.line(140, yPos, 170, yPos);
  
  //     const currentDate = new Date().toLocaleDateString('en-IN');
  //     doc.text(`दिनांक ${currentDate}`, 150, yPos);
  
  //     yPos += 10;
  //     doc.text("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी", 15, yPos);
  
  //     yPos += 8;
  //     doc.text("पत्ता : प्रभाग समिती (अ)", 15, yPos);
  
  //     yPos += 8;
  //     doc.text("माल : विद्युत विभाग", 15, yPos);
  
  //     yPos += 8;
  //     doc.text("मागणी पुस्तकाचा संदर्भ : लेखा शिर्ष विद्यावती विभाग विद्युत देयक", 15, yPos);
  
  //     // Calculate total amount for current month/year
  //     // (Assuming you have rows and selectedMonthYear from context or props)
  //     const totalAmount = rows
  //       .filter(row => row.monthAndYear === selectedMonthYear)
  //       .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);
  
  //     // Add table
  //     yPos += 10;
  //     doc.autoTable({
  //       startY: yPos,
  //       head: [[
  //         'अनु.\nक्रमांक',
  //         'कामाचा किंवा वस्तूंचा तपशील',
  //         'परिमाण\nकिंवा वजन',
  //         'दर',
  //         'युनिट',
  //         'रक्कम\nरु.    पै.'
  //       ]],
  //       body: [[
  //         '१',
  //         `वसई विरार शहर महानगरपालिका कार्यक्षेत्रातील प्रभाग समिती (अ) विभागातील विरार पश्चिम विभागाचे म.रा.वि.वि. कंपनीचे माहे ${selectedMonthYear} चे विद्युत देयक.`,
  //         '',
  //         '',
  //         '',
  //         `${totalAmount.toFixed(2)}/-`
  //       ]],
  //       styles: {
  //         font: 'NotoSerifDevanagari',
  //         fontSize: 10,
  //         cellPadding: 2,
  //       },
  //       headerStyles: {
  //         fillColor: [255, 255, 255],  // White background to remove colored header
  //         textColor: 0
  //       },
  //       columnStyles: {
  //         0: { cellWidth: 15 },
  //         1: { cellWidth: 90 },
  //         2: { cellWidth: 20 },
  //         3: { cellWidth: 15 },
  //         4: { cellWidth: 15 },
  //         5: { cellWidth: 25 }
  //       },
  //       theme: 'grid',              // Use 'grid' to get vertical & horizontal lines
  //       tableLineWidth: 0.1,
  //       tableLineColor: [0, 0, 0]
  //     });
  
  //     // Add total section at bottom
  //     yPos = doc.autoTable.previous.finalY + 15;
  
  //     // Add total in words
  //     doc.setFontSize(10);
  //     doc.text(`एकूण रक्कम रुपये (अक्षरी ${totalAmount.toFixed(2)}/-) मात्र`, 15, yPos);
  
  //     yPos += 15;
  //     // Add breakdown lines
  //     doc.text("१) रक्कमेचे नियम वाट्य _______________ रु.", 15, yPos);
  //     yPos += 8;
  //     doc.text("२) पूर्वीचा खर्च _______________ रु.", 15, yPos);
  //     yPos += 8;
  //     doc.text(`३) या बिलांत दर्शविलेला खर्च ${totalAmount.toFixed(2)}/-`, 15, yPos);
  //     yPos += 8;
  //     doc.text("२ व ३ यांची बेरीज _______________ रु.", 15, yPos);
  //     yPos += 8;
  //     doc.text("उपलब्ध शिल्लक _______________ रु.", 15, yPos);
  
  //     // Add certification text
  //     yPos += 15;
  //     doc.setFontSize(9);
  //     const certText = [
  //       "प्रमाणित करण्यांत येते की या बिलांत दर्शविलेले दर व",
  //       "परिमाणे ही अचूक आहेत आणि सामुग्री, वस्तु यांच्या",
  //       "स्थितीत मिळाल्या असून त्या पुरवठादार यांच्या",
  //       "संख्यात्मक लेख्याच्या समर्थित पुरवठा नोंदवहीत नमूद",
  //       "करण्यात आल्या आहेत."
  //     ];
      
  //     certText.forEach(line => {
  //       doc.text(line, 100, yPos);
  //       yPos += 5;
  //     });
  
  //     // Add signature line
  //     yPos += 10;
  //     doc.text("दिनांक", 15, yPos);
  //     doc.text("वस्तु पुरवठा अधिकाऱ्याची सही", 140, yPos);
  
  //     // Finally, save the PDF
  //     doc.save('form22-report.pdf');
  //   } catch (error) {
  //     console.error('Error generating Form 22 PDF:', error);
  //   }
  // };
  // --------------------------
  // const handleDownloadForm22 = () => {
  //   try {
  //     // Create PDF in portrait mode
  //     const doc = new jsPDF({
  //       orientation: 'portrait',
  //       unit: 'mm',
  //       format: 'a4'
  //     });
  
  //     // Add Devanagari font
  //     doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
  //     doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
  //     loadDevanagariFont(doc);
  //     doc.setFont("NotoSerifDevanagari");
  
  //     // Set initial positions
  //     let yPos = 15;
  
  //     // Add header text
  //     doc.setFontSize(10);
  //     doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
  //     doc.text("M.S.C. 22", 170, yPos);
      
  //     yPos += 20;
  //     doc.setFontSize(12);
  //     doc.text("नमुना नं. २२", 85, yPos);
      
  //     yPos += 8;
  //     doc.text("(नियम २२ (१))", 85, yPos);
      
  //     yPos += 10;
  //     doc.setFontSize(14);
  //     doc.text("वसई विरार शहर महानगरपालिका", 65, yPos);
  
  //     yPos += 15;
  //     doc.setFontSize(11);
  
  //     // Add form details with lines
  //     doc.text("बिल क्रमांक:", 15, yPos);
  //     doc.line(40, yPos, 100, yPos);
  
  //     doc.text("प्रमाणक क्रमांक:", 105, yPos);
  //     doc.line(140, yPos, 170, yPos);
  
  //     const currentDate = new Date().toLocaleDateString('en-IN');
  //     doc.text(`दिनांक ${currentDate}`, 150, yPos);
  
  //     yPos += 10;
  //     doc.text("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी", 15, yPos);
  
  //     yPos += 8;
  //     doc.text("पत्ता : प्रभाग समिती (अ)", 15, yPos);
  
  //     yPos += 8;
  //     doc.text("माल : विद्युत विभाग", 15, yPos);
  
  //     yPos += 8;
  //     doc.text("मागणी पुस्तकाचा संदर्भ : लेखा शिर्ष विद्यावती विभाग विद्युत देयक", 15, yPos);
  
  //     // Calculate total amount for current month/year
  //     // (Assuming you have rows and selectedMonthYear from context or props)
  //     const totalAmount = rows
  //       .filter(row => row.monthAndYear === selectedMonthYear)
  //       .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);
  
  //     // Add table
  //     yPos += 10;
  //     doc.autoTable({
  //       startY: yPos,
  //       head: [[
  //         'अनु.\nक्रमांक',
  //         'कामाचा किंवा वस्तूंचा तपशील',
  //         'परिमाण\nकिंवा वजन',
  //         'दर',
  //         'युनिट',
  //         'रक्कम\nरु.    पै.'
  //       ]],
  //       body: [[
  //         '१',
  //         `वसई विरार शहर महानगरपालिका कार्यक्षेत्रातील प्रभाग समिती (अ) विभागातील विरार पश्चिम विभागाचे म.रा.वि.वि. कंपनीचे माहे ${selectedMonthYear} चे विद्युत देयक.`,
  //         '',
  //         '',
  //         '',
  //         `${totalAmount.toFixed(2)}/-`
  //       ]],
  //       styles: {
  //         font: 'NotoSerifDevanagari',
  //         fontSize: 10,
  //         cellPadding: 2,
  //       },
  //       headerStyles: {
  //         fillColor: [255, 255, 255],  // White background
  //         textColor: 0,
  //         lineWidth: 0.1,             // Add line width for header borders
  //         lineColor: [0, 0, 0]          // Add line color for header borders
  //       },
  //       columnStyles: {
  //         0: { cellWidth: 15 },
  //         1: { cellWidth: 90 },
  //         2: { cellWidth: 20 },
  //         3: { cellWidth: 15 },
  //         4: { cellWidth: 15 },
  //         5: { cellWidth: 25 }
  //       },
  //       theme: 'grid',              // 'grid' ensures borders on every cell
  //       tableLineWidth: 0.1,
  //       tableLineColor: [0, 0, 0]
  //     });
  
  //     // Add total section at bottom
  //     yPos = doc.autoTable.previous.finalY + 15;
  
  //     // Add total in words
  //     doc.setFontSize(10);
  //     doc.text(`एकूण रक्कम रुपये (अक्षरी ${totalAmount.toFixed(2)}/-) मात्र`, 15, yPos);
  
  //     yPos += 15;
  //     // Add breakdown lines
  //     doc.text("१) रक्कमेचे नियम वाट्य _______________ रु.", 15, yPos);
  //     yPos += 8;
  //     doc.text("२) पूर्वीचा खर्च _______________ रु.", 15, yPos);
  //     yPos += 8;
  //     doc.text(`३) या बिलांत दर्शविलेला खर्च ${totalAmount.toFixed(2)}/-`, 15, yPos);
  //     yPos += 8;
  //     doc.text("२ व ३ यांची बेरीज _______________ रु.", 15, yPos);
  //     yPos += 8;
  //     doc.text("उपलब्ध शिल्लक _______________ रु.", 15, yPos);
  
  //     // Add certification text
  //     yPos += 15;
  //     doc.setFontSize(9);
  //     const certText = [
  //       "प्रमाणित करण्यांत येते की या बिलांत दर्शविलेले दर व",
  //       "परिमाणे ही अचूक आहेत आणि सामुग्री, वस्तु यांच्या",
  //       "स्थितीत मिळाल्या असून त्या पुरवठादार यांच्या",
  //       "संख्यात्मक लेख्याच्या समर्थित पुरवठा नोंदवहीत नमूद",
  //       "करण्यात आल्या आहेत."
  //     ];
      
  //     certText.forEach(line => {
  //       doc.text(line, 100, yPos);
  //       yPos += 5;
  //     });
  
  //     // Add signature line
  //     yPos += 10;
  //     doc.text("दिनांक", 15, yPos);
  //     doc.text("वस्तु पुरवठा अधिकाऱ्याची सही", 140, yPos);
  
  //     // Finally, save the PDF
  //     doc.save('form22-report.pdf');
  //   } catch (error) {
  //     console.error('Error generating Form 22 PDF:', error);
  //   }
  // };
  // --------------------------------------------------------
  // const handleDownloadForm22 = () => {
  //   try {
  //     // Create PDF in portrait mode
  //     const doc = new jsPDF({
  //       orientation: 'portrait',
  //       unit: 'mm',
  //       format: 'a4'
  //     });
  
  //     // Add Devanagari font
  //     doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
  //     doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
  //     loadDevanagariFont(doc);
  //     doc.setFont("NotoSerifDevanagari");
  
  //     // Set initial positions
  //     let yPos = 15;
  
  //     // Add header text
  //     doc.setFontSize(10);
  //     doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
  //     doc.text("M.S.C. 22", 170, yPos);
      
  //     yPos += 20;
  //     doc.setFontSize(12);
  //     doc.text("नमुना नं. २२", 85, yPos);
      
  //     yPos += 8;
  //     doc.text("(नियम २२ (१))", 85, yPos);
      
  //     yPos += 10;
  //     doc.setFontSize(14);
  //     doc.text("वसई विरार शहर महानगरपालिका", 65, yPos);
  
  //     yPos += 15;
  //     doc.setFontSize(11);
  
  //     // Add form details with lines (these lines are drawn in black by default)
  //     doc.text("बिल क्रमांक:", 15, yPos);
  //     doc.line(40, yPos, 100, yPos);
  
  //     doc.text("प्रमाणक क्रमांक:", 105, yPos);
  //     doc.line(140, yPos, 170, yPos);
  
  //     const currentDate = new Date().toLocaleDateString('en-IN');
  //     doc.text(`दिनांक ${currentDate}`, 150, yPos);
  
  //     yPos += 10;
  //     doc.text("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी", 15, yPos);
  
  //     yPos += 8;
  //     doc.text("पत्ता : प्रभाग समिती (अ)", 15, yPos);
  
  //     yPos += 8;
  //     doc.text("माल : विद्युत विभाग", 15, yPos);
  
  //     yPos += 8;
  //     doc.text("मागणी पुस्तकाचा संदर्भ : लेखा शिर्ष विद्यावती विभाग विद्युत देयक", 15, yPos);
  
  //     // Calculate total amount for current month/year
  //     // (Assuming you have rows and selectedMonthYear from context or props)
  //     const totalAmount = rows
  //       .filter(row => row.monthAndYear === selectedMonthYear)
  //       .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);
  
  //     // Add table with all borders in black
  //     yPos += 10;
  //     doc.autoTable({
  //       startY: yPos,
  //       head: [[
  //         'अनु.\nक्रमांक',
  //         'कामाचा किंवा वस्तूंचा तपशील',
  //         'परिमाण\nकिंवा वजन',
  //         'दर',
  //         'युनिट',
  //         'रक्कम\nरु.    पै.'
  //       ]],
  //       body: [[
  //         '१',
  //         `वसई विरार शहर महानगरपालिका कार्यक्षेत्रातील प्रभाग समिती (अ) विभागातील विरार पश्चिम विभागाचे म.रा.वि.वि. कंपनीचे माहे ${selectedMonthYear} चे विद्युत देयक.`,
  //         '',
  //         '',
  //         '',
  //         `${totalAmount.toFixed(2)}/-`
  //       ]],
  //       styles: {
  //         font: 'NotoSerifDevanagari',
  //         fontSize: 10,
  //         cellPadding: 2,
  //       },
  //       headerStyles: {
  //         fillColor: [255, 255, 255],  // White background for header
  //         textColor: 0,                // Black text
  //         lineWidth: 0.1,              // Border line width
  //         lineColor: [0, 0, 0]         // Black borders
  //       },
  //       columnStyles: {
  //         0: { cellWidth: 15 },
  //         1: { cellWidth: 90 },
  //         2: { cellWidth: 20 },
  //         3: { cellWidth: 15 },
  //         4: { cellWidth: 15 },
  //         5: { cellWidth: 25 }
  //       },
  //       theme: 'grid',                 // 'grid' ensures borders for every cell
  //       tableLineWidth: 0.1,
  //       tableLineColor: [0, 0, 0]        // Black borders for table
  //     });
  
  //     // Add total section at bottom
  //     yPos = doc.autoTable.previous.finalY + 15;
  
  //     // Add total in words
  //     doc.setFontSize(10);
  //     doc.text(`एकूण रक्कम रुपये (अक्षरी ${totalAmount.toFixed(2)}/-) मात्र`, 15, yPos);
  
  //     yPos += 15;
  //     // Add breakdown lines
  //     doc.text("१) रक्कमेचे नियम वाट्य _______________ रु.", 15, yPos);
  //     yPos += 8;
  //     doc.text("२) पूर्वीचा खर्च _______________ रु.", 15, yPos);
  //     yPos += 8;
  //     doc.text(`३) या बिलांत दर्शविलेला खर्च ${totalAmount.toFixed(2)}/-`, 15, yPos);
  //     yPos += 8;
  //     doc.text("२ व ३ यांची बेरीज _______________ रु.", 15, yPos);
  //     yPos += 8;
  //     doc.text("उपलब्ध शिल्लक _______________ रु.", 15, yPos);
  
  //     // Add certification text
  //     yPos += 15;
  //     doc.setFontSize(9);
  //     const certText = [
  //       "प्रमाणित करण्यांत येते की या बिलांत दर्शविलेले दर व",
  //       "परिमाणे ही अचूक आहेत आणि सामुग्री, वस्तु यांच्या",
  //       "स्थितीत मिळाल्या असून त्या पुरवठादार यांच्या",
  //       "संख्यात्मक लेख्याच्या समर्थित पुरवठा नोंदवहीत नमूद",
  //       "करण्यात आल्या आहेत."
  //     ];
      
  //     certText.forEach(line => {
  //       doc.text(line, 100, yPos);
  //       yPos += 5;
  //     });
  
  //     // Add signature line
  //     yPos += 10;
  //     doc.text("दिनांक", 15, yPos);
  //     doc.text("वस्तु पुरवठा अधिकाऱ्याची सही", 140, yPos);
  
  //     // Finally, save the PDF
  //     doc.save('form22-report.pdf');
  //   } catch (error) {
  //     console.error('Error generating Form 22 PDF:', error);
  //   }
  // };
//  ----------------------------------------------------------------- 
// const handleDownloadForm22 = () => {
//   try {
//     // Create PDF in portrait mode
//     const doc = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     // Add Devanagari font
//     doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
//     doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
//     loadDevanagariFont(doc);
//     doc.setFont("NotoSerifDevanagari");

//     // Set initial positions
//     let yPos = 15;

//     // Add header text
//     doc.setFontSize(10);
//     doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
//     doc.text("M.S.C. 22", 170, yPos);
    
//     yPos += 20;
//     doc.setFontSize(12);
//     doc.text("नमुना नं. २२", 85, yPos);
    
//     yPos += 8;
//     doc.text("(नियम २२ (१))", 85, yPos);
    
//     yPos += 10;
//     doc.setFontSize(14);
//     doc.text("वसई विरार शहर महानगरपालिका", 65, yPos);

//     yPos += 15;
//     doc.setFontSize(11);

//     // Add form details with lines (drawn in black by default)
//     doc.text("बिल क्रमांक:", 15, yPos);
//     doc.line(40, yPos, 100, yPos);

//     doc.text("प्रमाणक क्रमांक:", 105, yPos);
//     doc.line(140, yPos, 170, yPos);

//     const currentDate = new Date().toLocaleDateString('en-IN');
//     doc.text(`दिनांक ${currentDate}`, 150, yPos);

//     yPos += 10;
//     doc.text("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी", 15, yPos);

//     yPos += 8;
//     doc.text("पत्ता : प्रभाग समिती (अ)", 15, yPos);

//     yPos += 8;
//     doc.text("माल : विद्युत विभाग", 15, yPos);

//     yPos += 8;
//     doc.text("मागणी पुस्तकाचा संदर्भ : लेखा शिर्ष विद्यावती विभाग विद्युत देयक", 15, yPos);

//     // Calculate total amount for current month/year
//     // (Assuming you have rows and selectedMonthYear from context or props)
//     const totalAmount = rows
//       .filter(row => row.monthAndYear === selectedMonthYear)
//       .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);

//     // Add table with explicit body cell border styles (vertical & horizontal in black)
//     yPos += 10;
//     doc.autoTable({
//       startY: yPos,
//       head: [[
//         'अनु.\nक्रमांक',
//         'कामाचा किंवा वस्तूंचा तपशील',
//         'परिमाण\nकिंवा वजन',
//         'दर',
//         'युनिट',
//         'रक्कम\nरु.    पै.'
//       ]],
//       body: [[
//         '१',
//         `वसई विरार शहर महानगरपालिका कार्यक्षेत्रातील प्रभाग समिती (अ) विभागातील विरार पश्चिम विभागाचे म.रा.वि.वि. कंपनीचे माहे ${selectedMonthYear} चे विद्युत देयक.`,
//         '',
//         '',
//         '',
//         `${totalAmount.toFixed(2)}/-`
//       ]],
//       styles: {
//         font: 'NotoSerifDevanagari',
//         fontSize: 10,
//         cellPadding: 2,
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]  // Ensure borders are black
//       },
//       headerStyles: {
//         fillColor: [255, 255, 255],  // White background for header
//         textColor: 0,
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]
//       },
//       bodyStyles: {
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]   // Black vertical & horizontal lines for body cells
//       },
//       columnStyles: {
//         0: { cellWidth: 15 },
//         1: { cellWidth: 90 },
//         2: { cellWidth: 20 },
//         3: { cellWidth: 15 },
//         4: { cellWidth: 15 },
//         5: { cellWidth: 25 }
//       },
//       theme: 'grid',              // Grid theme draws borders for every cell
//       tableLineWidth: 0.1,
//       tableLineColor: [0, 0, 0]
//     });

//     // Add total section at bottom
//     yPos = doc.autoTable.previous.finalY + 15;

//     // Add total in words
//     doc.setFontSize(10);
//     doc.text(`एकूण रक्कम रुपये (अक्षरी ${totalAmount.toFixed(2)}/-) मात्र`, 15, yPos);

//     yPos += 15;
//     // Add breakdown lines
//     doc.text("१) रक्कमेचे नियम वाट्य _______________ रु.", 15, yPos);
//     yPos += 8;
//     doc.text("२) पूर्वीचा खर्च _______________ रु.", 15, yPos);
//     yPos += 8;
//     doc.text(`३) या बिलांत दर्शविलेला खर्च ${totalAmount.toFixed(2)}/-`, 15, yPos);
//     yPos += 8;
//     doc.text("२ व ३ यांची बेरीज _______________ रु.", 15, yPos);
//     yPos += 8;
//     doc.text("उपलब्ध शिल्लक _______________ रु.", 15, yPos);

//     // Add certification text
//     yPos += 15;
//     doc.setFontSize(9);
//     const certText = [
//       "प्रमाणित करण्यांत येते की या बिलांत दर्शविलेले दर व",
//       "परिमाणे ही अचूक आहेत आणि सामुग्री, वस्तु यांच्या",
//       "स्थितीत मिळाल्या असून त्या पुरवठादार यांच्या",
//       "संख्यात्मक लेख्याच्या समर्थित पुरवठा नोंदवहीत नमूद",
//       "करण्यात आल्या आहेत."
//     ];
    
//     certText.forEach(line => {
//       doc.text(line, 100, yPos);
//       yPos += 5;
//     });

//     // Add signature line
//     yPos += 10;
//     doc.text("दिनांक", 15, yPos);
//     doc.text("वस्तु पुरवठा अधिकाऱ्याची सही", 140, yPos);

//     // Finally, save the PDF
//     doc.save('form22-report.pdf');
//   } catch (error) {
//     console.error('Error generating Form 22 PDF:', error);
//   }
// };
// ----------------------------------------------------------
// const handleDownloadForm22 = () => {
//   try {
//     // Create PDF in portrait mode
//     const doc = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     // Add Devanagari font
//     doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
//     doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
//     loadDevanagariFont(doc);
//     doc.setFont("NotoSerifDevanagari");

//     // Set initial positions
//     let yPos = 15;

//     // Add header text
//     doc.setFontSize(10);
//     doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
//     doc.text("M.S.C. 22", 170, yPos);
    
//     yPos += 20;
//     doc.setFontSize(12);
//     doc.text("नमुना नं. २२", 85, yPos);
    
//     yPos += 8;
//     doc.text("(नियम २२ (१))", 85, yPos);
    
//     yPos += 10;
//     doc.setFontSize(14);
//     doc.text("वसई विरार शहर महानगरपालिका", 65, yPos);

//     yPos += 15;
//     doc.setFontSize(11);

//     // Add form details with lines (drawn in black by default)
//     doc.text("बिल क्रमांक:", 15, yPos);
//     doc.line(40, yPos, 100, yPos);

//     doc.text("प्रमाणक क्रमांक:", 105, yPos);
//     doc.line(140, yPos, 170, yPos);

//     const currentDate = new Date().toLocaleDateString('en-IN');
//     doc.text(`दिनांक ${currentDate}`, 150, yPos);

//     yPos += 10;
//     doc.text("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी", 15, yPos);

//     yPos += 8;
//     doc.text("पत्ता : प्रभाग समिती (अ)", 15, yPos);

//     yPos += 8;
//     doc.text("माल : विद्युत विभाग", 15, yPos);

//     yPos += 8;
//     doc.text("मागणी पुस्तकाचा संदर्भ : लेखा शिर्ष विद्यावती विभाग विद्युत देयक", 15, yPos);

//     // Calculate total amount for current month/year
//     // (Assuming you have rows and selectedMonthYear from context or props)
//     const totalAmount = rows
//       .filter(row => row.monthAndYear === selectedMonthYear)
//       .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);

//     // Add table with footer to show total in the last cell
//     yPos += 10;
//     doc.autoTable({
//       startY: yPos,
//       head: [[
//         'अनु.\nक्रमांक',
//         'कामाचा किंवा वस्तूंचा तपशील',
//         'परिमाण\nकिंवा वजन',
//         'दर',
//         'युनिट',
//         'रक्कम\nरु.    पै.'
//       ]],
//       body: [[
//         '१',
//         `वसई विरार शहर महानगरपालिका कार्यक्षेत्रातील प्रभाग समिती (अ) विभागातील विरार पश्चिम विभागाचे म.रा.वि.वि. कंपनीचे माहे ${selectedMonthYear} चे विद्युत देयक.`,
//         '',
//         '',
//         '',
//         `${totalAmount.toFixed(2)}/-`
//       ]],
//       foot: [[
//         { content: 'एकूण', colSpan: 5, styles: { halign: 'right', fontStyle: 'bold' } },
//         { content: `${totalAmount.toFixed(2)}/-`, styles: { halign: 'right', fontStyle: 'bold' } }
//       ]],
//       styles: {
//         font: 'NotoSerifDevanagari',
//         fontSize: 10,
//         cellPadding: 2,
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]  // Black borders for all cells
//       },
//       headerStyles: {
//         fillColor: [255, 255, 255],  // White background for header
//         textColor: 0,
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]
//       },
//       bodyStyles: {
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]   // Black vertical & horizontal lines for body cells
//       },
//       columnStyles: {
//         0: { cellWidth: 15 },
//         1: { cellWidth: 90 },
//         2: { cellWidth: 20 },
//         3: { cellWidth: 15 },
//         4: { cellWidth: 15 },
//         5: { cellWidth: 25 }
//       },
//       theme: 'grid',              // Grid theme draws borders for every cell
//       tableLineWidth: 0.1,
//       tableLineColor: [0, 0, 0]
//     });

//     // Add total section at bottom
//     yPos = doc.autoTable.previous.finalY + 15;

//     // Add total in words
//     doc.setFontSize(10);
//     doc.text(`एकूण रक्कम रुपये (अक्षरी ${totalAmount.toFixed(2)}/-) मात्र`, 15, yPos);

//     yPos += 15;
//     // Add breakdown lines
//     doc.text("१) रक्कमेचे नियम वाट्य _______________ रु.", 15, yPos);
//     yPos += 8;
//     doc.text("२) पूर्वीचा खर्च _______________ रु.", 15, yPos);
//     yPos += 8;
//     doc.text(`३) या बिलांत दर्शविलेला खर्च ${totalAmount.toFixed(2)}/-`, 15, yPos);
//     yPos += 8;
//     doc.text("२ व ३ यांची बेरीज _______________ रु.", 15, yPos);
//     yPos += 8;
//     doc.text("उपलब्ध शिल्लक _______________ रु.", 15, yPos);

//     // Add certification text
//     yPos += 15;
//     doc.setFontSize(9);
//     const certText = [
//       "प्रमाणित करण्यांत येते की या बिलांत दर्शविलेले दर व",
//       "परिमाणे ही अचूक आहेत आणि सामुग्री, वस्तु यांच्या",
//       "स्थितीत मिळाल्या असून त्या पुरवठादार यांच्या",
//       "संख्यात्मक लेख्याच्या समर्थित पुरवठा नोंदवहीत नमूद",
//       "करण्यात आल्या आहेत."
//     ];
    
//     certText.forEach(line => {
//       doc.text(line, 100, yPos);
//       yPos += 5;
//     });

//     // Add signature line
//     yPos += 10;
//     doc.text("दिनांक", 15, yPos);
//     doc.text("वस्तु पुरवठा अधिकाऱ्याची सही", 140, yPos);

//     // Finally, save the PDF
//     doc.save('form22-report.pdf');
//   } catch (error) {
//     console.error('Error generating Form 22 PDF:', error);
//   }
// };
// ----------------------------------------------------------
// const handleDownloadForm22 = () => {
//   try {
//     // Create PDF in portrait mode
//     const doc = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     // Add Devanagari font
//     doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
//     doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
//     loadDevanagariFont(doc);
//     doc.setFont("NotoSerifDevanagari");

//     // Set initial positions
//     let yPos = 15;

//     // Add header text
//     doc.setFontSize(10);
//     doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
//     doc.text("M.S.C. 22", 170, yPos);
    
//     yPos += 20;
//     doc.setFontSize(12);
//     doc.text("नमुना नं. २२", 85, yPos);
    
//     yPos += 8;
//     doc.text("(नियम २२ (१))", 85, yPos);
    
//     yPos += 10;
//     doc.setFontSize(14);
//     doc.text("वसई विरार शहर महानगरपालिका", 65, yPos);

//     yPos += 15;
//     doc.setFontSize(11);

//     // Add form details with lines (drawn in black by default)
//     doc.text("बिल क्रमांक:", 15, yPos);
//     doc.line(40, yPos, 100, yPos);

//     doc.text("प्रमाणक क्रमांक:", 105, yPos);
//     doc.line(140, yPos, 170, yPos);

//     const currentDate = new Date().toLocaleDateString('en-IN');
//     doc.text(`दिनांक ${currentDate}`, 150, yPos);

//     yPos += 10;
//     doc.text("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी", 15, yPos);

//     yPos += 8;
//     doc.text("पत्ता : प्रभाग समिती (अ)", 15, yPos);

//     yPos += 8;
//     doc.text("माल : विद्युत विभाग", 15, yPos);

//     yPos += 8;
//     doc.text("मागणी पुस्तकाचा संदर्भ : लेखा शिर्ष विद्यावती विभाग विद्युत देयक", 15, yPos);

//     // Calculate total amount for current month/year
//     // (Assuming you have rows and selectedMonthYear from context or props)
//     const totalAmount = rows
//       .filter(row => row.monthAndYear === selectedMonthYear)
//       .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);

//     // Add table with footer to show total in the last cell
//     yPos += 10;
//     doc.autoTable({
//       startY: yPos,
//       head: [[
//         'अनु.\nक्रमांक',
//         'कामाचा किंवा वस्तूंचा तपशील',
//         'परिमाण\nकिंवा वजन',
//         'दर',
//         'युनिट',
//         'रक्कम\nरु.    पै.'
//       ]],
//       body: [[
//         '१',
//         `वसई विरार शहर महानगरपालिका कार्यक्षेत्रातील प्रभाग समिती (अ) विभागातील विरार पश्चिम विभागाचे म.रा.वि.वि. कंपनीचे माहे ${selectedMonthYear} चे विद्युत देयक.`,
//         '',
//         '',
//         '',
//         `${totalAmount.toFixed(2)}/-`
//       ]],
//       foot: [[
//         { content: 'एकूण', colSpan: 5, styles: { halign: 'right', fontStyle: 'bold' } },
//         { content: `${totalAmount.toFixed(2)}/-`, styles: { halign: 'right', fontStyle: 'bold' } }
//       ]],
//       styles: {
//         font: 'NotoSerifDevanagari',
//         fontSize: 10,
//         cellPadding: 2,
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]  // Black borders for all cells
//       },
//       headerStyles: {
//         fillColor: [255, 255, 255],  // White background for header
//         textColor: 0,
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]
//       },
//       bodyStyles: {
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]   // Black vertical & horizontal lines for body cells
//       },
//       footStyles: {
//         fillColor: [255, 255, 255],  // White background for footer row (removes bottom color)
//         textColor: 0,
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]
//       },
//       columnStyles: {
//         0: { cellWidth: 15 },
//         1: { cellWidth: 90 },
//         2: { cellWidth: 20 },
//         3: { cellWidth: 15 },
//         4: { cellWidth: 15 },
//         5: { cellWidth: 25 }
//       },
//       theme: 'grid',              // Grid theme draws borders for every cell
//       tableLineWidth: 0.1,
//       tableLineColor: [0, 0, 0]
//     });

//     // Add total section at bottom
//     yPos = doc.autoTable.previous.finalY + 15;

//     // Add total in words
//     doc.setFontSize(10);
//     doc.text(`एकूण रक्कम रुपये (अक्षरी ${totalAmount.toFixed(2)}/-) मात्र`, 15, yPos);

//     yPos += 15;
//     // Add breakdown lines
//     doc.text("१) रक्कमेचे नियम वाट्य _______________ रु.", 15, yPos);
//     yPos += 8;
//     doc.text("२) पूर्वीचा खर्च _______________ रु.", 15, yPos);
//     yPos += 8;
//     doc.text(`३) या बिलांत दर्शविलेला खर्च ${totalAmount.toFixed(2)}/-`, 15, yPos);
//     yPos += 8;
//     doc.text("२ व ३ यांची बेरीज _______________ रु.", 15, yPos);
//     yPos += 8;
//     doc.text("उपलब्ध शिल्लक _______________ रु.", 15, yPos);

//     // Add certification text
//     yPos += 15;
//     doc.setFontSize(9);
//     const certText = [
//       "प्रमाणित करण्यांत येते की या बिलांत दर्शविलेले दर व",
//       "परिमाणे ही अचूक आहेत आणि सामुग्री, वस्तु यांच्या",
//       "स्थितीत मिळाल्या असून त्या पुरवठादार यांच्या",
//       "संख्यात्मक लेख्याच्या समर्थित पुरवठा नोंदवहीत नमूद",
//       "करण्यात आल्या आहेत."
//     ];
    
//     certText.forEach(line => {
//       doc.text(line, 100, yPos);
//       yPos += 5;
//     });

//     // Add signature line
//     yPos += 10;
//     doc.text("दिनांक", 15, yPos);
//     doc.text("वस्तु पुरवठा अधिकाऱ्याची सही", 140, yPos);

//     // Finally, save the PDF
//     doc.save('form22-report.pdf');
//   } catch (error) {
//     console.error('Error generating Form 22 PDF:', error);
//   }
// };
// ------------------------------------------------------------------
// const handleDownloadForm22 = () => {
//   try {
//     // Create PDF in portrait mode
//     const doc = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     // Add Devanagari font
//     doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
//     doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
//     loadDevanagariFont(doc);
//     doc.setFont("NotoSerifDevanagari");

//     // Set initial vertical position
//     let yPos = 15;

//     // --- Header Section ---
//     doc.setFontSize(10);
//     doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
//     doc.text("M.S.C. 22", 170, yPos);

//     yPos += 20;
//     doc.setFontSize(12);
//     doc.text("नमुना नं. २२", 85, yPos);

//     yPos += 8;
//     doc.text("(नियम २२ (१))", 85, yPos);

//     yPos += 10;
//     doc.setFontSize(14);
//     doc.text("वसई विरार शहर महानगरपालिका", 65, yPos);

//     yPos += 15;
//     doc.setFontSize(11);

//     // --- Form Details with Lines ---
//     doc.text("बिल क्रमांक:", 15, yPos);
//     doc.line(40, yPos, 100, yPos);
//     doc.text("प्रमाणक क्रमांक:", 105, yPos);
//     doc.line(140, yPos, 170, yPos);
//     const currentDate = new Date().toLocaleDateString('en-IN');
//     doc.text(`दिनांक ${currentDate}`, 150, yPos);

//     yPos += 10;
//     doc.text("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी", 15, yPos);
//     yPos += 8;
//     doc.text("पत्ता : प्रभाग समिती (अ)", 15, yPos);
//     yPos += 8;
//     doc.text("माल : विद्युत विभाग", 15, yPos);
//     yPos += 8;
//     doc.text("मागणी पुस्तकाचा संदर्भ : लेखा शिर्ष विद्यावती विभाग विद्युत देयक", 15, yPos);

//     // --- Calculate Total Amount (using rows and selectedMonthYear) ---
//     const totalAmount = rows
//       .filter(row => row.monthAndYear === selectedMonthYear)
//       .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);

//     // --- Main Table (Header, Body, Foot) ---
//     yPos += 10;
//     doc.autoTable({
//       startY: yPos,
//       head: [[
//         'अनु.\nक्रमांक',
//         'कामाचा किंवा वस्तूंचा तपशील',
//         'परिमाण\nकिंवा वजन',
//         'दर',
//         'युनिट',
//         'रक्कम\nरु.    पै.'
//       ]],
//       body: [[
//         '१',
//         `वसई विरार शहर महानगरपालिका कार्यक्षेत्रातील प्रभाग समिती (अ) विभागातील विरार पश्चिम विभागाचे माहे ${selectedMonthYear} चे विद्युत देयक.`,
//         '',
//         '',
//         '',
//         `${totalAmount.toFixed(2)}/-`
//       ]],
//       foot: [[
//         { content: 'एकूण', colSpan: 5, styles: { halign: 'right', fontStyle: 'bold' } },
//         { content: `${totalAmount.toFixed(2)}/-`, styles: { halign: 'right', fontStyle: 'bold' } }
//       ]],
//       styles: {
//         font: 'NotoSerifDevanagari',
//         fontSize: 10,
//         cellPadding: 2,
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]
//       },
//       headStyles: {
//         fillColor: [255, 255, 255],
//         textColor: 0,
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]
//       },
//       bodyStyles: {
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]
//       },
//       footStyles: {
//         fillColor: [255, 255, 255],
//         textColor: 0,
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]
//       },
//       columnStyles: {
//         0: { cellWidth: 15 },
//         1: { cellWidth: 90 },
//         2: { cellWidth: 20 },
//         3: { cellWidth: 15 },
//         4: { cellWidth: 15 },
//         5: { cellWidth: 25 }
//       },
//       theme: 'grid',
//       tableLineWidth: 0.1,
//       tableLineColor: [0, 0, 0]
//     });

//     // --- Full-Width Total Row ---
//     yPos = doc.autoTable.previous.finalY + 10;
//     doc.setFontSize(10);
//     const pageWidth = doc.internal.pageSize.getWidth();
//     doc.text(
//       `एकूण रक्कम रुपये (अक्षरी ${totalAmount.toFixed(2)}/-) मात्र`,
//       pageWidth / 2,
//       yPos,
//       { align: 'center' }
//     );

//     // --- Two-Column Row for Breakdown & Certification ---
//     // Left column: Breakdown text
//     const leftText = 
//       "१) रक्कमेचे नियम वाट्य _______________ रु.\n" +
//       "२) पूर्वीचा खर्च _______________ रु.\n" +
//       "३) या बिलांत दर्शविलेला खर्च " + totalAmount.toFixed(2) + "/-\n" +
//       "२ व ३ यांची बेरीज _______________ रु.\n" +
//       "उपलब्ध शिल्लक _______________ रु.";

//     // Right column: Certification text along with signature line
//     const rightText = 
//       "प्रमाणित करण्यांत येते की या बिलांत\n" +
//       "दर्शविलेले दर व\n" +
//       "परिमाणे ही अचूक आहेत आणि\n" +
//       "सामुग्री, वस्तु यांच्या\n" +
//       "स्थितीत मिळाल्या असून त्या पुरवठादार यांच्या\n" +
//       "संख्यात्मक लेख्याच्या समर्थित\n" +
//       "पुरवठा नोंदवहीत नमूद\n" +
//       "करण्यात आल्या आहेत.\n" +
//       "दिनांक वस्तु पुरवठा अधिकाऱ्याची सही";

//     // Calculate available width (assuming default margins of 15 mm on each side)
//     const availableWidth = pageWidth - 30;
//     const colWidth = availableWidth / 2; // 50% each

//     // Minimal gap before this row
//     yPos = doc.autoTable.previous.finalY + 5;

//     doc.autoTable({
//       startY: yPos,
//       margin: { top: 10 }, // adds 10mm top margin
//       head: false,
//       body: [[ leftText, rightText ]],
//       styles: {
//         font: 'NotoSerifDevanagari',
//         fontSize: 10,
//         cellPadding: 2
//       },
//       columnStyles: {
//         0: { cellWidth: colWidth, halign: 'left' },
//         1: { cellWidth: colWidth, halign: 'right' }
//       },
//       theme: 'plain'
//     });

//     // Draw vertical divider line between the two columns
//     const breakdownTable = doc.autoTable.previous;
//     if (
//       breakdownTable &&
//       breakdownTable.settings.margin &&
//       typeof breakdownTable.startY === "number" &&
//       typeof breakdownTable.finalY === "number"
//     ) {
//       const marginLeft = breakdownTable.settings.margin.left;
//       const verticalLineX = marginLeft + colWidth;
//       const tableTopY = breakdownTable.startY;
//       const tableBottomY = breakdownTable.finalY;
//       doc.setLineWidth(0.1);
//       doc.setDrawColor(0, 0, 0);
//       doc.line(verticalLineX, tableTopY, verticalLineX, tableBottomY);
//     }

//     // --- Save the PDF ---
//     doc.save('form22-report.pdf');
//   } catch (error) {
//     console.error('Error generating Form 22 PDF:', error);
//   }
// };

// ---------------------------------------------------------------------
// const handleDownloadForm22 = () => {
//   try {
//     // Create PDF in portrait mode
//     const doc = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     // Add Devanagari font
//     doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
//     doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
//     loadDevanagariFont(doc);
//     doc.setFont("NotoSerifDevanagari");

//     // Set initial vertical position
//     let yPos = 15;

//     // --- Header Section ---
//     doc.setFontSize(10);
//     doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
//     doc.text("M.S.C. 22", 170, yPos);

//     yPos += 20;
//     doc.setFontSize(12);
//     doc.text("नमुना नं. २२", 85, yPos);

//     yPos += 8;
//     doc.text("(नियम २२ (१))", 85, yPos);

//     yPos += 10;
//     doc.setFontSize(14);
//     doc.text("वसई विरार शहर महानगरपालिका", 65, yPos);

//     yPos += 15;
//     doc.setFontSize(11);

//     // --- Form Details with Lines ---
//     doc.text("बिल क्रमांक:", 15, yPos);
//     doc.line(40, yPos, 100, yPos);
//     doc.text("प्रमाणक क्रमांक:", 105, yPos);
//     doc.line(140, yPos, 170, yPos);
//     const currentDate = new Date().toLocaleDateString('en-IN');
//     doc.text(`दिनांक ${currentDate}`, 150, yPos);

//     yPos += 10;
//     doc.text("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी", 15, yPos);
//     yPos += 8;
//     doc.text("पत्ता : प्रभाग समिती (अ)", 15, yPos);
//     yPos += 8;
//     doc.text("माल : विद्युत विभाग", 15, yPos);
//     yPos += 8;
//     doc.text("मागणी पुस्तकाचा संदर्भ : लेखा शिर्ष विद्यावती विभाग विद्युत देयक", 15, yPos);

//     // --- Calculate Total Amount ---
//     const totalAmount = rows
//       .filter(row => row.monthAndYear === selectedMonthYear)
//       .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);

//     // --- Main Table ---
//     yPos += 10;
//     doc.autoTable({
//       startY: yPos,
//       head: [[
//         'अनु.\nक्रमांक',
//         'कामाचा किंवा वस्तूंचा तपशील',
//         'परिमाण\nकिंवा वजन',
//         'दर',
//         'युनिट',
//         'रक्कम\nरु.    पै.'
//       ]],
//       body: [[
//         '१',
//         `वसई विरार शहर महानगरपालिका कार्यक्षेत्रातील प्रभाग समिती (अ) विभागातील विरार पश्चिम विभागाचे माहे ${selectedMonthYear} चे विद्युत देयक.`,
//         '',
//         '',
//         '',
//         `${totalAmount.toFixed(2)}/-`
//       ]],
//       foot: [[
//         { content: 'एकूण', colSpan: 5, styles: { halign: 'right', fontStyle: 'bold' } },
//         { content: `${totalAmount.toFixed(2)}/-`, styles: { halign: 'right', fontStyle: 'bold' } }
//       ]],
//       styles: {
//         font: 'NotoSerifDevanagari',
//         fontSize: 10,
//         cellPadding: 2,
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]
//       },
//       headStyles: {
//         fillColor: [255, 255, 255],
//         textColor: 0,
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]
//       },
//       bodyStyles: {
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]
//       },
//       footStyles: {
//         fillColor: [255, 255, 255],
//         textColor: 0,
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]
//       },
//       columnStyles: {
//         0: { cellWidth: 15 },
//         1: { cellWidth: 90 },
//         2: { cellWidth: 20 },
//         3: { cellWidth: 15 },
//         4: { cellWidth: 15 },
//         5: { cellWidth: 25 }
//       },
//       theme: 'grid',
//       tableLineWidth: 0.1,
//       tableLineColor: [0, 0, 0]
//     });

//     // --- Full-Width Total Row ---
//     yPos = doc.autoTable.previous.finalY + 10;
//     doc.setFontSize(10);
//     const pageWidth = doc.internal.pageSize.getWidth();
//     doc.text(
//       `एकूण रक्कम रुपये (अक्षरी ${totalAmount.toFixed(2)}/-) मात्र`,
//       pageWidth / 2,
//       yPos,
//       { align: 'center' }
//     );

//     // Add extra vertical space after the full-width total row
//     yPos += 5; // Adjust this value for desired spacing

//     // --- Two-Column Row for Breakdown & Certification ---
//     // Left column: Breakdown text
//     const leftText = 
//       "१) रक्कमेचे नियम वाट्य _______________ रु.\n" +
//       "२) पूर्वीचा खर्च _______________ रु.\n" +
//       "३) या बिलांत दर्शविलेला खर्च " + totalAmount.toFixed(2) + "/-\n" +
//       "२ व ३ यांची बेरीज _______________ रु.\n" +
//       "उपलब्ध शिल्लक _______________ रु.";

//     // Right column: Certification text with signature
//     const rightText = 
//       "प्रमाणित करण्यांत येते की या बिलांत\n" +
//       "दर्शविलेले दर व\n" +
//       "परिमाणे ही अचूक आहेत आणि\n" +
//       "सामुग्री, वस्तु यांच्या\n" +
//       "स्थितीत मिळाल्या असून त्या पुरवठादार यांच्या\n" +
//       "संख्यात्मक लेख्याच्या समर्थित\n" +
//       "पुरवठा नोंदवहीत नमूद\n" +
//       "करण्यात आल्या आहेत.\n" +
//       "दिनांक वस्तु पुरवठा अधिकाऱ्याची सही";

//     // Calculate available width (assuming default margins of 15 mm on each side)
//     const availableWidth = pageWidth - 30;
//     const colWidth = availableWidth / 2; // 50% each

//     // Place the two-column row with a top margin using autoTable
//     yPos = doc.autoTable.previous.finalY + 5; // minimal gap before this row
//     doc.autoTable({
//       startY: yPos,
//       margin: { top: 10 }, // Adds extra gap above the table
//       head: false,
//       body: [[ leftText, rightText ]],
//       styles: {
//         font: 'NotoSerifDevanagari',
//         fontSize: 10,
//         cellPadding: 2
//       },
//       columnStyles: {
//         0: { cellWidth: colWidth, halign: 'left' },
//         1: { cellWidth: colWidth, halign: 'right' }
//       },
//       theme: 'plain'
//     });

//     // Draw vertical divider line between the two columns
//     const breakdownTable = doc.autoTable.previous;
//     if (
//       breakdownTable &&
//       breakdownTable.settings.margin &&
//       typeof breakdownTable.startY === "number" &&
//       typeof breakdownTable.finalY === "number"
//     ) {
//       const marginLeft = breakdownTable.settings.margin.left;
//       const verticalLineX = marginLeft + colWidth;
//       const tableTopY = breakdownTable.startY;
//       const tableBottomY = breakdownTable.finalY;
//       doc.setLineWidth(0.1);
//       doc.setDrawColor(0, 0, 0);
//       doc.line(verticalLineX, tableTopY, verticalLineX, tableBottomY);
//     }

//     // --- Save the PDF ---
//     doc.save('form22-report.pdf');
//   } catch (error) {
//     console.error('Error generating Form 22 PDF:', error);
//   }
// };

// ---------------------------------------------------------------
// const handleDownloadForm22 = () => {
//   try {
//     // Create PDF in portrait mode
//     const doc = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     // Add Devanagari font
//     doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
//     doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
//     loadDevanagariFont(doc);
//     doc.setFont("NotoSerifDevanagari");

//     // Set initial vertical position
//     let yPos = 15;

//     // --- Header Section ---
//     doc.setFontSize(10);
//     doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
//     doc.text("M.S.C. 22", 170, yPos);

//     yPos += 20;
//     doc.setFontSize(12);
//     doc.text("नमुना नं. २२", 85, yPos);

//     yPos += 8;
//     doc.text("(नियम २२ (१))", 85, yPos);

//     yPos += 10;
//     doc.setFontSize(14);
//     doc.text("वसई विरार शहर महानगरपालिका", 65, yPos);

//     yPos += 15;
//     doc.setFontSize(11);

//     // --- Form Details with Lines ---
//     doc.text("बिल क्रमांक:", 15, yPos);
//     doc.line(40, yPos, 100, yPos);
//     doc.text("प्रमाणक क्रमांक:", 105, yPos);
//     doc.line(140, yPos, 170, yPos);
//     const currentDate = new Date().toLocaleDateString('en-IN');
//     doc.text(`दिनांक ${currentDate}`, 150, yPos);

//     yPos += 10;
//     doc.text("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी", 15, yPos);
//     yPos += 8;
//     doc.text("पत्ता : प्रभाग समिती (अ)", 15, yPos);
//     yPos += 8;
//     doc.text("माल : विद्युत विभाग", 15, yPos);
//     yPos += 8;
//     doc.text("मागणी पुस्तकाचा संदर्भ : लेखा शिर्ष विद्यावती विभाग विद्युत देयक", 15, yPos);

//     // --- Calculate Total Amount ---
//     const totalAmount = rows
//       .filter(row => row.monthAndYear === selectedMonthYear)
//       .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);

//     // --- Main Table ---
//     yPos += 10;
//     doc.autoTable({
//       startY: yPos,
//       head: [[
//         'अनु.\nक्रमांक',
//         'कामाचा किंवा वस्तूंचा तपशील',
//         'परिमाण\nकिंवा वजन',
//         'दर',
//         'युनिट',
//         'रक्कम\nरु.    पै.'
//       ]],
//       body: [[
//         '१',
//         `वसई विरार शहर महानगरपालिका कार्यक्षेत्रातील प्रभाग समिती (अ) विभागातील विरार पश्चिम विभागाचे माहे ${selectedMonthYear} चे विद्युत देयक.`,
//         '',
//         '',
//         '',
//         `${totalAmount.toFixed(2)}/-`
//       ]],
//       foot: [[
//         { content: 'एकूण', colSpan: 5, styles: { halign: 'right', fontStyle: 'bold' } },
//         { content: `${totalAmount.toFixed(2)}/-`, styles: { halign: 'right', fontStyle: 'bold' } }
//       ]],
//       styles: {
//         font: 'NotoSerifDevanagari',
//         fontSize: 10,
//         cellPadding: 2,
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]
//       },
//       headStyles: {
//         fillColor: [255, 255, 255],
//         textColor: 0,
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]
//       },
//       bodyStyles: {
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]
//       },
//       footStyles: {
//         fillColor: [255, 255, 255],
//         textColor: 0,
//         lineWidth: 0.1,
//         lineColor: [0, 0, 0]
//       },
//       columnStyles: {
//         0: { cellWidth: 15 },
//         1: { cellWidth: 90 },
//         2: { cellWidth: 20 },
//         3: { cellWidth: 15 },
//         4: { cellWidth: 15 },
//         5: { cellWidth: 25 }
//       },
//       theme: 'grid',
//       tableLineWidth: 0.1,
//       tableLineColor: [0, 0, 0]
//     });

//     // --- Full-Width Total Row (Separate Row) ---
//     yPos = doc.autoTable.previous.finalY + 10;
//     doc.setFontSize(10);
//     const pageWidth = doc.internal.pageSize.getWidth();
//     doc.text(
//       `एकूण रक्कम रुपये (अक्षरी ${totalAmount.toFixed(2)}/-) मात्र`,
//       pageWidth / 2,
//       yPos,
//       { align: 'center' }
//     );
//     // Add extra gap below this row
//     yPos += 25;

//     // --- Two-Column Row for Breakdown & Certification ---
//     const leftText = 
//       "१) रक्कमेचे नियम वाट्य _______________ रु.\n" +
//       "२) पूर्वीचा खर्च _______________ रु.\n" +
//       "३) या बिलांत दर्शविलेला खर्च " + totalAmount.toFixed(2) + "/-\n" +
//       "२ व ३ यांची बेरीज _______________ रु.\n" +
//       "उपलब्ध शिल्लक _______________ रु.";
//     const rightText = 
//       "प्रमाणित करण्यांत येते की या बिलांत\n" +
//       "दर्शविलेले दर व\n" +
//       "परिमाणे ही अचूक आहेत आणि\n" +
//       "सामुग्री, वस्तु यांच्या\n" +
//       "स्थितीत मिळाल्या असून त्या पुरवठादार यांच्या\n" +
//       "संख्यात्मक लेख्याच्या समर्थित\n" +
//       "पुरवठा नोंदवहीत नमूद\n" +
//       "करण्यात आल्या आहेत.\n" +
//       "दिनांक वस्तु पुरवठा अधिकाऱ्याची सही";
//     const availableWidth = pageWidth - 30;
//     const colWidth = availableWidth / 2; // 50% each

//     // Place the two-column row with an extra top margin
//     yPos = doc.autoTable.previous.finalY + 5; // minimal gap before this row
//     doc.autoTable({
//       startY: yPos,
//       margin: { top: 10 }, // extra gap above the table row
//       head: false,
//       body: [[ leftText, rightText ]],
//       styles: {
//         font: 'NotoSerifDevanagari',
//         fontSize: 10,
//         cellPadding: 2
//       },
//       columnStyles: {
//         0: { cellWidth: colWidth, halign: 'left' },
//         1: { cellWidth: colWidth, halign: 'right' }
//       },
//       theme: 'plain'
//     });

//     // Draw vertical divider line between the two columns
//     const breakdownTable = doc.autoTable.previous;
//     if (
//       breakdownTable &&
//       breakdownTable.settings.margin &&
//       typeof breakdownTable.startY === "number" &&
//       typeof breakdownTable.finalY === "number"
//     ) {
//       const marginLeft = breakdownTable.settings.margin.left;
//       const verticalLineX = marginLeft + colWidth;
//       const tableTopY = breakdownTable.startY;
//       const tableBottomY = breakdownTable.finalY;
//       doc.setLineWidth(0.1);
//       doc.setDrawColor(0, 0, 0);
//       doc.line(verticalLineX, tableTopY, verticalLineX, tableBottomY);
//     }

//     // --- Save the PDF ---
//     doc.save('form22-report.pdf');
//   } catch (error) {
//     console.error('Error generating Form 22 PDF:', error);
//   }
// };

// -----------------------------------------------------
const handleDownloadForm22 = () => {
  try {
    // Create PDF in portrait mode
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Add Devanagari font
    doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
    doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
    loadDevanagariFont(doc);
    doc.setFont("NotoSerifDevanagari");

    // Set initial vertical position
    let yPos = 15;

    // --- Header Section ---
    doc.setFontSize(10);
    doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
    doc.text("M.S.C. 22", 170, yPos);

    yPos += 20;
    doc.setFontSize(12);
    doc.text("नमुना नं. २२", 85, yPos);

    yPos += 8;
    doc.text("(नियम २२ (१))", 85, yPos);

    yPos += 10;
    doc.setFontSize(14);
    doc.text("वसई विरार शहर महानगरपालिका", 65, yPos);

    yPos += 15;
    doc.setFontSize(11);

    // --- Form Details with Lines ---
    doc.text("बिल क्रमांक:", 15, yPos);
    doc.line(40, yPos, 100, yPos);
    doc.text("प्रमाणक क्रमांक:", 105, yPos);
    doc.line(140, yPos, 170, yPos);
    const currentDate = new Date().toLocaleDateString('en-IN');
    doc.text(`दिनांक ${currentDate}`, 150, yPos);

    yPos += 10;
    doc.text("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी", 15, yPos);
    yPos += 8;
    doc.text("पत्ता : प्रभाग समिती (अ)", 15, yPos);
    yPos += 8;
    doc.text("माल : विद्युत विभाग", 15, yPos);
    yPos += 8;
    doc.text("मागणी पुस्तकाचा संदर्भ : लेखा शिर्ष विद्यावती विभाग विद्युत देयक", 15, yPos);

    // --- Calculate Total Amount ---
    const totalAmount = rows
      .filter(row => row.monthAndYear === selectedMonthYear)
      .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);

    // --- Main Table ---
    yPos += 10;
    doc.autoTable({
      startY: yPos,
      head: [[
        'अनु.\nक्रमांक',
        'कामाचा किंवा वस्तूंचा तपशील',
        'परिमाण\nकिंवा वजन',
        'दर',
        'युनिट',
        'रक्कम\nरु.    पै.'
      ]],
      body: [[
        '१',
        `वसई विरार शहर महानगरपालिका कार्यक्षेत्रातील प्रभाग समिती (अ) विभागातील विरार पश्चिम विभागाचे माहे ${selectedMonthYear} चे विद्युत देयक.`,
        '',
        '',
        '',
        `${totalAmount.toFixed(2)}/-`
      ]],
      foot: [[
        { content: 'एकूण', colSpan: 5, styles: { halign: 'right', fontStyle: 'bold' } },
        { content: `${totalAmount.toFixed(2)}/-`, styles: { halign: 'right', fontStyle: 'bold' } }
      ]],
      styles: {
        font: 'NotoSerifDevanagari',
        fontSize: 10,
        cellPadding: 2,
        lineWidth: 0.1,
        lineColor: [0, 0, 0]
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: 0,
        lineWidth: 0.1,
        lineColor: [0, 0, 0]
      },
      bodyStyles: {
        lineWidth: 0.1,
        lineColor: [0, 0, 0]
      },
      footStyles: {
        fillColor: [255, 255, 255],
        textColor: 0,
        lineWidth: 0.1,
        lineColor: [0, 0, 0]
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 90 },
        2: { cellWidth: 20 },
        3: { cellWidth: 15 },
        4: { cellWidth: 15 },
        5: { cellWidth: 25 }
      },
      theme: 'grid',
      tableLineWidth: 0.1,
      tableLineColor: [0, 0, 0]
    });

    // --- Full-Width Total Row (Separate Row) ---
    yPos = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(10);
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.text(
      `एकूण रक्कम रुपये (अक्षरी ${totalAmount.toFixed(2)}/-) मात्र`,
      pageWidth / 2,
      yPos,
      { align: 'center' }
    );
    // Add extra gap below this row
    yPos += 25;

    // --- Two-Column Row for Breakdown & Certification ---
    const leftText = 
      "१) रक्कमेचे नियम वाट्य _______________ रु.\n" +
      "२) पूर्वीचा खर्च _______________ रु.\n" +
      "३) या बिलांत दर्शविलेला खर्च " + totalAmount.toFixed(2) + "/-\n" +
      "२ व ३ यांची बेरीज _______________ रु.\n" +
      "उपलब्ध शिल्लक _______________ रु.";
    const rightText = 
      "प्रमाणित करण्यांत येते की या बिलांत\n" +
      "दर्शविलेले दर व\n" +
      "परिमाणे ही अचूक आहेत आणि\n" +
      "सामुग्री, वस्तु यांच्या\n" +
      "स्थितीत मिळाल्या असून त्या पुरवठादार यांच्या\n" +
      "संख्यात्मक लेख्याच्या समर्थित\n" +
      "पुरवठा नोंदवहीत नमूद\n" +
      "करण्यात आल्या आहेत.\n" +
      "दिनांक वस्तु पुरवठा अधिकाऱ्याची सही";
    const availableWidth = pageWidth - 30;
    const colWidth = availableWidth / 2; // 50% each

    // Place the two-column row with an extra top margin
    yPos = doc.autoTable.previous.finalY + 5; // minimal gap before this row
    doc.autoTable({
      startY: yPos,
      margin: { top: 10 }, // extra gap above the table row
      head: false,
      body: [[ leftText, rightText ]],
      styles: {
        font: 'NotoSerifDevanagari',
        fontSize: 10,
        cellPadding: 2
      },
      columnStyles: {
        0: { cellWidth: colWidth, halign: 'left' },
        1: { cellWidth: colWidth, halign: 'right' }
      },
      theme: 'plain'
    });

    // Draw vertical divider line between the two columns
    const breakdownTable = doc.autoTable.previous;
    if (
      breakdownTable &&
      breakdownTable.settings.margin &&
      typeof breakdownTable.startY === "number" &&
      typeof breakdownTable.finalY === "number"
    ) {
      const marginLeft = breakdownTable.settings.margin.left;
      const verticalLineX = marginLeft + colWidth;
      const tableTopY = breakdownTable.startY;
      const tableBottomY = breakdownTable.finalY;
      doc.setLineWidth(0.1);
      doc.setDrawColor(0, 0, 0);
      doc.line(verticalLineX, tableTopY, verticalLineX, tableBottomY);
    }

    // --- Save the PDF ---
    doc.save('form22-report.pdf');
  } catch (error) {
    console.error('Error generating Form 22 PDF:', error);
  }
};


  const handleAddFormTtOpen = () => {
    setAddFormTtOpen(true)
}

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const filteredBills = getFilteredBills();

  const rows = [
    ...filteredBills
      .filter((bill) => 
        (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) &&
        (!wardName || bill.ward === wardName) &&
        (!meterPurposeName || bill.meterPurpose === meterPurposeName)
      )
      .map((bill, index) => ({
        _id: bill._id,
        id: index + 1,
        consumerNumber: bill.consumerNumber,
        consumerAddress: bill.consumerAddress,
        ward: bill?.ward,
        monthAndYear: bill?.monthAndYear,
        meterPurpose: bill?.meterPurpose,
        netBillAmount: bill.netBillAmount,
        dueDate: formatDate(bill.dueDate),
      })),
    {
      id: 'total',
      consumerNumber: '',
      consumerAddress: '',
      ward: '',
      monthAndYear: '',
      meterPurpose: 'Total',
      netBillAmount: filteredBills
        .filter((bill) => 
          (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) &&
          (!wardName || bill.ward === wardName) &&
          (!meterPurposeName || bill.meterPurpose === meterPurposeName)
        )
        .reduce((sum, bill) => sum + (Number(bill.netBillAmount) || 0), 0),
      dueDate: '',
    }
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'consumerNumber', headerName: 'CONSUMER NO.', width: 200 },
    { field: 'consumerAddress', headerName: 'CONSUMER ADDRESS', width: 130 },
    { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
    { field: 'meterPurpose', headerName: 'METER PURPOSE', width: 130 },
    { field: 'ward', headerName: 'WARD', width: 130 },
    { 
      field: 'netBillAmount', 
      headerName: 'NET BILL AMOUNT', 
      width: 200,
      cellClassName: (params) => {
        if (params.id === 'total') {
          return 'total-row';
        }
        return '';
      }
    },
    { field: 'dueDate', headerName: 'DUE DATE', width: 130 },
  ];

  const gridStyle = {
    height: 'auto',
    width: isSidebarOpen ? '80%' : '90%',
    marginLeft: isSidebarOpen ? '19%' : '7%',
    transition: 'margin-left 0.3s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px 0px',
    paddingLeft: '10px',
  };

  const innerDivStyle = {
    border: '1px solid #F7F7F8',
    width: '99%',
    padding: window.innerWidth <= 480 ? '80px 20px' : 
            window.innerWidth <= 600 ? '80px 10px' : 
            window.innerWidth <= 900 ? '60px 10px' : '30px 10px',
  };

  return (
    <div style={gridStyle}>
      <Box sx={innerDivStyle}>
        <Box sx={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'space-between', 
          mb: 2,
          flexDirection: {
            lg: 'row',
            md: 'row',
            sm: 'column',
            xs: 'column'
          }
        }}>
          <Typography sx={{ 
            paddingLeft: {
              xs: '3px',
              sm: '5px',
              md: '10px',
              lg: '20px'
            },
            color: '#0d2136',
            fontSize: {
              sm: '10px',
              xs: '10px',
              md: '15px',
              lg: '20px'
            },
          }}>
            Energy Expenditure
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            width: '250px', 
            justifyContent: {
              xs: 'space-around',
              sm: 'space-around',
              md: 'space-between',
              lg: 'space-between'
            } 
          }}>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="fileInput"
            />
          </Box>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: {
            xl: 'row',
            lg: 'row',
            md: 'row',
            sm: 'column',
            xs: 'column'
          },
          justifyContent: {
            md: 'space-between',
            lg: 'flex-start'
          }
        }}>
          <Box sx={{
            width: {
              lg: '20%',
              xl: '20%',
              md: '30%',
              sm: '100%',
              xs: '100%'
            },
            mb: {
              sm: 1,
              xs: 1
            }
          }}>
            <BillDatePicker 
              selectedMonthYear={selectedMonthYear} 
              onChange={handleDateChange} 
            />
          </Box>

          {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (
            <>
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                sx={{
                  width: {
                    xl: isSidebarOpen ? '12%' : '10%',
                    lg: isSidebarOpen ? '15%' : '15%',
                    md: '30%',
                    sm: '100%',
                    xs: '100%',
                  },
                  mt: { sm: 1, md: 0, lg: 0, xl: 0 },
                  mb: { xs: 1, sm: 1, lg: 0, xl: 0 },
                  ml: {
                    xl: 1,
                    lg: 1,
                    md: 0,
                    sm: 0
                  }
                }}
              >
                <InputLabel id="ward-label">Search Ward</InputLabel>
                <Select
                  labelId="ward-label"
                  id="ward"
                  name="ward"
                  value={wardName}
                  onChange={handleChangeWard}
                  label="Search Ward"
                >
                  {wardDataAtoI.map((ward, index) => (
                    <MenuItem key={index} value={ward.ward}>
                      {ward.ward}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                sx={{
                  width: {
                    xl: isSidebarOpen ? '20%' : '20%',
                    lg: isSidebarOpen ? '17%' : '17%',
                    md: '30%',
                    sm: '100%',
                    xs: '100%',
                  },
                  mt: { sm: 1, md: 0, lg: 0, xl: 0 },
                  mb: { xs: 1, sm: 1, lg: 0, xl: 0 },
                  ml: {
                    xl: 1,
                    lg: 1,
                    md: 0,
                    sm: 0
                  }
                }}
              >
                <InputLabel id="meter-purpose-label">Search Meter Purpose</InputLabel>
                <Select
                  labelId="meter-purpose-label"
                  id="meterPurpose"
                  name="meterPurpose"
                  value={meterPurposeName}
                  onChange={handleChangeMeterPurpose}
                  label="Search Meter Purpose"
                >
                  {meterPurposeData.map((meterdata, index) => (
                    <MenuItem key={index} value={meterdata.purpose}>
                      {meterdata.purpose}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          <Button
            sx={{
              color: '#757575',
              border: '0.1px solid #757575',
              cursor: 'pointer',
              textTransform: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              width: {
                xl: isSidebarOpen ? '12%' : '10%',
                lg: isSidebarOpen ? '15%' : '15%',
                md: '30%',
                sm: '100%',
                xs: '100%',
              },
              ml: {
                xl: 1,
                lg: 1,
                md: 0,
                sm: 0
              },
              height: '65%',
            }}
            onClick={handleDownloadPDF}
          >
            <DownloadIcon />
            <Typography sx={{
              fontSize: isSidebarOpen ? '12.2px' : '14px'
            }}>
              Download PDF
            </Typography>
          </Button>
         
          {/* <Button
            sx={{
              color: '#757575',
              border: '0.1px solid #757575',
              cursor: 'pointer',
              textTransform: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              width: {
                xl: isSidebarOpen ? '12%' : '10%',
                lg: isSidebarOpen ? '15%' : '15%',
                md: '30%',
                sm: '100%',
                xs: '100%',
              },
              ml: {
                xl: 1,
                lg: 1,
                md: 0,
                sm: 0
              },
              height: '65%',
            }}
            onClick={handleAddFormTtOpen}
          >
            <Typography sx={{
              fontSize: isSidebarOpen ? '12.2px' : '14px'
            }}>
              Generate form 22
            </Typography>
          </Button> */}

           <Button
            sx={{
              color: '#757575',
              border: '0.1px solid #757575',
              cursor: 'pointer',
              textTransform: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              width: {
                xl: isSidebarOpen ? '20%' : '20%',
                lg: isSidebarOpen ? '17%' : '17%',
                md: '30%',
                sm: '100%',
                xs: '100%',
              },
              ml: {
                xl: 1,
                lg: 1,
                md: 0,
                sm: 0
              },
              height: '65%',
            }}
            onClick={handleDownloadForm22}
          >
            <DownloadIcon />
            <Typography sx={{
              fontSize: isSidebarOpen ? '12.2px' : '14px'
            }}>
              Form 22 report PDF
            </Typography>
          </Button>
        </Box>

        <StyledDataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 30, 40, 50, 60, 70, 100]}
          sx={{ paddingRight: 0.5, paddingLeft: 0.5 }}
        />

        <Modal open={billOpen} onClose={handleAddBillClose}>
          <AddBill
            open={billOpen}
            handleClose={handleAddBillClose}
            handleAddBill={handleAddBill}
            currentBill={currentBill}
            editBill={(billId, billData) => {
              dispatch(editBill(billId, billData));
              dispatch(fetchBills());
            }}
          />
        </Modal>

        <Modal open={addPaymentOpen} onClose={handleAddPaymentClose}>
          <AddPayment
            open={addPaymentOpen}
            handleClose={handleAddPaymentClose}
            selectedBill={selectedBill}
          />
        </Modal>

        <Modal open={addFormTtOpen} onClose={handleAddFormTtClose}>
          <AddForm22
            open={addFormTtOpen}
            handleClose={handleAddFormTtClose}
            selectedBillTt={selectedBillTt}
          />
        </Modal>
      </Box>
    </div>
  );
};

export default RegionalEnergyExpenditure;