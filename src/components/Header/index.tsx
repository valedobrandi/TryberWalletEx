import { useSelector } from 'react-redux';
import { InitialStateType } from '../../types/type';

function Header() {
  const { user } = useSelector((state: InitialStateType) => state);
  const { wallet } = useSelector((state: InitialStateType) => state);

  const totalExpenses = wallet.expenses.reduce((prev, cur) => {
    const sum = Number(cur.value) * Number(cur.exchangeRates[cur.currency].ask);
    return prev + sum;
  }, 0);

  return (
    <div>
      <h1>Wallet</h1>
      <p data-testid="email-field">{user.email}</p>
      <p data-testid="total-field">{totalExpenses.toFixed(2)}</p>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
}

export default Header;
