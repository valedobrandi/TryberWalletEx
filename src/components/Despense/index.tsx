import { DataExpenseType } from '../../types/type';

function Despense({ expense }: { expense: DataExpenseType }) {
  const { value, description, currency, method, tag, exchangeRates } = expense;
  const convertValue = Number(value) * Number(exchangeRates[currency].ask);
  const currencyName = exchangeRates[currency].name;
  return (
    <>
      <td>{`${description}`}</td>
      <td>{`${tag}`}</td>
      <td>{`${method}`}</td>
      <td>{`${value}`}</td>
      <td>{`${currencyName}`}</td>
      <td>{`${convertValue.toFixed(2)}`}</td>
      <td>Real</td>
      <button>Editar/Excluir</button>
    </>
  );
}

export default Despense;
