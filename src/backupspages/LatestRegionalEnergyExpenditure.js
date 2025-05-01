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
import logovvcmccmp from '../Images/logovvcmccmp.png';
import AddIcon from '@mui/icons-material/Add';
import { fetchConsumers } from '../store/actions/consumerActions';
import { AddRemarkReport } from '../components/modals/AddRemarkReport';
import { AddRemarkReportExp } from '../components/modals/AddRemarkReportExp';
import { addReport, fetchReports } from '../store/actions/reportActions';
import { DVOTSurekhBShip, loadDvoSBShipFont ,reverseDevanagariText,reverseDevanagariIfNeeded,reverseDevanagariIfContainsViOrLi,fixPashchim} from '../fonts/DVOTSurekh_B_Ship';
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
  const { users } = useSelector((state) => state.users);


  console.log("users testing",users)

  const [billOpen, setBillOpen] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [addFormTtOpen, setAddFormTtOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedBillTt, setSelectedBillTt] = useState(null);
  const [wardName, setWardName] = useState('');
  const [meterPurposeName, setMeterPurposeName] = useState('');
  const [meterPurposeManyName, setMeterPurposeManyName] = useState([]);
  const [reportsArr, setReportsArr] = useState([]);
  const [selectedMonthYear, setSelectedMonthYear] = useState('');
  const [data, setData] = useState([]);
  const [showFormControl, setShowFormControl] = useState(false);
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);
  const [mode,setMode] = useState('');
const [pdfContent, setPdfContent] = useState(null);
const [pdfBlob, setPdfBlob] = useState(null);  // Define the pdfBlob state
const [reportRemarkOpen, setReportRemarkOpen] = useState(false);
 const [currentReport, setCurrentReport] = useState(null);
 const [signatures, setSignatures] = useState({});
 const [pdfType, setPdfType] = useState("");
 const [monthpass,setMonthPass]=useState("");
 const [userSignatures, setUserSignatures] = useState([]);
const [reportingDataSM,setReportingDataSM] = useState([]);
  useEffect(() => {
    dispatch(fetchBills());
    dispatch(fetchConsumers());
  }, [dispatch, data]);



useEffect(() => {
  const fetchSignatures = async () => {
    try {
      const response = await fetch(`${baseUrl}/getReports`);
      const reports = await response.json();
      console.log("response>>>>>",reports)
      


      const latestSignatures = {};

      
      reports.forEach(report => {
        report.reportingRemarks.forEach(remark => {
          // Check if the remark is 'Approved'
          if (
            remark.remark === "Approved" &&
            remark.userId === user._id &&   // Match the userId
            remark.role === user.role &&    // Match the role
            remark.userWard === user.ward   // Match the ward
          ) {
            // Find the corresponding user from the users array
            const matchedUser = users.find(user => user._id === remark.userId && user.ward === remark.userWard && user.role === remark.role);
      
            if (matchedUser && matchedUser.signature) {  // Ensure the user has a signature
              if (!latestSignatures[remark.userWard]) {
                latestSignatures[remark.userWard] = {};
              }
              latestSignatures[remark.userWard][remark.role] = matchedUser.signature;  // Store the signature from the matched user
            }
          }
        });
      });
      
      console.log("latestSignatures=============",latestSignatures);
      
      
      setSignatures(latestSignatures);
      setReportsArr(reports);
    } catch (error) {
      console.error('Error fetching signatures:', error);
    }
  };

  fetchSignatures();
}, []);

useEffect(() => {
  if (users && users.length > 0) {
    const filteredSignatures = users
      .filter(u => u.signature)
      .map(u => ({
        _id: u._id,
        signature: u.signature
      }));
      
    setUserSignatures(filteredSignatures);
  }
}, [users]);


console.log("userSignatures tsting&&&&&&&&&&",userSignatures)

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

    // if (user?.role.startsWith('Junior Engineer')) {
    //   if (user?.ward !== 'Head Office') 
    if (
      (user?.role?.startsWith('Junior Engineer') && user?.ward !== 'Head Office') ||
      ['Lipik', 'Accountant', 'Assistant Municipal Commissioner', 'Dy.Municipal Commissioner'].includes(user?.role)
    ) 
        
        {
        
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
 

  const handleChangeManyMeterPurpose = (event) => {
    const {
      target: { value },
    } = event;
  
    // It will be string if using autofill, so ensure it's array
    setMeterPurposeManyName(typeof value === 'string' ? value.split(',') : value);
  };
  
  


  const handlePdfPreview = (pdfData,type,selMonthYear,wardName) => {
    console.log("typev  ---- ",type)
    setPdfContent(pdfData);  
    setPdfType(type);
    setMonthPass(selMonthYear);
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
  

  let formtype=['form22','tipani','wardbilllist']
  
  const handleDownloadPDF = () => {
    setShowFormControl(true); 
    const doc = new jsPDF('landscape');
      
    const meterPurpose = meterPurposeManyName.length > 0 ? meterPurposeManyName.join(', ') : "N/A";

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
    const pdfData = doc.output('datauristring');
   let type="wardbilllist"
    // Now, pass the PDF data to the modal for preview
    handlePdfPreview(pdfData,type,monthYear);  

    const pdfBlob = doc.output('blob');
    setPdfBlob(pdfBlob);
 
    // doc.save('energy-expenditure-report.pdf');
  };


const handleDownloadForm22 = async() => {
  if (selectedMonthYear) {
    const response = await axios.post(`${baseUrl}/searchReport`, {
      month: selectedMonthYear,
    });
    const foundReport = response.data;
    
      if (foundReport && foundReport[0] && foundReport[0].monthReport === selectedMonthYear) {
      setMode('edit');
    
    
    } else {
      setMode('create');
    }

 
  }
  setShowFormControl(true); 
  
  try {
    // Create PDF in portrait mode
  
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    
    
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
    doc.text(reverseDevanagariIfContainsViOrLi("(नियम २२ (१))"), 85, yPos);

    yPos += 10;
    doc.setFontSize(14);
    doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), 65, yPos);

    yPos += 15;
    doc.setFontSize(11);

    // --- Form Details with Lines ---
    doc.text(reverseDevanagariIfContainsViOrLi("बिल क्रमांक:"), 15, yPos);
    doc.line(40, yPos, 100, yPos);
    doc.text("प्रमाणक क्रमांक:", 105, yPos);
    doc.line(140, yPos, 170, yPos);
    const currentDate = new Date().toLocaleDateString('en-IN');
    doc.text(reverseDevanagariIfContainsViOrLi(`दिनांक ${currentDate}`), 150, yPos);

    yPos += 10;
    doc.text(reverseDevanagariIfContainsViOrLi("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी"), 15, yPos);
    yPos += 8;
    // doc.text(`पत्ता : प्रभाग समिती ${wardname}`, 15, yPos);
    // doc.text(`पत्ता : ${wardname}`, 15, yPos);
     doc.text(`पत्ता : ${user?.ward}`, 15, yPos);

    yPos += 8;
    doc.text(reverseDevanagariIfContainsViOrLi("माल : विद्युत विभाग"), 15, yPos);
    yPos += 8;
    doc.text(reverseDevanagariIfContainsViOrLi("मागणी पुस्तकाचा संदर्भ : लेखा शिर्ष विद्यावती विभाग विद्युत देयक"), 15, yPos);

    // --- Calculate Total Amount ---
    const totalAmount = rows
      .filter(row => row.monthAndYear === selectedMonthYear)
      .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);

      const totalAmountInWords =  (totalAmount); 
     let l1= fixPashchim(`पश्चिम`);

    // --- Main Table ---
    yPos += 10;
    doc.autoTable({
      startY: yPos,
      head: [[
        'अनु.\nक्रमांक',
        'कामाचा किंवा वस्तूंचा तपशील',
        reverseDevanagariIfContainsViOrLi('परिमाण\nकिंवा वजन'),
        'दर',
        reverseDevanagariIfContainsViOrLi('युनिट'),
        'रक्कम\nरु.    पै.'
      ]],
      body: [[
        '१',
        // reverseDevanagariIfContainsViOrLi(`वसई विरार शहर महानगरपालिका कार्यक्षेत्रातील प्रभाग समिती ${wardname} विभागातील विरार ${l1} विभागाचे माहे ${selectedMonthYear} चे विद्युत देयक.`),
        reverseDevanagariIfContainsViOrLi(`वसई विरार शहर महानगरपालिका कार्यक्षेत्रातील प्रभाग समिती ${user?.ward} विभागातील विरार ${l1} विभागाचे माहे ${selectedMonthYear} चे विद्युत देयक.`),

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
      reverseDevanagariIfContainsViOrLi("१) रक्कमेचे नियम वाट्य _______________ रु.\n\n") +
      "२) पूर्वीचा खर्च _______________ रु.\n\n" +
      reverseDevanagariIfContainsViOrLi("३) या बिलांत दर्शविलेला खर्च " + totalAmount.toFixed(2) + "/-\n\n") +
      "२ व ३ यांची बेरीज _______________ रु.\n\n" +
       reverseDevanagariIfContainsViOrLi("उपलब्ध शिल्लक _______________ रु.");

    const rightText = 
       reverseDevanagariIfContainsViOrLi("प्रमाणित करण्यांत येते की या बिलांत\n\n") +
       reverseDevanagariIfContainsViOrLi("दर्शविलेले दर व\n\n") +
       reverseDevanagariIfContainsViOrLi("परिमाणे ही अचूक आहेत आणि\n\n") +
      "सामुग्री, वस्तु यांच्या\n\n" +
       reverseDevanagariIfContainsViOrLi("स्थितीत मिळाल्या असून त्या पुरवठादार यांच्या\n\n") +
       reverseDevanagariIfContainsViOrLi("संख्यात्मक लेख्याच्या समर्थित\n\n") +
      "पुरवठा नोंदवहीत नमूद\n\n" +
      "करण्यात आल्या आहेत.\n\n\n" +
    "____________________________\n\n\n";

   
    
    const labelY = 270; // ~270mm from top is a good spot above the bottom
    let labelText =reverseDevanagariIfContainsViOrLi("दिनांक         वस्तु घेणाऱ्या अधिकाऱ्याची सही");

    const xStart = pageWidth - 90; // align to right side (adjust as needed)

// Signature just above the label line
if (user.ward && signatures[user.ward]?.["Lipik"]) {
  const signatureWidth = 30;
  const signatureHeight = 30;
  const signatureX = pageWidth - signatureWidth - 15;
  const signatureY = labelY - signatureHeight - 0; // just above label
  const signaturePadding = 5; // change as needed

  doc.addImage(
    signatures[user.ward]["Lipik"],
    'PNG',
    signatureX + signaturePadding,
    signatureY + signaturePadding,
    signatureWidth,
    signatureHeight
  );
}

// doc.text("____________________________", xStart, labelY);
      doc.text(labelText, xStart, labelY);  // xStart = left margin or wherever you want text

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
    doc.text(reverseDevanagariIfContainsViOrLi("दिनांक: ----------------------------"), 15, yPos);
    yPos += 15;

    if (user.ward && signatures[user.ward]?.["Accountant"]) {
      const accountantSigWidth = 30;
      const accountantSigHeight = 30;
      const accountantSigX = 15; // aligns with "प्र.लेखापाल"
      const accountantSigY = yPos;
    
      doc.addImage(
        signatures[user.ward]["Accountant"],
        'PNG',
        accountantSigX,
        accountantSigY - accountantSigHeight + 15, // increase this for more downward shift
        accountantSigWidth,
        accountantSigHeight
      );
    }
    
    
    doc.text("-----------------                     -------------------", 15, yPos);
    yPos += 10;
    doc.text("प्र.लेखापाल                            सहा.आयुक्त", 15, yPos);

// // ✅ Signature for "प्र.लेखापाल" just above their label
// if (user.ward && signatures[user.ward]?.["Accountant"]) {
//   const accountantSigWidth = 30;
//   const accountantSigHeight = 30;
//   const accountantSigX = 15; // aligned to start of "प्र.लेखापाल"
//   const accountantSigY = yPos - accountantSigHeight;
//   doc.addImage(
//     signatures[user.ward]["Accountant"],
//     'PNG',
//     accountantSigX,
//     accountantSigY,
//     accountantSigWidth,
//     accountantSigHeight
//   );
// }

// ✅ Signature for "सहा.आयुक्त" (Assistant Municipal Commissioner)
if (user.ward && signatures[user.ward]?.["Assistant Municipal Commissioner"]) {
  const amcSigWidth = 30;
  const amcSigHeight = 30;
  const amcSigX = 80; // Adjust X based on your spacing needs
  const amcSigY = yPos - amcSigHeight + 5;

  doc.addImage(
    signatures[user.ward]["Assistant Municipal Commissioner"],
    'PNG',
    amcSigX,
    amcSigY,
    amcSigWidth,
    amcSigHeight
  );
}
    
    yPos += 7;
  
    
    doc.text(`       प्रभाग समिती-${wardname}`, 15, yPos);
    yPos += 10;
    doc.text("----------------------------------------------------", 15, yPos);
    yPos += 10;

   
    
    // Dynamic totalAmount in Marathi format
    doc.text(reverseDevanagariIfContainsViOrLi(`प्रभाग समिती रु. ${totalAmount.toLocaleString('hi-IN')}/-`), 15, yPos);
    yPos += 10;
    doc.text(`(अक्षरी: ${totalAmountInWords} रुपये देण्यात यावेत)`, 15, yPos);
    yPos += 10;
    doc.text(reverseDevanagariIfContainsViOrLi("दिनांक: _______                        उपायुक्त"), 15, yPos);
    yPos += 15;
    doc.text("-------------------------------------------------------", 15, yPos);
    yPos += 10;
    doc.text("मागणीची संपूर्ण फेड म्हणून", 15, yPos);
    yPos += 10;
    
    yPos += 10;
    
    // Dynamic totalAmount repeated
    doc.text(reverseDevanagariIfContainsViOrLi(`प्रभाग समिती रु. ${totalAmount.toLocaleString('hi-IN')}/-`), 15, yPos);
    yPos += 10;
    doc.text(reverseDevanagariIfContainsViOrLi(`अक्षरी: ${totalAmountInWords} रुपये मिळाले`), 15, yPos);
    yPos += 15;
    doc.text("                                मुद्रांक", 15, yPos);
    yPos += 7;
    doc.text("                                ----------------------", 15, yPos);
    yPos += 7;
    doc.text("                                पैसे घेणाऱ्याची सही", 15, yPos);



    yPos = 30; // Reset yPos for right column
    doc.text(reverseDevanagariIfContainsViOrLi("निर्णय क्रमांक ----------------"), 120, yPos);
    yPos += 10;
    doc.text(reverseDevanagariIfContainsViOrLi("दिनांक ----------------"), 120, yPos);
    yPos += 10;

    // Dynamic totalAmount in right section
    doc.text(reverseDevanagariIfContainsViOrLi(`बिलांत दाखवलेली रु. ${totalAmount.toLocaleString('hi-IN')}/- ची रक्कम`), 120, yPos);
    yPos += 7;
    doc.text(`(अक्षरी रुपये ${totalAmountInWords} मात्र)`, 120, yPos);
    yPos += 10;
    doc.text("मंजूर करण्यात येत आहे.", 120, yPos);
    yPos += 10;
    doc.text(reverseDevanagariIfContainsViOrLi("मुख्य लेखाधिकारी ----------------------"), 120, yPos);
    yPos += 10;
    doc.text(reverseDevanagariIfContainsViOrLi("दिनांक                          उप-आयुक्त"), 120, yPos);


    // ✅ Signature for "Dy. Municipal Commissioner"
if (user.ward && signatures[user.ward]?.["Dy.Municipal Commissioner"]) {
  const dmcSigWidth = 30;
  const dmcSigHeight = 30;
  const dmcSigX = 160; // Adjust X based on alignment with 'उप-आयुक्त'
  const dmcSigY = yPos - dmcSigHeight + 5; // moved slightly below the label

  doc.addImage(
    signatures[user.ward]["Dy.Municipal Commissioner"],
    'PNG',
    dmcSigX,
    dmcSigY,
    dmcSigWidth,
    dmcSigHeight
  );
}
    doc.text(reverseDevanagariIfContainsViOrLi("वसई-विरार शहर महानगरपालिका"), 120, yPos + 7);

    yPos += 15;
    doc.text("----------------------------------------------------", 120, yPos);
    doc.text("---------------- प्रदानार्थ लेखापाल -------------------------------------------------------------- यांस,", 120, yPos + 7);
    yPos += 15;
    doc.text("------------------------                  -------------------------", 120, yPos);
    yPos += 10;
    doc.text(reverseDevanagariIfContainsViOrLi("दिनांक                          उप-आयुक्त"), 120, yPos);
    doc.text(reverseDevanagariIfContainsViOrLi("वसई-विरार शहर महानगरपालिका"), 120, yPos + 7);

    yPos += 15;
doc.text("----------------------------------------------------", 120, yPos);

yPos += 10; // इथे गॅप वाढवला
doc.text(reverseDevanagariIfContainsViOrLi("धनादेश क्रमांक ----------  दिनांक  ------------"), 120, yPos);

    yPos += 10;
    doc.text(reverseDevanagariIfContainsViOrLi("द्वारे देण्यात आले आणि ----------------------"), 120, yPos);
    doc.text(reverseDevanagariIfContainsViOrLi("प्रस्तावित रोख वहित नोंद घेतली"), 120, yPos + 7);
    yPos += 20;
    doc.text("----------------------                  ---------------------------------", 120, yPos);
    yPos += 10;
    doc.text("रोखपाल                          उप-आयुक्त", 120, yPos);
    doc.text(reverseDevanagariIfContainsViOrLi("वसई-विरार शहर महानगरपालिका"), 120, yPos + 7);

    doc.line(110, 60, 110, yPos + 10); // **ही लाइन आता 60 पासून सुरू होईल**


   
    
    if (signatures['Junior Engineer']) {
      doc.addImage(signatures['Junior Engineer'], 'PNG', 15, yPos, 30, 15);
      doc.text("Junior Engineer", 15, yPos + 20);
    }

    if (signatures['Executive Engineer']) {
      doc.addImage(signatures['Executive Engineer'], 'PNG', 120, yPos, 30, 15);
      doc.text("Executive Engineer", 120, yPos + 20);
    }

    if (signatures['Dy.Municipal Commissioner']) {
      doc.addImage(signatures['Dy.Municipal Commissioner'], 'PNG', 120, yPos + 40, 30, 15);
      doc.text("Dy.Municipal Commissioner", 120, yPos + 60);
    }

    const pdfData = doc.output('blob'); // Get Blob format

// Convert Blob to Object URL for preview
const pdfUrl = URL.createObjectURL(pdfData);
let type="form22";
handlePdfPreview(pdfUrl,type,selectedMonthYear);
setPdfBlob(pdfData);

    const blob = new Blob([pdfBlob], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    
  
  } catch (error) {
    console.error('Error generating Form 22 PDF:', error);
  }
};






// --------------------------------------------------------------------


const downloadKaryalayinTipani =async() => {
 

if (selectedMonthYear) {
  const response = await axios.post(`${baseUrl}/searchReport`, {
    month: selectedMonthYear,
  });

  const foundReport = response.data;
  console.log("foundReport-->>>",foundReport)

  if (foundReport && foundReport[0] && foundReport[0].monthReport === selectedMonthYear) {
    setMode('edit');

    
    const wardReport = foundReport.find(
      report => report.ward === user.ward || wardName && report.monthReport === selectedMonthYear
    );
console.log("wardReport--->>>>",wardReport)
if (wardReport) {

  var reportingData = wardReport.reportingRemarks.map((remark) => {
    return {
      userId:remark.userId,
      ward:remark.userWard,  
      role:remark.role,
      remark: remark.remark,
      signature:remark.signature
    };
  }).filter(item => item !== null); 

 
  console.log("Reporting Data:", reportingData);
  setReportingDataSM(reportingData)
  console.log(reportingDataSM)
}
  } else {
    setMode('create');
  }
}

 
  setShowFormControl(true); 

    
try {
 
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  doc.addFileToVFS("DVOTSurekh_B_Ship.ttf",DVOTSurekhBShip);
    doc.addFont("DVOTSurekh_B_Ship.ttf", "DVOTSurekh_B_Ship", "normal");
    loadDvoSBShipFont(doc);
    doc.setFont("DVOTSurekh_B_Ship");
 
  const totalAmount = rows
  .filter(row => row.monthAndYear === selectedMonthYear)
  .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);
  const totalAmountInWords = numberToMarathiWords(totalAmount);
  const pageWidth = doc.internal.pageSize.width;
  const leftSectionWidth = pageWidth * 0.15; 
  const rightSectionStart = leftSectionWidth + 5; 
  const rightAlignX = pageWidth - 15; 
  let yPos = 15;
  
  doc.setFontSize(10);
  doc.text(reverseDevanagariIfContainsViOrLi("व. वि. श."), 10, yPos); 
  yPos += 6; 
  doc.text(reverseDevanagariIfContainsViOrLi("महानगरपालिका"), 10, yPos); 
  
  doc.setDrawColor(0);
  doc.setLineWidth(0.2);
  doc.line(leftSectionWidth, 10, leftSectionWidth, 290); 
  
  doc.setFontSize(16);
  doc.text(reverseDevanagariIfContainsViOrLi("कार्यालयीन टिपणी"), rightSectionStart + 30, 20);
  doc.setFontSize(12);
  yPos = 30;
  const currentDate = new Date().toLocaleDateString('en-IN');
  doc.text(reverseDevanagariIfContainsViOrLi(`दिनांक: ${currentDate}`), rightAlignX, yPos, { align: "right" });
  yPos += 7;
  const wardname = [...new Set(
    rows.filter(row => row.ward === wardName) 
    .map(row => row.ward) 
)].join(', '); 
  doc.text(`${wardname}`, rightAlignX, yPos, { align: "right" });
  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi("विभाग: दिवाबत्ती"), rightAlignX, yPos, { align: "right" });
  yPos += 10;
  doc.text("मा.साहेब,", rightSectionStart, yPos);
  yPos += 7;
  const meterpurposename = [...new Set(
    rows.filter(row => row.meterPurpose === meterPurposeName) 
        .map(row => row.meterPurpose)
)].join(', '); 
  doc.text(reverseDevanagariIfContainsViOrLi(`सादर करण्यात येते की, वसई विरार शहर महानगरपालिका ${wardname}`), rightSectionStart, yPos);
  yPos += 7;
  const meterPurpose = meterPurposeManyName.length > 0 ? meterPurposeManyName.join(', ') : "N/A";



  doc.text(reverseDevanagariIfContainsViOrLi(`हद्दीत महानगरपालिकेतर्फे सार्वजनिक रस्त्यांवरील ${meterPurpose}`), rightSectionStart, yPos);
yPos += 7;
 
  doc.text(reverseDevanagariIfContainsViOrLi("दिवाबत्तीची सोय केलेली आहे."), rightSectionStart, yPos);
  yPos += 10;
  doc.text(reverseDevanagariIfContainsViOrLi("यासाठी महाराष्ट्र राज्य वीज वितरण कंपनी लि. यांच्यातर्फे वीज पुरवठा"), rightSectionStart, yPos);
  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi("केलेला आहे. या कामी मा.रा.वी.वितरण कंपनी लिमिटेड यांच्याकडून पश्चिम"), rightSectionStart, yPos);
  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi(`विभागासाठी ${selectedMonthYear} रक्कम रुपये ${totalAmount.toLocaleString('hi-IN')}/-`), rightSectionStart, yPos);
  yPos += 7;
  doc.text(`(अक्षरी रुपये ${totalAmountInWords} फक्त) चे वीज देयक सदर`, rightSectionStart, yPos);
  yPos += 7;
  doc.text("करून मागणी केलेली आहे.", rightSectionStart, yPos);
  yPos += 10;
  doc.text("-----------------------------------------------------------------------------------------------------", rightSectionStart, yPos);
  yPos += 25;



if (user.role === "Lipik") {
  // Check if the userId exists in reportingRemarks
  const matchedRemark = reportingDataSM.find(remark => remark.userId === user._id);
  // const matchedRemark = reportingData.find(remark => remark.userId === user._id);

  
  if (matchedRemark && matchedRemark.remark === "Approved" && matchedRemark.signature) {
    // If signature is found in reportingRemarks
    const signatureWidth = 30;
    const signatureHeight = 15;

    console.log("  matchedRemark.signature,", matchedRemark.signature,)
    doc.addImage(
      matchedRemark.signature,
      'PNG',
      rightSectionStart,
      yPos - 17 - 5,
      signatureWidth,
      signatureHeight
    );
  } 
  else {
    // If userId not found or no signature, add default signature
    const defaultSignature = userSignatures.find(sig => sig._id === user._id);

    if (defaultSignature) {
      const signatureWidth = 30;
      const signatureHeight = 15;

      doc.addImage(
        defaultSignature.signature,
        'PNG',
        rightSectionStart,
        yPos - 17 - 5,
        signatureWidth,
        signatureHeight
      );
    }
  }
}

  doc.text(reverseDevanagariIfContainsViOrLi("लिपिक, विद्युत विभाग"), rightSectionStart, yPos);



if (user.role === "Junior Engineer" && user.ward !== "Head Office") {
  const matchedSignature = userSignatures.find(sig => sig._id === user._id);

  if (matchedSignature) {
    const signatureWidth = 30;
    const signatureHeight = 15;

    const xPos = rightSectionStart + 70; // align with text
    const yOffset = yPos - 17 - 7; // 100px वर

    doc.addImage(
      matchedSignature.signature,
      'PNG',
      xPos,
      yOffset,
      signatureWidth,
      signatureHeight
    );
  }



  doc.text("कनिष्ठ अभियंता (ठेका)", rightSectionStart + 70, yPos);
}


  

  if (user.role === "Junior Engineer" && user.ward === "Head Office") {
    const matchedSignature = userSignatures.find(sig => sig._id === user._id);
  
    if (matchedSignature) {
      const signatureWidth = 30;
      const signatureHeight = 15;
  
      const xPos = rightSectionStart + 115; // align with text
      const yOffset = yPos - 17 - 5; // 100px वर
  
      doc.addImage(
        matchedSignature.signature,
        'PNG',
        xPos,
        yOffset,
        signatureWidth,
        signatureHeight
      );
    }
  
  
  
     doc.text(
        reverseDevanagariIfContainsViOrLi("कनिष्ठ अभियंता विद्युत (मुख्यालय)"),
        rightSectionStart , yPos
      );
  }
  

  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi("प्रभाग समिती (अ)"), rightSectionStart, yPos);
  doc.text("प्रभाग समिती (अ)", rightSectionStart + 70, yPos);
  doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), rightSectionStart + 115, yPos);
  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), rightSectionStart, yPos);
  yPos += 10;
 
  yPos += 10;
  doc.text("मा.सदर,", rightSectionStart, yPos);
  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिकेच्या विद्युत विभागाने सदर केलेल्या अहवालानुसार:"), rightSectionStart, yPos);
  yPos += 7;
  doc.text("१) आर्थिक वर्ष: २०२४-२५", rightSectionStart, yPos);
  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi("२) लेखाशिर्ष: दिवाबत्ती वीज देयक"), rightSectionStart, yPos);
  yPos += 7;
  doc.text("३) मूळ तरतूद: २,१७,२०,०००/-", rightSectionStart, yPos);
  yPos += 7;
  doc.text("४) आतापर्यंतचा खर्च: ३,१६,४५,०३०/-", rightSectionStart, yPos);
  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi(`५) प्रस्तावित देयक रक्कम: ${totalAmount.toLocaleString('hi-IN')} /-`), rightSectionStart, yPos);
  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi("६) शिल्लक तरतूद: १८,४८,१४,२५०/-"), rightSectionStart, yPos);
  yPos += 10;

  doc.text(reverseDevanagariIfContainsViOrLi("तरी सदरचे देयक महाराष्ट्र राज्य वीज वितरण कंपनी लिमिटेड यांना"), rightSectionStart, yPos);
  yPos += 7;
  doc.text("उदाहोण्यासाठी मंजुरीस्तव सदर.", rightSectionStart, yPos);
  yPos += 25;
 
 



if (user.role === "Accountant") {
  const matchedSignature = userSignatures.find(sig => sig._id === user._id);

  // Use position from signatures[user.ward]["Accountant"]
  if (matchedSignature && user.ward && signatures[user.ward]?.["Accountant"]) {
    const signatureWidth = 30;
    const signatureHeight = 15;

    // Use position from original block
    const xPos = rightSectionStart;
    const yOffset = yPos - signatureHeight - 5;

    doc.addImage(
      matchedSignature.signature,
      'PNG',
      xPos,
      yOffset,
      signatureWidth,
      signatureHeight
    );

    doc.text(
      reverseDevanagariIfContainsViOrLi("लेखापाल"),
      xPos,
      yPos
    );
  }
}


  

  if (user.role === "Assistant Municipal Commissioner") {
    const matchedSignature = userSignatures.find(sig => sig._id === user._id);
  
    if (matchedSignature) {
      const signatureWidth = 30;
      const signatureHeight = 15;
  
      const xPos = 120; // याच position वर घ्यायचं आहे
      const yOffset = yPos - signatureHeight + 5; // आधीच्या logic नुसार
  
      doc.addImage(
        matchedSignature.signature,
        'PNG',
        xPos,
        yOffset,
        signatureWidth,
        signatureHeight
      );
    }
  
    doc.text(
      reverseDevanagariIfContainsViOrLi("सहाय्यक आयुक्त"),
      rightSectionStart + 75, yPos
    );
  }



  doc.text("", rightSectionStart + 140, yPos);
  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi("प्रभाग समिती (अ)"), rightSectionStart, yPos);
  doc.text(reverseDevanagariIfContainsViOrLi("प्रभाग समिती (अ)"), rightSectionStart + 75, yPos);
  doc.text("", rightSectionStart + 140, yPos);
  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), rightSectionStart, yPos);
  doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), rightSectionStart + 75, yPos);
  doc.text("", rightSectionStart + 140, yPos);


  const addSignatures = () => {
    let signatureYPos = yPos + 20;
   
   
    const spacing = 40;
  
  
  
  
   
    signatureYPos += spacing * 2;
    doc.text("प्रभाग समिती (अ)", rightSectionStart, signatureYPos);
    doc.text("वसई विरार शहर महानगरपालिका", rightSectionStart, signatureYPos + 7);
  };
  

 
  
  
  
  addSignatures();
 
  const pdfData = doc.output('datauristring');
let type="karyalayintipani";
  
  handlePdfPreview(pdfData,type,selectedMonthYear,wardName);  
   
   const pdfBlob = doc.output('blob');
   setPdfBlob(pdfBlob);


} catch (error) {
  console.error("Error generating Karyalayin Tipani PDF:", error);
}
}

useEffect(() => {
  console.log('Mode has been updated:', mode);
}, [mode]);





const downloadFaultyMeterReport = () => {
  setShowFormControl(true);
  try {
 
    var doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
   
    doc.addFileToVFS("DVOTSurekh_B_Ship.ttf",DVOTSurekhBShip);
    doc.addFont("DVOTSurekh_B_Ship.ttf", "DVOTSurekh_B_Ship", "normal");
    loadDvoSBShipFont(doc);
    doc.setFont("DVOTSurekh_B_Ship");


    doc.setFontSize(12);

    const pageWidth = doc.internal.pageSize.getWidth();

    
    const leftX = 10;
    const centerX = pageWidth / 2-10;
    const rightX = pageWidth - 60;
    let y = 20;

    
    
    let address = "वसई विरार शहर महानगरपालिका,\nप्रभाग समिती";

if (user?.ward === "Ward-A") {
  address = "वसई विरार शहर महानगरपालिका,\nप्रभाग समिती अ, बोळींज";
} else if (user?.ward === "Ward-B") {
  address = "प्रभाग समिती बी,\nविरार (पूर्व), मच्छि मार्केट जवळ, निळेमोरे रोड,\nनालासोपारा (पश्चिम)";
} else if (user?.ward === "Ward-C") {
  address = "प्रभाग समिती सी,\nचंदनसार कार्यालय, बहुउद्देशीय इमारत, विरार पू.\nतालुका वसई, जि. पालघर 401305";
} else if (user?.ward === "Ward-D") {
  address = "प्रभाग समिती (डी),\nआचोळे, आचोळे तलावा जवळ,\nआचोळे गाव,\nनालासोपारा पूर्व";
} else if (user?.ward === "Ward-E") {
  address = "प्रभाग समिती 'ई',\nनालासोपारा (प.),\nवृंदावन गार्डन जवळ,\nनालासोपारा (पश्चिम),\nपिन कोड नं. 401203";
} else if (user?.ward === "Ward-F") {
  address = "प्रभाग समिती एफ,\nधानिव / पेल्हार,\nगावदेवी मंदिर जवळ, पेल्हार गाव,\nडोंगरपाडा रस्ता";
} else if (user?.ward === "Ward-G") {
  address = "प्रभाग समिती जी,\nवालीव, वसई ईस्ट,\nवालीव नाका,\n401208";
} else if (user?.ward === "Ward-I") {
  address = "वसई विरार शहर महानगरपालिका,\nप्रभाग समिती आय कार्यालय,\nसर. डी. एम. पेटीट रुग्णालयाच्या समोर ,\nपारनाका, वसई गाव, ता. वसई, जि. पालघर,\nपिन कोड 401201";
}


const addressLines = address.split("\n").map(line => reverseDevanagariIfContainsViOrLi(line));
addressLines.forEach((line, index) => {
  doc.text(line, leftX, y + index * 6); 
});

    

    
    doc.text("दूरध्वनी : ०२५०-२३३४१४४", rightX, y);
    doc.text("फॅक्स : ०२५०-२५२५१०७", rightX, y + 6);
    doc.text("जा.क्र. :-", rightX, y + 18);
    doc.text(reverseDevanagariIfContainsViOrLi("दिनांक :-"), rightX, y + 24);

   let yPos = 15;
    const logoWidth = 30;
const logoHeight = 30;

const pageHeight = doc.internal.pageSize.getHeight();
const centerY = yPos + 0;


doc.addImage(logovvcmccmp, 'PNG', centerX, centerY, logoWidth, logoHeight);

y += 36; 
const lineY = y - 2; 
doc.line(10, lineY, doc.internal.pageSize.getWidth() - 10, lineY); 
y += 15; 

    
    doc.text("प्रति,", leftX, y);
    y += 8;
    doc.text(reverseDevanagariIfContainsViOrLi("मा. उप-कार्यकारी अभियंता"), leftX, y);
    y += 8;
    doc.text(reverseDevanagariIfContainsViOrLi("म.रा.वि.वि.कं.लि,"), leftX, y);
    y += 8;
    doc.text("वसई प.", leftX, y);
    y += 12;

    

    
    doc.setFontSize(15);
    
    const subjectText = reverseDevanagariIfContainsViOrLi("विषय:- फॉल्टी मिटर बाबत.");

doc.text(subjectText, pageWidth / 2, y, { align: "center" });
y += 12;
    y += 12;


const normalSpacing = 8;
const extraSpacing = 14; 
 const leftspaceX = leftX + 15; 
 doc.setFontSize(14); 

 
doc.text(reverseDevanagariIfContainsViOrLi("महोदय, उपरोक्त विषयान्वये कळविण्यात येते की,"), leftspaceX, y);
y += normalSpacing;
doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका, प्रभाग समिती 'एच'"), leftspaceX, y);
y += extraSpacing;

doc.text(reverseDevanagariIfContainsViOrLi("दिवागणमन तलाव ग्राहक क्र. श्री फेज विद्युत मिटर फॉल्टी असून"), leftspaceX, y);
y += normalSpacing;
doc.text(reverseDevanagariIfContainsViOrLi("सदर मिटर बदली करून नविन मिटर बसविणे गरजेचे आहे."), leftspaceX, y);
y += extraSpacing;

doc.text(reverseDevanagariIfContainsViOrLi("जेणे करून रिडींग प्रमाणे बिल भरणे सोईचे होईल."), leftspaceX, y);
y += normalSpacing;
doc.text(reverseDevanagariIfContainsViOrLi("सदर कामी म.रा.वि.वि.कं.लि. नियमानुसार"), leftspaceX, y);
y += extraSpacing;

doc.text(reverseDevanagariIfContainsViOrLi("नविन मिटर बसविण्याचे मागणीपत्रक (Form quotation)"), leftspaceX, y);
y += normalSpacing;
doc.text(reverseDevanagariIfContainsViOrLi("महापालिकेकडे पाठवावे ही विनंती."), leftspaceX, y);
y += extraSpacing;
   
    y = 240;
const signatureX = pageWidth - 60;


let prabhagSamitiText = "प्रभाग समिती";


if (user?.ward === "Ward-A") {
  prabhagSamitiText = "प्रभाग समिती अ";
} else if (user?.ward === "Ward-B") {
  prabhagSamitiText = "प्रभाग समिती बी";
} else if (user?.ward === "Ward-C") {
  prabhagSamitiText = "प्रभाग समिती सी";
} else if (user?.ward === "Ward-D") {
  prabhagSamitiText = "प्रभाग समिती डी";
} else if (user?.ward === "Ward-E") {
  prabhagSamitiText = "प्रभाग समिती 'ई'";
} else if (user?.ward === "Ward-F") {
  prabhagSamitiText = "प्रभाग समिती एफ";
} else if (user?.ward === "Ward-G") {
  prabhagSamitiText = "प्रभाग समिती जी";
} else if (user?.ward === "Ward-H") {
  prabhagSamitiText = "प्रभाग समिती एच";
} else if (user?.ward === "Ward-I") {
  prabhagSamitiText = "प्रभाग समिती आय";
}


;


const rightPadding = 100;
const rightlX = pageWidth - 10; 

doc.text(reverseDevanagariIfContainsViOrLi("अधिक्षक, विद्युत विभाग"), rightlX, y, { align: 'right' });
doc.text(reverseDevanagariIfContainsViOrLi(prabhagSamitiText), rightlX, y + 8, { align: 'right' });
doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), rightlX, y + 16, { align: 'right' });

    const pdfData = doc.output('datauristring');
    let type = "faultymeter";
    
    handlePdfPreview(pdfData, type, selectedMonthYear);

    const pdfBlob = doc.output('blob');
    setPdfBlob(pdfBlob);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
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
              sm: '20px',
              xs: '20px',
              md: '20px',
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
(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer'|| user?.role === 'Lipik' || user.role==='Accountant' || user.role==='Assistant Municipal Commissioner' || user.role==='Dy.Municipal Commissioner')
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
          {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer'|| user?.role === 'Lipik' || user.role==='Accountant' || user?.role === 'Junior Engineer' )  && (
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
            {/* <DownloadIcon /> */}
            <Typography sx={{
              fontSize: isSidebarOpen ? '12.2px' : '14px'
            }}>
             Ward Bill Totals
            </Typography>
          </Button>
         
        </Box>
        <Box sx={{display:'flex',flexDirection: {
      xs: 'column', // mobile
      sm: 'column', // small tablets
      md: 'row', // tablets
     
    },
    mb:{
      md:1
    }
    }}>
        <Button
            sx={{
              color: '#757575',
              border: '0.1px solid #757575',
              cursor: 'pointer',
              textTransform: 'none',
             
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
              mt:{
                xl: 0,
                lg: 0,
                md: 0,
                sm: 1,
                xs:1
              },
              height: '65%',
            }}
            onClick={handleDownloadForm22}
          >
            {/* <DownloadIcon /> */}
            <Typography sx={{
              fontSize: isSidebarOpen ? '12.2px' : '14px'
            }}>
              Form 22 report PDF
            </Typography>
          </Button>
          


        <Button
            sx={{
              color: '#757575',
              border: '0.1px solid #757575',
              cursor: 'pointer',
              textTransform: 'none',
              
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
                md: 1,
                sm: 0
              },
              mt:{
                xl: 0,
                lg: 0,
                md: 0,
                sm: 1,
                xs:1
              },
              height: '65%',
            }}
            onClick={downloadKaryalayinTipani}
          >
            {/* <DownloadIcon /> */}
            <Typography sx={{
              fontSize: isSidebarOpen ? '12.2px' : '14px'
            }}>
              Genrate Karyalayin Tipani
            </Typography>
          </Button> 

          <Button
            sx={{
              color: '#757575',
              border: '0.1px solid #757575',
              cursor: 'pointer',
              textTransform: 'none',
             
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
                md: 1,
                sm: 0
              },
              mt:{
                xl: 0,
                lg: 0,
                md: 0,
                sm: 1,
                xs:1

              },
              height: '65%',
            }}
            onClick={downloadFaultyMeterReport}
          >
            {/* <DownloadIcon /> */}
            <Typography sx={{
              fontSize: isSidebarOpen ? '12.2px' : '14px'
            }}>
             Faulty Meter Report
            </Typography>
          </Button> 

          <Box>
 
</Box>
        </Box>

        
       <PdfPreviewModal 
       mode={mode}
      open={pdfPreviewOpen} 
      onClose={() => setPdfPreviewOpen(false)} 
      pdfUrl={pdfContent} 
      monthpassbackend={monthpass}
      wardName={wardName}
      // title={pdfType === "tipani" ? "karyalayintipani" : pdfType === "form22" ? "form22" : "wardbilllist"}
      title={pdfType}

      onDownload={() => {
        const doc = new jsPDF();
        doc.addFileToVFS("DVOTSurekh_B_Ship.ttf",DVOTSurekhBShip);
        doc.addFont("DVOTSurekh_B_Ship.ttf", "DVOTSurekh_B_Ship", "normal");
        doc.setFont("DVOTSurekh_B_Ship");
        doc.save("karyalayin_tipani.pdf");
      }}
    />

{["Junior Engineer", "Executive Engineer", "Admin", "Super Admin","Lipik"].includes(user.role) && (
  
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
)}
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