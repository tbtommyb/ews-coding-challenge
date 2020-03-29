import React, { FC, ChangeEvent } from 'react';

interface Selectable {
  id: string
  name: string
}

interface SelectProps {
  name: string
  options: Selectable[]
  selected?: Selectable
  onChange: (s: Selectable) => any
}

// TO NOTE: we can assume the handleChange handler can always find the ID
// because the ID is in the range of options props
// FIXME: defaultValue
const Select: FC<SelectProps> = ({ name, options, selected, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(options.find(op => op.id === event.target.value)!);
  }

  return (
      <select name={name} id={name} value={selected?.id} onChange={handleChange}>{
      options.map((op) => {
        return <option value={op.id} key={op.id}>{op.name}</option>
      })
    }</select>
  );
}

export default Select;
