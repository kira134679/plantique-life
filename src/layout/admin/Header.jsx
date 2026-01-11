import logoImg from 'assets/images/logo-primary-en-zh-lg.svg';
import { Link } from 'react-router';

function Header() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center p-4">
        <Link className="" to="/">
          <img src={logoImg} alt="Plantique Life 植感生活 logo" />
        </Link>
        <div className="d-flex justify-content-end align-items-center">
          <span className="material-symbols-rounded">person</span>
          <div className="ms-2">
            <p className="fs-sm">admin</p>
            <p>王小明</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
