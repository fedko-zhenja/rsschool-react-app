// import React, { useContext } from 'react';
// import { fireEvent, render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import { Pagination } from '../pages/CardsPage/components/Pagination/Pagination';
// import { mockCardsData, mockCardsDataIsNotLoaded } from './mockData';

// const CardsContext = React.createContext({});

// jest.mock('../context/context', () => ({
//     useCardsContext: jest.fn(() => useContext(CardsContext)),
// }));

// describe.skip('Pagination', () => {
//     test('should do snapshot check', async () => {
//         const { asFragment } = render(
//             <MemoryRouter>
//                 <CardsContext.Provider value={mockCardsData}>
//                     <Pagination />
//                 </CardsContext.Provider>
//             </MemoryRouter>
//         );

//         expect(asFragment()).toMatchSnapshot();
//     });

//     test('should update URL query parameter when page changes', async () => {
//         render(
//             <MemoryRouter>
//                 <CardsContext.Provider value={mockCardsData}>
//                     <Pagination />
//                 </CardsContext.Provider>
//             </MemoryRouter>
//         );

//         const paginationBtn = screen.getByText('1');
//         expect(paginationBtn).toBeInstanceOf(HTMLElement);

//         fireEvent.click(paginationBtn);

//         expect(mockCardsData.setPageNumberValue).toHaveBeenCalledTimes(1);
//     });

//     test('should not display buttons if data is not loaded', async () => {
//         const { container } = render(
//             <MemoryRouter>
//                 <CardsContext.Provider value={mockCardsDataIsNotLoaded}>
//                     <Pagination />
//                 </CardsContext.Provider>
//             </MemoryRouter>
//         );

//         expect(container.firstChild).toBeNull();
//     });
// });
