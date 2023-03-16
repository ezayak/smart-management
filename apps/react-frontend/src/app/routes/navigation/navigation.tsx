import { FC, useState } from 'react';
import { HeaderMenu } from '../../components/header/header-menu.component';
import { Outlet } from 'react-router-dom';
import { PageHeader } from '../../components/header/page-header.component';
import './navigation.style.scss';
import { Sidebar } from '../../components/sidebar/sidebar.component';

interface INavigationProps {
  publicResource: boolean;
}

const Navigation: FC<INavigationProps> = ({ publicResource }) => {
  const showPageHeader = false;
  const [shortMenu, setShortMenu] = useState(false);

  const handleOnMenuClick = () => {
    setShortMenu(!shortMenu);
  };

  return (
    <div className="page">
      <HeaderMenu
        onMenuClick={handleOnMenuClick}
        showShortMenu={shortMenu}
        publicResource={publicResource}
      />
      {showPageHeader && <PageHeader />}

      <div className="main-container">
        {!publicResource && <Sidebar showShortMenu={shortMenu} />}

        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { Navigation };
