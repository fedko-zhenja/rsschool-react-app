import { CardData, PokemonCard } from '../types/types';

export const mockCardsData = {
    searchValue: '',
    setSearchValue: jest.fn(),
    isDataLoaded: true,
    setIsDataLoaded: jest.fn(),
    cardsData: {
        data: [
            { id: 1, images: { large: 'image1.jpg' } },
            { id: 2, images: { large: 'image2.jpg' } },
        ],
        page: 1,
        pageSize: 4,
        count: 1,
        totalCount: 10,
    },
    setCardsData: jest.fn(),
    pageSizeValue: '4',
    setPageSizeValue: jest.fn(),
    pageNumberValue: '1',
    setPageNumberValue: jest.fn(),
};

export const mockEmptyCardsData = {
    searchValue: '',
    setSearchValue: jest.fn(),
    isDataLoaded: true,
    setIsDataLoaded: jest.fn(),
    cardsData: {
        data: [],
        page: 0,
        pageSize: 0,
        count: 0,
        totalCount: 0,
    },
    setCardsData: jest.fn(),
    pageSizeValue: '4',
    setPageSizeValue: jest.fn(),
    pageNumberValue: '1',
    setPageNumberValue: jest.fn(),
};

export const mockCardsDataIsNotLoaded = {
    searchValue: '',
    setSearchValue: jest.fn(),
    isDataLoaded: false,
    setIsDataLoaded: jest.fn(),
    cardsData: {
        data: [],
        page: 0,
        pageSize: 0,
        count: 0,
        totalCount: 0,
    },
    setCardsData: jest.fn(),
    pageSizeValue: '0',
    setPageSizeValue: jest.fn(),
    pageNumberValue: '0',
    setPageNumberValue: jest.fn(),
};

export const mockCardData: CardData = {
    data: {
        name: 'Test Card',
        hp: '100',
        level: '50',
        attacks: [
            {
                name: 'Test Attack',
                cost: ['Colorless'],
                convertedEnergyCost: 1,
                damage: '20',
                text: 'This is a test attack.',
            },
        ],
    },
};

import { NextRouter } from 'next/router';

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
    return {
        basePath: '',
        pathname: '/',
        route: '/',
        query: {},
        asPath: '/',
        isLocaleDomain: false,
        push: jest.fn(),
        replace: jest.fn(),
        reload: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        prefetch: jest.fn(),
        beforePopState: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
        isFallback: false,
        isReady: true,
        isPreview: false,
        ...router,
    };
}

export const mockCardsPageProps: PokemonCard = {
    count: 1,
    data: [
        {
            id: '1',
            name: 'test name',
            abilities: [],
            attacks: [],
            hp: 1,
            images: {
                small: 'test-img',
                large: 'test-img',
            },
        },
    ],
    totalCount: 1,
    pageSize: 1,
    page: 1,
};
