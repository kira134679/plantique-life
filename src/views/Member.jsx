import { NavLink, Outlet } from 'react-router';

import Breadcrumb from '../components/Breadcrumb';

const memberCenterList = [
  {
    label: '基本資訊',
    path: '/member',
    end: true,
  },
  {
    label: '訂單查詢',
    path: '/member/orders',
    end: false, // 讓路由 /member/orders 和 /member/orders/:orderId 都顯示訂單查詢(狀態為 active)
  },
  {
    label: '願望清單',
    path: '/member/wishlist',
    end: true,
  },
];

function Member() {
  return (
    <div className="container member-container">
      <div className="py-4 py-md-6">
        <Breadcrumb />
      </div>
      <div className="row my-0 my-md-13">
        <div className="col-md-3 member-nav-container">
          <ul className="nav justify-content-between justify-content-md-start flex-md-column gap-3 gap-md-0">
            {memberCenterList.map((item, index) => (
              <li className="nav-item" key={index}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className="member-nav-link nav-link fs-8 fs-md-7 text-neutral-400 py-4 p-md-6"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Member;
