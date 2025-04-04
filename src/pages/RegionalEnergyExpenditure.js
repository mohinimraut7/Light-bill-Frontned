import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills, addBill,deleteBill, editBill } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box,Modal,Button,TextField,MenuItem, Select, InputLabel, FormControl,Checkbox,OutlinedInput} from '@mui/material';
import PdfPreviewModal from '../components/modals/PdfPreviewModal';
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
import logovvcmc from '../Images/vvcmclogo.jpg';
import AddIcon from '@mui/icons-material/Add';


import { fetchConsumers } from '../store/actions/consumerActions';
import { AddRemarkReport } from '../components/modals/AddRemarkReport';
import { addReport, fetchReports } from '../store/actions/reportActions';
import { DVOTSurekhBShip, loadDvoSBShipFont } from '../fonts/DVOTSurekh_B_Ship';



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
  const [meterPurposeManyName, setMeterPurposeManyName] = useState([]);
  const [selectedMonthYear, setSelectedMonthYear] = useState('');
  const [data, setData] = useState([]);
  const [showFormControl, setShowFormControl] = useState(false);

  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);
const [pdfContent, setPdfContent] = useState(null);
const [pdfBlob, setPdfBlob] = useState(null); 
const [reportRemarkOpen, setReportRemarkOpen] = useState(false);

 const [currentReport, setCurrentReport] = useState(null);

 const [signatures, setSignatures] = useState({});


  useEffect(() => {
    dispatch(fetchBills());
    dispatch(fetchConsumers());
  }, [dispatch, data]);

// -----------------------------------------------------------------------------------------------
// Add this useEffect to fetch reports/signatures when component mounts
useEffect(() => {
  const fetchSignatures = async () => {
    try {
      const response = await fetch(`${baseUrl}/getReports`);
      const reports = await response.json();
      console.log("reports----",reports)
      // Get the latest signatures for each role
      const latestSignatures = {};
      reports.forEach(report => {
        report.reportingRemarks.forEach(remark => {
          if (remark.signature) {
            // latestSignatures[remark.role] = remark.signature;
            latestSignatures[remark.role] = remark.signature;
          }
        });
      });
      
      setSignatures(latestSignatures);
    } catch (error) {
      console.error('Error fetching signatures:', error);
    }
  };

  fetchSignatures();
}, []);

// ---------------------------------------------------------------------------------------------------
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
      if (user?.ward !== 'Head Office') {
        
      const specificWard = user?.ward;
      filteredBills = bills.filter((bill) => bill.ward === specificWard);
      }
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
  // const handleChangeManyMeterPurpose = (event) => setMeterPurposeManyName(event.target.value);

  const handleChangeManyMeterPurpose = (event) => {
    const {
      target: { value },
    } = event;
  
    // It will be string if using autofill, so ensure it's array
    setMeterPurposeManyName(typeof value === 'string' ? value.split(',') : value);
  };
  
  console.log("meterPurposeManyName",meterPurposeManyName)


  const handlePdfPreview = (pdfData) => {
    setPdfContent(pdfData);  
    setPdfPreviewOpen(true);  
  };





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
    setShowFormControl(true); 
    const doc = new jsPDF('landscape');
    
    
    const meterPurpose = meterPurposeManyName.length > 0 ? meterPurposeManyName.join(', ') : "N/A";

    const ward = rows.length > 0 ? rows[0].ward : "N/A";
    const monthYear = rows.length > 0 ? rows[0].monthAndYear : "N/A";
  
    doc.setFontSize(14);
    const lineHeight = 10; 
    let yPosition = 20; 
  
    doc.text(`Meter Purpose: ${meterPurpose}`, 140, yPosition, { align: "center" });
    yPosition += lineHeight; 
    doc.text(`Ward: ${ward}`, 140, yPosition, { align: "center" });
    yPosition += lineHeight; 
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
    const pdfData = doc.output('datauristring');

   
    handlePdfPreview(pdfData);  

    const pdfBlob = doc.output('blob');
    setPdfBlob(pdfBlob);
 
    // doc.save('energy-expenditure-report.pdf');
  };



const handleDownloadForm22 = () => {
  setShowFormControl(true); 
  
  try {
    
  
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    
    // // Add Devanagari font
    // doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
    // doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
    // loadDevanagariFont(doc);
    // doc.setFont("NotoSerifDevanagari");

    // ----------------------------------

    // Add Devanagari font
    doc.addFileToVFS("DVOTSurekh_B_Ship.ttf",DVOTSurekhBShip);
    doc.addFont("DVOTSurekh_B_Ship.ttf", "DVOTSurekh_B_Ship", "normal");
    loadDvoSBShipFont(doc);
    doc.setFont("DVOTSurekh_B_Ship");


    // Set initial vertical position
    let yPos = 15;

    // --- Header Section ---
    doc.setFontSize(10);
    doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
    doc.text("M.S.C. 22", 170, yPos);



    const logoWidth = 30;
const logoHeight = 30;
const logoX = 15;
const logoY = yPos + 10; // Adjusting Y so it aligns well with "महानगरपालिका" text



// const wardname = [...new Set(
//   rows.filter(row => row.ward === wardName) // फक्त निवडलेल्या wardName नुसार फिल्टर करणे
//       .map(row => row.ward) // फक्त 'ward' ची व्हॅल्यू काढणे
// )].join(', '); // डुप्लिकेट्स काढून "," ने जोडणे

const allWardNames = [...new Set(rows.map(row => row.ward))];

// Ensure the selected wardName is prioritized
const wardnameList = allWardNames.includes(wardName)
  ? [wardName, ...allWardNames.filter(name => name !== wardName)]
  : allWardNames;

// Join the ward names into a single string separated by commas
const wardname = wardnameList.join(', ');

doc.addImage(logovvcmc, 'PNG', logoX, logoY, logoWidth, logoHeight);

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
    // doc.text(`पत्ता : प्रभाग समिती ${wardname}`, 15, yPos);
    doc.text(`पत्ता : ${wardname}`, 15, yPos);

    yPos += 8;
    doc.text("माल : विद्युत विभाग", 15, yPos);
    yPos += 8;
    doc.text("मागणी पुस्तकाचा संदर्भ : लेखा शिर्ष विद्यावती विभाग विद्युत देयक", 15, yPos);

    // --- Calculate Total Amount ---
    const totalAmount = rows
      .filter(row => row.monthAndYear === selectedMonthYear)
      .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);

      const totalAmountInWords =  (totalAmount); 

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
        // font: 'NotoSerifDevanagari',
        font: 'DVOTSurekh_B_Ship',
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

    // Get the Y position after the table
    yPos = doc.autoTable.previous.finalY + 10;

    // Add the total amount in words with proper spacing
    doc.setFontSize(10);
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.text(
      `एकूण रक्कम रुपये (अक्षरी ${totalAmount.toFixed(2)}/-) मात्र`,
      pageWidth / 2,
      yPos,
      { align: 'center' }
    );

    // Add extra gap before the two-column section
    yPos += 15;

    // --- Two-Column Section ---
    const leftText = 
      "१) रक्कमेचे नियम वाट्य _______________ रु.\n\n" +
      "२) पूर्वीचा खर्च _______________ रु.\n\n" +
      "३) या बिलांत दर्शविलेला खर्च " + totalAmount.toFixed(2) + "/-\n\n" +
      "२ व ३ यांची बेरीज _______________ रु.\n\n" +
      "उपलब्ध शिल्लक _______________ रु.";

    const rightText = 
      "प्रमाणित करण्यांत येते की या बिलांत\n\n" +
      "दर्शविलेले दर व\n\n" +
      "परिमाणे ही अचूक आहेत आणि\n\n" +
      "सामुग्री, वस्तु यांच्या\n\n" +
      "स्थितीत मिळाल्या असून त्या पुरवठादार यांच्या\n\n" +
      "संख्यात्मक लेख्याच्या समर्थित\n\n" +
      "पुरवठा नोंदवहीत नमूद\n\n" +
      "करण्यात आल्या आहेत.\n\n\n" +
    "____________________________\n\n\n"+
      "दिनांक         वस्तु पुरवठा अधिकाऱ्याची सही";
      yPos += 10;
    const availableWidth = pageWidth - 30;
    const colWidth = availableWidth / 2;

    // Create the two-column section
    doc.autoTable({
      startY: yPos,
      head: false,
      body: [[ leftText, rightText ]],
      styles: {
        font: 'DVOTSurekh_B_Ship',
    fontStyle: 'normal',
        fontSize: 10,
        cellPadding: 2
      },
      columnStyles: {
        0: { cellWidth: colWidth, halign: 'left' },
        1: { cellWidth: colWidth, halign: 'right' }
      },
      theme: 'plain'
    });

    // Draw vertical divider line between columns
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

    // Save the PDF
    doc.addPage();
    yPos = 30; // reset vertical position for new page
   

    doc.setFontSize(12);

    // Left Column
    doc.text("मा. आयुक्त यांच्याकडे मंजुरीसाठी सादर", 15, yPos);

    yPos += 10;
    doc.text("मी मागणीची तपासणी केली असून ती सर्व बाबतीत", 15, yPos);
    yPos += 7;
    doc.text("अचूक आहे.", 15, yPos);
    yPos += 10;
    doc.text("दिनांक: ----------------------------", 15, yPos);
    yPos += 15;
    doc.text("-----------------                     -------------------", 15, yPos);
    yPos += 10;
    doc.text("प्र.लेखापाल                            सहा.आयुक्त", 15, yPos);
    yPos += 7;
  //   const wardname = [...new Set(
  //     rows.filter(row => row.ward === wardName) // फक्त निवडलेल्या wardName नुसार फिल्टर करणे
  //         .map(row => row.ward) // फक्त 'ward' ची व्हॅल्यू काढणे
  // )].join(', '); // डुप्लिकेट्स काढून "," ने जोडणे
    
    doc.text(`       प्रभाग समिती-${wardname}`, 15, yPos);
    yPos += 10;
    doc.text("----------------------------------------------------", 15, yPos);
    yPos += 10;

   
    
    // Dynamic totalAmount in Marathi format
    doc.text(`प्रभाग समिती रु. ${totalAmount.toLocaleString('hi-IN')}/-`, 15, yPos);
    yPos += 10;
    doc.text(`(अक्षरी: ${totalAmountInWords} रुपये देण्यात यावेत)`, 15, yPos);
    yPos += 10;
    doc.text("दिनांक: _______                        उपायुक्त", 15, yPos);
    yPos += 15;
    doc.text("-------------------------------------------------------", 15, yPos);
    yPos += 10;
    doc.text("मागणीची संपूर्ण फेड म्हणून", 15, yPos);
    yPos += 10;
    
    yPos += 10;
    
    // Dynamic totalAmount repeated
    doc.text(`प्रभाग समिती रु. ${totalAmount.toLocaleString('hi-IN')}/-`, 15, yPos);
    yPos += 10;
    doc.text(`(अक्षरी: ${totalAmountInWords} रुपये मिळाले)`, 15, yPos);
    yPos += 15;
    doc.text("                                मुद्रांक", 15, yPos);
    yPos += 7;
    doc.text("                                ----------------------", 15, yPos);
    yPos += 7;
    doc.text("                                पैसे घेणाऱ्याची सही", 15, yPos);



    yPos = 30; // Reset yPos for right column
    doc.text("निर्णय क्रमांक ----------------", 120, yPos);
    yPos += 10;
    doc.text("दिनांक ----------------", 120, yPos);
    yPos += 10;

    // Dynamic totalAmount in right section
    doc.text(`बिलांत दाखवलेली रु. ${totalAmount.toLocaleString('hi-IN')}/- ची रक्कम`, 120, yPos);
    yPos += 7;
    doc.text(`(अक्षरी रुपये ${totalAmountInWords} मात्र)`, 120, yPos);
    yPos += 10;
    doc.text("मंजूर करण्यात येत आहे.", 120, yPos);
    yPos += 10;
    doc.text("मुख्य लेखाधिकारी ----------------------", 120, yPos);
    yPos += 10;
    doc.text("दिनांक                          उप-आयुक्त", 120, yPos);
    doc.text("वसई-विरार शहर महानगरपालिका", 120, yPos + 7);

    yPos += 15;
    doc.text("----------------------------------------------------", 120, yPos);
    doc.text("---------------- प्रदानार्थ लेखापाल -------------------------------------------------------------- यांस,", 120, yPos + 7);
    yPos += 15;
    doc.text("------------------------                  -------------------------", 120, yPos);
    yPos += 10;
    doc.text("दिनांक                          उप-आयुक्त", 120, yPos);
    doc.text("वसई-विरार शहर महानगरपालिका", 120, yPos + 7);

    yPos += 15;
doc.text("----------------------------------------------------", 120, yPos);

yPos += 10; // इथे गॅप वाढवला
doc.text("धनादेश क्रमांक ----------  दिनांक  ------------", 120, yPos);

    yPos += 10;
    doc.text("द्वारे देण्यात आले आणि ----------------------", 120, yPos);
    doc.text("प्रस्तावित रोख वहित नोंद घेतली", 120, yPos + 7);
    yPos += 20;
    doc.text("----------------------                  ---------------------------------", 120, yPos);
    yPos += 10;
    doc.text("रोखपाल                          उप-आयुक्त", 120, yPos);
    doc.text("वसई-विरार शहर महानगरपालिका", 120, yPos + 7);

    doc.line(110, 60, 110, yPos + 10); // **ही लाइन आता 60 पासून सुरू होईल**


   
    // const pdfData = doc.output('datauristring');
    
    // handlePdfPreview(pdfData);  
     
    //  const pdfBlob = doc.output('blob');
    //  setPdfBlob(pdfBlob);

    if (signatures['Junior Engineer']) {
      doc.addImage(signatures['Junior Engineer'], 'PNG', 15, yPos, 30, 15);
      doc.text("Junior Engineer", 15, yPos + 20);
    }

    if (signatures['Executive Engineer']) {
      doc.addImage(signatures['Executive Engineer'], 'PNG', 120, yPos, 30, 15);
      doc.text("Executive Engineer", 120, yPos + 20);
    }

    if (signatures['Deputy Commissioner']) {
      doc.addImage(signatures['Deputy Commissioner'], 'PNG', 120, yPos + 40, 30, 15);
      doc.text("Deputy Commissioner", 120, yPos + 60);
    }

    if (user.role === "Lipik") {
      const ward = user.ward; // e.g., "Ward-A"
    
      // Add Lipik's signature if available for the user's ward
      if (signatures[ward] && signatures[ward]["Lipik"]) {
        doc.addImage(signatures[ward]["Lipik"], "PNG", 15, yPos, 30, 15);
        doc.text("Lipik", 15, yPos + 20);
      }
    }

    const pdfData = doc.output('blob'); // Get Blob format

// Convert Blob to Object URL for preview
const pdfUrl = URL.createObjectURL(pdfData);
handlePdfPreview(pdfUrl);
setPdfBlob(pdfData);

    const blob = new Blob([pdfBlob], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    
  
  } catch (error) {
    console.error('Error generating Form 22 PDF:', error);
  }
};

const handleMudrank = () => {
  try {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    // Load Devanagari Font
    doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
    doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
    doc.setFont("NotoSerifDevanagari");

    // Calculate total net bill amount
    const totalAmount = rows
      .filter(row => row.monthAndYear === selectedMonthYear)
      .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);
    
    // Convert totalAmount to words
    const totalAmountInWords =  (totalAmount); 

  
    let yPos = 60;  // **yPos मोठा केला (वरचा गॅप जास्त होईल)**
    doc.setFontSize(12);

    // Left Column
    doc.text("मा. आयुक्त यांच्याकडे मंजुरीसाठी सादर", 15, yPos);
    yPos += 10;
    doc.text("मी मागणीची तपासणी केली असून ती सर्व बाबतीत", 15, yPos);
    yPos += 7;
    doc.text("अचूक आहे.", 15, yPos);
    yPos += 10;
    doc.text("दिनांक: ----------------------------", 15, yPos);
    yPos += 15;
    doc.text("-----------------                     -------------------", 15, yPos);
    yPos += 10;
    doc.text("प्र.लेखापाल                            सहा.आयुक्त", 15, yPos);
    yPos += 7;
    const wardname = [...new Set(
      rows.filter(row => row.ward === wardName) // फक्त निवडलेल्या wardName नुसार फिल्टर करणे
          .map(row => row.ward) // फक्त 'ward' ची व्हॅल्यू काढणे
  )].join(', '); // डुप्लिकेट्स काढून "," ने जोडणे
    
    doc.text(`       प्रभाग समिती-${wardname}`, 15, yPos);
    yPos += 10;
    doc.text("----------------------------------------------------", 15, yPos);
    yPos += 10;
    
    // Dynamic totalAmount in Marathi format
    doc.text(`प्रभाग समिती रु. ${totalAmount.toLocaleString('hi-IN')}/-`, 15, yPos);
    yPos += 10;
    doc.text(`(अक्षरी: ${totalAmountInWords} रुपये देण्यात यावेत)`, 15, yPos);
    yPos += 10;
    doc.text("दिनांक: _______                        उपायुक्त", 15, yPos);
    yPos += 15;
    doc.text("-------------------------------------------------------", 15, yPos);
    yPos += 10;
    doc.text("मागणीची संपूर्ण फेड म्हणून", 15, yPos);
    yPos += 10;
    
    // Dynamic totalAmount repeated
    doc.text(`प्रभाग समिती रु. ${totalAmount.toLocaleString('hi-IN')}/-`, 15, yPos);
    yPos += 10;
    doc.text(`(अक्षरी: ${totalAmountInWords} रुपये मिळाले)`, 15, yPos);
    yPos += 15;
    doc.text("                                मुद्रांक", 15, yPos);
    yPos += 7;
    doc.text("                                ----------------------", 15, yPos);
    yPos += 7;
    doc.text("                                पैसे घेणाऱ्याची सही", 15, yPos);

    // Right Column
    yPos = 60; // Reset yPos for right column
    doc.text("निर्णय क्रमांक ----------------", 120, yPos);
    yPos += 10;
    doc.text("दिनांक ----------------", 120, yPos);
    yPos += 10;

    // Dynamic totalAmount in right section
    doc.text(`बिलांत दाखवलेली रु. ${totalAmount.toLocaleString('hi-IN')}/- ची रक्कम`, 120, yPos);
    yPos += 7;
    doc.text(`(अक्षरी रुपये ${totalAmountInWords} मात्र)`, 120, yPos);
    yPos += 10;
    doc.text("मंजूर करण्यात येत आहे.", 120, yPos);
    yPos += 10;
    doc.text("मुख्य लेखाधिकारी ----------------------", 120, yPos);
    yPos += 10;
    doc.text("दिनांक                          उप-आयुक्त", 120, yPos);
    doc.text("वसई-विरार शहर महानगरपालिका", 120, yPos + 7);

    yPos += 15;
    doc.text("----------------------------------------------------", 120, yPos);
    doc.text("---------------- प्रदानार्थ लेखापाल -------------------------------------------------------------- यांस,", 120, yPos + 7);
    yPos += 15;
    doc.text("------------------------                  -------------------------", 120, yPos);
    yPos += 10;
    doc.text("दिनांक                          उप-आयुक्त", 120, yPos);
    doc.text("वसई-विरार शहर महानगरपालिका", 120, yPos + 7);

    yPos += 15;
doc.text("----------------------------------------------------", 120, yPos);

yPos += 10; // इथे गॅप वाढवला
doc.text("धनादेश क्रमांक ----------  दिनांक  ------------", 120, yPos);

    yPos += 10;
    doc.text("द्वारे देण्यात आले आणि ----------------------", 120, yPos);
    doc.text("प्रस्तावित रोख वहित नोंद घेतली", 120, yPos + 7);
    yPos += 20;
    doc.text("----------------------                  ---------------------------------", 120, yPos);
    yPos += 10;
    doc.text("रोखपाल                          उप-आयुक्त", 120, yPos);
    doc.text("वसई-विरार शहर महानगरपालिका", 120, yPos + 7);

    doc.line(110, 60, 110, yPos + 10); // **ही लाइन आता 60 पासून सुरू होईल**

    doc.save('mudrank-report.pdf');
  } catch (error) {
    console.error('Error generating Mudrank PDF:', error);
  }
};



const handleAddFormTtOpen = () => {
  setAddFormTtOpen(true)
}
// --------------------------------------------------------------------


const downloadKaryalayinTipani = () => {
  setShowFormControl(true); 
try {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  // Load Noto Serif Devanagari Font
  doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
  doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
  doc.setFont("NotoSerifDevanagari");
  // const totalAmount = rows
  // .filter(row => row.monthAndYear === selectedMonthYear && row.ward === wardName && row.meterPurpose === meterPurposeName)
  // .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);
  const totalAmount = rows
  .filter(row => row.monthAndYear === selectedMonthYear)
  .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);
  const totalAmountInWords = numberToMarathiWords(totalAmount);
  const pageWidth = doc.internal.pageSize.width;
  const leftSectionWidth = pageWidth * 0.15; // 15% of the page
  const rightSectionStart = leftSectionWidth + 5; // Start right section after vertical line
  const rightAlignX = pageWidth - 15; // Right alignment for text
  let yPos = 15;
  // Left Section (15%)
  doc.setFontSize(10);
  doc.text("व. वि. श.", 10, yPos); // "व. वि. श." on top
  yPos += 6; // Move down for spacing
  doc.text("महानगरपालिका", 10, yPos); // "महानगरपालिका" below it
  // Draw vertical line
  doc.setDrawColor(0);
  doc.setLineWidth(0.2);
  doc.line(leftSectionWidth, 10, leftSectionWidth, 290); // Line from top to bottom
  // Right Section (85%) - Main Content
  doc.setFontSize(16);
  doc.text("कार्यालयीन टिपणी", rightSectionStart + 30, 20);
  doc.setFontSize(12);
  yPos = 30;
  const currentDate = new Date().toLocaleDateString('en-IN');
  doc.text(`दिनांक: ${currentDate}`, rightAlignX, yPos, { align: "right" });
  yPos += 7;
  const wardname = [...new Set(
    rows.filter(row => row.ward === wardName) // फक्त निवडलेल्या wardName नुसार फिल्टर करणे
    .map(row => row.ward) // फक्त 'ward' ची व्हॅल्यू काढणे
)].join(', '); // डुप्लिकेट्स काढून "," ने जोडणे
  doc.text(`${wardname}`, rightAlignX, yPos, { align: "right" });
  yPos += 7;
  doc.text("विभाग: दिवाबत्ती", rightAlignX, yPos, { align: "right" });
  yPos += 10;
  doc.text("मा.साहेब,", rightSectionStart, yPos);
  yPos += 7;
  const meterpurposename = [...new Set(
    rows.filter(row => row.meterPurpose === meterPurposeName) // फक्त निवडलेल्या meterPurpose नुसार फिल्टर करणे
        .map(row => row.meterPurpose) // फक्त 'ward' ची व्हॅल्यू काढणे
)].join(', '); // डुप्लिकेट्स काढून "," ने जोडणे
  doc.text(`सादर करण्यात येते की, वसई विरार शहर महानगरपालिका ${wardname}`, rightSectionStart, yPos);
  yPos += 7;
  const meterPurpose = meterPurposeManyName.length > 0 ? meterPurposeManyName.join(', ') : "N/A";

//  doc.text(`Meter Purpose: ${meterPurpose}`, 140, yPosition, { align: "center" });

  doc.text(`हद्दीत महानगरपालिकेतर्फे सार्वजनिक रस्त्यांवरील ${meterPurpose}`, rightSectionStart, yPos);
yPos += 7;
  // doc.text("हद्दीत महानगरपालिकेतर्फे सार्वजनिक रस्त्यांवरील स्ट्रीटलाईट मीटर/सा.प्रशासन/", rightSectionStart, yPos);
  // yPos += 7;
  // doc.text("सा.भवन/दहन व दफनभूमी/समाज मंदिर/तलाव/मार्केट/उद्यान/वाचनालय वीज मीटर", rightSectionStart, yPos);
  // yPos += 7;
  doc.text("दिवाबत्तीची सोय केलेली आहे.", rightSectionStart, yPos);
  yPos += 10;
  doc.text("यासाठी महाराष्ट्र राज्य वीज वितरण कंपनी लि. यांच्यातर्फे वीज पुरवठा", rightSectionStart, yPos);
  yPos += 7;
  doc.text("केलेला आहे. या कामी मा.रा.वी.वितरण कंपनी लिमिटेड यांच्याकडून पश्चिम", rightSectionStart, yPos);
  yPos += 7;
  doc.text(`विभागासाठी माहे मार्च २०२५ रक्कम रुपये ${totalAmount.toLocaleString('hi-IN')}/-`, rightSectionStart, yPos);
  yPos += 7;
  doc.text(`(अक्षरी रुपये ${totalAmountInWords} फक्त) चे वीज देयक सदर`, rightSectionStart, yPos);
  yPos += 7;
  doc.text("करून मागणी केलेली आहे.", rightSectionStart, yPos);
  yPos += 10;
  doc.text("-----------------------------------------------------------", rightSectionStart, yPos);
  yPos += 10;
 


if (signatures['Lipik']) { 
  doc.addImage(signatures['Lipik'], 'PNG', rightSectionStart + 0, yPos - 15, 30, 15);
}
  doc.text("लिपिक, विद्युत विभाग", rightSectionStart, yPos);

  if (signatures['Junior Engineer']) { 
    doc.addImage(signatures['Junior Engineer'], 'PNG', rightSectionStart + 75, yPos - 15, 30, 15);
}
  doc.text("कनिष्ठ अभियंता (ठेका)", rightSectionStart + 75, yPos);

  doc.text("कनिष्ठ अभियंता विद्युत (मुख्यालय)", rightSectionStart + 135, yPos);
  yPos += 7;
  doc.text("प्रभाग समिती (अ)", rightSectionStart, yPos);
  doc.text("प्रभाग समिती (अ)", rightSectionStart + 75, yPos);
  doc.text("वसई विरार शहर महानगरपालिका", rightSectionStart + 140, yPos);
  yPos += 7;
  doc.text("वसई विरार शहर महानगरपालिका", rightSectionStart, yPos);
  yPos += 10;
  // Financial Summary Section
  yPos += 10;
  doc.text("मा.सदर,", rightSectionStart, yPos);
  yPos += 7;
  doc.text("वसई विरार शहर महानगरपालिकेच्या विद्युत विभागाने सदर केलेल्या अहवालानुसार:", rightSectionStart, yPos);
  yPos += 7;
  doc.text("१) आर्थिक वर्ष: २०२४-२५", rightSectionStart, yPos);
  yPos += 7;
  doc.text("२) लेखाशिर्ष: दिवाबत्ती वीज देयक", rightSectionStart, yPos);
  yPos += 7;
  doc.text("३) मूळ तरतूद: २,१७,२०,०००/-", rightSectionStart, yPos);
  yPos += 7;
  doc.text("४) आतापर्यंतचा खर्च: ३,१६,४५,०३०/-", rightSectionStart, yPos);
  yPos += 7;
  doc.text(`५) प्रस्तावित देयक रक्कम: ${totalAmount.toLocaleString('hi-IN')} /-`, rightSectionStart, yPos);
  yPos += 7;
  doc.text("६) शिल्लक तरतूद: १८,४८,१४,२५०/-", rightSectionStart, yPos);
  yPos += 10;

  doc.text("तरी सदरचे देयक महाराष्ट्र राज्य वीज वितरण कंपनी लिमिटेड यांना", rightSectionStart, yPos);
  yPos += 7;
  doc.text("उदाहोण्यासाठी मंजुरीस्तव सदर.", rightSectionStart, yPos);
  yPos += 10;
  // doc.text("-----------------------------------------------------------", rightSectionStart, yPos);
  yPos += 10;
  // Final Signature Section
  if (signatures['Assistant Municipal Commissioner']) { 
    doc.addImage(signatures['Assistant Municipal Commissioner'], 'PNG', rightSectionStart + 0, yPos - 15, 30, 15);
}
  doc.text("लेखापाल", rightSectionStart, yPos);


  if (signatures['Accountant']) { 
    doc.addImage(signatures['Accountant'], 'PNG', rightSectionStart + 75, yPos - 15, 30, 15);
}
  doc.text("सहाय्यक आयुक्त", rightSectionStart + 75, yPos);
  doc.text("", rightSectionStart + 140, yPos);
  yPos += 7;
  doc.text("प्रभाग समिती (अ)", rightSectionStart, yPos);
  doc.text("प्रभाग समिती (अ)", rightSectionStart + 75, yPos);
  doc.text("", rightSectionStart + 140, yPos);
  yPos += 7;
  doc.text("वसई विरार शहर महानगरपालिका", rightSectionStart, yPos);
  doc.text("वसई विरार शहर महानगरपालिका", rightSectionStart + 75, yPos);
  doc.text("", rightSectionStart + 140, yPos);
  

  // Save the PDF as a Data URL
  


  // // Save the PDF
  // doc.save("karyalayin_tipani.pdf");

   // For downloading, use the blob method to trigger a download



  //  const pdfBlob = doc.output('blob');
  //  const downloadLink = document.createElement('a');
  //  downloadLink.href = URL.createObjectURL(pdfBlob);
  //  downloadLink.download = "karyalayin_tipani.pdf";
  //  downloadLink.click();



  // if (signatures['Junior Engineer']) {
  //   doc.addImage(signatures['Junior Engineer'], 'PNG', 15, yPos, 30, 15);
  //   doc.text("Junior Engineer", 15, yPos + 20);
  // }

  // if (signatures['Executive Engineer']) {
  //   doc.addImage(signatures['Executive Engineer'], 'PNG', 120, yPos, 30, 15);
  //   doc.text("Executive Engineer", 120, yPos + 20);
  // }

  // if (signatures['Deputy Commissioner']) {
  //   doc.addImage(signatures['Deputy Commissioner'], 'PNG', 120, yPos + 40, 30, 15);
  //   doc.text("Deputy Commissioner", 120, yPos + 60);
  // }

 


  // if (signatures['Lipik']) {
  //   doc.addImage(signatures['Lipik'], 'PNG', 15, yPos, 30, 15);
  //   doc.text("Lipik", 15, yPos + 20);
  // }

  // if (signatures['Accountant']) {
  //   doc.addImage(signatures['Accountant'], 'PNG', 15, yPos, 30, 15);
  //   doc.text("Accountant", 15, yPos + 20);
  // }


  // if (signatures['Assistant Municipal Commissioner']) {
  //   doc.addImage(signatures['Assistant Municipal Commissioner'], 'PNG', 15, yPos, 30, 15);
  //   doc.text("Assistant Municipal Commissioner", 15, yPos + 20);
  // }





  const addSignatures = () => {
    let signatureYPos = yPos + 20;
    const signatureWidth = 30;
    const signatureHeight = 15;
    const spacing = 40;
  
    // Left column signatures
    if (user.ward && signatures[user.ward]?.["Lipik"]) {
      doc.addImage(signatures[user.ward]["Lipik"], 'PNG', rightSectionStart, signatureYPos, signatureWidth, signatureHeight);
      doc.text("लिपिक, विद्युत विभाग", rightSectionStart, signatureYPos + signatureHeight + 5);
    }
  
    if (user.ward && signatures[user.ward]?.["Accountant"]) {
      doc.addImage(signatures[user.ward]["Accountant"], 'PNG', rightSectionStart, signatureYPos + spacing, signatureWidth, signatureHeight);
      doc.text("लेखापाल", rightSectionStart, signatureYPos + spacing + signatureHeight + 5);
    }
  
    // Middle column signatures
    if (user.ward && signatures[user.ward]?.["Junior Engineer"]) {
      doc.addImage(signatures[user.ward]["Junior Engineer"], 'PNG', rightSectionStart + 75, signatureYPos, signatureWidth, signatureHeight);
      doc.text("कनिष्ठ अभियंता", rightSectionStart + 75, signatureYPos + signatureHeight + 5);
    }
  
    if (signatures["Head Office"]?.["Junior Engineer"]) {
      doc.addImage(signatures["Head Office"]["Junior Engineer"], 'PNG', rightSectionStart + 75, signatureYPos + spacing, signatureWidth, signatureHeight);
      doc.text("कनिष्ठ अभियंता विद्युत (मुख्यालय)", rightSectionStart + 75, signatureYPos + spacing + signatureHeight + 5);
    }
  
    // Right column signatures
    if (user.ward && signatures[user.ward]?.["Assistant Municipal Commissioner"]) {
      doc.addImage(signatures[user.ward]["Assistant Municipal Commissioner"], 'PNG', rightSectionStart + 140, signatureYPos, signatureWidth, signatureHeight);
      doc.text("सहाय्यक आयुक्त", rightSectionStart + 140, signatureYPos + signatureHeight + 5);
    }
  
    if (user.ward && signatures[user.ward]?.["Dy.Municipal Commissioner"]) {
      doc.addImage(signatures[user.ward]["Dy.Municipal Commissioner"], 'PNG', rightSectionStart + 140, signatureYPos + spacing, signatureWidth, signatureHeight);
      doc.text("उप आयुक्त", rightSectionStart + 140, signatureYPos + spacing + signatureHeight + 5);
    }
  
    // Add ward and organization text
    signatureYPos += spacing * 2;
    doc.text("प्रभाग समिती (अ)", rightSectionStart, signatureYPos);
    doc.text("वसई विरार शहर महानगरपालिका", rightSectionStart, signatureYPos + 7);
  };
  
// -----------------------------------------------------
 
  // --------------------------------------------------------------------------------

 
  // Helper function to get the title in Marathi
  const getRoleTitle = (role) => {
    const titles = {
      "Lipik": "लिपिक, विद्युत विभाग",
      "Accountant": "लेखापाल",
      "Junior Engineer": "कनिष्ठ अभियंता",
      "Assistant Municipal Commissioner": "सहाय्यक आयुक्त",
      "Dy.Municipal Commissioner": "उप आयुक्त"
    };
    return titles[role] || role;
  };
  

  // Replace the existing signature section with this call
  addSignatures();
 
  const pdfData = doc.output('datauristring');

  // Now, pass the PDF data to the modal for preview
  handlePdfPreview(pdfData);  
   // Store the PDF Blob for download later
   const pdfBlob = doc.output('blob');
   setPdfBlob(pdfBlob);


} catch (error) {
  console.error("Error generating Karyalayin Tipani PDF:", error);
}
}





// const downloadKaryalayinTipani = () => {
//   setShowFormControl(true);
//   try {
//     const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

//     // Load Noto Serif Devanagari Font
//     doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
//     doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
//     doc.setFont("NotoSerifDevanagari");

//     const totalAmount = rows
//       .filter(row => row.monthAndYear === selectedMonthYear)
//       .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);

//     const totalAmountInWords = numberToMarathiWords(totalAmount);
//     const pageWidth = doc.internal.pageSize.width;
//     const leftSectionWidth = pageWidth * 0.15;
//     const rightSectionStart = leftSectionWidth + 5;
//     const rightAlignX = pageWidth - 15;
//     let yPos = 15;

//     // Left Section (15%)
//     doc.setFontSize(10);
//     doc.text("व. वि. श.", 10, yPos);
//     yPos += 6;
//     doc.text("महानगरपालिका", 10, yPos);
//     doc.setDrawColor(0);
//     doc.setLineWidth(0.2);
//     doc.line(leftSectionWidth, 10, leftSectionWidth, 290);

//     // Right Section (85%)
//     doc.setFontSize(16);
//     doc.text("कार्यालयीन टिपणी", rightSectionStart + 30, 20);
//     doc.setFontSize(12);
//     yPos = 30;
//     const currentDate = new Date().toLocaleDateString('en-IN');
//     doc.text(`दिनांक: ${currentDate}`, rightAlignX, yPos, { align: "right" });
//     yPos += 7;

//     const wardname = [...new Set(
//       rows.filter(row => row.ward === wardName)
//         .map(row => row.ward)
//     )].join(', ');

//     doc.text(`${wardname}`, rightAlignX, yPos, { align: "right" });
//     yPos += 7;
//     doc.text("विभाग: दिवाबत्ती", rightAlignX, yPos);
//     yPos += 10;
//     doc.text("मा.साहेब,", rightSectionStart, yPos);
//     yPos += 7;

//     // Add more text content as per your logic...
    
//     // Save the PDF as a Data URL
//     const pdfData = doc.output('datauristring');

//     // Now, pass the PDF data to the modal for preview
//     handlePdfPreview(pdfData);  // Pass the PDF content (data URL) to the modal

//   } catch (error) {
//     console.error("Error generating Karyalayin Tipani PDF:", error);
//   }
// };


// -------------------------------------------------------------------------------------------------






const convertNumberToMarathiWords = (num) => {
  const marathiNumbers = ["शून्य", "एक", "दोन", "तीन", "चार", "पाच", "सहा", "सात", "आठ", "नऊ"];
  const marathiTens = ["", "दहा", "वीस", "तीस", "चाळीस", "पन्नास", "साठ", "सत्तर", "ऐंशी", "नव्वद"];
  const marathiHundreds = "शंभर";
  const marathiThousands = "हजार";
  const marathiLakhs = "लाख";
  const marathiCrores = "कोटी";
  let result = "";
  if (num >= 10000000) {
    result += Math.floor(num / 10000000) + " " + marathiCrores + " ";
    num %= 10000000;
  }
  if (num >= 100000) {
    result += Math.floor(num / 100000) + " " + marathiLakhs + " ";
    num %= 100000;
  }
  if (num >= 1000) {
    result += Math.floor(num / 1000) + " " + marathiThousands + " ";
    num %= 1000;
  }
  if (num >= 100) {
    result += marathiHundreds + " ";
    num %= 100;
  }
  if (num >= 10) {
    result += marathiTens[Math.floor(num / 10)] + " ";
    num %= 10;
  }
  if (num > 0) {
    result += marathiNumbers[num] + " ";
  }
  return result.trim();
};

const handleAddReportRemarkClose = () => setReportRemarkOpen(false);


const numberToMarathiWords = (num) => {
  const marathiNumbers = {
    0: "शून्य", 1: "एक", 2: "दोन", 3: "तीन", 4: "चार", 5: "पाच", 6: "सहा",
    7: "सात", 8: "आठ", 9: "नऊ", 10: "दहा", 11: "अकरा", 12: "बारा",
    13: "तेरा", 14: "चौदा", 15: "पंधरा", 16: "सोळा", 17: "सतरा",
    18: "अठरा", 19: "एकोणीस", 20: "वीस", 30: "तीस", 40: "चाळीस",
    50: "पन्नास", 60: "साठ", 70: "सत्तर", 80: "ऐंशी", 90: "नव्वद",
    100: "शंभर", 1000: "हजार", 100000: "लाख", 10000000: "कोटी"
  };
  if (num in marathiNumbers) return marathiNumbers[num];
  let words = "";
  if (num >= 10000000) {
    words += numberToMarathiWords(Math.floor(num / 10000000)) + " कोटी ";
    num %= 10000000;
  }
  if (num >= 100000) {
    words += numberToMarathiWords(Math.floor(num / 100000)) + " लाख ";
    num %= 100000;
  }
  if (num >= 1000) {
    words += numberToMarathiWords(Math.floor(num / 1000)) + " हजार ";
    num %= 1000;
  }
  if (num >= 100) {
    words += numberToMarathiWords(Math.floor(num / 100)) + " शंभर ";
    num %= 100;
  }
  if (num > 0) {
    if (words !== "") words += "आणि ";
    if (num in marathiNumbers) words += marathiNumbers[num];
    else words += marathiNumbers[Math.floor(num / 10) * 10] + " " + marathiNumbers[num % 10];
  }

  return words.trim();
};
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
        (wardName === 'All'||!wardName || bill.ward === wardName) &&
        (
          meterPurposeManyName.length === 0 ||
          meterPurposeManyName.includes(bill.meterPurpose)
        )
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
          (wardName === 'All'||!wardName || bill.ward === wardName) &&
          // (!meterPurposeName || bill.meterPurpose === meterPurposeName)
          (!meterPurposeManyName.length || meterPurposeManyName.includes(bill.meterPurpose))
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

  const handleAddReportRemark = () => {
    // console.log("ahshashahshas>>>>>>>>",)
    // setCurrentReport(report);
    setReportRemarkOpen(true);
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


{
(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer')
   &&
    (

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
)}


          {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward==='Head Office') )  && (
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

                )}
          {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer' )  && (
            <>
             


  {/* -----------------------------//----------------------------- */}
             


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
      <InputLabel id="meter-purpose-label">Multiple Meter Purpose</InputLabel>
      <Select
        labelId="meter-purpose-label"
        id="meterPurpose"
        name="meterPurpose"
        multiple
        value={meterPurposeManyName}
        onChange={handleChangeManyMeterPurpose}
        input={<OutlinedInput label="Multiple Meter Purpose" />}
        renderValue={(selected) => selected.join(', ')}
      >
        {meterPurposeData.map((meterdata, index) => (
          <MenuItem key={index} value={meterdata.purpose}>
            <Checkbox checked={meterPurposeManyName.includes(meterdata.purpose)} />
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
              // display: 'flex',
              // justifyContent: 'space-between',
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
        </Box>
        <Box sx={{display:'flex'}}>
        <Button
            sx={{
              color: '#757575',
              border: '0.1px solid #757575',
              cursor: 'pointer',
              textTransform: 'none',
              // display: 'flex',
              // justifyContent: 'space-between',
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
          {/* <Button
            sx={{
              color: '#757575',
              border: '0.1px solid #757575',
              cursor: 'pointer',
              textTransform: 'none',
              // display: 'flex',
              // justifyContent: 'space-between',
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
            onClick={handleMudrank}
          >
            <DownloadIcon />
            <Typography sx={{
              fontSize: isSidebarOpen ? '12.2px' : '14px'
            }}>
              Genrate Mudrank
            </Typography>
          </Button> */}


        <Button
            sx={{
              color: '#757575',
              border: '0.1px solid #757575',
              cursor: 'pointer',
              textTransform: 'none',
              // display: 'flex',
              // justifyContent: 'space-between',
              width: {
                xl: isSidebarOpen ? '20%' : '20%',
                lg: isSidebarOpen ? '20%' : '20%',
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
            onClick={downloadKaryalayinTipani}
          >
            <DownloadIcon />
            <Typography sx={{
              fontSize: isSidebarOpen ? '12.2px' : '14px'
            }}>
              Genrate Karyalayin Tipani
            </Typography>
          </Button> 

          <Box>
  {/* {
  <Button size="small" sx={{ color: '#000'}} onClick={() => handleAddReportRemark()}
  startIcon={<AddIcon size="small"/>}
  variant='outlined'
>
Remark
</Button>
}  */}
</Box>
        </Box>

        
        <PdfPreviewModal 
      open={pdfPreviewOpen} 
      onClose={() => setPdfPreviewOpen(false)} 
      pdfUrl={pdfContent} 
      title="PDF Preview" 
      onDownload={() => {
        const doc = new jsPDF();
        // doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
        // doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
        // doc.setFont("NotoSerifDevanagari");

        doc.addFileToVFS("DVOTSurekh_B_Ship.ttf", notoserifbase);
        doc.addFont("DVOTSurekh_B_Ship.ttf", "DVOTSurekh_B_Ship", "normal");
        doc.setFont("DVOTSurekh_B_Ship");
        doc.save("karyalayin_tipani.pdf");
      }}
    />


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
        <Modal open={reportRemarkOpen} onClose={handleAddReportRemarkClose}>
                  <AddRemarkReport open={reportRemarkOpen} handleClose={handleAddReportRemarkClose} handleAddReport={handleAddReportRemark}
                    currentReport={currentReport}
                    addReport={(reportId, reportData) => {
                      dispatch(addReport(reportId, reportData));
                      dispatch(fetchReports());
                    }}
                  />
                </Modal>

      </Box>
    </div>
  );
};
export default RegionalEnergyExpenditure;