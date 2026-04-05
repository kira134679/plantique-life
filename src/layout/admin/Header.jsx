import Button from '@/components/Button';
import { logout } from '@/slice/authSlice';
import logoImg from 'assets/images/logo-primary-en-zh-lg.svg';
import Cookie from 'js-cookie';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      Cookie.remove('auth_token');
      toast.success('已登出');
      navigate('/', { replace: true });
    } catch {
      toast.error('登出失敗');
    }
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
