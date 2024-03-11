import { useSelector } from 'react-redux';
import { UserInitialStatetype, WalletInitalStateType } from '../../types/type';

type ReducerState = {
  user: UserInitialStatetype;
  Wallet: WalletInitalStateType;
};

function Header() {
  const { user } = useSelector((state: ReducerState) => state);

  return (
    <div>
      <h1>Wallet</h1>
      <p data-testid="email-field">{user.email}</p>
      <p data-testid="total-field">0</p>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
}

export default Header;
