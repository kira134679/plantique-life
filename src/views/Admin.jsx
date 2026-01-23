import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';
import Header from '../layout/admin/Header';
import SideMenu from '../layout/admin/SideMenu';

function Admin() {
  return (
    <>
      <Toaster />
      <div className="container-xxl">
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
    </>
  );
}

export default Admin;
