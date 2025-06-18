// src/components/FlashMessage.tsx
import { useEffect, useState } from 'react';

type FlashMessageProps = {
    message: string;
    onClose: () => void;
};

export default function FlashMessage({ message, onClose }: FlashMessageProps) {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const totalDuration = 5000; // 5 seconds
        const interval = 50;
        const decrement = (interval / totalDuration) * 100;

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev - decrement;
                if (next <= 0) {
                    clearInterval(timer);
                    onClose();
                    return 0;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onClose]);

    return (
        <div
            style={{
                position: 'fixed',
                top: '1rem',
                right: '1rem',
                backgroundColor: '#4caf50',
                color: 'white',
                padding: '1rem 1.5rem',
                borderRadius: '5px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                zIndex: 1000,
                minWidth: '250px',
                maxWidth: '300px',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{message}</span>
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginLeft: '1rem',
                    }}
                    aria-label="Close"
                >
                    ×
                </button>
            </div>
            <div
                style={{
                    height: '4px',
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    marginTop: '8px',
                    borderRadius: '2px',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        height: '100%',
                        width: `${progress}%`,
                        backgroundColor: 'white',
                        transition: 'width 50ms linear',
                    }}
                />
            </div>
        </div>
    );
}
