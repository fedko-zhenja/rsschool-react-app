import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CardsPage } from '../../pages/CardsPage/CardsPage';
import { AboutPage } from '../../pages/AboutPage/AboutPage';
import { Layout } from '../Layout/Layout';
import { Path } from '../path';
import { AdditionalCardsInfo } from '../../pages/CardsPage/components/AdditionalCardsInfo/AdditionalCardsInfo';
import { getCardDataById } from '../../api/PokemonApi';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: Path.cardsPage,
                element: <CardsPage />,
                children: [
                    {
                        path: ':index',
                        element: <AdditionalCardsInfo />,
                        loader: async ({ params }) => {
                            const cardData = await getCardDataById(params.index || '');
                            return cardData;
                        },
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
