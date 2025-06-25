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
  console.log("user testing >>>> expenditure",user)
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
const [pdfBlob, setPdfBlob] = useState(null);  // Define the pdfBlob state
const [reportRemarkOpen, setReportRemarkOpen] = useState(false);

 const [currentReport, setCurrentReport] = useState(null);

 const [signatures, setSignatures] = useState({});
 const [pdfType, setPdfType] = useState("");
 const [monthpass,setMonthPass]=useState("");

  useEffect(() => {
    dispatch(fetchBills());
    dispatch(fetchConsumers());
  }, [dispatch, data]);



useEffect(() => {
  const fetchSignatures = async () => {
    try {
      const response = await fetch(`${baseUrl}/getReports`);
      const reports = await response.json();
      console.log("reports----", reports);

      const latestSignatures = {};

      reports.forEach(report => {

        report.reportingRemarks.forEach(remark => {
          if (
            remark.signature &&
            remark.role === user.role &&
            remark.ward === user.ward
          ) {
            if (!latestSignatures[remark.ward]) {
              latestSignatures[remark.ward] = {};
            }
            latestSignatures[remark.ward][remark.role] = remark.signature;
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
  const handleChangeManyMeterPurpose = (event) => {
    const {
      target: { value },
    } = event;
    setMeterPurposeManyName(typeof value === 'string' ? value.split(',') : value);
  };
  console.log("meterPurposeManyName",meterPurposeManyName)
  const handlePdfPreview = (pdfData,type,selMonthYear) => {
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

const handleAddFormTtOpen = () => {
  setAddFormTtOpen(true)
}
// --------------------------------------------------------------------
const downloadFaultyMeterReport=()=>{

}
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
             Ward Bill Totals
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
            onClick={downloadFaultyMeterReport}
          >
            <DownloadIcon />
            <Typography sx={{
              fontSize: isSidebarOpen ? '12.2px' : '14px'
            }}>
              Generate Faulty Meter Report
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
      // title="PDF Preview" 
      monthpassbackend={monthpass}
      title={pdfType === "tipani" ? "karyalayintipani" : pdfType === "form22" ? "form22" : "wardbilllist"}

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
// =========================================
// 10 March 2025
let rightSectionStart = leftSectionWidth + 5; // Start right section after vertical line
let leftSectionWidth = pageWidth * 0.15; // 15% of the page

    if (user.ward && signatures[user.ward]?.["Lipik"]) {
      const signatureWidth = 30;
      const signatureHeight = 30;
    
      // Signature first at yPos
      doc.addImage(
        signatures[user.ward]["Lipik"],
        'PNG',
        rightSectionStart,
        yPos - 17,
        signatureWidth,
        signatureHeight
      );
    //  ===================================


    const handleDownloadPDF = () => {
    setShowFormControl(true);
    const doc = new jsPDF('landscape');

    const meterPurpose = meterPurposeManyName.length > 0 
      ? meterPurposeManyName.join(', ')
      : "N/A";

    const ward = rows.length > 0 
      ? rows[0].ward 
      : "N/A";

    const monthYear = rows.length > 0 
      ? rows[0].monthAndYear  
      : "N/A";

    doc.setFontSize(14);
    const lineHeight = 10;

    // ===========================
    // ✅ पहिला पेज वरचे हेडर - Fixed Alignment
    // ===========================
    let yPosition = 20;

    // ✅ Fixed positioning to prevent table alignment issues
    doc.setFontSize(12);
    doc.addImage(meterPurposeIMG, "PNG", 130, yPosition, 23, 5.6);
    
    // ✅ Using fixed X position instead of center alignment to prevent table shift
    doc.setFontSize(12);
    doc.text(`:${meterPurpose}`, 155, yPosition + 3, { align: "left" }); 
    yPosition += lineHeight;

    doc.addImage(PrabhagIMG, "PNG", 130, yPosition-1, 13.5, 4.5);
    doc.setFontSize(12);
    doc.text(`:${ward}`, 175, yPosition + 1, { align: "left" });
    yPosition += lineHeight;

    doc.addImage(mahinAndVarsh, "PNG", 129, yPosition-4, 31, 5.7);
    doc.setFontSize(12);
    doc.text(`:${monthYear}`, 175, yPosition, { align: "left" }); 

    // ===========================
    // ✅ Table Data
    // ===========================
    const tableData = rows.map(row => [
      row.consumerNumber,
      row.consumerAddress,
      row.monthAndYear,
      row.ward,
      row.meterPurpose,
      row.netBillAmount,
      row.dueDate,
    ]);

    doc.autoTable({
      head: [['', '', '', '', '', '', '']],
      body: tableData,
      startY: 50,
      // ✅ Updated table styles - white background, black borders
      headStyles: {
        fillColor: [255, 255, 255], // White background
        textColor: [0, 0, 0],       // Black text
        lineWidth: 0.5,             // Thicker border
        lineColor: [0, 0, 0],       // Black border
        halign: 'center',
        valign: 'middle'
      },
      bodyStyles: {
        fillColor: [255, 255, 255], // White background for body
        textColor: [0, 0, 0],       // Black text
        lineWidth: 0.5,             // Thicker border
        lineColor: [0, 0, 0],       // Black border
        halign: 'left',
        valign: 'middle'
      },
      styles: {
        fontSize: 10,
        textColor: [0, 0, 0],
        lineWidth: 0.5,             // Consistent border width
        lineColor: [0, 0, 0],       // Black borders
        cellPadding: 3,
        overflow: 'linebreak'
      },
      tableLineColor: [0, 0, 0],    // Black table borders
      tableLineWidth: 0.5,          // Table border width
      didDrawPage: (data) => {
        // ✅ प्रत्येक page वर header images दाखवण्यासाठी
        const isFirstPage = data.pageNumber === 1;
        const topPosition = isFirstPage ? 52 : 15;

        // ✅ Consistent positioning for all header images
        doc.addImage(grahakKramank, "PNG", data.settings.margin.left + 2, topPosition, 20.7, 4.5);
        doc.addImage(Tapshil, "PNG", data.settings.margin.left + 35, topPosition-1, 14, 5);
        doc.addImage(Mahina, "PNG", data.settings.margin.left + 130, topPosition-1, 13, 5);
        doc.addImage(PrabhagIMG, "PNG", data.settings.margin.left + 148, topPosition, 11, 4);
        doc.addImage(meterPurposeIMG, "PNG", data.settings.margin.left + 165, topPosition-1, 18, 4.8);
        doc.addImage(Rakkam, "PNG", data.settings.margin.left + 223, topPosition, 12.5, 4);
        doc.addImage(AntimDinank, "PNG", data.settings.margin.left + 239, topPosition-1, 22, 5);
      },
    });

    // ===========================
    // ✅ Final Output
    // ===========================
    const pdfData = doc.output('datauristring');
    const type = "wardbilllist";
    handlePdfPreview(pdfData, type, monthYear);

    const pdfBlob = doc.output('blob');
    setPdfBlob(pdfBlob);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>PDF Generator - Fixed Alignment</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleDownloadPDF}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Generate PDF
        </button>
      </div>

      {showFormControl && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f8f9fa', 
          border: '1px solid #dee2e6',
          borderRadius: '5px',
          marginTop: '20px'
        }}>
          <h3>PDF Generated Successfully!</h3>
          <p>✅ Fixed alignment issues</p>
          <p>✅ Updated table styling with white background and black borders</p>
          <p>✅ Consistent text positioning</p>
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <h2>Sample Data:</h2>
        <div style={{ marginBottom: '10px' }}>
          <strong>Meter Purpose:</strong> {meterPurposeManyName.join(', ') || 'N/A'}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Ward:</strong> {rows.length > 0 ? rows[0].ward : 'N/A'}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Month/Year:</strong> {rows.length > 0 ? rows[0].monthAndYear : 'N/A'}
        </div>
        
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          marginTop: '15px',
          border: '1px solid #000'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ border: '1px solid #000', padding: '8px' }}>Consumer Number</th>
              <th style={{ border: '1px solid #000', padding: '8px' }}>Address</th>
              <th style={{ border: '1px solid #000', padding: '8px' }}>Month/Year</th>
              <th style={{ border: '1px solid #000', padding: '8px' }}>Ward</th>
              <th style={{ border: '1px solid #000', padding: '8px' }}>Purpose</th>
              <th style={{ border: '1px solid #000', padding: '8px' }}>Amount</th>
              <th style={{ border: '1px solid #000', padding: '8px' }}>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{row.consumerNumber}</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{row.consumerAddress}</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{row.monthAndYear}</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{row.ward}</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{row.meterPurpose}</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{row.netBillAmount}</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{row.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
