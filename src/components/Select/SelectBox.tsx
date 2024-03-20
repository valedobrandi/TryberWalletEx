import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type SelectType = {
  test: string;
  options: string[];
  optionType: string;
  onHandleChange: (event: SelectChangeEvent<string>) => void;
  selectOptions: string
};

export default function SelectBox({
  test, options = [], onHandleChange, optionType, selectOptions }: SelectType) {
  return (
    <Select
      sx={ optionType === 'method'
        ? { width: 200, textAlign: 'center' }
        : { width: 140, textAlign: 'center' } }
      value={ selectOptions }
      name={ optionType }
      id="options"
      data-testid={ test }
      onChange={ (event) => onHandleChange(event) }
    >
      {options.map((value) => (
        <MenuItem id="options" key={ value } value={ value }>{value}</MenuItem>))}
    </Select>
  );
}
