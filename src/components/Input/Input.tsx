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
    <>
      <label htmlFor={ name }>{field}</label>
      <input
        id={ name }
        value={ setChange }
        onChange={ (event) => onSetChange(event.target.value) }
        type={ inputField }
        data-testid={ test }
      />
    </>
  );
}
