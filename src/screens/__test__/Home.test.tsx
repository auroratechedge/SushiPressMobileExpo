import React from 'react';
import Home from '../Home';
import { render, fireEvent, screen } from "@testing-library/react-native";
import { Provider } from 'react-redux';
import { store } from '../../store/storeConfiguration';

const mockDispatch = jest.fn();
// const mockSelector = jest.fn()

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch
    // useSelector: () => mockSelector.mockReturnValueOnce(true)
}))

const addPeople = jest.fn((x => x + 1));
const removePeople = jest.fn((x => x - 1));

const mockNavigation = jest.fn()

const fakeNavigation = {
    navigate: mockNavigation,
}

const setup = () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

beforeEach(() => {
  setup()
})

//test per capire quante volte viene chiamata la dispatch

describe('Home screen', () => {
    test("count all text element", async () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <Home />
            </Provider>)
        getByTestId("counter-people")
        getByText("0")
    })
})

describe('Home screen', () => {
    test("add one people to order", async () => {
        const addPeopleButton = screen.getByTestId('counter-people-add')
        fireEvent.press(addPeopleButton, {target: {value: addPeople(0)}})
        expect(addPeople.mock.results[0].value).toBe(1);
    });
})

describe('Home screen', () => {
    test("remove one people to order after added one", async () => {
        const addPeopleButton = screen.getByTestId('counter-people-add')
        fireEvent.press(addPeopleButton, {target: {value: addPeople(0)}})
        expect(addPeople.mock.results[0].value).toBe(1);
        const removePeopleButton = screen.getByTestId('counter-people-remove')
        fireEvent.press(removePeopleButton, {target: {value: removePeople(1)}})
        expect(removePeople.mock.results[0].value).toBe(0);
    });
})

describe('Home screen', () => {
    test("Rendering of Menu la carte", async () => {
        const alacarteButton = screen.getByTestId('menulacarte')
        fireEvent.press(alacarteButton, {target: {value: mockNavigation('Menu', {name: 'A la carte'})}})
        expect(fakeNavigation.navigate).toBeCalledWith('Menu', {name: 'A la carte'})
    })
})

describe('Home screen', () => {
    test("Rendering of Menu all you can eat", async () => {
        const alacarteButton = screen.getByTestId('menuallyoucaneat')
        fireEvent.press(alacarteButton, {target: {value: mockNavigation('Menu', {name: 'All you can eat'})}})
        expect(fakeNavigation.navigate).toBeCalledWith('Menu', {name: 'All you can eat'})
    })
})

afterEach(() => {
})