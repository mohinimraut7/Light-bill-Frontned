import React, { useRef, useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SignaturePad from '../SignaturePad';
import SignatureUpload from '../SignatureUpload';
const validationSchema = Yup.object({
    billNumber: Yup.string().required('Bill Number is required'),
    pramanakNumber: Yup.string().required('Pramanak Number is required'),
    date: Yup.date().required('Date is required'),
    bookReference: Yup.string().required('Book Reference is required'),
    total: Yup.number().required('Total is required'),
    signature: Yup.string().required('Signature is required'),
});

const Form22Modal = ({ open, handleClose, handleSubmitData, currentData }) => {
    // const sigCanvas = useRef(null);
    const [signature, setSignature] = useState(null);
const [signatureMethod, setSignatureMethod] = useState('draw'); // 'draw' or 'upload'
    // const saveSignature = () => {
    //     setSignature(sigCanvas.current.toDataURL("image/png"));
    // };

    // const clearSignature = () => {
    //     sigCanvas.current.clear();
    //     setSignature(null);
    // };
    const handleSignatureChange = (signatureData) => {
        formik.setFieldValue('signature', signatureData);
    };

    const formik = useFormik({
        initialValues: {
            billNumber: currentData ? currentData.billNumber : '',
            pramanakNumber: currentData ? currentData.pramanakNumber : '',
            date: currentData ? currentData.date : '',
            bookReference: currentData ? currentData.bookReference : '',
            total: currentData ? currentData.total : '',
            signature: ''
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            handleSubmitData({ ...values, signature });
            handleClose();
        },
    });

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
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
            }}>
                <form onSubmit={formik.handleSubmit}>
                    <Typography variant="h6" gutterBottom>Form 22 Details</Typography>

                    <TextField
                        fullWidth
                        label="Bill Number"
                        id="billNumber"
                        name="billNumber"
                        value={formik.values.billNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.billNumber && Boolean(formik.errors.billNumber)}
                        helperText={formik.touched.billNumber && formik.errors.billNumber}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Pramanak Number"
                        id="pramanakNumber"
                        name="pramanakNumber"
                        value={formik.values.pramanakNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.pramanakNumber && Boolean(formik.errors.pramanakNumber)}
                        helperText={formik.touched.pramanakNumber && formik.errors.pramanakNumber}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        type="date"
                        label="Date"
                        id="date"
                        name="date"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        error={formik.touched.date && Boolean(formik.errors.date)}
                        helperText={formik.touched.date && formik.errors.date}
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        fullWidth
                        label="Book Reference"
                        id="bookReference"
                        name="bookReference"
                        value={formik.values.bookReference}
                        onChange={formik.handleChange}
                        error={formik.touched.bookReference && Boolean(formik.errors.bookReference)}
                        helperText={formik.touched.bookReference && formik.errors.bookReference}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label="Total"
                        id="total"
                        name="total"
                        value={formik.values.total}
                        onChange={formik.handleChange}
                        error={formik.touched.total && Boolean(formik.errors.total)}
                        helperText={formik.touched.total && formik.errors.total}
                        margin="normal"
                    />

                    {/* <Typography variant="subtitle1" gutterBottom>Signature</Typography>
                    <Box sx={{ overflowX: 'auto', border: '1px solid black', width: '100%', height: 150 }}>
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor="black"
                            canvasProps={{ width: 400, height: 150, className: "sigCanvas" }}
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
                    )} */}


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
                            <SignaturePad 
                              setSignature={handleSignatureChange}
                              initialSignature={formik.values.signature}
                            />
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
                        <Button type="button" onClick={handleClose} variant="contained" sx={{ mr: 2, backgroundColor: '#23CCEF' }}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" sx={{ backgroundColor: '#FB404B' }}>
                            {currentData ? 'Update Form' : 'Submit Form'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default Form22Modal;
