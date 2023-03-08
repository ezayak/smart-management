import { FC } from "react";
import { HeaderMenu } from "../../components/header/header-menu.component";
import { Outlet } from 'react-router-dom';
import { PageHeader } from "../../components/header/page-header.component";
import './navigation.style.scss';

const Navigation:FC = () => {
    const showPageHeader: boolean = false;

    return (
        <div className="page">
            <HeaderMenu />
            {showPageHeader && <PageHeader />}

            <div className="main-container">
                <Outlet />
            </div>
        </div>
    );
}

export { Navigation };