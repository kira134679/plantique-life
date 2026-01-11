import clsx from 'clsx';
import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { NavLink, useLocation } from 'react-router';

const sideMenuPath = [
  {
    title: '首頁',
    path: '/admin',
  },
  {
    title: '商品管理',
    subMenu: [
      { title: '產品概覽', path: '/admin/products' },
      { title: '優惠券管理', path: '/admin/coupons' },
    ],
  },
  {
    title: '訂單管理',
    path: '/admin/orders',
  },
  {
    title: '營收數據',
    subMenu: [
      { title: '數據概覽', path: '/admin/data-overview' },
      { title: '銷售報表', path: '/admin/sales-report' },
    ],
  },
  {
    title: '文章管理',
    path: '/admin/articles',
  },
];

// 根據路徑計算應該開啟的 Accordion 項目
function getInitialActiveKeys(pathname) {
  // 依 sideMenuPath ，取得 index 和 對應路徑的對應關係
  const pathIndexMap = sideMenuPath.reduce((acc, menu, index) => {
    if (menu.subMenu) {
      menu.subMenu.forEach(subItem => {
        acc.push({ parentIndex: String(index), path: subItem.path });
      });
    } else {
      acc.push({ parentIndex: String(index), path: menu.path });
    }
    return acc;
  }, []);

  // 比對當前路徑，找出對應的 index，優先選最長匹配避免被較短路徑搶先
  const matchedIndex = pathIndexMap.reduce((best, item) => {
    if (pathname === item.path) return item; // 完全相等直接命中
    if (pathname.startsWith(`${item.path}/`)) {
      if (!best || item.path.length > best.path.length) return item; // 取最長的前綴匹配
    }
    return best;
  }, null);

  return [matchedIndex?.parentIndex || '0'];
}

function SideMenu() {
  const location = useLocation();

  // 使用 useState 的 lazy initializer，只在元件掛載時計算一次
  const [activeKeys, setActiveKeys] = useState(() => getInitialActiveKeys(location.pathname));

  return (
    <Accordion
      activeKey={activeKeys}
      alwaysOpen
      className="admin-sidemenu-accordion"
      onSelect={keys => setActiveKeys(keys)}
    >
      {sideMenuPath.map((menu, index) => (
        <Accordion.Item eventKey={String(index)} className="border-0 border-bottom" key={index}>
          {menu.subMenu ? (
            <>
              <Accordion.Header>
                <span className="noto-sans-tc lh-base fs-6 fw-medium py-2 px-1 text-neutral-700">{menu.title}</span>
                <span className="material-symbols-rounded admin-sidemenu-accordion-icon">keyboard_arrow_down</span>
              </Accordion.Header>
              <Accordion.Body className="p-0">
                <ul className="list-unstyled">
                  {menu.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <AccordionLink path={subItem.path} title={subItem.title} className="d-block fs-8 py-4 px-6" />
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </>
          ) : (
            <AccordionLink path={menu.path} title={menu.title} className="d-block fs-6 p-6" />
          )}
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

function AccordionLink({ path, title, className }) {
  return (
    <NavLink to={path} end className={clsx('admin-sidemenu-accordion-link', className)}>
      {title}
    </NavLink>
  );
}

export default SideMenu;
