import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react-native";
import { Provider, useSelector } from 'react-redux';
import { store } from '../../store/storeConfiguration';
import Cart from '../Cart';

const mockDispatch = jest.fn()
const mockSelector = jest.fn().mockReturnValue([{
    id: "1a",
    name: "Avocado Maki",
    price: 4,
    quantity: 1
}])

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
    useSelector: () => mockSelector
}))

const setup = () => {
    render(
        <Cart />
    );
  }
  
beforeEach(() => {
    setup()
})

describe('Cart screen', () => {
    test("count all text element", async () => {
        console.log('rusultato: ', mockSelector.mock.results[0].value)
    })
})

afterEach(() => {
    mockSelector.mockClear();
});