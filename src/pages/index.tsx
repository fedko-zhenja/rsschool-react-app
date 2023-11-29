import CardsPage from '../components/CardsPage';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { PokemonCard } from '../types/types';

export const getServerSideProps = (async ({ query }) => {
    const { page, pageSize } = query;
    const res = await fetch(
        // eslint-disable-next-line prettier/prettier
        `https://api.pokemontcg.io/v2/cards?page=${page || '1'}&pageSize=${
            pageSize || '4'
        }&select=id,name,abilities,images,hp,attacks`
    );
    const data = await res.json();
    return { props: { data } };
}) satisfies GetServerSideProps<{
    data: PokemonCard;
}>;

function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <CardsPage initialData={data} />;
}

export default Home;
