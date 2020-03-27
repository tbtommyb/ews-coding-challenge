import React from 'react';
import { fireEvent, render } from '@testing-library/react'

import TradeForm from './TradeForm';

import instruments from '../data/instruments.json';

test('renders no options without any instruments', () => {
  const { queryAllByRole } = render(<TradeForm instruments={[]} />);
  const options = queryAllByRole('option');

  expect(options).toHaveLength(0);
});

test('renders every instrument as an option', () => {
  const { getAllByRole } = render(<TradeForm instruments={instruments} />);
  const options = getAllByRole('option');

  expect(options).toHaveLength(instruments.length);
});

test('selects the first instrument by default', () => {
  const { getByRole } = render(<TradeForm instruments={instruments} />);
  const form = getByRole('form');

  expect(form).toHaveFormValues({ instrument: instruments[0].id });
});

test('updates the selected instrument on change', () => {
  const { getByRole } = render(<TradeForm instruments={instruments} />);
  const form = getByRole('form');
  const select = getByRole('combobox');

  fireEvent.change(select, { target: { value: instruments[1].id } });

  expect(form).toHaveFormValues({ instrument: instruments[1].id });
});
