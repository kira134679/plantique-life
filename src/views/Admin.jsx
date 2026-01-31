import { Outlet } from 'react-router';
import BackToTopBtn from '../components/BackToTopBtn';
import Header from '../layout/admin/Header';
import SideMenu from '../layout/admin/SideMenu';

function Admin() {
  return (
    <div className="container-xxl">
      <BackToTopBtn />
      <Header />
      <div className="row">
        <div className="col-3">
          <SideMenu />
        </div>
        <div className="col-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admin;
