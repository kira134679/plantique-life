import { scrollToTop } from '@/utils/scroll';
import { useEffect, useState } from 'react';
import Button from './Button';

export default function BackToTopBtn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Button type="button" variant="backtotop" className={`${visible ? 'visible' : 'invisible'}`} onClick={scrollToTop}>
      <span className="custom-btn-icon material-symbols-rounded"> north </span>
    </Button>
  );
}
