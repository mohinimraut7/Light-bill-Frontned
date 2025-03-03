import React from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl } from '../../config/config';
import { fetchBills } from '../../store/actions/billActions';

const validationSchema = Yup.object({
    // remark: Yup.string().required('Remark Number is required'),
});

const AddRemarkModal = ({ open, handleClose, currentBill }) => {
     const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
var rname;
    const formik = useFormik({
        initialValues: {
            remark: currentBill ? currentBill.remark : '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const url = currentBill && currentBill._id 
                    ? `${baseUrl}/editRemark` 
                    : `${baseUrl}/addRemark`;

                const method = currentBill && currentBill._id ? "PUT" : "POST";
                
                const payload = {
                    ...values,
                    _id: currentBill?._id, // Pass _id only if updating
                    role: user?.role
                };

                const response = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                const result = await response.json();
                
                if (response.ok) {
                    alert(result.message);
                    handleClose();
                  dispatch(fetchBills());
                } else {
                    alert(result.message || "Something went wrong");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Failed to process the request.");
            }
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
                    width: { xs: '90%', sm: '75%', md: '50%', lg: '40%', xl: '35%' },
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '4px',
                }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Typography variant="subtitle1" gutterBottom>
                        ADD REMARK
                    </Typography>
                    <TextField
                        fullWidth
                        id="remark"
                        name="remark"
                        label="Add Remark"
                        value={formik.values.remark}
                        onChange={formik.handleChange}
                        error={formik.touched.remark && Boolean(formik.errors.remark)}
                        helperText={formik.touched.remark && formik.errors.remark}
                        margin="normal"
                        variant="outlined"
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="button"
                            onClick={handleClose}
                            variant="contained"
                            sx={{ mr: 2, backgroundColor: '#23CCEF', '&:hover': { opacity: '0.8' } }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ backgroundColor: '#FB404B', '&:hover': { opacity: '0.8' } }}
                        >
                            {currentBill ? 'Add Remark' : 'Add Remark'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

const RemarkActions = ({ handleOpenRemarkModal }) => {
    return {
        field: 'actions',
        headerName: 'Actions',
        width: 200,
        renderCell: (params) => (
            <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleOpenRemarkModal(params.row)}>
                <AddIcon />
            </IconButton>
        ),
    };
};

export { AddRemarkModal, RemarkActions };
