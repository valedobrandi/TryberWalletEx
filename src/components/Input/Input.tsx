import { TextField } from '@mui/material';

type InputType = {
  field: string;
  onSetChange: (data: string) => void
  setChange: string
  inputField?: string
  test?: string
  name?: string
};

export default function Input({
  field, onSetChange, setChange, inputField = 'text', test = '', name = '' }: InputType) {
  return (
    <div>
      <TextField
        name={ name }
        label={ field }
        variant="standard"
        value={ setChange }
        onChange={ (event) => onSetChange(event.target.value) }
        type={ inputField }
        data-testid={ test }
      />
    </div>
  );
}
