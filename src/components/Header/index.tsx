import { useSelector } from 'react-redux';
import { InitialStateType,
  UserInitialStatetype, WalletInitalStateType } from '../../types/type';

type ReducerState = {
  user: UserInitialStatetype;
  Wallet: WalletInitalStateType;
};

function Header() {
  const { user } = useSelector((state: ReducerState) => state);
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
