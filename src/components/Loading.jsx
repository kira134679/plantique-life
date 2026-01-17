import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../slice/loadingSlice';

function Loading() {
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (!isLoading) return;

    // Loading 出現時：鎖定 Body 滾動
    document.body.style.overflow = 'hidden';

    // Loading 消失時：恢復滾動
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    isLoading && (
      <div className="fixed-top bg-white bg-opacity-50 loading-overlay d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  );
}

export default Loading;
