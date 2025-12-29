import { Outlet } from 'react-router';
import Header from '../layout/backstage/Header';
import SideMenu from '../layout/backstage/SideMenu';

function Backstage() {
  return (
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
  );
}

export default Backstage;
