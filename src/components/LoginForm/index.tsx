import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Input from '../Input/Input';
import { emailAction } from '../../redux/actions';
import { Dispatch } from '../../types/type';
import { FormArea } from './styled';

function LoginForm() {
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setformPassword] = useState('');

  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const isDisable = formPassword.length > 5 && isEmail(formEmail);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('aqui');

    event.preventDefault();
    dispatch(emailAction(formEmail));
    setFormEmail('');
    navigate('/carteira');
  };

  return (
    <FormArea action="" onSubmit={ submitForm }>
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
      <Button variant="contained" type="submit" disabled={ !isDisable }>Entrar</Button>
    </FormArea>
  );
}

export default LoginForm;
