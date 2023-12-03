import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Path } from '../path';
import { Layout } from '../Layout/Layout';
import { Home } from '../../pages/Home/Home';
import { FirstForm } from '../../pages/FirstForm/FirstForm';
import { SecondForm } from '../../pages/SecondForm/SecondForm';
import { Provider } from 'react-redux';
import { firstFormStore } from '../../store/store';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: Path.home,
                element: (
                    <Provider store={firstFormStore}>
                        <Home />
                    </Provider>
                ),
            },
            {
                path: Path.firstForm,
                element: (
                    <Provider store={firstFormStore}>
                        <FirstForm />
                    </Provider>
                ),
            },
            {
                path: Path.secondForm,
                element: <SecondForm />,
            },
        ],
    },
]);

export const Router = () => <RouterProvider router={router} />;
