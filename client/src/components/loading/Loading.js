import React, { useEffect, useState } from 'react';

import './loading.css';

function Loading({ bool }) {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loading] = useState(bool);

    useEffect(() => {
        if (loading) {
            const timer = setInterval(() => {
                setLoadingProgress((prevProgress) => {
                    if (prevProgress < 100) {
                        return prevProgress + 10;
                    } else {
                        clearInterval(timer);
                        return 100;
                    }
                });
            }, 1000);
        }
    }, [loading]);

    return (
        <div>
            {loading ? (
                <div className="loading-bar" style={{ width: `${loadingProgress}%` }}></div>
            ) : null}
        </div>
    );
}

export default Loading;
