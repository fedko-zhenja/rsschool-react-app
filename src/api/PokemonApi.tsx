const key = '160faf7f-a9ed-4d59-ba6e-8efe08144340';
const path = 'https://api.pokemontcg.io/v2/cards';

export async function getCardsData() {
    const paramString = '?page=' + '1' + '&pageSize=' + '20';
    const response = await fetch(path + paramString, {
        method: 'GET',
        headers: {
            'X-Api-Key': key,
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const result = response.json();

    return result;
}

export async function getCardByValue(name?: string) {
    // https://api.pokemontcg.io/v2/cards?q=name:charizard
    // https://api.pokemontcg.io/v2/cards?q=name:charizard&page=1&pageSize=1
    const paramString = '?q=name:' + name + '*' + '&page=' + '1' + '&pageSize=' + '1';
    const response = await fetch(path + paramString, {
        method: 'GET',
        headers: {
            'X-Api-Key': key,
        },
    });

    if (!response.ok) {
        console.log('not found');
    }

    const result = response.json();

    return result;
}
