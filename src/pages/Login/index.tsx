import LoginForm from '../../components/LoginForm';
import { LoginConteiner } from './styled';

function Login() {
  return (
    <LoginConteiner>
      <h1>Wallet.e</h1>
      <LoginForm />
    </LoginConteiner>
  );
}

export default Login;
