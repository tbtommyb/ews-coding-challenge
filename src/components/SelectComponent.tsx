import React, { FC, ChangeEvent } from 'react';

import {
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";

interface Selectable {
  id: string;
  name: string;
}

interface SelectComponentProps {
  name: string;
  label: string;
  options: Selectable[];
  selected?: Selectable;
  onChange: (s: Selectable) => any;
  isLoading: boolean;
}

// TO NOTE: we can assume the handleChange handler can always find the ID
// because the ID is in the range of options props
// FIXME: defaultValue
const SelectComponent: FC<SelectComponentProps> = ({ name, label, options, selected, onChange, isLoading }) => {
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    onChange(options.find(op => op.id === event.target.value as string)!);
  }

  const labelId = `label-${name}`;

  return (
    <FormControl>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        name={name}
        id={name}
        value={selected?.id || ""}
        onChange={handleChange}
        disabled={isLoading}
      >{
      options.map((op) => {
        return <MenuItem value={op.id} key={op.id}>{op.name}</MenuItem>
      })
    }</Select>
    </FormControl>
  );
};

export default SelectComponent;
