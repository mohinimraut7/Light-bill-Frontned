import React from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import wardData from '../../data/warddata';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AddRole.css';
import rolesdata from '../../data/rolesdata';
import FormHelperText from '@mui/material/FormHelperText'; // Ensure this import is present
const validationSchema = Yup.object({
    tarriffCode: Yup.string().required('Tarriff Code is required'),
    tarriffType: Yup.string().required('Tarriff Type is required'),
});
const AddTarriff = ({ open, handleClose, handleAddTarriff, currentTarriff, editTarriff }) => {
    const formik = useFormik({
        initialValues: {
            tarriffCode: currentTarriff ? currentTarriff.tarriffCode : '',
            tarriffType: currentTarriff ? currentTarriff.tarriffType : '',
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (currentTarriff) {
                editTarriff(currentTarriff._id, values);
            } else {
                handleAddTarriff(values);
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
                    width: { xs: '95%', sm: '75%', md: '50%', lg: '53%',xl: '55%' }, 
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
                    <Typography className='A-R-Label' variant="subtitle1" gutterBottom>
                    TARRIFF CODE
                    </Typography>
                    <TextField
                        fullWidth
                        id="tarriffCode"
                        name="tarriffCode"
                        label="Tarriff Code"
                        value={formik.values.tarriffCode}
                        onChange={formik.handleChange}
                        error={formik.touched.tarriffCode && Boolean(formik.errors.tarriffCode)}
                        helperText={formik.touched.tarriffCode && formik.errors.tarriffCode}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
<Typography className='A-R-Label' variant="subtitle1" gutterBottom>
                    TARRIFF TYPE
                    </Typography>
                    <TextField
                        fullWidth
                        id="tarriffType"
                        name="tarriffType"
                        label="Tarriff Type"
                        value={formik.values.tarriffType}
                        onChange={formik.handleChange}
                        error={formik.touched.tarriffType && Boolean(formik.errors.tarriffType)}
                        helperText={formik.touched.tarriffType && formik.errors.tarriffType}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}
                    />
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
                            {currentTarriff ? 'Update Tarriff' : 'Add Tarriff'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddTarriff;
