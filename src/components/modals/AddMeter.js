import React, { useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AddRole.css';
import phasetype from '../../data/phasetype';
import meterpurpose from '../../data/meterpurpose';
import { baseUrl } from '../../config/config';
const validationSchema = Yup.object({
    cn: Yup.string().required('Consumer Number is required'),
    meterNumber: Yup.string().required('meterNumber is required'),
});
const AddMeter = ({ open, handleClose, handleAddMeter, currentMeter, editMeter }) => {
    const [tarifftype, setTariffType] = React.useState([]);
    useEffect(() => {
        fetch(`${baseUrl}/getTarriffs`)
        
            .then(response => response.json())
            .then(data => setTariffType(data))
            .catch(error => console.error('Error fetching tariff types:', error));
    }, []);
    const formik = useFormik({
        initialValues: {
            cn: currentMeter ? currentMeter.cn : '',
            meterNumber: currentMeter ? currentMeter.meterNumber : '',
            meterPurpose: currentMeter ? currentMeter.meterPurpose : '',
            phaseType: currentMeter ? currentMeter.phaseType : '',
            tariffType: currentMeter ? currentMeter.tariffType : '',
            sanctionedLoad: currentMeter ? currentMeter.sanctionedLoad : '',
            installationDate: currentMeter ? currentMeter.installationDate : '',
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (currentMeter) {
                editMeter(currentMeter._id, values);
            } else {
                handleAddMeter(values);
            }
            handleClose();
        },
    });
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '95%', sm: '75%', md: '50%', lg: '53%', xl: '55%' },
                    maxWidth: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '4px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '5px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#23CCEF',
                        borderRadius: '5px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#1EA2C1',
                    },
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        padding: '30px',
                        margin: 'auto',
                        borderRadius: '4px',
                    }}
                    component='form'
                    onSubmit={formik.handleSubmit}
                >
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        CONSUMER NUMBER
                    </Typography>
                    <TextField
                        fullWidth
                        id="cn"
                        name="cn"
                        label="Consumer Number"
                        value={formik.values.cn}
                        onChange={formik.handleChange}
                        error={formik.touched.cn && Boolean(formik.errors.cn)}
                        helperText={formik.touched.cn && formik.errors.cn}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
                    <Typography className='A-R-Label' variant="subtitle1" gutterBottom>
                        METER NUMBER
                    </Typography>
                    <TextField
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
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
<Box>
                        <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        METER PURPOSE
                        </Typography>
                        <FormControl fullWidth margin="normal" variant="outlined" className='A-B-Input'>
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
                    <Box>
                        <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                            PHASE TYPE
                        </Typography>
                        <FormControl fullWidth margin="normal" variant="outlined" className='A-B-Input'>
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
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-B-Input'>
                        <InputLabel id="tariffType-label">Tariff Type</InputLabel>
                        <Select
                            labelId="tariffType-label"
                            id="tariffType"
                            name="tariffType"
                            value={formik.values.tariffType}
                            onChange={formik.handleChange}
                            label="tariffType"
                        >
                            {tarifftype.map((tariffType, index) => (
                                <MenuItem key={index} value={tariffType.tarriffType}>{tariffType.tarriffType}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box>
                        <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                            SANCTIONED LOAD
                        </Typography>
                        <TextField
                            fullWidth
                            id="sanctionedLoad"
                            name="sanctionedLoad"
                            label="sanctionedLoad"
                            value={formik.values.sanctionedLoad}
                            onChange={formik.handleChange}
                            error={formik.touched.sanctionedLoad && Boolean(formik.errors.sanctionedLoad)}
                            helperText={formik.touched.sanctionedLoad && formik.errors.sanctionedLoad}
                            margin="normal"
                            variant="outlined"
                            className='A-B-Input'
                        />
                    </Box>
                    <Box>
                        <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                            INSTALLTION DATE
                        </Typography>
                        <TextField
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
                                    opacity: '0.8'
                                }
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
                                    opacity: '0.8'
                                }
                            }}
                        >
                            {currentMeter ? 'Update Meter' : 'Add Meter'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddMeter;
