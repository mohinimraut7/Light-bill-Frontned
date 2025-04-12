import React, { useState } from 'react';

import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl } from '../../config/config';
import { fetchBills } from '../../store/actions/billActions';
import { toast } from "react-toastify";
import SignaturePad from '../SignaturePad';
import SignatureUpload from '../SignatureUpload';
import "react-toastify/dist/ReactToastify.css";
import { fetchReports } from '../../store/actions/reportActions';
import expstatus from '../../data/expstatus';

const validationSchema = Yup.object({
    remark: Yup.string(),
    signature: Yup.string()
});

const AddRemarkReportExp = ({ open, handleClose, currentReport }) => {

    // console.log("**** -- currentReport",currentReport)
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [signatureMethod, setSignatureMethod] = useState('draw'); // 'draw' or 'upload'

    const formik = useFormik({
        initialValues: {
            remark: currentReport?.remark || '',
            signature: '',
            ward:''
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                // const url = currentReport?._id 
                //     ? `${baseUrl}/editRemark` 
                //     : `${baseUrl}/addRemarkReport`;
                // const method = currentReport?._id ? "PUT" : "POST";

                const url=`${baseUrl}/addRemarkReport`;
                    
                const method ="POST";
                
                const payload = {
                    ...values,
                    _id: currentReport?._id,
                    role: user?.role,
                    ward:user?.ward
                };

                const response = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                const result = await response.json();
                if (response.ok) {
                    toast.success(result.message, { position: "top-center" });
                    handleClose();
                    dispatch(fetchReports());
                } else {
                    toast.error(result.message || "Something went wrong");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Failed to process the request.");
            }
        },
    });

    const handleSignatureChange = (signatureData) => {
        formik.setFieldValue('signature', signatureData);
    };

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
                    maxHeight: '80vh',
                    overflowY: 'auto',
                }}
            >
                <form onSubmit={formik.handleSubmit}>
                    {/* <Typography variant="subtitle1" gutterBottom>
                        ADD REMARK
                    </Typography> */}

                    {/* <TextField
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
                    /> */}

                     <Box>
                                            <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                                                STATUS NAME
                                            </Typography>
                                            <FormControl fullWidth margin="normal" variant="outlined" className='A-B-Input'>
                                                <InputLabel id="ward-label">Status Name</InputLabel>
                                                <Select
                                                    labelId="remark"
                                                    id="remark"
                                                    name="remark"
                                                    size="small"
                                                    value={formik.values.remark}
                                                    onChange={formik.handleChange}
                                                    label="remark"
                                                >
                                                    {expstatus.map((expstatus, index) => (
                                                        <MenuItem key={index} value={expstatus.name}>{expstatus.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>

                    <Box sx={{ mt: 3, mb: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Signature
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <Button
                                variant={signatureMethod === 'draw' ? 'contained' : 'outlined'}
                                onClick={() => setSignatureMethod('draw')}
                                sx={{ mr: 1 }}
                            >
                                Draw Signature
                            </Button>
                            <Button
                                variant={signatureMethod === 'upload' ? 'contained' : 'outlined'}
                                onClick={() => setSignatureMethod('upload')}
                            >
                                Upload Signature
                            </Button>
                        </Box>

                        {signatureMethod === 'draw' ? (
                            <SignaturePad setSignature={handleSignatureChange} />
                        ) : (
                            <SignatureUpload setSignature={handleSignatureChange} />
                        )}

                        {formik.touched.signature && formik.errors.signature && (
                            <Typography color="error" variant="caption">
                                {formik.errors.signature}
                            </Typography>
                        )}

                        {formik.values.signature && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Preview:
                                </Typography>
                                <img
                                    src={formik.values.signature}
                                    alt="Signature Preview"
                                    style={{ maxWidth: '100%', maxHeight: '100px' }}
                                />
                            </Box>
                        )}
                    </Box>

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
                            {currentReport ? 'Update Remark' : 'Add Remark'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export { AddRemarkReportExp };



