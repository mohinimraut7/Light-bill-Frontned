import React from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl } from '../../config/config';
const validationSchema = Yup.object({
    receiptNoBillPayment: Yup.string().required('Receipt Number is required'),
});
const AddReceiptModal = ({ open, handleClose, currentBill }) => {
    const formik = useFormik({
        initialValues: {
            receiptNoBillPayment: currentBill ? currentBill.receiptNoBillPayment : '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const url = currentBill && currentBill._id 
                    ? `${baseUrl}/editReceipt` 
                    : `${baseUrl}/addReceipt`;
                const method = currentBill && currentBill._id ? "PUT" : "POST";
                const payload = {
                    ...values,
                    _id: currentBill?._id,
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
                        RECEIPT NUMBER
                    </Typography>
                    <TextField
                        fullWidth
                        id="receiptNoBillPayment"
                        name="receiptNoBillPayment"
                        label="Receipt Number"
                        value={formik.values.receiptNoBillPayment}
                        onChange={formik.handleChange}
                        error={formik.touched.receiptNoBillPayment && Boolean(formik.errors.receiptNoBillPayment)}
                        helperText={formik.touched.receiptNoBillPayment && formik.errors.receiptNoBillPayment}
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
                            {currentBill ? 'Update Receipt' : 'Add Receipt'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};
const ReceiptActions = ({ handleOpenReceiptModal }) => {
    return {
        field: 'actions',
        headerName: 'Actions',
        width: 200,
        renderCell: (params) => (
            <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleOpenReceiptModal(params.row)}>
                <AddIcon />
            </IconButton>
        ),
    };
};

export { AddReceiptModal, ReceiptActions };
