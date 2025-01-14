import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './SearchOneConsumer.css';
const validationSchema = Yup.object({
    userId: Yup.string().required('Consumer Number is required'),
});
const SearchOneConsumer = ({ open, handleClose, handleAddRole }) => {
    const formik = useFormik({
        initialValues: {
            userId: '', 
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleAddRole(values); 
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
                    component="form"
                    onSubmit={formik.handleSubmit}
                >
                    <Typography className="SOC-Label" variant="subtitle1" gutterBottom>
                        Enter Consumer Number
                    </Typography>
                    <TextField
                        fullWidth
                        id="userId"
                        name="userId"
                        label="Consumer Number"
                        value={formik.values.userId}
                        onChange={formik.handleChange}
                        error={formik.touched.userId && Boolean(formik.errors.userId)}
                        helperText={formik.touched.userId && formik.errors.userId}
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
                                    opacity: 0.8,
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
                                    opacity: 0.8,
                                },
                            }}
                        >
                            Search
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default SearchOneConsumer;
