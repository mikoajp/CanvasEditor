import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ResetModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ResetModal: React.FC<ResetModalProps> = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '32px',
                width: '400px',
                textAlign: 'center'
            }}>
                <div style={{
                    marginBottom: '24px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <AlertTriangle size={200} color={'red'}/>
                </div>

                <h2 style={{
                    color: '#1F2937',
                    fontSize: '20px',
                    fontWeight: 600,
                    marginBottom: '16px',
                    textTransform: 'uppercase'
                }}>
                    WARNING
                </h2>

                <div style={{
                    color: '#4B5563',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    marginBottom: '32px'
                }}>
                    <div>You're about to reset whole process.Are</div>
                    <div>you sure you want to do it?</div>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center'
                }}>
                    <button
                        onClick={onCancel}
                        style={{
                            padding: '8px 24px',
                            borderRadius: '6px',
                            border: '1px solid #D1D5DB',
                            backgroundColor: '#F3F4F6',
                            color: '#374151',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            padding: '8px 24px',
                            borderRadius: '6px',
                            border: '1px solid #FDE68A',
                            backgroundColor: '#7c3aed',
                            color: '#F3F4F6',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetModal;