import 'assets/scss/index.scss';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Outlet } from 'react-router';
import BackToTopBtn from './components/BackToTopBtn';
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';

export default function App() {
  return (
    <>
      <BackToTopBtn />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
