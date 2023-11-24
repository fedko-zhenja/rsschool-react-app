import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import '../index.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <link rel="icon" type="image/png" href="../assets/pokeball.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Pokemon</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
