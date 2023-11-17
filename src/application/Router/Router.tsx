import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CardsPage } from '../../pages/CardsPage/CardsPage';
import { AboutPage } from '../../pages/AboutPage/AboutPage';
import { Layout } from '../Layout/Layout';
import { Path } from '../path';
import { AdditionalCardsInfo } from '../../pages/CardsPage/components/AdditionalCardsInfo/AdditionalCardsInfo';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { CardsProvider } from '../../context/context';
import { NotFound } from '../../components/NotFound/NotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: Path.cardsPage,
                element: (
                    <CardsProvider>
                        <CardsPage />
                    </CardsProvider>
                ),
                children: [
                    {
                        path: '/details/:index',
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
    {
        path: '*',
        element: <NotFound />,
    },
]);

export const Router = () => <RouterProvider router={router} />;
