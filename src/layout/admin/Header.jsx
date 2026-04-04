import logoImg from 'assets/images/logo-primary-en-zh-lg.svg';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout, resetAuth } from '@/slice/authSlice';
import toast from 'react-hot-toast';
import Button from '@/components/Button';
import axios from 'axios';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success('已登出');
    //只要點擊登出就清除cookie
    document.cookie = 'hextoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    axios.defaults.headers.common.Authorization = '';
    dispatch(resetAuth());
    navigate('/', { replace: true });
  };

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
          <Button
            className="ms-2 btn text-neutral-400 border-0 admin-header-logout"
            size="sm"
            type="button"
            onClick={handleLogout}
          >
            登出
          </Button>
        </div>
      </div>
    </>
  );
}

export default Header;
