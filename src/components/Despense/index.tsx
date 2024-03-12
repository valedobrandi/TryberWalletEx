import { useDispatch } from 'react-redux';
import { DataExpenseType } from '../../types/type';
import { deleteAction } from '../../redux/actions';

function Despense({ expense }: { expense: DataExpenseType }) {
  const dispatch = useDispatch();
  const { id, value, description, currency, method, tag, exchangeRates } = expense;

  const convertValue = Number(value) * Number(exchangeRates[currency].ask);
  const currencyName = exchangeRates[currency].name;

  function handleClick() {
    dispatch(deleteAction(id));
  }
  return (
    <tr>
      <td>{`${description}`}</td>
      <td>{`${tag}`}</td>
      <td>{`${method}`}</td>
      <td>{`${Number(value).toFixed(2)}`}</td>
      <td>{`${currencyName}`}</td>
      <td>{`${Number(exchangeRates[currency].ask).toFixed(2)}`}</td>
      <td>{`${convertValue.toFixed(2)}`}</td>
      <td>Real</td>
      <td><button data-testid="delete-btn" onClick={ handleClick }>X</button></td>
    </tr>
  );
}

export default Despense;
