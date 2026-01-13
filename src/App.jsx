import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';
import BackToTopBtn from './components/BackToTopBtn';
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';

export default function App() {
  return (
    <>
      <BackToTopBtn />
      <Toaster />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
