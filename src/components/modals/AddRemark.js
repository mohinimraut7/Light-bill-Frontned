
import React, { useRef, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SignatureCanvas from 'react-signature-canvas';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl } from '../../config/config';
import { fetchBills } from '../../store/actions/billActions';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const validationSchema = Yup.object({
    remark: Yup.string().required('Remark is required'),
});

const AddRemarkModal = ({ open, handleClose, currentBill }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const sigCanvas = useRef(null);
    const [signature, setSignature] = useState(null);

    const saveSignature = () => {
        setSignature(sigCanvas.current.toDataURL("image/png")); // Convert signature to base64
    };

    const clearSignature = () => {
        sigCanvas.current.clear();
        setSignature(null);
    };

    const formik = useFormik({
        initialValues: {
            remark: currentBill ? currentBill.remark : '',
            signature: ''
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
                    _id: currentBill?._id,
                    role: user?.role,
                    signature: signature // Attach signature to the payload
                };

                const response = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                const result = await response.json();
                if (response.ok) {
                    toast.success(result.message, { position: "top-center" });
                    // alert(result.message);
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
                    maxHeight: '80vh', // Ensures modal does not exceed 80% of viewport height
                    overflowY: 'auto', // Enables scrolling inside the modal if content is too long
                }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Typography variant="subtitle1" gutterBottom>
                        ADD REMARK
                    </Typography>

                    {/* Remark Input */}
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

                    {/* Digital Signature Pad */}
                    <Typography variant="subtitle1" gutterBottom>
                        Signature
                    </Typography>
                    <Box sx={{ overflowX: 'auto' }}>
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor="black"
                            canvasProps={{ width: 400, height: 150, className: "sigCanvas", style: { border: "1px solid black" } }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Button onClick={clearSignature} sx={{ color: "red" }}>Clear Signature</Button>
                        <Button onClick={saveSignature} sx={{ color: "green" }}>Save Signature</Button>
                    </Box>

                    {signature && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2">Signature Preview:</Typography>
                            <img src={signature} alt="Signature" style={{ border: "1px solid black", width: "100%" }} />
                        </Box>
                    )}

                    {/* Submit & Cancel Buttons */}
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
                            {currentBill ? 'Update Remark' : 'Add Remark'}
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

