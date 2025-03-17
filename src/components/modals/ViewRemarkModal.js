import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

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
                <Box>
                    {remarks && remarks.length > 0 ? (
                        remarks.map((remark, index) => (
                            <Box key={index} sx={{ borderBottom: index !== remarks.length - 1 ? '1px solid #ddd' : 'none', pb: 2, mb: 2 }}>
                                <Typography variant="body1" fontWeight="bold">
                                    {remark.role}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {remark.remark}
                                </Typography>
                                {remark.signature && (
                                    <Box
                                        component="img"
                                        src={remark.signature}
                                        alt={`${remark.role}'s signature`}
                                        sx={{
                                            width: 100,
                                            height: 50,
                                            mt: 1,
                                            border: '1px solid #ddd',
                                            borderRadius: 1,
                                        }}
                                    />
                                )}
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No Remarks Available
                        </Typography>
                    )}
                </Box>
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