type SelectType = {
  test: string;
  options: string[];
  optionType: string;
  onHandleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectOptions: string
};

export default function Select({
  test, options = [], onHandleChange, optionType, selectOptions }: SelectType) {
  return (
    <select
      value={ selectOptions }
      name={ optionType }
      id="options"
      data-testid={ test }
      onChange={ (event) => onHandleChange(event) }
    >
      {options.map((value) => (
        <option id="options" key={ value } value={ value }>{value}</option>))}
    </select>
  );
}
