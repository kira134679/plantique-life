import { useEffect, useState } from 'react';
import Button from './Button';

export default function BackToTopBtn() {
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleVisible = () => {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      });
    };

    handleVisible();

    return () => {
      window.removeEventListener('scroll', handleVisible);
    };
  }, []);

  return (
    <Button type="button" variant="backtotop" className={`${visible ? 'visible' : 'invisible'}`} onClick={scrollToTop}>
      <span className="custom-btn-icon material-symbols-rounded"> north </span>
    </Button>
  );
}
