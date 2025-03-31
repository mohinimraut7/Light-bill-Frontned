
// import React, { useRef, useState } from 'react';
// import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import SignatureCanvas from 'react-signature-canvas';
// import AddIcon from '@mui/icons-material/Add';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { baseUrl } from '../../config/config';
// import { fetchBills } from '../../store/actions/billActions';
// import { toast } from "react-toastify";
// import SignaturePad from '../SignaturePad';
// import SignatureUpload from '../SignatureUpload';
// import "react-toastify/dist/ReactToastify.css";
// const validationSchema = Yup.object({
//     remark: Yup.string().required('Remark is required'),
// });

// const AddRemarkModal = ({ open, handleClose, currentBill }) => {
//     const dispatch = useDispatch();
//     const user = useSelector(state => state.auth.user);
//     const sigCanvas = useRef(null);
//     const [signature, setSignature] = useState(null);
//   const [signatureMethod, setSignatureMethod] = useState('draw'); // 'draw' or 'upload'
//     const saveSignature = () => {
//         setSignature(sigCanvas.current.toDataURL("image/png")); // Convert signature to base64
//     };

//     const clearSignature = () => {
//         sigCanvas.current.clear();
//         setSignature(null);
//     };

//     const handleSignatureChange = (signatureData) => {
//         formik.setFieldValue('signature', signatureData);
//     };

//     const formik = useFormik({
//         initialValues: {
//             remark: currentBill ? currentBill.remark : '',
//             // signature: ''
//         },
//         validationSchema,
//         enableReinitialize: true,
//         onSubmit: async (values) => {
//             try {
//                 const url = currentBill && currentBill._id 
//                     ? `${baseUrl}/editRemark` 
//                     : `${baseUrl}/addRemark`;
//                 const method = currentBill && currentBill._id ? "PUT" : "POST";
                
//                 const payload = {
//                     ...values,
//                     _id: currentBill?._id,
//                     role: user?.role,
//                     signature: signature // Attach signature to the payload
//                 };

//                 const response = await fetch(url, {
//                     method,
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(payload),
//                 });

//                 const result = await response.json();
//                 if (response.ok) {
//                     toast.success(result.message, { position: "top-center" });
//                     // alert(result.message);
//                     handleClose();
//                     dispatch(fetchBills());
//                 } else {
//                     alert(result.message || "Something went wrong");
//                 }
//             } catch (error) {
//                 console.error("Error:", error);
//                 alert("Failed to process the request.");
//             }
//         },
//     });

//     return (
//         <Modal open={open} onClose={handleClose}>
//             <Box
//                 sx={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     width: { xs: '90%', sm: '75%', md: '50%', lg: '40%', xl: '35%' },
//                     bgcolor: 'background.paper',
//                     boxShadow: 24,
//                     p: 4,
//                     borderRadius: '4px',
//                     maxHeight: '80vh', // Ensures modal does not exceed 80% of viewport height
//                     overflowY: 'auto', // Enables scrolling inside the modal if content is too long
//                 }}
//             >
//                 <form onSubmit={formik.handleSubmit}>
//                     <Typography variant="subtitle1" gutterBottom>
//                         ADD REMARK
//                     </Typography>

//                     {/* Remark Input */}
//                     <TextField
//                         fullWidth
//                         id="remark"
//                         name="remark"
//                         label="Add Remark"
//                         value={formik.values.remark}
//                         onChange={formik.handleChange}
//                         error={formik.touched.remark && Boolean(formik.errors.remark)}
//                         helperText={formik.touched.remark && formik.errors.remark}
//                         margin="normal"
//                         variant="outlined"
//                     />


// {/* ---------------------------------------------------------//--------------------------------------- */}
// {/* new-1 */}
// <Box sx={{ mt: 3, mb: 2 }}>
//       <Typography variant="subtitle1" gutterBottom>
//         Signature
//       </Typography>
//       <Box sx={{ mb: 2 }}>
//         <Button
//           variant={signatureMethod === 'draw' ? 'contained' : 'outlined'}
//           onClick={() => setSignatureMethod('draw')}
//           sx={{ mr: 1 }}
//         >
//           Draw Signature
//         </Button>
//         <Button
//           variant={signatureMethod === 'upload' ? 'contained' : 'outlined'}
//           onClick={() => setSignatureMethod('upload')}
//         >
//           Upload Signature
//         </Button>
//       </Box>

//       {signatureMethod === 'draw' ? (
//         <SignaturePad 
//           setSignature={handleSignatureChange}
//           initialSignature={formik.values.signature}
//         />
//       ) : (
//         <SignatureUpload setSignature={handleSignatureChange} />
//       )}

//       {formik.touched.signature && formik.errors.signature && (
//         <Typography color="error" variant="caption">
//           {formik.errors.signature}
//         </Typography>
//       )}

//       {formik.values.signature && (
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="subtitle2" gutterBottom>
//             Preview:
//           </Typography>
//           <img
//             src={formik.values.signature}
//             alt="Signature Preview"
//             style={{ maxWidth: '100%', maxHeight: '100px' }}
//           />
//         </Box>
//       )}
//     </Box>
// {/* ----------------------- */}
// {/* new2 */}

// {/* <Box sx={{ mt: 3, mb: 2 }}>
//   <Typography variant="subtitle1" gutterBottom>
//     Signature
//   </Typography>
//   <Box sx={{ mb: 2 }}>
//     <Button
//       variant={signatureMethod === 'draw' ? 'contained' : 'outlined'}
//       onClick={() => setSignatureMethod('draw')}
//       sx={{ mr: 1 }}
//     >
//       Draw Signature
//     </Button>
//     <Button
//       variant={signatureMethod === 'upload' ? 'contained' : 'outlined'}
//       onClick={() => setSignatureMethod('upload')}
//     >
//       Upload Signature
//     </Button>
//   </Box>
//   {signatureMethod === 'draw' ? (
//     <Box sx={{ overflowX: 'auto' }}>
//       <SignatureCanvas
//         ref={sigCanvas}
//         penColor="black"
//         canvasProps={{
//           width: 400,
//           height: 150,
//           className: "sigCanvas",
//           style: { border: "1px solid black" },
//         }}
//       />
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
//         <Button onClick={clearSignature} sx={{ color: "red" }}>Clear</Button>
//         <Button onClick={saveSignature} sx={{ color: "green" }}>Save</Button>
//       </Box>
//     </Box>
//   ) : (
 
//     <SignatureUpload setSignature={handleSignatureChange} />
//   )}


//   {formik.touched.signature && formik.errors.signature && (
//     <Typography color="error" variant="caption">
//       {formik.errors.signature}
//     </Typography>
//   )}


//   {formik.values.signature && (
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="subtitle2" gutterBottom>
//         Preview:
//       </Typography>
//       <img
//         src={formik.values.signature}
//         alt="Signature Preview"
//         style={{ maxWidth: '100%', maxHeight: '100px', border: "1px solid black" }}
//       />
//     </Box>
//   )}
// </Box> */}



// {/* ----------------------------------------------------//---------------------------------------- */}

//                     {/* Digital Signature Pad  old*/}
                    
//                     {/* <Typography variant="subtitle1" gutterBottom>
//                         Signature
//                     </Typography>
//                     <Box sx={{ overflowX: 'auto' }}>
//                         <SignatureCanvas
//                             ref={sigCanvas}
//                             penColor="black"
//                             canvasProps={{ width: 400, height: 150, className: "sigCanvas", style: { border: "1px solid black" } }}
//                         />
//                     </Box>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
//                         <Button onClick={clearSignature} sx={{ color: "red" }}>Clear Signature</Button>
//                         <Button onClick={saveSignature} sx={{ color: "green" }}>Save Signature</Button>
//                     </Box>

//                     {signature && (
//                         <Box sx={{ mt: 2 }}>
//                             <Typography variant="subtitle2">Signature Preview:</Typography>
//                             <img src={signature} alt="Signature" style={{ border: "1px solid black", width: "100%" }} />
//                         </Box>
//                     )} */}


// {/* ------------------------------------------------------------------------------------------------------------- */}


//                     {/* Submit & Cancel Buttons */}
//                     <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
//                         <Button
//                             type="button"
//                             onClick={handleClose}
//                             variant="contained"
//                             sx={{ mr: 2, backgroundColor: '#23CCEF', '&:hover': { opacity: '0.8' } }}
//                         >
//                             Cancel
//                         </Button>
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             sx={{ backgroundColor: '#FB404B', '&:hover': { opacity: '0.8' } }}
//                         >
//                             {currentBill ? 'Update Remark' : 'Add Remark'}
//                         </Button>
//                     </Box>
//                 </form>
//             </Box>
//         </Modal>
//     );
// };

// const RemarkActions = ({ handleOpenRemarkModal }) => {
//     return {
//         field: 'actions',
//         headerName: 'Actions',
//         width: 200,
//         renderCell: (params) => (
//             <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleOpenRemarkModal(params.row)}>
//                 <AddIcon />
//             </IconButton>
//         ),
//     };
// };

// export { AddRemarkModal, RemarkActions };


// ----------------------------------------------------------------




import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl } from '../../config/config';
import { fetchBills } from '../../store/actions/billActions';
import { toast } from "react-toastify";
import SignaturePad from '../SignaturePad';
import SignatureUpload from '../SignatureUpload';
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object({
    remark: Yup.string().required('Remark is required'),
    signature: Yup.string().required('Signature is required'),
});

const AddRemarkModal = ({ open, handleClose, currentBill }) => {

    console.log("**** -- currentBill",currentBill)
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [signatureMethod, setSignatureMethod] = useState('draw'); // 'draw' or 'upload'

    const formik = useFormik({
        initialValues: {
            remark: currentBill?.remark || '',
            signature: '',
            ward:''
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const url = currentBill?._id 
                    ? `${baseUrl}/editRemark` 
                    : `${baseUrl}/addRemark`;
                const method = currentBill?._id ? "PUT" : "POST";
                
                const payload = {
                    ...values,
                    _id: currentBill?._id,
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
                    dispatch(fetchBills());
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
                            {currentBill ? 'Update Remark' : 'Add Remark'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export { AddRemarkModal };



