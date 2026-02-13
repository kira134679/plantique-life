import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import BackToTopBtn from './components/BackToTopBtn';
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';
import { scrollToTop } from './utils/scroll';

export default function App() {
  const location = useLocation();

  // 每次路徑 (query params 不包含在內) 變化時，滾動到頂部
  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  return (
    <>
      <BackToTopBtn />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
