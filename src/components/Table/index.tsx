import { useSelector } from 'react-redux';
import { InitialStateType } from '../../types/type';
import Despense from '../Despense';

function Table() {
  const { expenses } = useSelector((state: InitialStateType) => state.wallet);
  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <Despense key={ expense.id } expense={ expense } />))}
      </tbody>
    </table>
  );
}

export default Table;
