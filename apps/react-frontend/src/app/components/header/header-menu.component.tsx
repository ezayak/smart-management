import './header.style.scss';
import { FC, ReactElement, ReactNode } from 'react';
import { IconContext } from 'react-icons';
import { CgLogIn, CgLogOut } from 'react-icons/cg';
import { SlMenu } from 'react-icons/sl';
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { signout } from '../../store/user/user.action';

interface IHeaderMenuProps {
  showShortMenu: boolean;
  publicResource: boolean;
  onMenuClick: () => void;
}

const HeaderMenu: FC<IHeaderMenuProps> = ({
  onMenuClick,
  showShortMenu,
  publicResource,
}) => {
  const { authenticated, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const onLogout = () => {
    dispatch(signout());
  };

  const handleOnMenuClick = () => {
    onMenuClick();
  };

  const publicResourceLeftMenu = (): ReactElement => {
    return (
      <Link to="/">
        <img className="logo" src={'/assets/logo-smart-small.png'} alt="logo" />
      </Link>
    );
  };

  const privateResourceLeftMenu = (): ReactElement => {
    if (!showShortMenu) {
      return (
        <>
          <Link to="/">
            <img
              className="logo"
              src={'/assets/logo-smart-small.png'}
              alt="logo"
            />
          </Link>
          <button className="btn-plain" onClick={handleOnMenuClick}>
            <IconContext.Provider value={{ className: 'menu-icon' }}>
              <SlMenu size={20} />
            </IconContext.Provider>
          </button>
        </>
      );
    } else {
      return (
        <>
          <button className="btn-plain" onClick={handleOnMenuClick}>
            <IconContext.Provider
              value={{ className: 'menu-icon icon-rotate' }}
            >
              <SlMenu size={20} />
            </IconContext.Provider>
          </button>
          <Link to="/">
            <img
              className="logo"
              src={'/assets/logo-smart-small.png'}
              alt="logo"
            />
          </Link>
        </>
      );
    }
  };

  return (
    <div className="header-container">
      <div className="header-menu">
        <div className="header-menu-left">
          {publicResource
            ? publicResourceLeftMenu()
            : privateResourceLeftMenu()}
        </div>
        <div className="header-menu-center"></div>
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
                <Link to="/admin/dashboard">
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
