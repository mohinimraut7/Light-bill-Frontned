import React from 'react';
import { Modal, Box, Typography, Button, Grid, Divider } from '@mui/material';

const ViewRemarkModal = ({ open, onClose, remarks }) => {
    return (
        <Modal open={open} onClose={onClose}>
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
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    View Remarks
                </Typography>

                {/* Header Row */}
                <Grid container sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5', p: 1, borderRadius: 1 }}>
                    <Grid item xs={4}>
                        <Typography variant="body1">Role</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="body1">Remark</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body1">Signature</Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 1 }} />

                {/* Remarks Data */}
                <Box>
                    {remarks && remarks.length > 0 ? (
                        remarks.map((remark, index) => (
                            <Grid
                                container
                                key={index}
                                sx={{
                                    p: 1,
                                    borderBottom: index !== remarks.length - 1 ? '1px solid #ddd' : 'none',
                                    alignItems: 'center',
                                }}
                            >
                                <Grid item xs={4}>
                                    {/* <Typography variant="body2">{remark.role}</Typography> */}
                                    {remark.role} {remark.role === 'Junior Engineer' && remark.ward === 'Head Office' && remark.ward}
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography variant="body2" color="text.secondary">
                                        {remark.remark}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    {remark.signature ? (
                                        <Box
                                            component="img"
                                            src={remark.signature}
                                            alt={`${remark.role}'s signature`}
                                            sx={{
                                                width: 60,
                                                height: 30,
                                                border: '1px solid #ddd',
                                                borderRadius: 1,
                                            }}
                                        />
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            N/A
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            No Remarks Available
                        </Typography>
                    )}
                </Box>

                {/* Close Button */}
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Button
                        onClick={onClose}
                        variant="contained"
                        sx={{
                            backgroundColor: '#23CCEF',
                            '&:hover': {
                                backgroundColor: '#23CCEF',
                                opacity: '0.8',
                            },
                        }}
                    >
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ViewRemarkModal;
