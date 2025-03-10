import React,{useState} from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl,IconButton } from '@mui/material';
import { useFormik } from 'formik';
import FormHelperText from '@mui/material/FormHelperText';
import { useLocation } from 'react-router-dom';
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from 'yup';
import wardData from '../../data/warddata';
import './AddBill.css';
import paymentdata from '../../data/paymnetdata';
import meterstatus from '../../data/meterstatus';
import phasetype from '../../data/phasetype';
import {useSelector } from 'react-redux';
import dayjs from 'dayjs';
import MonthYearBill from '../MonthYearBill';
const validationSchema = Yup.object({
    consumerNumber: Yup.string().required('Consumer Number is required'), 
    contactNumber: Yup.string().required('Contact Number is required'), 
     totalConsumption: Yup.number().required('Total Consumption is required'),
    adjustmentUnit: Yup.number().required('Adjustment Unit is required'),
    meterNumber: Yup.string().required('Meter Number is required'),
     meterStatus: Yup.string().required('Meter Status is required'),
     netLoad: Yup.string().required('Net Load is required'),
     billingUnit: Yup.string().required('Billing Unit is required'),
     currentReading: Yup.number().required('Current Reading is required'),
    previousReading: Yup.number().required('Previous Reading is required'),
     netBillAmount: Yup.number().required('Net Bill Amount is required'),
    promptPaymentAmount: Yup.number().required('Prompt Payment Amount is required'),
    promptPaymentDate: Yup.date().required('Prompt Payment Date is required'),
    previousReadingDate: Yup.date().required('Previous Reading Date is required'),
    currentReadingDate: Yup.date().required('Current Reading Date is required'),
    billDate: Yup.date().required('Bill Date is required'),
    billNo: Yup.string().required('Bill Number is required'),
    monthAndYear: Yup.string()
    .required('Month and Year is required')
    .test('is-valid-date', 'Invalid Month and Year', (value) => {
      return value && dayjs(value, 'MMM-YYYY', true).isValid(); 
    }),
    dueDate: Yup.date().required('Due Date is required').typeError('Invalid date format'),
    lastReceiptDate: Yup.date().required('Last Receipt Date is required').typeError('Invalid date format'),
});
const AddBill = ({ open, handleClose, handleAddBill, currentBill = [], editBill }) => {
      const [myear,setMyear]=useState('');
    const user = useSelector(state => state.auth.user);
    console.log("user role in Add bill test", user?.role)
    const location = useLocation();
    const shouldHideBox =
        location.pathname.startsWith('/consumer-bill-details/') ||
        location.pathname === '/specificconsumerbills';
    const formik = useFormik({
        initialValues: {
            consumerNumber: currentBill ? currentBill.consumerNumber : '',
            consumerName: currentBill ? currentBill.consumerName : '',
            email: currentBill ? currentBill.email : '',
            contactNumber: currentBill ? currentBill.contactNumber : '',
            ward: currentBill ? currentBill.ward : '',
            adjustmentUnit: currentBill ? currentBill.adjustmentUnit : '',
            totalConsumption: currentBill ? currentBill.totalConsumption : '',
            installationDate: currentBill ? currentBill.installationDate : '',
            meterNumber: currentBill ? currentBill.meterNumber : '',
            meterPurpose: currentBill ? currentBill.meterPurpose : '',
            meterStatus: currentBill ? currentBill.meterStatus : '',
            tarriffDescription: currentBill ? currentBill.tarriffType : '',
            phaseType: currentBill ? currentBill.phaseType : '',
            billingUnit: currentBill ? currentBill.billingUnit : '',
            netLoad: currentBill ? currentBill.netLoad : '',
            sanctionedLoad: currentBill ? currentBill.sanctionedLoad : '',
            billType: currentBill ? currentBill.billType : '',
        billDisplayParameter1: currentBill ? currentBill.billDisplayParameter1 : '',
        billDisplayParameter2: currentBill ? currentBill.billDisplayParameter2 : '',
        billDisplayParameter3: currentBill ? currentBill.billDisplayParameter3 : '',
        billDisplayParameter4: currentBill ? currentBill.billDisplayParameter4 : '',
            billDate: currentBill ? currentBill.billDate : '',
            monthAndYear: currentBill ? currentBill.monthAndYear : '',
            previousReadingDate: currentBill ? currentBill.previousReadingDate : '',
            previousReading: currentBill ? currentBill.previousReading : '',
            currentReadingDate: currentBill ? currentBill.currentReadingDate : '',
            currentReading: currentBill ? currentBill.currentReading : '',
            netBillAmount: currentBill ? currentBill.netBillAmount : '',
            dueDate: currentBill ? currentBill.dueDate : '',
            netBillAmountWithDPC: currentBill ? currentBill.netBillAmountWithDPC : '',
            paymentStatus: currentBill ? currentBill.paymentStatus : '',
            lastReceiptAmount: currentBill ? currentBill.lastReceiptAmount : '',
            billNo: currentBill ? currentBill.billNo : '',
            lastReceiptDate: currentBill ? currentBill.lastReceiptDate : '',
            promptPaymentAmount: currentBill ? currentBill.promptPaymentAmount : '',
            promptPaymentDate: currentBill ? currentBill.promptPaymentDate : '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleAddBill(values);
            handleClose();
        },
        onSubmit: (values) => {
            if (currentBill) {
                editBill(currentBill._id, values);
            } else {
                handleAddBill(values);
            }
            handleClose();
        },
    });
    return (
        <Modal open={open} onClose={handleClose} >
            <Box
                sx={{
                    width:{
                     xl:"50%",
                      lg:"50%",
                      md:"90%",
                      sm:'90%',
                      xs:'90%'
                    },
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    maxHeight: '90%',
                    overflow: 'auto',
                    borderRadius: '10px',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#23CCEF',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#1EA2C1',
                    },
                }}
            >
<IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "gray",
            zIndex: 2, 
          }}
        >
          <CloseIcon />
        </IconButton>
                <Box
                    component='form'
                    onSubmit={formik.handleSubmit}
                >
                    <Box sx={{dispaly:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
                        <Typography variant='h5' sx={{fontWeight:'bold',textAlign:'center'}}>Add Bill</Typography>
                    </Box>
                    <Box sx={{mt:1}}>
                        <TextField
                        size="small"
                            fullWidth
                            id="consumerNumber"
                            name="consumerNumber"
                            label="Consumer Number"
                            value={formik.values.consumerNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.consumerNumber && Boolean(formik.errors.consumerNumber)}
                            helperText={formik.touched.consumerNumber && formik.errors.consumerNumber}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box  sx={{mt:0}}>
                        <TextField
                        size="small"
                            fullWidth
                            id="consumerName"
                            name="consumerName"
                            label="Consumer Name"
                            value={formik.values.consumerName}
                            onChange={formik.handleChange}
                            error={formik.touched.consumerName && Boolean(formik.errors.consumerName)}
                            helperText={formik.touched.consumerName && formik.errors.consumerName}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{mt:0}}>
                        <TextField
                         size="small"
                            fullWidth
                            id="email"
                            name="email"
                            label="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{mt:0}}>
                        <TextField
                         size="small"
                        fullWidth
                        id="contactNumber"
                        name="contactNumber"
                        label="contactNumber"
                        value={formik.values.contactNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                        helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                        margin="normal"
                        variant="outlined"
                        sx={{color:'#1C1C1C'}}
                    />
                    </Box>
<Box sx={{mt:0}}>
<FormControl fullWidth margin="normal" variant="outlined" size="small" sx={{color:'#1C1C1C'}}> 
    <InputLabel id="ward-label">Ward</InputLabel>
    <Select
        labelId="ward-label"
        id="ward"
        name="ward"
        value={formik.values.ward}
        onChange={formik.handleChange}
        label="Ward"
        error={formik.touched.ward && Boolean(formik.errors.ward)}
    >
        {wardData.map((ward, index) => (
            <MenuItem key={ward.wardid} value={ward.ward}>{ward.ward}</MenuItem>
        ))}
    </Select>
    {formik.touched.ward && formik.errors.ward && (
  <Typography color="error" variant="caption">{formik.errors.ward}</Typography>
)}
</FormControl>
</Box>
<Box sx={{mt:0}}>
                        <TextField
                         size="small"
                            fullWidth
                            id="adjustmentUnit"
                            name="adjustmentUnit"
                            label="Adjustment Unit"
                            type="number"
                            value={formik.values.adjustmentUnit}
                            onChange={formik.handleChange}
                            error={formik.touched.adjustmentUnit && Boolean(formik.errors.adjustmentUnit)}
                            helperText={formik.touched.adjustmentUnit && formik.errors.adjustmentUnit}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{mt:0}}>
                        <TextField
                         size="small"
                            fullWidth
                            type="number"
                            id="totalConsumption"
                            name="totalConsumption"
                            label="Total Consumption"
                            value={formik.values.totalConsumption}
                            onChange={formik.handleChange}
                            error={formik.touched.totalConsumption && Boolean(formik.errors.totalConsumption)}
                            helperText={formik.touched.totalConsumption && formik.errors.totalConsumption}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
 <Box sx={{mt:1,display:'flex',alignItems:'flex-start',justifyContent:'flex-end',flexDirection:'column'}}>
 <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        Installation Date
                        </Typography>
                        <TextField
                         size="small"
                            fullWidth
                            id="installationDate"
                            name="installationDate"
                            type="date"
                            value={formik.values.installationDate}
                            onChange={formik.handleChange}
                            error={formik.touched.installationDate && Boolean(formik.errors.installationDate)}
                            helperText={formik.touched.installationDate && formik.errors.installationDate}
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{mt:0}}>
                        <TextField
                         size="small"
                            fullWidth
                            id="meterNumber"
                            name="meterNumber"
                            label="Meter Number"
                            value={formik.values.meterNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.meterNumber && Boolean(formik.errors.meterNumber)}
                            helperText={formik.touched.meterNumber && formik.errors.meterNumber}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{mt:0}}>
                      <TextField
                       size="small"
                          fullWidth
                          id="meterPurpose"
                          name="meterPurpose"
                          label="Meter Purpose"
                          value={formik.values.meterPurpose}
                          onChange={formik.handleChange}
                          error={formik.touched.meterPurpose && Boolean(formik.errors.meterPurpose)}
                          helperText={formik.touched.meterPurpose && formik.errors.meterPurpose}
                          margin="normal"
                          variant="outlined"
                          sx={{color:'#1C1C1C'}}
                      />
                  </Box>
                    <Box sx={{mt:0}}>
                        <FormControl fullWidth margin="normal" variant="outlined" size="small" sx={{color:'#1C1C1C'}}>
                            <InputLabel id="ward-label">Meter Status</InputLabel>
                            <Select
                                labelId="meterStatus-label"
                                id="meterStatus"
                                name="meterStatus"
                                value={formik.values.meterStatus}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label="Ward"
                            >
                                {meterstatus.map((meterStatus, index) => (
                                    <MenuItem key={index} value={meterStatus.status}>{meterStatus.status}</MenuItem>
                                ))}
                            </Select>
                            {formik.touched.meterStatus && formik.errors.meterStatus && (
      <FormHelperText>{formik.errors.meterStatus}</FormHelperText>
    )}
                        </FormControl>
                    </Box>
                    <Box sx={{mt:0}}>
                        <FormControl fullWidth margin="normal" variant="outlined" size="small" sx={{color:'#1C1C1C'}}>
                            <InputLabel id="ward-label">Phase Type</InputLabel>
                            <Select
                                labelId="phaseType-label"
                                id="phaseType"
                                name="phaseType"
                                value={formik.values.phaseType}
                                onChange={formik.handleChange}
                                label="phaseType"
                            >
                                {phasetype.map((phaseType, index) => (
                                    <MenuItem key={index} value={phaseType.name}>{phaseType.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{mt:0}}>
                        <TextField
                         size="small"
                         sx={{color:'#1C1C1C'}}
                            fullWidth
                            id="tariffDescription"
                            name="tariffDescription"
                            label="Tariff Description"
                            value={formik.values.tariffDescription}
                            onChange={formik.handleChange}
                            error={formik.touched.tariffDescription && Boolean(formik.errors.tariffDescription)}
                            helperText={formik.touched.tariffDescription && formik.errors.tariffDescription}
                            margin="normal"
                            variant="outlined"
                        />
                    </Box>
                    <Box sx={{mt:0}}>
                        <TextField
                         size="small"
                            fullWidth
                            id="billingUnit"
                            name="billingUnit"
                            label="Billing Unit"
                            value={formik.values.billingUnit}
                            onChange={formik.handleChange}
                            error={formik.touched.billingUnit && Boolean(formik.errors.billingUnit)}
                            helperText={formik.touched.billingUnit && formik.errors.billingUnit}
                            margin="normal"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{mt:0}}>
                        <TextField
                        size="small"
                            fullWidth
                            id="netLoad"
                            name="netLoad"
                            label="Net Load"
                            value={formik.values.netLoad}
                            onChange={formik.handleChange}
                            error={formik.touched.netLoad && Boolean(formik.errors.netLoad)}
                            helperText={formik.touched.netLoad && formik.errors.netLoad}
                            margin="normal"
                            variant="outlined"
                        />
                    </Box>
                    <Box sx={{mt:0}}>
                        <TextField
                        size="small"
                            fullWidth
                            id="sanctionedLoad"
                            name="sanctionedLoad"
                            label="Sanctioned Load"
                            value={formik.values.sanctionedLoad}
                            onChange={formik.handleChange}
                            error={formik.touched.sanctionedLoad && Boolean(formik.errors.sanctionedLoad)}
                            helperText={formik.touched.sanctionedLoad && formik.errors.sanctionedLoad}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
<Box sx={{mt:0}}>
                        <TextField
                        size="small"
                            fullWidth
                            id="billType"
                            name="billType"
                            label="Bill Type"
                            value={formik.values.billType}
                            onChange={formik.handleChange}
                            error={formik.touched.billType && Boolean(formik.errors.billType)}
                            helperText={formik.touched.billType && formik.errors.billType}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
</Box>
<Box sx={{mt:0}}>
                        <TextField
                        size="small"
                            fullWidth
                            id=""
                            name="billDisplayParameter1"
                            label="billDisplayParameter1"
                            value={formik.values.billDisplayParameter1}
                            onChange={formik.handleChange}
                            error={formik.touched.billDisplayParameter1 && Boolean(formik.errors.billDisplayParameter1)}
                            helperText={formik.touched.billDisplayParameter1 && formik.errors.billDisplayParameter1}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
</Box>
<Box sx={{mt:0}}>
                        <TextField
                        size="small"
                            fullWidth
                            id=""
                            name="billDisplayParameter2"
                            label="billDisplayParameter2"
                            value={formik.values.billDisplayParameter2}
                            onChange={formik.handleChange}
                            error={formik.touched.billDisplayParameter2 && Boolean(formik.errors.billDisplayParameter2)}
                            helperText={formik.touched.billDisplayParameter2 && formik.errors.billDisplayParameter2}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
</Box>
<Box sx={{mt:0}}>
                        <TextField
                        size="small"
                            fullWidth
                            id="billDisplayParameter3"
                            name="billDisplayParameter3"
                            label="billDisplayParameter3"
                            value={formik.values.billDisplayParameter3}
                            onChange={formik.handleChange}
                            error={formik.touched.billDisplayParameter3 && Boolean(formik.errors.billDisplayParameter3)}
                            helperText={formik.touched.billDisplayParameter3 && formik.errors.billDisplayParameter3}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
</Box>
<Box sx={{mt:0}}>
                        <TextField
                        size="small"
                            fullWidth
                            id="billDisplayParameter4"
                            name="billDisplayParameter4"
                            label="billDisplayParameter4"
                            value={formik.values.billDisplayParameter4}
                            onChange={formik.handleChange}
                            error={formik.touched.billDisplayParameter4 && Boolean(formik.errors.billDisplayParameter4)}
                            helperText={formik.touched.billDisplayParameter4 && formik.errors.billDisplayParameter4}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
</Box>
<Box sx={{mt:1}}>
<TextField
size="small"
    fullWidth
    id="billDate"
    name="billDate"
    label="Bill Date"
    type="date"
    value={formik.values.billDate}
    onChange={formik.handleChange}
    error={formik.touched.billDate && Boolean(formik.errors.billDate)}
    helperText={formik.touched.billDate && formik.errors.billDate}
    margin="normal"
    variant="outlined"
    InputLabelProps={{
        shrink: true,
    }}
    sx={{color:'#1C1C1C'}}
/>
</Box>
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
        <Typography className="Auth-Label" variant="subtitle1" gutterBottom>
          Month and Year
        </Typography>
<MonthYearBill
    monthAndYear={formik.values.monthAndYear}
    setFieldValue={formik.setFieldValue}
    setFieldTouched={formik.setFieldTouched}
    name="monthAndYear"
    error={formik.touched.monthAndYear && Boolean(formik.errors.monthAndYear)}
    helperText={formik.touched.monthAndYear ? formik.errors.monthAndYear : ''}
  />
</Box>
                    <Box sx={{mt:2,display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-end'}}>
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                            PREVIOUS READING DATE
                        </Typography>
                        <TextField
                        size="small"
                            fullWidth
                            id="previousReadingDate"
                            name="previousReadingDate"
                            type="date"
                            value={formik.values.previousReadingDate}
                            onChange={formik.handleChange}
                            error={formik.touched.previousReadingDate && Boolean(formik.errors.previousReadingDate)}
                            helperText={formik.touched.previousReadingDate && formik.errors.previousReadingDate}
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{mt:1}}>
                        <TextField
                        size="small"
                            fullWidth
                            id="previousReading"
                            name="previousReading"
                            label="Previous Reading"
                            type="number"
                            value={formik.values.previousReading}
                            onChange={formik.handleChange}
                            error={formik.touched.previousReading && Boolean(formik.errors.previousReading)}
                            helperText={formik.touched.previousReading && formik.errors.previousReading}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{mt:2,display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-end'}}>
                        <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                            CURRENT READING DATE
                        </Typography>
                        <TextField
                        size="small"
                            fullWidth
                            id="currentReadingDate"
                            name="currentReadingDate"
                            type="date"
                            value={formik.values.currentReadingDate}
                            onChange={formik.handleChange}
                            error={formik.touched.currentReadingDate && Boolean(formik.errors.currentReadingDate)}
                            helperText={formik.touched.currentReadingDate && formik.errors.currentReadingDate}
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{mt:2}}>
                        <TextField
                        size="small"
                            fullWidth
                            id="currentReading"
                            name="currentReading"
                            label="Current Reading"
                            value={formik.values.currentReading}
                            type="number"
                            onChange={formik.handleChange}
                            error={formik.touched.currentReading && Boolean(formik.errors.currentReading)}
                            helperText={formik.touched.currentReading && formik.errors.currentReading}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{mt:0}}>
                        <TextField
                        size="small"
                            fullWidth
                            id="netBillAmount"
                            name="netBillAmount"
                            label="Net Bill Amount"
                            value={formik.values.netBillAmount}
                            onChange={formik.handleChange}
                            error={formik.touched.netBillAmount && Boolean(formik.errors.netBillAmount)}
                            helperText={formik.touched.netBillAmount && formik.errors.netBillAmount}
                            type="number"
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{mt:1,display:'flex',alignItems:'flex-start',justifyContent:'flex-end',flexDirection:'column'}}>
                        <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                            DUE DATE
                        </Typography>
                        <TextField
                        size="small"
                            fullWidth
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            value={formik.values.dueDate}
                            onChange={formik.handleChange}
                            error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                            helperText={formik.touched.dueDate && formik.errors.dueDate}
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{mt:1}}>
                        <TextField
                        size="small"
                            fullWidth
                            id="netBillAmountWithDPC"
                            name="netBillAmountWithDPC"
                            label="Net Bill Amount With DPC"
                            value={formik.values.netBillAmountWithDPC}
                            onChange={formik.handleChange}
                            error={formik.touched.netBillAmountWithDPC && Boolean(formik.errors.netBillAmountWithDPC)}
                            helperText={formik.touched.netBillAmountWithDPC && formik.errors.netBillAmountWithDPC}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{mt:1}}>
                        <FormControl fullWidth margin="normal" variant="outlined" size="small" sx={{color:'#1C1C1C'}}>
                            <InputLabel id="ward-label">Payment Status</InputLabel>
                            <Select
                                labelId="paymentStatus-label"
                                id="paymentStatus"
                                name="paymentStatus"
                                value={formik.values.paymentStatus}
                                onChange={formik.handleChange}
                                label="Ward"
                                sx={{color:'#1C1C1C'}}
                            >
                                {paymentdata.map((paymentstatus, index) => (
                                    <MenuItem sx={{color:'#1C1C1C'}} key={index} value={paymentstatus.status}>{paymentstatus.status}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{mt:0}}>
                        <TextField
                        size="small"
                            fullWidth
                            id="lastReceiptAmount"
                            name="lastReceiptAmount"
                            label="Last Receipt Amount"
                            value={formik.values.lastReceiptAmount}
                            disabled={formik.values.paymentStatus === "unpaid"}
                            onChange={formik.handleChange}
                            error={formik.touched.lastReceiptAmount && Boolean(formik.errors.lastReceiptAmount)}
                            helperText={formik.touched.lastReceiptAmount && formik.errors.lastReceiptAmount}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{mt:0}}>
                        <TextField
                        size="small"
                            fullWidth
                            id="billNo"
                            name="billNo"
                            label="Bill Number"
                            value={formik.values.billNo}
                            onChange={formik.handleChange}
                            error={formik.touched.billNo && Boolean(formik.errors.billNo)}
                            helperText={formik.touched.billNo && formik.errors.billNo}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{display:'flex',alignItems:'flex-start',justifyContent:'flex-end',flexDirection:'column',mt:2}}>
                        <Typography className='Auth-Label' sx={{mb:1}}>
                        LAST RECEIPT DATE
                        </Typography>
                        <TextField
                        size="small"
                            fullWidth
                            id="lastReceiptDate"
                            name="lastReceiptDate"
                            type="date"
                            value={formik.values.lastReceiptDate}
                            onChange={formik.handleChange}
                            error={formik.touched.lastReceiptDate && Boolean(formik.errors.lastReceiptDate)}
                            helperText={formik.touched.lastReceiptDate && formik.errors.lastReceiptDate}
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{mt:0}}>
                        <TextField
                        size="small"
                            fullWidth
                            id="promptPaymentAmount"
                            name="promptPaymentAmount"
                            label="Prompt Payment Amount"
                            type="number"
                            value={formik.values.promptPaymentAmount}
                            onChange={formik.handleChange}
                            error={formik.touched.promptPaymentAmount && Boolean(formik.errors.promptPaymentAmount)}
                            helperText={formik.touched.promptPaymentAmount && formik.errors.promptPaymentAmount}
                            margin="normal"
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{
                    display: 'flex',
      flexDirection:'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      mt:2
      }}>
                    <Typography  sx={{mb:1}} className="Auth-Label"> 
                        Prompt Payment Date
                        </Typography>
                        <TextField
                        size="small"
                            fullWidth
                            id="promptPaymentDate"
                            name="promptPaymentDate"
                            type="date"
                            value={formik.values.promptPaymentDate}
                            onChange={formik.handleChange}
                            error={formik.touched.promptPaymentDate && Boolean(formik.errors.promptPaymentDate)}
                            helperText={formik.touched.promptPaymentDate && formik.errors.promptPaymentDate}
                            variant="outlined"
                            sx={{color:'#1C1C1C'}}
                        />
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="button"
                            onClick={handleClose}
                            variant="contained"
                            sx={{
                                mr: 2,
                                backgroundColor: '#23CCEF',
                                width: '100px',
                                '&:hover': {
                                    backgroundColor: '#23CCEF',
                                    opacity: '0.8',
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: '#FB404B',
                                '&:hover': {
                                    backgroundColor: '#FB404B',
                                    opacity: '0.8',
                                },
                            }}
                        >
                            {currentBill ? 'Update Bill' : 'Add Bill'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};
export default AddBill;
