import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import BackToTopBtn from './components/BackToTopBtn';
import Loading from './components/Loading.jsx';
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';
import { selectIsLoading } from './slice/loadingSlice.js';

export default function App() {
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      <BackToTopBtn />
      <Navbar />
      <Outlet />
      <Footer />
      {isLoading && <Loading />}
    </>
  );
}
