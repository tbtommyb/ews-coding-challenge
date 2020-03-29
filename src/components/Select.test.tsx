import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Select from './Select';

const TEST_OPTIONS = [
  { id: '1', name: 'test_1' },
  { id: '2', name: 'test_2' },
  { id: '3', name: 'test_3' }
];

test('renders no options', () => {
  const { queryAllByRole } = render(<Select name='test' options={[]} />);
  const options = queryAllByRole('option');

  expect(options).toHaveLength(0);
});

test('renders every option provided as a prop', () => {
  const { getAllByRole } = render(<Select name='test' options={TEST_OPTIONS} />);
  const options = getAllByRole('option');

  expect(options).toHaveLength(TEST_OPTIONS.length);
});

test('updates the selected instrument on change', async () => {
  const mockSetSelected = jest.fn();

  const { getByRole } = render(<Select name='test' options={TEST_OPTIONS} onChange={mockSetSelected}/>);

  const select = getByRole('combobox');
  fireEvent.change(select, { target: { value: TEST_OPTIONS[1].id } });

  expect(mockSetSelected).toHaveBeenCalledWith(TEST_OPTIONS[1]);
});
