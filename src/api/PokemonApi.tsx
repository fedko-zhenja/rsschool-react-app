const path = 'https://api.pokemontcg.io/v2/cards';
const defaultHeaders = {
    'X-Api-Key': '160faf7f-a9ed-4d59-ba6e-8efe08144340',
};

export async function getCardsData(name?: string) {
    let paramString = '?page=1&pageSize=20&select=id,name,abilities,images,hp,attacks';

    if (name !== '' && name !== undefined) {
        paramString = `?q=name:${name}*&page=1&pageSize=20&select=id,name,abilities,images,hp,attacks`;
    }

    const response = await fetch(path + paramString, {
        method: 'GET',
        headers: defaultHeaders,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const result = response.json();

    return result;
}
