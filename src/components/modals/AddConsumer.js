import React, { useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AddRole.css';


import phasetype from '../../data/phasetype';
import meterpurpose from '../../data/meterpurpose';




const validationSchema = Yup.object({

    consumerNumber: Yup.string().required('Consumer Number is required'),
});

const AddConsumer = ({ open, handleClose, handleAddConsumer, currentConsumer, editConsumer }) => {
    // const [tarifftype, setTariffType] = React.useState([]);

    // useEffect(() => {
    //     // fetch('http://localhost:2000/api/getTarriffs')
    //     fetch('https://lightbillbackend.onrender.com/api/getTarriffs')
        
    //         .then(response => response.json())
    //         .then(data => setTariffType(data))
    //         .catch(error => console.error('Error fetching tariff types:', error));
    // }, []);
    const formik = useFormik({
        initialValues: {
            consumerNumber: currentConsumer ? currentConsumer.consumerNumber : '',
            consumerAddress: currentConsumer ? currentConsumer.consumerAddress : '',
            meterPurpose: currentConsumer ? currentConsumer.meterPurpose : '',
            phaseType: currentConsumer ? currentConsumer.phaseType : '',
            ward: currentConsumer ? currentConsumer.ward : '',
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (currentConsumer) {
                editConsumer(currentConsumer._id, values);
            } else {
                handleAddConsumer(values);
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
                    // width: 400,
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
                        id="consumerNumber"
                        name="consumerNumber"
                        label="Consumer Number"
                        // disabled
                        value={formik.values.consumerNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.consumerNumber && Boolean(formik.errors.consumerNumber)}
                        helperText={formik.touched.consumerNumber && formik.errors.consumerNumber}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />



                    <Typography className='A-R-Label' variant="subtitle1" gutterBottom>
                        CONSUMER ADDRESS
                    </Typography>
                    <TextField
                        fullWidth
                        id="consumerAddress"
                        name="consumerAddress"
                        label="Consumer Address"
                        // disabled
                        value={formik.values.consumerAddress}
                        onChange={formik.handleChange}
                        error={formik.touched.consumerAddress && Boolean(formik.errors.consumerAddress)}
                        helperText={formik.touched.consumerAddress && formik.errors.consumerAddress}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />

                    <Typography className='A-R-Label' variant="subtitle1" gutterBottom>
                        METER PURPOSE
                    </Typography>
                    <TextField
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
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />



{/* <Box>
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
                    </Box> */}


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
                            {currentConsumer ? 'Update Consumer' : 'Add Consumer'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddConsumer;
