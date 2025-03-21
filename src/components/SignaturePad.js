import React, { useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Box, Button, Typography } from '@mui/material';

const SignaturePad = ({ setSignature, initialSignature = null }) => {
    const sigCanvas = useRef(null);

    useEffect(() => {
        if (initialSignature && sigCanvas.current) {
            const img = new Image();
            img.onload = () => {
                const ctx = sigCanvas.current.getCanvas().getContext('2d');
                ctx.drawImage(img, 0, 0);
            };
            img.src = initialSignature;
        }
    }, [initialSignature]);

    const saveSignature = () => {
        if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
            const signatureData = sigCanvas.current.toDataURL('image/png');
            setSignature(signatureData);
        }
    };

    const clearSignature = () => {
        if (sigCanvas.current) {
            sigCanvas.current.clear();
            setSignature(null);
        }
    };

    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
                Draw your signature below:
            </Typography>
            <Box 
                sx={{ 
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    mb: 2
                }}
            >
                <SignatureCanvas
                    ref={sigCanvas}
                    canvasProps={{
                        width: 500,
                        height: 200,
                        className: 'signature-canvas',
                        style: { 
                            width: '100%',
                            height: '200px'
                        }
                    }}
                    backgroundColor="rgb(255, 255, 255)"
                />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={clearSignature}
                >
                    Clear
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={saveSignature}
                >
                    Save Signature
                </Button>
            </Box>
        </Box>
    );
};

export default SignaturePad;