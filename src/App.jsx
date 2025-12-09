import 'assets/scss/index.scss';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Route, Routes } from 'react-router';
import Home from './views/Home';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
}
