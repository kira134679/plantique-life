import 'assets/scss/index.scss';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Route, Routes } from 'react-router';
import BackToTopBtn from './components/BackToTopBtn';
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';
import Home from './views/Home';

export default function App() {
  return (
    <>
      <BackToTopBtn />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      <Footer />
    </>
  );
}
