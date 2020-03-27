import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { render } from '@testing-library/react';
import reducer, { RootState } from '../store/reducers';

const initial: RootState = {
  instruments: [],
  currencies: []
};

export function renderWithRedux(
  ui: Component,
  initialState: RootState = initial
) {
  const store = createStore(reducer, initialState);
  return {
    ...render(<Provider store={store}> {ui} </Provider>),
    store,
  }
}
