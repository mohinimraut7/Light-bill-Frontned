import React from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl,IconButton } from '@mui/material';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';
import CloseIcon from "@mui/icons-material/Close";

import * as Yup from 'yup';
import wardData from '../../data/warddata';
import './AddBill.css';
import paymentdata from '../../data/paymnetdata';
import meterstatus from '../../data/meterstatus';
import meterpurpose from '../../data/meterpurpose';
import phasetype from '../../data/phasetype';
import tarifftype from '../../data/tarifftype';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
const validationSchema = Yup.object({
    //   cn: Yup.string().required('Consumer Number is required'), 
    // totalConsumption: Yup.number().required('Total Consumption is required').min(0, 'Total Consumption must be positive'),
    // meterStatus: Yup.string().required('Meter Status is required'),
    // currentReading: Yup.number().required('Current Reading is required').min(0, 'Current Reading must be positive'),
    // previousReading: Yup.number().required('Previous Reading is required').min(0, 'Previous Reading must be positive'),
    // currentBillAmount: Yup.number().required('Current Bill Amount is required').min(0, 'Current Bill Amount must be positive'),
    // totalArrears: Yup.number().required('Total Arrears is required'),
    // netBillAmount: Yup.number().required('Net Bill Amount is required').min(0, 'Net Bill Amount must be positive'),
    // roundedBillAmount: Yup.number().required('Rounded Bill Amount is required').min(0, 'Rounded Bill Amount must be positive'),
    // ifPaidThisDate: Yup.date().required('If Paid This Date is required').typeError('Invalid date format'),
    // earlyPaymentAmount: Yup.number().required('Early Payment Amount is required').min(0, 'Early Payment Amount must be positive'),

    // ifPaidBefore: Yup.string().required('If Paid Before is required'),
    // dueDate: Yup.date().required('Due Date is required').typeError('Invalid date format'),
    // ifPaidAfter: Yup.string().required('If Paid After is required'),
    // receiptNoBillPayment: Yup.string(),
    // billPaymentDate: Yup.string(),

});

const AddBill = ({ open, handleClose, handleAddBill, currentBill = [], editBill }) => {
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
            consumerAddress: currentBill ? currentBill.consumerAddress : '',
            email: currentBill ? currentBill.email : '',
            contactNumber: currentBill ? currentBill.contactNumber : '',
            // role: currentBill ? currentBill.role : '',
            ward: currentBill ? currentBill.ward : '',
            adjustmentUnit: currentBill ? currentBill.adjustmentUnit : '',
            totalConsumption: currentBill ? currentBill.totalConsumption : '',
            installationDate: currentBill ? currentBill.installationDate : '',
            meterNumber: currentBill ? currentBill.meterNumber : '',
            meterStatus: currentBill ? currentBill.meterStatus : '',
            meterPurpose: currentBill ? currentBill.meterPurpose : '',
            tarriffCode: currentBill ? currentBill.tarriffCode : '',
            tarriffType: currentBill ? currentBill.tarriffType : '',
            phaseType: currentBill ? currentBill.phaseType : '',

            billingUnit: currentBill ? currentBill.billingUnit : '',
            netLoad: currentBill ? currentBill.netLoad : '',
            sanctionedLoad: currentBill ? currentBill.sanctionedLoad : '',
            billDate: currentBill ? currentBill.billDate : '',
            monthAndYear: currentBill ? currentBill.monthAndYear : '',
            previousReadingDate: currentBill ? currentBill.previousReadingDate : '',
            previousReading: currentBill ? currentBill.previousReading : '',
            currentReadingDate: currentBill ? currentBill.currentReadingDate : '',
            currentReading: currentBill ? currentBill.currentReading : '',
            currentBillAmount: currentBill ? currentBill.currentBillAmount : '',
            totalArrears: currentBill ? currentBill.totalArrears : '',
            netBillAmount: currentBill ? currentBill.netBillAmount : '',
            roundedBillAmount: currentBill ? currentBill.roundedBillAmount : '',
            ifPaidThisDate: currentBill ? currentBill.ifPaidThisDate : '',
            // ifPaidThisDate: currentBill?.ifPaidThisDate ? moment(currentBill?.ifPaidThisDate, "MMMM DD, YYYY").format("YYYY-MM-DD") : new Date().toISOString().split('T')[0],
            earlyPaymentAmount: currentBill ? currentBill.earlyPaymentAmount : '',
            dueDate: currentBill ? currentBill.dueDate : '',
            ifPaidAfter: currentBill ? currentBill.ifPaidAfter : '',
            paymentStatus: currentBill ? currentBill.paymentStatus : '',
            paidAmount: currentBill ? currentBill.paidAmount : '',
            pendingAmount: currentBill ? currentBill.pendingAmount : '',
            billNo: currentBill ? currentBill.billNo : '',
            billPaymentDate: currentBill ? currentBill.billPaymentDate : '',
            receiptNoBillPayment: currentBill ? currentBill.receiptNoBillPayment : '',
            promptPaymentAmount: currentBill ? currentBill.promptPaymentAmount : '',
            promptPaymentDate: currentBill ? currentBill.promptPaymentDate : '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleAddBill(values);
            handleClose();
        },


        onSubmit: (values) => {
            // if (currentBill && !values.password) {
            //     values.password = currentBill.password;
            // }
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
                    sx={{
                       
                       
                    }}
                    component='form'
                    onSubmit={formik.handleSubmit}
                >
                    <Box sx={{dispaly:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
                        <Typography variant='h5' sx={{fontWeight:'bold',textAlign:'center'}}>Add Bill</Typography>
                    </Box>

                    <Box sx={{mt:5}}>
                       
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
                            className='A-B-Input'
                            
                        />
                    </Box>
                    <Box  sx={{mt:2}}>
                      
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
                            className='A-B-Input'
                        />
                    </Box>

                    <Box sx={{mt:2}}>
                       
                        <TextField
                         size="small"
                            fullWidth
                            id="consumerAddress"
                            name="consumerAddress"
                            label="Consumer Address"
                            value={formik.values.consumerAddress}
                            onChange={formik.handleChange}
                            error={formik.touched.consumerAddress && Boolean(formik.errors.consumerAddress)}
                            helperText={formik.touched.consumerAddress && formik.errors.consumerAddress}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />
                    </Box>
                    
                    <Box sx={{mt:2}}>
                       
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
                             className='A-B-Input'
                        />
                    </Box>

                    <Box sx={{mt:2}}>
                  
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
                         className='A-B-Input'
                       
                    />
                    </Box>


<Box sx={{mt:2}}>
<FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input'  size="small"   className='A-B-Input'>
    <InputLabel id="ward-label">Ward</InputLabel>
    <Select
        labelId="ward-label"
        id="ward"
        name="ward"
        value={formik.values.ward}
        onChange={formik.handleChange}
        label="Ward"
        disabled={formik.values.ward==='All'}
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

<Box sx={{mt:2}}>
                       
                        <TextField
                         size="small"
                            fullWidth
                            id="adjustmentUnit"
                            name="adjustmentUnit"
                            label="Adjustment Unit"
                            value={formik.values.adjustmentUnit}
                            onChange={formik.handleChange}
                            error={formik.touched.adjustmentUnit && Boolean(formik.errors.adjustmentUnit)}
                            helperText={formik.touched.adjustmentUnit && formik.errors.adjustmentUnit}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />
                    </Box>


                    <Box sx={{mt:2}}>
                        
                        <TextField
                         size="small"
                            fullWidth
                            id="totalConsumption"
                            name="totalConsumption"
                            label="Total Consumption"
                            value={formik.values.totalConsumption}
                            onChange={formik.handleChange}
                            error={formik.touched.totalConsumption && Boolean(formik.errors.totalConsumption)}
                            helperText={formik.touched.totalConsumption && formik.errors.totalConsumption}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />
                    </Box>


 <Box sx={{mt:2}}>
                        
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
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />
                    </Box>


                    <Box sx={{mt:2}}>
                      
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
                            className='A-B-Input'
                        />
                    </Box>
                    <Box sx={{mt:2}}>
                        
                        <FormControl fullWidth margin="normal" variant="outlined" className='A-B-Input'  size="small">
                            <InputLabel id="ward-label">Meter Status</InputLabel>
                            <Select
                                labelId="meterStatus-label"
                                id="meterStatus"
                                name="meterStatus"
                                value={formik.values.meterStatus}
                                onChange={formik.handleChange}
                                label="Ward"
                            >
                                {meterstatus.map((meterStatus, index) => (
                                    <MenuItem key={index} value={meterStatus.status}>{meterStatus.status}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Box>

                    <Box sx={{mt:2}}>
                       
                        <FormControl fullWidth margin="normal" variant="outlined" className='A-B-Input'  size="small">
                            <InputLabel id="ward-label">Meter Purpose</InputLabel>
                            <Select
                                id="meterPurpose"
                                name="meterPurpose"
                                labelId="Meter Purpose"


                                value={formik.values.meterPurpose}
                                onChange={formik.handleChange}
                                label="meterPurpose"
                            >
                                {meterpurpose.map((meterpurpose, index) => (
                                    <MenuItem key={index} value={meterpurpose.purpose}>{meterpurpose.purpose}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{mt:2}}>
                       
                        <FormControl fullWidth margin="normal" variant="outlined" className='A-B-Input' size="small" >
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


                    <Box sx={{mt:2}}>
                       
                        <TextField
                         size="small"
                            fullWidth
                            id="tarriffCode"
                            name="tarriffCode"
                            label="Tarriff Code"
                            // disabled
                            value={formik.values.tarriffCode}
                            onChange={formik.handleChange}
                            error={formik.touched.tarriffCode && Boolean(formik.errors.tarriffCode)}
                            helperText={formik.touched.tarriffCode && formik.errors.tarriffCode}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                            InputLabelProps={{
                                sx: {
                                    color: '#DDDDDD',
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{mt:2}}>
                       
                        <TextField
                         size="small"
                            fullWidth
                            id="tarriffType"
                            name="tarriffType"
                            label="Tarriff Type"
                            // disabled
                            value={formik.values.tarriffType}
                            onChange={formik.handleChange}
                            error={formik.touched.tarriffType && Boolean(formik.errors.tarriffType)}
                            helperText={formik.touched.tarriffType && formik.errors.tarriffType}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                            InputLabelProps={{
                                sx: {
                                    color: '#DDDDDD',
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{mt:2}}>
                        
                        <TextField
                         size="small"
                            fullWidth
                            id="billingUnit"
                            name="billingUnit"
                            label="Billing Unit"
                            // disabled
                            value={formik.values.billingUnit}
                            onChange={formik.handleChange}
                            error={formik.touched.billingUnit && Boolean(formik.errors.billingUnit)}
                            helperText={formik.touched.billingUnit && formik.errors.billingUnit}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                            InputLabelProps={{
                                sx: {
                                    color: '#DDDDDD',
                                },
                            }}
                        />
                    </Box>

                   

                    <Box sx={{mt:2}}>
                       
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
                            className='A-B-Input'
                        />
                    </Box>
                    <Box sx={{mt:2}}>
                       
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
                            className='A-B-Input'
                        />
                    </Box>
                    <Box sx={{mt:2}}>


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
    className='A-B-Input'
    InputLabelProps={{
        shrink: true,
    }}
/>

</Box>

<Box sx={{mt:1}}>
<Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                            Month And Year
                        </Typography>
                       
                        <TextField
                        size="small"
                            fullWidth
                            id="monthAndYear"
                            name="monthAndYear"
                            // label="Previous Reading Date"
                            type="date"
                            value={formik.values.monthAndYear}
                            onChange={formik.handleChange}
                            error={formik.touched.monthAndYear && Boolean(formik.errors.monthAndYear)}
                            helperText={formik.touched.monthAndYear && formik.errors.monthAndYear}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />
                    </Box>
                    <Box sx={{mt:1}}>
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                            PREVIOUS READING DATE
                        </Typography>
                        <TextField
                        size="small"
                            fullWidth
                            id="previousReadingDate"
                            name="previousReadingDate"
                            // label="Previous Reading Date"
                            type="date"
                            value={formik.values.previousReadingDate}
                            onChange={formik.handleChange}
                            error={formik.touched.previousReadingDate && Boolean(formik.errors.previousReadingDate)}
                            helperText={formik.touched.previousReadingDate && formik.errors.previousReadingDate}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />
                    </Box>
                    <Box sx={{mt:2}}>

                       
                        <TextField
                        size="small"
                            fullWidth
                            id="previousReading"
                            name="previousReading"
                            label="Previous Reading"
                            value={formik.values.previousReading}
                            onChange={formik.handleChange}
                            error={formik.touched.previousReading && Boolean(formik.errors.previousReading)}
                            helperText={formik.touched.previousReading && formik.errors.previousReading}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />
                    </Box>


                    <Box sx={{mt:2}}>
                        <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                            CURRENT READING DATE
                        </Typography>
                        <TextField
                        size="small"
                            fullWidth
                            id="currentReadingDate"
                            name="currentReadingDate"
                            // label="Current Reading Date"
                            type="date"
                            value={formik.values.currentReadingDate}
                            onChange={formik.handleChange}
                            error={formik.touched.currentReadingDate && Boolean(formik.errors.currentReadingDate)}
                            helperText={formik.touched.currentReadingDate && formik.errors.currentReadingDate}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
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
                            onChange={formik.handleChange}
                            error={formik.touched.currentReading && Boolean(formik.errors.currentReading)}
                            helperText={formik.touched.currentReading && formik.errors.currentReading}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />

                    </Box>
                   

                    

                    <Box sx={{mt:2}}>

                      
                        <TextField
                        size="small"
                            fullWidth
                            id="currentBillAmount"
                            name="currentBillAmount"
                            label="Current Bill Amount"
                            value={formik.values.currentBillAmount}
                            onChange={formik.handleChange}
                            error={formik.touched.currentBillAmount && Boolean(formik.errors.currentBillAmount)}
                            helperText={formik.touched.currentBillAmount && formik.errors.currentBillAmount}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />

                    </Box>

                    <Box sx={{mt:2}}>
                        
                        <TextField
                        size="small"
                            fullWidth
                            id="totalArrears"
                            name="totalArrears"
                            label="Total Arrears"
                            value={formik.values.totalArrears}
                            onChange={formik.handleChange}
                            error={formik.touched.totalArrears && Boolean(formik.errors.totalArrears)}
                            helperText={formik.touched.totalArrears && formik.errors.totalArrears}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />

                    </Box>
                    <Box sx={{mt:2}}>
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
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />

                    </Box>

                    <Box sx={{mt:2}}>
                        
                        <TextField
                        size="small"
                            fullWidth
                            id="roundedBillAmount"
                            name="roundedBillAmount"
                            label="Rounded Bill Amount"
                            value={formik.values.roundedBillAmount}
                            onChange={formik.handleChange}
                            error={formik.touched.roundedBillAmount && Boolean(formik.errors.roundedBillAmount)}
                            helperText={formik.touched.roundedBillAmount && formik.errors.roundedBillAmount}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />

                    </Box>

                    <Box sx={{mt:2}}>

                        <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                            IF PAID BY THIS DATE
                        </Typography>
                        <TextField
                        size="small"
                            fullWidth
                            id="ifPaidByThisDate"
                            name="ifPaidByThisDate"
                            // label="If Paid By This Date"
                            type="date"
                            value={formik.values.ifPaidByThisDate}
                            onChange={formik.handleChange}
                            error={formik.touched.ifPaidByThisDate && Boolean(formik.errors.ifPaidByThisDate)}
                            helperText={formik.touched.ifPaidByThisDate && formik.errors.ifPaidByThisDate}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />
                    </Box>



                    <Box sx={{mt:2}}>

                       
                        <TextField
                        size="small"
                            fullWidth
                            id="earlyPaymentAmount"
                            name="earlyPaymentAmount"
                            label="Early Payment Amount"
                            value={formik.values.earlyPaymentAmount}
                            onChange={formik.handleChange}
                            error={formik.touched.earlyPaymentAmount && Boolean(formik.errors.earlyPaymentAmount)}
                            helperText={formik.touched.earlyPaymentAmount && formik.errors.earlyPaymentAmount}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />


                    </Box>

                    

                    <Box sx={{mt:1}}>

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
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />

                    </Box>



                    <Box sx={{mt:1}}>
                        <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                            IF PAID AFTER
                        </Typography>
                        <TextField
                        size="small"
                            fullWidth
                            id="ifPaidAfter"
                            name="ifPaidAfter"
                            label="If Paid After"
                            value={formik.values.ifPaidAfter}
                            onChange={formik.handleChange}
                            error={formik.touched.ifPaidAfter && Boolean(formik.errors.ifPaidAfter)}
                            helperText={formik.touched.ifPaidAfter && formik.errors.ifPaidAfter}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />
                    </Box>


                    <Box sx={{mt:3}}>
                       
                        <FormControl fullWidth margin="normal" variant="outlined" className='A-B-Input' size="small">
                            <InputLabel id="ward-label">Payment Status</InputLabel>
                            <Select
                                labelId="paymentStatus-label"
                                id="paymentStatus"
                                name="paymentStatus"
                                value={formik.values.paidAmount === formik.values.roundedBillAmount ? 'Paid' : formik.values.paymentStatus}
                                onChange={formik.handleChange}
                                label="Ward"
                            >
                                {paymentdata.map((paymentstatus, index) => (
                                    <MenuItem key={index} value={paymentstatus.status}>{paymentstatus.status}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Box>

                    <Box sx={{mt:2}}>
                       
                        <TextField
                        size="small"
                            fullWidth
                            id="paidAmount"
                            name="paidAmount"
                            label="Paid Amount"
                            value={
                                formik.values.paymentStatus === "Paid"
                                    ? formik.values.paidAmount = formik.values.roundedBillAmount
                                    : formik.values.paymentStatus === "UnPaid"
                                        ? formik.values.paidAmount = 0
                                        : formik.values.paymentStatus === "Partial"
                                            ? Math.max(formik.values.paidAmount, formik.values.paidAmount > 0)
                                            : formik.values.paymentStatus === "Pending"
                                                ? Math.min(formik.values.paidAmount, formik.values.roundedBillAmount - 1)
                                                : formik.values.paidAmount
                            }
                            disabled={formik.values.paymentStatus === "Paid" || formik.values.paymentStatus === "UnPaid"}
                            onChange={formik.handleChange}
                            error={formik.touched.paidAmount && Boolean(formik.errors.paidAmount)}
                            helperText={formik.touched.paidAmount && formik.errors.paidAmount}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />
                    </Box>




                    <Box sx={{mt:2}}>
                        
                        <TextField
                        size="small"
                            fullWidth
                            id="pendingAmount"
                            name="pendingAmount"
                            label="Pending Amount"
                            value={
                                formik.values.paymentStatus === 'UnPaid' ? formik.values.roundedBillAmount :
                                    formik.values.paymentStatus === 'Paid' ? 0 :
                                        formik.values.paymentStatus === 'Partial' ? formik.values.roundedBillAmount - formik.values.paidAmount :
                                            formik.values.paidAmount ? formik.values.roundedBillAmount - formik.values.paidAmount : formik.values.pendingAmount
                            }
                            onChange={formik.handleChange}
                            error={formik.touched.pendingAmount && Boolean(formik.errors.pendingAmount)}
                            helperText={formik.touched.pendingAmount && formik.errors.pendingAmount}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />

                    </Box>
                    <Box sx={{mt:2}}>
                       
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
                            className='A-B-Input'
                        />
                    </Box>

                    <Box sx={{mt:2}}>
                        <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                            BILL PAYMENT DATE
                        </Typography>
                        <TextField
                        size="small"
                            fullWidth
                            id="billPaymentDate"
                            name="billPaymentDate"
                            type="date"
                            value={formik.values.billPaymentDate}
                            onChange={formik.handleChange}
                            error={formik.touched.billPaymentDate && Boolean(formik.errors.billPaymentDate)}
                            helperText={formik.touched.billPaymentDate && formik.errors.billPaymentDate}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />
                    </Box>


                    <Box sx={{mt:2}}>
                       
                        <TextField
                        size="small"
                            fullWidth
                            id="receiptNoBillPayment"
                            name="receiptNoBillPayment"
                            label="receiptNoBillPayment"
                            value={formik.values.receiptNoBillPayment}
                            onChange={formik.handleChange}
                            error={formik.touched.receiptNoBillPayment && Boolean(formik.errors.receiptNoBillPayment)}
                            helperText={formik.touched.receiptNoBillPayment && formik.errors.receiptNoBillPayment}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />
                    </Box>
                    <Box sx={{mt:2}}>
                      
                        <TextField
                        size="small"
                            fullWidth
                            id="promptPaymentAmount"
                            name="promptPaymentAmount"
                            label="Prompt Payment Amount"
                            value={formik.values.promptPaymentAmount}
                            onChange={formik.handleChange}
                            error={formik.touched.promptPaymentAmount && Boolean(formik.errors.promptPaymentAmount)}
                            helperText={formik.touched.promptPaymentAmount && formik.errors.promptPaymentAmount}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />
                    </Box>

                    <Box sx={{mt:2}}>
                       
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
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
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
