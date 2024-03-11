import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../Input/Input';
import { emailAction } from '../../redux/actions';

function LoginForm() {
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setformPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isDisable = formPassword.length > 5 && isEmail(formEmail);

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(emailAction(formEmail));
    setFormEmail('');
    navigate('/carteira');
  }

  return (
    <form action="" onSubmit={ submitForm }>
      <Input
        test="email-input"
        field="Email"
        onSetChange={ setFormEmail }
        setChange={ formEmail }
      />
      <Input
        test="password-input"
        field="Senha"
        onSetChange={ setformPassword }
        setChange={ formPassword }
        inputField="password"
      />
      <button disabled={ !isDisable }>Entrar</button>
    </form>
  );
}

export default LoginForm;
