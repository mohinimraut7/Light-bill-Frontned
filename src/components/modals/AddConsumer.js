import React, { useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import wardData from '../../data/warddata';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AddRole.css';
import phasetype from '../../data/phasetype';
import meterpurpose from '../../data/meterpurpose';
const validationSchema = Yup.object({
    consumerNumber: Yup.string().required('Consumer Number is required'),
});
const AddConsumer = ({ open, handleClose, handleAddConsumer, currentConsumer, editConsumer }) => {
    const formik = useFormik({
        initialValues: {
            consumerNumber: currentConsumer ? currentConsumer.consumerNumber : '',
            consumerPlace: currentConsumer ? currentConsumer.consumerPlace : '',
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
                  <Box sx={{mb:1}}>
                  <Typography sx={{height:'5px'}} className='Auth-Label' variant="subtitle1" gutterBottom>
                        CONSUMER NUMBER
                    </Typography>
                    <TextField
                        fullWidth
                        id="consumerNumber"
                        name="consumerNumber"
                        label="Consumer Number"
                        size="small"
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
                  </Box>
<Box sx={{mb:1}}>
<Typography sx={{height:'5px'}} className='A-R-Label' variant="subtitle1" gutterBottom>
                        CONSUMER PLACE
                    </Typography>
                    <TextField
                        fullWidth
                        id="consumerPlace"
                        name="consumerPlace"
                        label="Consumer Place"
                        size="small"
                        value={formik.values.consumerPlace}
                        onChange={formik.handleChange}
                        error={formik.touched.consumerPlace && Boolean(formik.errors.consumerPlace)}
                        helperText={formik.touched.consumerPlace && formik.errors.consumerPlace}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
</Box>
              <Box sx={{mb:1}}>
              <Typography sx={{height:'5px'}} className='A-R-Label' variant="subtitle1" gutterBottom>
                        CONSUMER ADDRESS
                    </Typography>
                    <TextField
                        fullWidth
                        id="consumerAddress"
                        name="consumerAddress"
                        label="Consumer Address"
                        size="small"
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
              </Box>
      <Box sx={{mb:1}}>
      <Typography sx={{height:'20px'}} className='A-R-Label' variant="subtitle1" gutterBottom>
                        WARD
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input'>
                        <InputLabel id="ward-label">Ward</InputLabel>
                        <Select
                            labelId="ward-label"
                            id="ward"
                            name="ward"
                            size="small"
                            value={formik.values.ward}
                            onChange={formik.handleChange}
                            label="Ward"
                        >
                            {wardData.map((ward, index) => (
                                <MenuItem key={index} value={ward.ward}>{ward.ward}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
        </Box>             
                     <Box sx={{mb:1}}>
                        <Typography sx={{height:'20px'}} className='Auth-Label' variant="subtitle1" gutterBottom>
                        METER PURPOSE
                        </Typography>
                        <FormControl fullWidth margin="normal" variant="outlined" className='A-B-Input'>
                            <InputLabel id="ward-label">Meter Purpose</InputLabel>
                            <Select
                               id="meterPurpose"
                               name="meterPurpose"
                              labelId="Meter Purpose"
                               size="small"
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
                                size="small"
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
