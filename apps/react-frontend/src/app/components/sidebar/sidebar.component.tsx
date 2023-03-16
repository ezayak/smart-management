import { FC } from 'react';
import './sidebar.style.scss';

interface ISideBarProps {
  showShortMenu: boolean;
}

export const Sidebar: FC<ISideBarProps> = ({ showShortMenu }) => {
  const sideBarClass = showShortMenu ? ' short-menu' : '';
  return <div className={`sidebar sidebar-shadow ${sideBarClass}`}></div>;
};
