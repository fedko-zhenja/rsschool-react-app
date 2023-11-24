import { Provider } from 'react-redux';
import dynamic from 'next/dynamic';
import { store } from '../store/store';

const App = dynamic(() => import('../application/App'), { ssr: false });

export default function Page() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
