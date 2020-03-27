import React from 'react';
import { fireEvent } from '@testing-library/react'
import { renderWithRedux } from '../utils/testHelpers';

import Instrument from '../types/Instrument';
import TradeForm from './TradeForm';

const INSTRUMENTS: Instrument[] = [
  { id: "1", name: "Stock", currency: "$" },
  { id: "2", name: "Bond", currency: "£" },
  { id: "3", name: "Option", currency: "£" }
];

test('renders no options without any instruments', () => {
  const { queryAllByRole } = renderWithRedux(<TradeForm />, { instruments: [] });
  const options = queryAllByRole('option');

  expect(options).toHaveLength(0);
});

test('renders every instrument as an option', () => {
  const { getAllByRole } = renderWithRedux(<TradeForm />, { instruments: INSTRUMENTS });
  const options = getAllByRole('option');

  expect(options).toHaveLength(INSTRUMENTS.length);
});

test('selects the first instrument by default', () => {
  const { getByRole } = renderWithRedux(<TradeForm />, { instruments: INSTRUMENTS });
  const form = getByRole('form');

  expect(form).toHaveFormValues({ instrument: INSTRUMENTS[0].id });
});

test('updates the selected instrument on change', () => {
  const { getByRole } = renderWithRedux(<TradeForm />, { instruments: INSTRUMENTS });
  const form = getByRole('form');
  const select = getByRole('combobox');

  fireEvent.change(select, { target: { value: INSTRUMENTS[1].id } });

  expect(form).toHaveFormValues({ instrument: INSTRUMENTS[1].id });
});
