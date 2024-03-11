type InputType = {
  field: string;
  onSetChange: (data: string) => void
  setChange: string
  inputField?: string
  test?: string
};

export default function Input({
  field, onSetChange, setChange, inputField = 'text', test = '' }: InputType) {
  return (
    <>
      <label htmlFor="">{field}</label>
      <input
        value={ setChange }
        onChange={ (event) => onSetChange(event.target.value) }
        type={ inputField }
        data-testid={ test }
      />
    </>
  );
}
