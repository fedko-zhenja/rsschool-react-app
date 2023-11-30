import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Path } from '../path';
import { Layout } from '../Layout/Layout';
import { Home } from '../../pages/Home/Home';
import { FirstForm } from '../../pages/FirstForm/FirstForm';
import { SecondForm } from '../../pages/SecondForm/SecondForm';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: Path.home,
                element: <Home />,
            },
            {
                path: Path.firstForm,
                element: <FirstForm />,
            },
            {
                path: Path.secondForm,
                element: <SecondForm />,
            },
        ],
    },
]);

export const Router = () => <RouterProvider router={router} />;
