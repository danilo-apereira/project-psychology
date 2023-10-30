import React, { useState, useRef, useEffect } from 'react';

import './alert.css';

function Toast({ type, message }) {
    const [isToastActive, setIsToastActive] = useState(true);
    const [isProgressActive, setIsProgressActive] = useState(true);

    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            handleCloseClick();
        }, 3000);

        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    const toastClass = `toast ${type} ${isToastActive ? 'active' : ''}`;
    const toastContent = `toast-content ${type}`;

    const handleCloseClick = () => {
        setIsToastActive(false);

        setTimeout(() => {
            setIsProgressActive(false);
        }, 300);

        clearTimeout(timerRef.current);
    };

    return message ? (
        <div className={toastClass}>
            <div className={toastContent}>
                {type === 'success' && <i className="fas fa-check check"></i>}
                {type === 'error' && <i className="fas fa-times error"></i>}
                {type === 'warning' && <i className="fas fa-exclamation-triangle warning"></i>}
                {type === 'info' && <i className="fas fa-info info"></i>}
                <div className="message">
                    <span>{message}</span>
                </div>
            </div>
            <i className="fa-solid fa-xmark close" onClick={handleCloseClick}></i>
            <div className={`${type}-progress ${isProgressActive ? 'active' : ''}`}></div>
        </div>
    ) : null;
}

export default Toast;
