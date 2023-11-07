import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CardsPage } from '../../pages/CardsPage/CardsPage';
import { AboutPage } from '../../pages/AboutPage/AboutPage';
import { Layout } from '../Layout/Layout';
import { Path } from '../path';
import { AdditionalCardsInfo } from '../../pages/CardsPage/components/AdditionalCardsInfo/AdditionalCardsInfo';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: Path.cardsPage,
                element: <CardsPage />,
                children: [
                    {
                        path: ':index',
                        element: <AdditionalCardsInfo />,
                    },
                ],
            },
            {
                path: Path.about,
                element: <AboutPage />,
            },
        ],
    },
]);

export const Router = () => <RouterProvider router={router} />;
