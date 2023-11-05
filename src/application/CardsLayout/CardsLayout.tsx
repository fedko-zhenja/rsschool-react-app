import { Outlet } from 'react-router-dom';
import { CardsPage } from '../../pages/CardsPage/CardsPage';
// import { NavBar } from './NavBar/NavBar';

export const CardsLayout = () => {
    return (
        <div>
            <CardsPage />
            <Outlet />
        </div>
    );
};
