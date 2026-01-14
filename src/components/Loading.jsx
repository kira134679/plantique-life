import { useEffect } from 'react';

function Loading() {
  useEffect(() => {
    // Loading 出現時：鎖定 Body 滾動
    document.body.style.overflow = 'hidden';

    // Loading 消失時：恢復滾動
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed-top bg-white bg-opacity-50 loading-overlay">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
