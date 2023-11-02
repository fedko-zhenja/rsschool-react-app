import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CardsPage } from '../../components/pages/CardsPage/CardsPage';
import { AboutPage } from '../../components/pages/About/AboutPage';
import { Layout } from '../Layout/Layout';
import { Path } from '../path';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <CardsPage />,
            },
            {
                path: Path.about,
                element: <AboutPage />,
            },
        ],
    },
]);

export const Router = () => <RouterProvider router={router} />;
