import { Outlet, ScrollRestoration } from 'react-router';
import BackToTopBtn from './components/BackToTopBtn';
import ModalManager from './components/ModalManager';
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';

export default function App() {
  return (
    <>
      <BackToTopBtn />
      <Navbar />
      <Outlet />
      <Footer />
      <ModalManager />
      <ScrollRestoration />
    </>
  );
}
