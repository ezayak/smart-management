import './header.style.scss';
import { FC } from 'react';
import { IconContext } from 'react-icons';
import { CgLogIn, CgLogOut } from 'react-icons/cg';
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { signout } from '../../store/user/user.action';

const HeaderMenu: FC = () => {
  const { authenticated, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const onLogout = () => {
    dispatch(signout());
  };

  return (
    <div className="header-container">
      <div className="header-menu">
        <div className="header-menu-left">
          <Link to="/">
            <img
              className="logo"
              src={'/assets/logo-smart-small.png'}
              alt="logo"
            />
          </Link>
        </div>
        <div className="header-menu-right">
          <IconContext.Provider value={{ className: 'menu-icon' }}>
            {!authenticated ? (
              <div className="navigation-item">
                <Link to="/login">
                  <CgLogOut size={20} />
                </Link>
              </div>
            ) : (
              <div className="navigation-item">
                <Link to="/admin">
                  <span>
                    {user && user['name']}
                    <MdAccountCircle size={20} />
                  </span>
                </Link>
                <button className="btn-plain" onClick={onLogout}>
                  <CgLogIn size={20} />
                </button>
              </div>
            )}
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export { HeaderMenu };
