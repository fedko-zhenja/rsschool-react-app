import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="icon" type="image/png" href="pokeball.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Pokemon</title>
            </Head>
            <Layout>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </Layout>
        </>
    );
}

export default MyApp;
