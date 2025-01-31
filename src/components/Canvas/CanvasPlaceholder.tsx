import React from 'react';
import { Mountain } from 'lucide-react';

const CanvasPlaceholder: React.FC = () => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        background: 'linear-gradient(180deg, #F8F0FF 0%, #FFFFFF 100%)',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
    }}>
        <div style={{
            backgroundColor: '#F0D9FF',
            borderRadius: '50%',
            padding: '24px',
            marginBottom: '32px',
            boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.05)'
        }}>
            <Mountain size={150} color="#7F56D9" />
        </div>

        <h2 style={{
            color: '#42307D',
            fontSize: '28px',
            fontWeight: 600,
            marginBottom: '24px',
            textAlign: 'center'
        }}>
            Create your own Poster!
        </h2>

        <div style={{
            color: '#667085',
            fontSize: '16px',
            lineHeight: '1.5',
            textAlign: 'center',
            maxWidth: '300px'
        }}>
            <div style={{ marginBottom: '8px' }}>It's to simple, Start creating your own</div>
            <div style={{ marginBottom: '8px' }}>poster by clicking one of the so-chon</div>
            <div>bottoms located on the right.</div>
        </div>
    </div>
);

export default CanvasPlaceholder;