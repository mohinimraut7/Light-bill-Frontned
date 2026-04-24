



import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import {
  Typography, Box, Button, FormControl, InputLabel,
  Select, MenuItem, Checkbox, OutlinedInput, CircularProgress
} from '@mui/material';
import PdfPreviewModal from '../components/modals/PdfPreviewModal';

import RegionalEnergyExpenditureBillDatePicker from '../components/RegionalEnergyExpenditureBillDatePicker';


import wardDataAtoI from '../data/warddataAtoI';
import meterPurposeData from '../data/meterpurpose';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { styled } from '@mui/material/styles';
import {
  DVOTSurekhBShip, loadDvoSBShipFont, reverseDevanagariIfContainsViOrLi
} from '../fonts/DVOTSurekh_B_Ship';
import FaultyMeterConsumerNumber from '../components/modals/FaultyMeterConsumerNumber';
import { toast } from 'react-toastify';


import './RegionalEnergyExpenditure.css';
import html2pdf from "html2pdf.js";



import logovvcmc from '../Images/vvcmclogo.jpg';
import logovvcmccmp from '../Images/logovvcmccmp.png';
import karyalayintipani from '../Images/karyalayintipani.png';


import FAWardAAddress from '../Images/FAWardAAddress.png';
import FAWardBAddress from '../Images/FAWardBAddress.png';
import FAWardCAddress from '../Images/FAWardCAddress.png';
import FAWardDAddress from '../Images/FAWardDAddress.png';
import FAWardEAddress from '../Images/FAWardEAddress.png';
import FAWardFAddress from '../Images/FAWardFAddress.png';
import FAWardGAddress from '../Images/FAWardGAddress.png';
import FAWardHAddress from '../Images/FAWardHAddress.png';
import FAWardIAddress from '../Images/FAWardIAddress.png';

import FAPratiVirarPurv from '../Images/PratiVirarPurv.png';
import FAPratiVirarPachhim from '../Images/PratiVirarPachhim.png';
import FAPratiNalasoparaPurv from '../Images/PratiNalasoparaPurv.png';
import FAPratiNalasoparaPacchim from '../Images/PratiNalasoparaPacchim.png';
import FAPratiVasaiPurv from '../Images/PratiVasaiPurv.png';
import FAPratiVasaiPacchim from '../Images/PratiVasaiPacchim.png';







import prabhagsamiti from '../Images/prabhagsamiti.png';
import Akshari from '../Images/Akshari.png';

import divabatti from '../Images/divabatti.png';
import mahanagarpaliketarfe from '../Images/mahanagarpaliketarfe.png';
import maharashtra from '../Images/maharashtra.png';
import maharashtarlong from '../Images/maharashtarlong.png';
import kelelaAaheYaKami from '../Images/kelelaAaheYaKami.png';
import prastavitdeyakrakkam2 from '../Images/prastavitdeyakrakkam2.png';
import aarthikvarsh from '../Images/aarthikvarsh.png';
import lekhashirshDivabattiVijDeyak from '../Images/lekhashirshDivabattiVijDeyak.png';
import aataparyantachaKharch from '../Images/aataparyantachaKharch.png';
import yanaUdaHones from '../Images/yanaUdaHones.png';
import mahanagarpalikechya from '../Images/mahanagarpalikechya.png';

import kanistaabhiyanataward from '../Images/kanistaabhiyanataward.png';
import kanistaabhiyantaho from '../Images/kanistaabhiyantaho.png';

const rowColors = ['#F7F9FB', 'white'];
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-cell': { padding: theme.spacing(1) },
  '& .MuiDataGrid-row': {
    '&:nth-of-type(odd)': { backgroundColor: rowColors[0] },
    '&:nth-of-type(even)': { backgroundColor: rowColors[1] },
  },
  '& .total-row': { fontWeight: 'bold', backgroundColor: '#f0f0f0', color: '#1976d2' },
}));

const gridStyle = {
  height: 'auto',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px 0px',
  paddingLeft: '0px',
};



const RegionalEnergyExpenditure = () => {
  const dispatch = useDispatch();
  const { bills = [], loading, pagination = {} } = useSelector(state => state.bills || {});

  const allBills = useSelector(state => state.bills.allBills);
  const { consumers = [] } = useSelector(state => state.consumers || {});
  const user = useSelector(state => state.auth.user);
  const isSidebarOpen = useSelector(state => state.sidebar.isOpen);
  const { users = [] } = useSelector(state => state.users || {});

  const [selectedMonthYear, setSelectedMonthYear] = useState('');

  // const [wardName, setWardName] = useState('');


const [wardName, setWardName] = useState(
  user?.ward === 'Head Office' ||
  user?.role === 'Admin' ||
  user?.role === 'Super Admin' ||
  user?.role === 'Executive Engineer'
    ? ''              // 👉 All wards allowed
    : user?.ward      // 👉 JE Ward A–I
);



  const [meterPurposeManyName, setMeterPurposeManyName] = useState([]);

  // Perfect server-side pagination (taken from code-2)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [allBillsForDownload, setAllBillsForDownload] = useState([]);

  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);
  const [pdfContent, setPdfContent] = useState(null);
  const [pdfType, setPdfType] = useState('');
  const [monthPass, setMonthPass] = useState('');
  const [pdfBlob, setPdfBlob] = useState(null);

  const [showFormControl, setShowFormControl] = useState(false);

  const [faultyMeterModalOpen, setFaultyMeterModalOpen] = useState(false);
  const [jakraKramank, setJakraKramank] = useState('');
  const [consumerNumber, setConsumerNumber] = useState('');
  const [date, setDate] = useState('');

  const [mode, setMode] = useState('');
  const [reportingDataSM, setReportingDataSM] = useState([]);
  const [monthArr, setMonthArr] = useState([]);
 


    // Snackbar states
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  // Close handlers
  const handleCloseFaultyMeterModal = () => setFaultyMeterModalOpen(false);
  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Dummy / Placeholder functions (replace with real ones if available)
  const fetchReportData = async () => ({ foundReport: null, reportingData: [] });
  const checkSignatureStatusForm22 = () => ["not-verified", false, false, "not-verified", "not-verified", "not-verified"];

  // Build filters exactly as in code-2
  const buildFilters = () => ({
    ...(selectedMonthYear && { selectedMonthYear }),
    ...(wardName && { wardName }),
    ...(meterPurposeManyName.length > 0 && { meterPurpose: meterPurposeManyName }),
  });

  const fetchEnergyBills = (page = 1, limit = 10, fetchAll = false) => {
    dispatch(fetchBills(page, limit, buildFilters(), fetchAll));
  };

  // Pagination & filter changes (exactly from code-2)
  useEffect(() => {
    fetchEnergyBills(paginationModel.page + 1, paginationModel.pageSize);
  }, [paginationModel]);

  useEffect(() => {
    setPaginationModel(prev => ({ ...prev, page: 0 }));
    fetchEnergyBills(1, paginationModel.pageSize);
  }, [selectedMonthYear, wardName, meterPurposeManyName]);

  // Fetch all bills for PDF download when filters change
  useEffect(() => {
    if (selectedMonthYear || wardName || meterPurposeManyName.length > 0) {
      fetchEnergyBills(1, 10000, true);
    }
  }, [selectedMonthYear, wardName, meterPurposeManyName]);

  useEffect(() => {
    setAllBillsForDownload(bills);
  }, [bills]);

  const handlePaginationModelChange = (newModel) => setPaginationModel(newModel);

  const handleDateChange = (value) => {
    if (value && typeof value === 'string') {
      setSelectedMonthYear(value.toUpperCase().trim());
    } else {
      setSelectedMonthYear('');
    }
  };

  const innerDivStyle = {
  border: '1px solid #F7F7F8',
  width: '99%',
  // padding: '30px 10px',
  paddingTop: isSidebarOpen ? '0px' : '30px',  
};

  const handleChangeWard = (e) => setWardName(e.target.value);

  const handleChangeManyMeterPurpose = (e) => {
    const value = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;
    setMeterPurposeManyName(value);
  };




  const handlePdfPreview = async (pdfData, type, selMonthYear) => {
  try {
    let finalUrl = pdfData;

    // ✅ If pdfData is dataURI -> convert to Blob URL
    if (typeof pdfData === "string" && pdfData.startsWith("data:application/pdf")) {
      const res = await fetch(pdfData);
      const blob = await res.blob();
      finalUrl = URL.createObjectURL(blob); // ✅ blob url for preview
    }

    setPdfContent(finalUrl);
    setPdfType(type);
    setMonthPass(selMonthYear);
    setPdfPreviewOpen(true);
  } catch (err) {
    console.log("Preview error:", err);
    toast.error("Preview failed, please try again");
  }
};


  // Helper functions (unchanged from code-1)
  const getWardAddressImage = (ward) => {
    const map = {
      "Ward-A": FAWardAAddress,
      "Ward-B": FAWardBAddress,
      "Ward-C": FAWardCAddress,
      "Ward-D": FAWardDAddress,
      "Ward-E": FAWardEAddress,
      "Ward-F": FAWardFAddress,
      "Ward-G": FAWardGAddress,
      "Ward-H": FAWardHAddress,
      "Ward-I": FAWardIAddress,
    };
    return map[ward] || null;
  };

  const getWardPrati = (ward) => {
    const map = {
      "Ward-A": FAPratiVirarPachhim,
      "Ward-B": FAPratiVirarPurv,
      "Ward-C": FAPratiVirarPurv,
      "Ward-D": FAPratiNalasoparaPurv,
      "Ward-E": FAPratiNalasoparaPacchim,
      "Ward-F": FAPratiVasaiPurv,
      "Ward-G": FAPratiVasaiPurv,
      "Ward-H": FAPratiVasaiPacchim,
      "Ward-I": FAPratiVasaiPacchim,
    };
    return map[ward] || null;
  };

  const fixPashchim = (text) => text;
  const numberToMarathiWords = (num) => num.toString(); // keep your full logic later

  const displayWardName = user?.ward === "Head Office" && user?.role === "Junior Engineer" ? wardName : user?.ward || '';

  const consumerMap = consumers.reduce((map, c) => {
    map[c.consumerNumber] = c.meterPurpose || 'N/A';
    return map;
  }, {});

  const rows = (bills || []).map((bill, index) => ({
    id: paginationModel.page * paginationModel.pageSize + index + 1,
    consumerNumber: bill.consumerNumber || '',
    consumerAddress: bill.consumerAddress || '',
    ward: bill.ward || '',
    
    monthAndYear: bill.monthAndYear || '',
    meterPurpose: consumerMap[bill.consumerNumber] || 'N/A',
    netBillAmount: bill.netBillAmount || 0,
    dueDate: bill.dueDate || '',
  }));

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'consumerNumber', headerName: 'CONSUMER NO.', width: 150 },
    { field: 'consumerAddress', headerName: 'CONSUMER ADDRESS', width: 300 },
    { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
    { field: 'meterPurpose', headerName: 'METER PURPOSE', width: 160 },
    { field: 'ward', headerName: 'WARD', width: 100 },
    { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 160 },
    { field: 'dueDate', headerName: 'DUE DATE', width: 140 },
  ];



const handleDownloadPDF = async () => {
  setShowFormControl(true);

  const ward = rows.length > 0 ? rows[0].ward : "N/A";
  const monthYear = rows.length > 0 ? rows[0].monthAndYear : "N/A";
  const meterPurpose =
    meterPurposeManyName.length > 0
      ? meterPurposeManyName.join(", ")
      : "N/A";

  const html = `
   




 <div
      style="
        padding:15mm;
        box-sizing:border-box;
        font-family:'Noto Serif Devanagari', serif;
        font-size:13px;
        line-height:1.5;
        color:#000;
      "
    >
     
<div style="text-align:center;color:#000;">
  <div style="display:inline-block;text-align:left;">

    <!-- Heading : same left start -->
    <h2 style="margin-bottom:10px;">
      विद्युत देयक यादी
    </h2>

    <!-- Aligned content -->
    <p style="margin:0;line-height:1.6;margin-bottom:10px">
      <span style="display:inline-block;width:110px;font-weight:bold;">
        मीटरचा उद्देश :
      </span>
      ${meterPurpose}
      <br/>

      <span style="display:inline-block;width:110px;font-weight:bold;">
        प्रभाग :
      </span>
      ${ward}
      <br/>

      <span style="display:inline-block;width:110px;font-weight:bold;">
        महिना :
      </span>
      ${monthYear}
    </p>

  </div>
</div>

      

      <table border="1" width="100%" cellspacing="0" cellpadding="6"
        style="border-collapse:collapse;table-layout:fixed;color:#000;border-color:#000;">
        <thead>
          <tr>
            <th>अ.क्र.</th>
            <th>ग्राहक क्रमांक</th>
            <th>पत्ता</th>
            <th>महिना</th>
            <th>प्रभाग</th>
            <th>रक्कम</th>
            <th>देय दिनांक</th>
          </tr>
        </thead>
        <tbody>
          ${
            allBills.map((row, index) => `
              <tr>
                <td style="text-align:center">${index + 1}</td>
                <td>${row.consumerNumber || ""}</td>
                <td>${row.consumerAddress || ""}</td>
                <td>${row.monthAndYear || ""}</td>
                <td>${row.ward || ""}</td>
                <td style="text-align:right">${row.netBillAmount || 0}</td>
                <td>${row.dueDate || ""}</td>
              </tr>
            `).join("")
          }
        </tbody>
      </table>
    </div>
  `;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  // 🔹 create worker (but DO NOT SAVE)
  const worker = html2pdf().set({
    margin: [15, 12, 15, 12],
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
  }).from(wrapper);

  // 🔹 Generate preview → dataURI
  const pdfData = await worker.outputPdf("datauristring");

  const type = "wardbilllist";
  handlePdfPreview(pdfData, type, monthYear);   // ✅ Preview Modal OPEN

  // 🔹 store blob for later download button
  const pdfBlob = await worker.outputPdf("blob");
  setPdfBlob(pdfBlob);

  document.body.removeChild(wrapper);
};




const wardAddressTextMap = {
  "Ward-A": [
    "प्रभाग समिती अ, विभागीय कार्यालय,",
    "बोळींज, विरार (प.), ता. वसई",
    "जि. पालघर, पिन कोड ४०१३०३"
  ],
  "Ward-B": [
    "प्रभाग समिती बी, विभागीय कार्यालय,",
    "वसई (प.), ता. वसई",
    "जि. पालघर, पिन कोड ४०१३०५"
  ],
  "Ward-C": [
    "प्रभाग समिती सी, विभागीय कार्यालय,",
    "नालासोपारा (प.), ता. वसई",
    "जि. पालघर, पिन कोड ४०१३०५"
  ],
  "Ward-D": [
    "प्रभाग समिती डी, विभागीय कार्यालय,",
    "आचोळे, नालासोपारा (प.)",
    "जि. पालघर, पिन कोड ४०१२०९"
  ],
  "Ward-E": [
    "प्रभाग समिती ई,",
    "दुर्दम गार्डन जवळ,",
    "नालासोपारा (प.), ता. वसई",
    "जि. पालघर, पिन कोड ४०१२०३"
  ],
  "Ward-F": [
    "प्रभाग समिती एफ,",
    "वालिव मंदिर जवळ, वालिव",
    "गाव, वसई (पू.)"
  ],
  "Ward-G": [
    "प्रभाग समिती जी, वालिव,",
    "वालिव नाका, वसई ईस्ट",
    "जि. पालघर, पिन कोड ४०१२०८"
  ],
  "Ward-H": [
    "प्रभाग समिती एच, नावर,",
    "विभागीय कार्यालय, नावर",
    "नालासोपारा (पू.)"
  ],
  "Ward-I": [
    "प्रभाग समिती आय, कार्यालय,",
    "बोळींज, विरार (प.)",
    "जि. पालघर, पिन कोड ४०१३०३"
  ],
};



const handleSaveConsumerDetails = async () => {
  if (!jakraKramank || !consumerNumber || !date) {
    setSnackbarMessage("Please fill all consumer details");
    setSnackbarOpen(true);
    return;
  }

  const convertToMarathiDigits = (numberStr) => {
    const marathiDigits = ["०","१","२","३","४","५","६","७","८","९"];
    return String(numberStr)
      .split("")
      .map(c => (/\d/.test(c) ? marathiDigits[c] : c))
      .join("");
  };

  const isPrivilegedUser =
    ["Executive Engineer", "Admin", "Super Admin"].includes(user.role) ||
    (user.role === "Junior Engineer" && user.ward === "Head Office");

  const selectedWard = isPrivilegedUser ? wardName : user.ward;
  const addressLines = wardAddressTextMap[selectedWard] || [];

  const formattedDate = new Date(date).toLocaleDateString("mr-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const marathiConsumerNumber = convertToMarathiDigits(consumerNumber);

  // =========================
  // HTML
  // =========================
  const html = `
  <div style="
    padding:15mm;
    box-sizing:border-box;
    font-family:'Noto Serif Devanagari', serif;
    font-size:14px;
    line-height:1.9;
    color:#000;
  ">

    <div style="display:flex;justify-content:space-between;align-items:flex-start">

      <div style="width:35%">
        ${addressLines.map(l => `<div>${l}</div>`).join("")}
      </div>

      <div style="width:30%;text-align:center">
        <img src="${logovvcmccmp}" style="width:80px"/>
      </div>

      <div style="width:35%">
        <div><b>दूरध्वनी :</b> ०२५०-२३३४१४४</div>
        <div><b>फॅक्स :</b> ०२५०-२५२५१०७</div>
        <div>
          <b>जा.क्र. :</b>
          वि.शा.म./विद्युत/${convertToMarathiDigits(jakraKramank)}
        </div>
        <div><b>दिनांक :</b> ${formattedDate}</div>
      </div>

    </div>

    <hr style="margin:15px 0"/>

    <div style="margin-top:20px">
      <b>प्रति,</b><br/>
      मा. उप-कार्यकारी अभियंता<br/>
      म.रा.वि.वि.कं.लि.<br/>
      विरार पश्चिम
    </div>

    <div style="text-align:center;margin:30px 0;font-weight:bold">
      विषय : फॉल्टी मीटर बाबत.
    </div>






 <div style="text-align:justify">
      महोदय,<br/><br/>

      उपरोक्त विषयास अनुसरून कळविण्यात येते की,
      वसई विरार शहर महानगरपालिका, प्रभाग समिती
      <b>${selectedWard}</b> अंतर्गत
      ग्राहक क्रमांक <b>${marathiConsumerNumber}</b> यांचा
      विद्युत मीटर सद्यस्थितीत फॉल्टी झालेला असून
      सदर मीटर बदल करणे आवश्यक आहे.

      तरी सदर फॉल्टी मीटर काढून नवीन मीटर बसविण्यास
      मान्यता देण्यात यावी तसेच
      आवश्यक कार्यवाही करण्याची
      परवानगी देण्यात यावी,
      ही नम्र विनंती.
    </div>


    <div style="margin-top:50px;text-align:right">
      आपला विश्वासू,<br/><br/><br/>
      अधीक्षक, विद्युत विभाग<br/>
      प्रभाग समिती ${selectedWard}<br/>
      वसई विरार शहर महानगरपालिका
    </div>

  </div>
  `;

  // =========================
  // PREVIEW-FIRST PDF FLOW (SAME AS handleDownloadPDF)
  // =========================
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  const worker = html2pdf()
    .set({
      margin: [15, 12, 15, 12],
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .from(wrapper);

  // 🔹 Preview
  const pdfData = await worker.outputPdf("datauristring");
  const type = "faultymeter";
  handlePdfPreview(pdfData, type, formattedDate); // ✅ Preview Modal open

  // 🔹 Store blob for Download button
  const pdfBlob = await worker.outputPdf("blob");
  setPdfBlob(pdfBlob);

  document.body.removeChild(wrapper);
  handleCloseFaultyMeterModal();
};



const handleDownloadForm22 = async () => {

  // ===============================
  // EXISTING DATA FLOW (AS-IS)
  // ===============================
  const { foundReport, reportingData } = await fetchReportData(
    selectedMonthYear,
    user,
    setMode,
    setReportingDataSM,
    setMonthArr
  );

  const signatureMatches = checkSignatureStatusForm22(monthArr);

  const totalAmount = rows
    .filter(r => r.monthAndYear === selectedMonthYear)
    .reduce((s, r) => s + Number(r.netBillAmount || 0), 0);

  const today = new Date().toLocaleDateString("en-IN");

  // ===============================
  // HTML (FORM–22 : PAGE 1 + PAGE 2)
  // ===============================
  const html = `
  <div class="marathi-pdf"
    style="
      padding:15mm;
      box-sizing:border-box;
      font-family:'Noto Serif Devanagari', serif;
      font-size:14px;
      line-height:1.6;
    ">

    <!-- ================= PAGE 1 ================= -->

    <div style="display:flex;justify-content:space-between">
      <div>M.S.C. Form 22 (Rule (1))</div>
      <div>M.S.C. 22</div>
    </div>

    <div style="text-align:center;margin-top:10px">
      <img src="${logovvcmc}" width="70"/>
      <h2>नमुना नं. २२</h2>
      <div>(नियम २२ (१))</div>
      <h3>वसई विरार शहर महानगरपालिका</h3>
    </div>

    <p>
      <b>बिल क्रमांक :</b> ____________
      <span style="float:right"><b>प्रमाणक क्रमांक :</b> ____________</span><br/>
      <b>दिनांक :</b> ${today}
    </p>

    <p>
      पैसे देणाऱ्याचे नाव : म.रा.वि.वि. कंपनी<br/>
      पत्ता : ${user?.ward}<br/>
      माल : विद्युत विभाग<br/>
      मागणी पुस्तकाचा संदर्भ :
      लेखा शीर्ष विद्युत विभाग विद्युत देयक
    </p>

    <table border="1" width="100%" cellspacing="0" cellpadding="6"
      style="table-layout:fixed;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="width:10%">अनु.क्र.</th>
          <th style="width:44%">कामाचा किंवा वस्तूंचा तपशील</th>
          <th style="width:12%">परिमाण</th>
          <th style="width:10%">दर</th>
          <th style="width:10%">युनिट</th>
          <th style="width:18%">रक्कम (रु. पै.)</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td align="center">1</td>
          <td>
            वसई विरार शहर महानगरपालिका<br/>
            कार्यक्षेत्रातील प्रभाग समिती ${user?.ward}<br/>
            विभागातील विरार विभागाचे<br/>
            म.रा.वि.वि. कंपनीचे माहे ${selectedMonthYear}<br/>
            चे विद्युत देयक
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td align="right">${totalAmount.toFixed(2)}</td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td colspan="5" align="right"><b>एकूण</b></td>
          <td align="right"><b>${totalAmount.toFixed(2)}</b></td>
        </tr>
      </tfoot>
    </table>

    <p style="text-align:center;margin-top:10px;font-weight:bold">
      एकूण रक्कम रुपये (अक्षरी ________________________________ मात्र)
    </p>

    <div style="display:grid;grid-template-columns:1fr 1fr;column-gap:25px;font-size:13px">

      <div>
        <table width="100%" cellpadding="2">
          <tr><td>१) रक्कमेचे नियम तपासले</td><td>रु.</td></tr>
          <tr><td>२) पूर्वीचा खर्च</td><td>रु.</td></tr>
          <tr>
            <td>३) ह्या बिलांत दाखवलेला खर्च</td>
            <td>रु. ${totalAmount.toFixed(2)}/-</td>
          </tr>
          <tr><td>४) २ व ३ यांची बेरीज</td><td>रु.</td></tr>
          <tr><td>५) उपलब्ध शिल्लक</td><td>रु.</td></tr>
        </table>
      </div>

      <div style="line-height:1.6">
        प्रमाणित करण्यात येते की सदर बिलांत दाखवलेली<br/>
        रक्कम व परिमाण अचूक असून सदर मागणी ही<br/>
        नियमानुसार असून महानगरपालिकेच्या<br/>
        संबंधित तरतुदीनुसार करण्यात आली आहे.<br/><br/>
        दिनांक : _____________<br/><br/>
        वस्तु घेणाऱ्या अधिकाऱ्याची सही
      </div>

    </div>

    <div style="page-break-before:always"></div>

    <div style="display:grid;grid-template-columns:1fr 1fr;column-gap:20px;position:relative">

      <div style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:#000"></div>

      <div style="padding-right:12px">
        <p>
          मा. आयुक्त यांच्याकडे मंजुरीसाठी सादर<br/>
          मी मागणीची तपासणी केली असून ती सर्व बाबतीत अचूक आहे.
        </p>

        <p>दिनांक : ____________________</p>

        <p style="margin-top:25px">
          -----------------------------<br/>
          प्र.लेखापाल
        </p>

        <p>प्रभाग समिती – ${user?.ward}</p>

        <hr/>

        <p>मागणीची संपूर्ण फेड म्हणून</p>

        <p>
          रक्कम : <b>₹ ${totalAmount.toLocaleString("hi-IN")}/-</b><br/>
          (अक्षरी रुपये ${totalAmount} मात्र)
        </p>

        <p style="margin-top:30px">
          मुद्रा<br/><br/>
          -----------------------------<br/>
          पैसे घेणाऱ्याची सही
        </p>
      </div>

      <div style="padding-left:12px">
        <p>
          निर्णय क्रमांक : ____________________<br/>
          दिनांक : ____________________
        </p>

        <p>
          बिलांत दाखवलेली रक्कम<br/>
          <b>₹ ${totalAmount.toLocaleString("hi-IN")}/-</b><br/>
          (रुपये ${totalAmount} मात्र)
        </p>

        <p>मंजूर करण्यात येत आहे.</p>

        <p style="margin-top:30px">
          -----------------------------<br/>
          मुख्य लेखाधिकारी
        </p>

        <p style="margin-top:20px">
          दिनांक : ____________<br/>
          -----------------------------<br/>
          उप-आयुक्त
        </p>

        <p>वसई-विरार शहर महानगरपालिका</p>

        <hr/>

        <p>धनादेश क्रमांक : ____________<br/>दिनांक : ____________</p>

        <p>द्वारे देण्यात आले आणि प्रस्तावित रोख वहीत नोंद घेतली</p>

        <p>
          ---------------- &nbsp;&nbsp;
          ----------------<br/>
          रोखपाल &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; उप-आयुक्त
        </p>
      </div>

    </div>

  </div>
  `;

  // ===============================
  // PDF GENERATION ⭐ (Preview First)
  // ===============================
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  const worker = html2pdf().set({
    margin: [15, 12, 15, 12],
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  }).from(wrapper);

  // ⭐ 1) PREVIEW → dataURI
  const pdfData = await worker.outputPdf("datauristring");
  const type = "form22";
  handlePdfPreview(pdfData, type, selectedMonthYear);

  // ⭐ 2) SAVE LATER → blob
  const pdfBlob = await worker.outputPdf("blob");
  setPdfBlob(pdfBlob);

  document.body.removeChild(wrapper);
};



const downloadKaryalayinTipani =async() => {

const { foundReport, reportingData } = await fetchReportData(selectedMonthYear, user, setMode, setReportingDataSM, setMonthArr,wardName);

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
  doc.text(reverseDevanagariIfContainsViOrLi(`व. वि. श.`), 4, yPos); 
  yPos += 6; 
  doc.text(reverseDevanagariIfContainsViOrLi("महानगरपालिका"), 4, yPos); 
  
  doc.setDrawColor(0);
  doc.setLineWidth(0.1);
  doc.line(leftSectionWidth-2, 10, leftSectionWidth-2, 290); 
  
  doc.setFontSize(16);

  const imageWidthk = 50; 
const imageHeightk = 10;


const pageWidthk = doc.internal.pageSize.getWidth();


const centerXk = (pageWidthk - imageWidthk) / 2;


doc.addImage(karyalayintipani, 'PNG', centerXk, 10, imageWidthk, imageHeightk);


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

const labelText = reverseDevanagariIfContainsViOrLi("विभाग:");
const labelWidth = doc.getTextWidth(labelText);
const imageWidth = 17;
const imageHeight = 5;
const spacing = 0;

const totalWidth = labelWidth + spacing + imageWidth;
const rightMargin = 10;


const startX = pageWidth - rightMargin - totalWidth;
const imageX = startX + labelWidth + spacing - 5; 

// Draw the text
doc.text(labelText, startX + labelWidth - 7, yPos, { align: "right" });

// Draw the image
doc.addImage(divabatti, "PNG", imageX, yPos - 4, imageWidth, imageHeight);

  yPos += 10;
  doc.text("मा.साहेब,", rightSectionStart, yPos);
  yPos += 7;

//   const meterpurposename = [...new Set(
//     rows.filter(row => row.meterPurpose === meterPurposeName) 
//         .map(row => row.meterPurpose)
// )].join(', '); 



const meterpurposename = meterPurposeManyName.length > 0 
  ? meterPurposeManyName.join(', ') 
  : "विद्युत मीटर";
  yPos += 2;
  doc.text(reverseDevanagariIfContainsViOrLi(`सादर करण्यात येते की, वसई विरार शहर महानगरपालिका ${wardname}`), rightSectionStart, yPos);
  yPos += 3;
  doc.addImage(mahanagarpaliketarfe, 'PNG', rightSectionStart, yPos, 80, 6); // adjust width/height as needed
  const meterPurpose = meterPurposeManyName.length > 0 ? meterPurposeManyName.join(', ') : "N/A";

  yPos += 2;
  
 
doc.text(`${meterPurpose}`, rightSectionStart , yPos + 10); // continue after image
yPos += 18;
 
  doc.text(reverseDevanagariIfContainsViOrLi("दिवाबत्तीची सोय केलेली आहे."), rightSectionStart, yPos);
  yPos += 2;
  

const imageWidthm = 120;
const imageHeightm = 6;
const spacingm = 2;

let x = rightSectionStart;
let y = yPos;


doc.addImage(maharashtarlong, 'PNG', rightSectionStart, yPos, 115, 7.5); 


  yPos += 12;  

  doc.addImage(
  kelelaAaheYaKami,           // इम्पोर्ट केलेली इमेज
  rightSectionStart,           // X पोझिशन
  yPos - 4,                    // Y पोझिशन (जर टेक्स्टप्रमाणे लागायला वरखाली हलवायचे असल्यास +/- 4 अजस्ट करा)
  115,                           // इमेजची रुंदी (गरजेनुसार बदलू शकता)
  7                             // इमेजची उंची (गरजेनुसार बदलू शकता)
);
  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi(`विभागासाठी ${selectedMonthYear} रक्कम रुपये ${totalAmount.toLocaleString('hi-IN')}/-`), rightSectionStart, yPos);
  yPos += 7;
  // doc.text(`(अक्षरी रुपये ${totalAmountInWords} फक्त) चे वीज देयक सादर`, rightSectionStart, yPos);

// 1️⃣ पहिला भाग लावा
doc.text("(", rightSectionStart, yPos);

// 2️⃣ इमेज लावा (स्थानानुसार xPos समायोजित करा.)
doc.addImage(
  Akshari,
  rightSectionStart + 4, // "(" नंतर लगेच बसवण्यासाठी X पोझिशन समायोजित करा
  yPos - 5,               // Y पोझिशन (गरजेनुसार वरखाली करा.)
  12,                      // इमेजची रुंदी (गरजेनुसार बदला.)
  6.5                       // इमेजची उंची (गरजेनुसार बदला.)
);

// 3️⃣ उरलेला टेक्स्ट लावा
doc.text(` रुपये ${totalAmountInWords} फक्त) चे वीज देयक सादर`, rightSectionStart + 15, yPos);


  yPos += 7;
  doc.text("करून मागणी केलेली आहे.", rightSectionStart, yPos);
  yPos += 10;
  doc.text("-----------------------------------------------------------------------------------------------------", rightSectionStart, yPos);
  yPos += 25;

  const getSignatureForRole = (role, ward = user.ward) => {
    return reportingDataSM.find(remark => 
      remark.role === role && 
      remark.ward === ward &&
      remark.remark === "Approved"
    )?.signature;
  };


  // Store all approved signatures
const approvedSignatures = {
  lipik: getSignatureForRole("Lipik"),
  wardJE: getSignatureForRole("Junior Engineer"),
  headOfficeJE: getSignatureForRole("Junior Engineer", "Head Office"),
  accountant: getSignatureForRole("Accountant"),
  amc: getSignatureForRole("Assistant Municipal Commissioner")
};




const lipikData = reportingDataSM.find(item => item.role === 'Lipik');

// console.log("lipik--->>>",lipikData?.signature)
  const signatureWidthLI = 30;
  const signatureHeightLI = 15;
  const xPosLI = rightSectionStart + 0;
  const yOffsetLI = yPos - 15;



if (lipikData?.signature) {
  doc.addImage(
    lipikData.signature,
    'PNG',
    xPosLI,
    yOffsetLI,
    signatureWidthLI,
    signatureHeightLI
  );
}
    doc.text(reverseDevanagariIfContainsViOrLi("लिपिक, विद्युत विभाग"), rightSectionStart, yPos);
  

    const jrEngineerData = reportingDataSM.find(
      item => item.role === 'Junior Engineer' && item.ward !== 'Head Office'
    );
  
  const signatureWidthJR = 30;
    const signatureHeightJR = 15;
    const xPosJR = rightSectionStart + 60;
    const yOffsetJR = yPos - 17 - 5;

  
  if (jrEngineerData?.signature) {
    doc.addImage(
      jrEngineerData.signature,
      'PNG',
      xPosJR,
      yOffsetJR,
      signatureWidthJR,
      signatureHeightJR
    );
  }

    
    const signatureWidthjrw = 40; 
    const signatureHeightjrw = 7;
    const yOffsetJRw = yPos - 5;
   
    doc.addImage(kanistaabhiyanataward, 'PNG', rightSectionStart + 59, yOffsetJRw, signatureWidthjrw, signatureHeightjrw);


  
    const jrHOEngineerData = reportingDataSM.find(
      item => item.role === 'Junior Engineer' && item.ward === 'Head Office'
    );
  
    
    const signatureWidthJRHO = 30;
    const signatureHeightJRHO = 15;
    const xPosJRHO = rightSectionStart + 115;
    const yOffsetJRHO = yPos - 17 - 5;
    if(jrHOEngineerData?.signature){
      doc.addImage(
        jrHOEngineerData?.signature,
         'PNG',
         xPosJRHO,
         yOffsetJRHO,
         signatureWidthJRHO,
         signatureHeightJRHO
       );
    }
  
  
  
    const signatureWidthjrhow = 60; 
    const signatureHeightjrhow = 8;
    const yOffsetJRhow = yPos - 5;
   
    doc.addImage(kanistaabhiyantaho, 'PNG', rightSectionStart + 109, yOffsetJRhow,signatureWidthjrhow,signatureHeightjrhow);
    yPos += 7;
    // ******
    const prabhagImageWidth = 26;  // Adjust size as per your layout
const prabhagImageHeight = 6;

    

    doc.addImage(prabhagsamiti, 'PNG', rightSectionStart-1, yPos - 4.5, prabhagImageWidth, prabhagImageHeight);

doc.text(reverseDevanagariIfContainsViOrLi(`(${displayWardName})`), rightSectionStart + prabhagImageWidth + 2, yPos);

// Second image instead of second "प्रभाग समिती"
doc.addImage(prabhagsamiti, 'PNG', rightSectionStart-1 + 60, yPos - 4.5, prabhagImageWidth, prabhagImageHeight);
// Ward name beside second image
doc.text(reverseDevanagariIfContainsViOrLi(`(${displayWardName})`), rightSectionStart + 60 + prabhagImageWidth + 2, yPos);
    doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), rightSectionStart + 110, yPos);
    yPos += 7;
    doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), rightSectionStart, yPos);
    yPos += 10;
   
    yPos += 10;
 

  doc.text("मा.सादर,", rightSectionStart, yPos);
  yPos += 7;
  

  // Insert image where "महानगरपालिकेच्या" would be
  doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर"), rightSectionStart, yPos);
const mahaImageWidth = 40;  // Adjust size as per image
const mahaImageHeight = 4.5;  // Adjust size as per image
doc.addImage(mahanagarpalikechya, 'PNG', rightSectionStart + 28.5, yPos - 4, mahaImageWidth, mahaImageHeight);

// Remaining part text (starting after image)
doc.text(reverseDevanagariIfContainsViOrLi("विद्युत विभागाने सादर केलेल्या अहवालानुसार:"), rightSectionStart + 27 + mahaImageWidth + 2, yPos);
  yPos += 7;
  // doc.text("१) आर्थिक वर्ष: २०२४-२५", rightSectionStart, yPos);
  const imageWidthfy = 30; // तुम्हाला हवी तशी width द्या
const imageHeightfy = 5.5; // proportion प्रमाणे height द्या

doc.addImage(aarthikvarsh, 'PNG', rightSectionStart, yPos-5, imageWidthfy, imageHeightfy);
  yPos += 7;
  // doc.text(reverseDevanagariIfContainsViOrLi("२) लेखाशिर्ष: दिवाबत्ती वीज देयक"), rightSectionStart, yPos);

const imageWidthLes = 28; // आवश्यकतेनुसार width द्या
const imageHeightLes = 4.4; // proportion प्रमाणे height द्या

doc.addImage(lekhashirshDivabattiVijDeyak, 'PNG', rightSectionStart-0.8, yPos-5, imageWidthLes, imageHeightLes);
  yPos += 7;
  doc.text("३) मूळ तरतूद: २,१७,२०,०००/-", rightSectionStart, yPos);
  yPos += 7;
  // doc.text("४) आतापर्यंतचा खर्च: ३,१६,४५,०३०/-", rightSectionStart, yPos);
  // Use this:
const imageWidthaata = 38; // तुमच्या PDF layout नुसार width सेट करा
const imageHeightaata = 5; // proportion नुसार height सेट करा

doc.addImage(aataparyantachaKharch, 'PNG', rightSectionStart, yPos-5, imageWidthaata, imageHeightaata);

// तुम्ही खर्चाची रक्कम हवी असेल, तर ती image नंतर किंवा शेजारी text म्हणून देऊ शकता:
doc.text("३,१६,४५,०३०/-", rightSectionStart + imageWidthaata + 2, yPos);
  yPos += 7;
  // doc.text(reverseDevanagariIfContainsViOrLi(`५) प्रस्तावित देयक रक्कम: ${totalAmount.toLocaleString('hi-IN')} /-`), rightSectionStart, yPos);

  const imageWidthpra = 39; // तुम्हाला हव्या प्रमाणे width ठरवा
const imageHeightpra = 5.5; // proportion प्रमाणे height ठरवा

doc.addImage(prastavitdeyakrakkam2, 'PNG', rightSectionStart, yPos-5, imageWidthpra, imageHeightpra);

// प्रस्तावित रक्कम text म्हणून टाका image च्या शेजारी:
doc.text(`${totalAmount.toLocaleString('hi-IN')} /-`, rightSectionStart + imageWidthpra + 2, yPos);

  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi("६) शिल्लक तरतूद: १८,४८,१४,२५०/-"), rightSectionStart, yPos);
  yPos += 10;

  // doc.text(reverseDevanagariIfContainsViOrLi("तरी सदरचे देयक महाराष्ट्र राज्य वीज वितरण कंपनी लिमिटेड यांना"), rightSectionStart, yPos);


const beforeText = "तरी सदरचे देयक";
const afterText = "वीज वितरण कंपनी लिमिटेड यांना";
const imageWidthmtr = 22; // Adjust as needed
const imageHeightmtr = 5.5; // Adjust as needed

// Add before text
doc.text(reverseDevanagariIfContainsViOrLi(beforeText), rightSectionStart, yPos);

// Add image right after before text
const beforeTextWidth = doc.getTextWidth(reverseDevanagariIfContainsViOrLi(beforeText));
doc.addImage(maharashtra, 'PNG', rightSectionStart + beforeTextWidth + 2, yPos - 4.5, imageWidthmtr, imageHeightmtr);

// Add after text
doc.text(reverseDevanagariIfContainsViOrLi(afterText), rightSectionStart + beforeTextWidth + imageWidthmtr + 4, yPos);



  yPos += 7;
  // doc.text("उदाहोण्यासाठी मंजुरीस्तव सदर.", rightSectionStart, yPos);

  const imageWidthyana = 60;  // तुमच्या PDF layout नुसार adjust करा
const imageHeightyana = 5;  // proportion नुसार adjust करा

doc.addImage(yanaUdaHones, 'PNG', rightSectionStart, yPos-3, imageWidthyana, imageHeightyana);
  yPos += 25;
 


  
  const AccData = reportingDataSM.find(
    item => item.role === 'Accountant'
  );

const signatureWidthACC = 30;
    const signatureHeightACC = 15;
    const xPosACC = rightSectionStart + 0;
    const yOffsetACC = yPos - 15;
    if(AccData?.signature){

      doc.addImage(
        AccData?.signature,
        
              'PNG',
              xPosACC,
              yOffsetACC,
              signatureWidthACC,
              signatureHeightACC
            );
    }
 
  doc.text("लेखापाल", rightSectionStart, yPos);



const signatureWidthAMC = 30;
    const signatureHeightAMC = 15;
    const xPosAMC = rightSectionStart + 75;
    const yOffsetAMC = yPos - 15;

    doc.addImage(
         user?.signature,
          'PNG',
          xPosAMC,
          yOffsetAMC,
          signatureWidthAMC,
          signatureHeightAMC
        );
  doc.text("सहाय्यक आयुक्त", rightSectionStart + 75, yPos);
  doc.text("", rightSectionStart + 140, yPos);
  yPos += 7;
  // doc.text(reverseDevanagariIfContainsViOrLi(`प्रभाग समिती (${displayWardName})`), rightSectionStart, yPos);
  // doc.text(reverseDevanagariIfContainsViOrLi(`प्रभाग समिती (${displayWardName})`), rightSectionStart + 75, yPos);

  doc.addImage(prabhagsamiti, 'PNG', rightSectionStart, yPos-5, prabhagImageWidth, prabhagImageHeight);

// If you want to display ward name next to image:
doc.text(`(${displayWardName})`, rightSectionStart + prabhagImageWidth + 2, yPos);

// And for second position:
doc.addImage(prabhagsamiti, 'PNG', rightSectionStart + 75, yPos-5, prabhagImageWidth, prabhagImageHeight);
doc.text(`(${displayWardName})`, rightSectionStart + 75 + prabhagImageWidth + 2, yPos);
  doc.text("", rightSectionStart + 140, yPos);
  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), rightSectionStart, yPos);
  doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), rightSectionStart + 75, yPos);
  doc.text("", rightSectionStart + 140, yPos);
  const pdfData = doc.output('datauristring');
let type="karyalayintipani";
  
  handlePdfPreview(pdfData,type,selectedMonthYear,wardName);  
   
   const pdfBlob = doc.output('blob');
   setPdfBlob(pdfBlob);


} catch (error) {
  console.error("Error generating Karyalayin Tipani PDF:", error);
}
}




  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  }

  return (
    <div style={gridStyle}>
      <Box sx={innerDivStyle}>
       
<Box
  sx={{
    marginLeft: isSidebarOpen ? '240px' : '70px',  
    transition: 'margin-left 0.3s ease',
    padding: '20px',
    marginTop: { xs: "10px", sm: "10px", md: "0px" }, // ✅ responsive
  }}
>
<Typography
 
  fontWeight="bold"
  color="#0d2136"
  sx={{ mb: 2, 
 fontSize: { xs: "1.25rem", sm: "1.25rem", md: "1.5rem" },
  }}
>
  ENERGY EXPENDITURE
</Typography>

{/* <Box
 sx={{
  display: "flex",
  alignItems: { xs: "flex-start", sm: "flex-start", md: "center" },
  flexDirection: { xs: "column", sm: "column", md: "row" }, // ✅ xs/sm column
  gap:1,
  mb: 3,
  flexWrap: "nowrap",
  overflowX: { xs: "visible", sm: "visible", md: "auto" }, // ✅ mobile ला scroll नको
}}
>
 
 

   <RegionalEnergyExpenditureBillDatePicker
    selectedMonthYear={selectedMonthYear}
    onChange={handleDateChange}
  />


  

  {(user?.role === "Super Admin" ||
    user?.role === "Admin" ||
    user?.role === "Executive Engineer" ||
    user?.ward === "Head Office") && (
    <FormControl 
    size="small" 
    sx={{
    width: { xs: "100%", sm: "100%", md: "50%" },
     }}
    >
      <InputLabel>SEARCH WARD</InputLabel>
      <Select
        value={wardName}
        onChange={handleChangeWard}
        label="Search Ward"
      >
        <MenuItem value="">All Wards</MenuItem>
        {wardDataAtoI.map((w) => (
          <MenuItem key={w.ward} value={w.ward}>
            {w.ward}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )}

  <FormControl 
  size="small" sx={{
    width: { xs: "100%", sm: "100%", md: "30%" },
    // ✅ Label font-size
    "& .MuiInputLabel-root": {
      fontSize: "14px",
    },

   
    "& .MuiSelect-select": {
      fontSize: "12px",
      padding: "8px 12px",
    },

   
    "& .MuiSvgIcon-root": {
      fontSize: "18px",
    },
     }}
     >
    <InputLabel sx={{color:'#000'}}>METER PURPOSE</InputLabel>
    <Select
      multiple
      value={meterPurposeManyName}
      onChange={handleChangeManyMeterPurpose}
      input={<OutlinedInput label="Multiple Meter Purpose" />}
       sx={{
      fontSize: "12px", // ✅ selected values text
    }}
    MenuProps={{
      PaperProps: {
        sx: {
          "& .MuiMenuItem-root": {
            fontSize: "12px", // ✅ dropdown items font
            minHeight: "35px",
          },
        },
      },
    }}
    >
      {meterPurposeData.map((p) => (
        <MenuItem key={p.purpose} value={p.purpose}>
          <Checkbox checked={meterPurposeManyName.includes(p.purpose)} />
          {p.purpose}
        </MenuItem>
      ))}
    </Select>
  </FormControl>


  


</Box> */}



{/* <Box 
 sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: 1.5,
    mt: 1.5,
  }}
> <Button variant="outlined" onClick={handleDownloadPDF} sx={{
   
    borderColor: "#757575",
    width: { xs: "100%", sm: "100%", md: "auto",minWidth:"200px",color:'#000'}, // ✅ xs/sm full width
  }}>
    WARD BILLS
  </Button>

  <Button variant="outlined" onClick={handleDownloadForm22} sx={{
    color:'#000',
    borderColor: "#757575",
    width: { xs: "100%", sm: "100%", md: "auto",minWidth:"200px" }, // ✅ xs/sm full width
  }}>
    FORM 22
  </Button>

  <Button variant="outlined" onClick={downloadKaryalayinTipani} sx={{
   color:'#000',
    borderColor: "#757575",
    width: { xs: "100%", sm: "100%", md: "auto",minWidth:"200px" }, // ✅ xs/sm full width
  }}>
KARYALAYIN TIPANI
  </Button>

  <Button variant="outlined" onClick={() => setFaultyMeterModalOpen(true)} sx={{
      color:'#000',
    borderColor: "#757575",
    width: { xs: "100%", sm: "100%", md: "auto",minWidth:"200px" }, // ✅ xs/sm full width
  }}>
    FAULTY METER 
  </Button></Box> */}

{/* ── Filter Row ── */}
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    flexDirection: { xs: "column", sm: "column", md: "row" },
    gap: 1.5,
    mb: 1.5,
    flexWrap: "wrap",
    width: "100%",
  }}
>
  {/* Date Picker — component च्या आत sx आहे */}
  <RegionalEnergyExpenditureBillDatePicker
    selectedMonthYear={selectedMonthYear}
    onChange={handleDateChange}
  />

  {/* Search Ward */}
  {(user?.role === "Super Admin" ||
    user?.role === "Admin" ||
    user?.role === "Executive Engineer" ||
    user?.ward === "Head Office") && (
    <FormControl
      size="small"
      sx={{
        width: { xs: "100%", sm: "100%", md: "20%" },
        "& .MuiInputLabel-root": { fontSize: "13px" },
        "& .MuiSelect-select": { fontSize: "13px" },
        "& .MuiOutlinedInput-root": {
          borderRadius: "6px",
          "& fieldset": { borderColor: "#bbb" },
          "&:hover fieldset": { borderColor: "#1976d2" },
        },
      }}
    >
      <InputLabel>Search Ward</InputLabel>
      <Select
        value={wardName}
        onChange={handleChangeWard}
        label="Search Ward"
        sx={{ fontSize: "13px" }}
      >
        <MenuItem value="" sx={{ fontSize: "13px" }}>All Wards</MenuItem>
        {wardDataAtoI.map((w) => (
          <MenuItem key={w.ward} value={w.ward} sx={{ fontSize: "13px" }}>
            {w.ward}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )}

  {/* Meter Purpose */}
  <FormControl
    size="small"
    sx={{
      width: { xs: "100%", sm: "100%", md: "20%" },
      "& .MuiInputLabel-root": { fontSize: "13px", color: "#555" },
      "& .MuiSelect-select": { fontSize: "13px", padding: "8px 12px" },
      "& .MuiSvgIcon-root": { fontSize: "18px" },
      "& .MuiOutlinedInput-root": {
        borderRadius: "6px",
        "& fieldset": { borderColor: "#bbb" },
        "&:hover fieldset": { borderColor: "#1976d2" },
      },
    }}
  >
    <InputLabel>Meter Purpose</InputLabel>
    <Select
      multiple
      value={meterPurposeManyName}
      onChange={handleChangeManyMeterPurpose}
      input={<OutlinedInput label="Meter Purpose" />}
      renderValue={(selected) =>
        selected.length === 0
          ? ""
          : selected.length === 1
          ? selected[0]
          : `${selected.length} selected`
      }
      sx={{ fontSize: "13px" }}
      MenuProps={{
        PaperProps: {
          sx: {
            maxHeight: 260,
            "& .MuiMenuItem-root": { fontSize: "13px", minHeight: "38px" },
          },
        },
      }}
    >
      {meterPurposeData.map((p) => (
        <MenuItem key={p.purpose} value={p.purpose}>
          <Checkbox
            checked={meterPurposeManyName.includes(p.purpose)}
            size="small"
            sx={{ padding: "4px 8px 4px 0" }}
          />
          {p.purpose}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>

{/* ── Button Row ── */}
<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 3 }}>
  {[
    { label: "WARD BILLS",        onClick: handleDownloadPDF },
    { label: "FORM 22",           onClick: handleDownloadForm22 },
    { label: "KARYALAYIN TIPANI", onClick: downloadKaryalayinTipani },
    { label: "FAULTY METER",      onClick: () => setFaultyMeterModalOpen(true) },
  ].map(({ label, onClick }) => (
    <Button
      key={label}
      variant="outlined"
      onClick={onClick}
      sx={{
        color: "#000",
        borderColor: "#bbb",
        fontSize: "13px",
        fontWeight: 500,
        borderRadius: "6px",
        padding: "6px 20px",
        width: { xs: "100%", sm: "calc(50% - 6px)", md: "auto" },
        minWidth: { md: "15%" },
        "&:hover": {
          borderColor: "#1976d2",
          color: "#1976d2",
          backgroundColor: "#f0f6ff",
        },
      }}
    >
      {label}
    </Button>
  ))}
</Box>
</Box>




        

        <Box sx={{width: '100%'}}>
          <StyledDataGrid
            rows={rows}
            columns={columns}
            pagination
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={[10, 25, 50, 100]}
            rowCount={pagination?.totalBills || 0}
            loading={loading}
            sx={{ backgroundColor: 'white', marginLeft: isSidebarOpen ? '240px' : '70px',  
    transition: 'margin-left 0.3s ease',
    padding: '20px'
  }}
          />
        </Box>

        <FaultyMeterConsumerNumber
          open={faultyMeterModalOpen}
          handleClose={() => setFaultyMeterModalOpen(false)}
          jakraKramank={jakraKramank}
          setJakraKramank={setJakraKramank}
          consumerNumber={consumerNumber}
          setConsumerNumber={setConsumerNumber}
          date={date}
          setDate={setDate}
          handleSubmit={handleSaveConsumerDetails}
        />

        <PdfPreviewModal
          open={pdfPreviewOpen}
          onClose={() => setPdfPreviewOpen(false)}
          pdfUrl={pdfContent}
          title={pdfType}
          monthpassbackend={monthPass}
          wardName={wardName}
        />
      </Box>
    </div>
  );
};

export default RegionalEnergyExpenditure;






