const path = 'https://api.pokemontcg.io/v2/cards';
const defaultHeaders = {
    'X-Api-Key': '160faf7f-a9ed-4d59-ba6e-8efe08144340',
};

export async function getCardsData() {
    const paramString = '?page=1&pageSize=20&select=id,name,abilities,images,hp,attacks';
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

export async function getCardByValue(name?: string) {
    // https://api.pokemontcg.io/v2/cards?q=name:charizard
    // https://api.pokemontcg.io/v2/cards?q=name:charizard&page=1&pageSize=1
    // page=1&pageSize=20&select=id,name,abilities,images,hp,attacks
    const paramString = `?q=name:${name}*&page=1&pageSize=1&select=id,name,abilities,images`;
    // '?q=name:' + name + '*' + '&page=' + '1' + '&pageSize=' + '1' + '&select=id,name,abilities,images';
    const response = await fetch(path + paramString, {
        method: 'GET',
        headers: defaultHeaders,
    });

    if (!response.ok) {
        console.log('not found');
    }

    const result = response.json();

    return result;
}

export async function getCardsData2(name?: string) {
    console.log(name);
    let paramString = '?page=1&pageSize=20&select=id,name,abilities,images,hp,attacks';

    if (name !== '' && name !== undefined) {
        paramString = `?q=name:${name}*&page=1&pageSize=1&select=id,name,abilities,images`;
    }
    // const paramString = '?page=1&pageSize=20&select=id,name,abilities,images,hp,attacks';
    const response = await fetch(path + paramString, {
        method: 'GET',
        headers: defaultHeaders,
    });

    if (!response.ok) {
        // console.log(response);
        throw new Error('Network response was not ok');
    }

    const result = response.json();

    return result;
}
