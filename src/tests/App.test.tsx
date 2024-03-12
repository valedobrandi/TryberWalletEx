import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import store from '../redux';

describe('Pagina de login funciona corretamente.', () => {
  vi.spyOn(global, 'fetch').mockResolvedValue({ json: async () => mockData } as Response);

  const passwordInput = 'password-input';
  const validLoginInput = '123@123.com';

  it('Label dos Campos do formulário de login estão na tela.', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/senha/i)).toBeInTheDocument();
  });

  it('Campos do formulário estão vazios.', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByTestId(passwordInput)).toHaveValue('');
  });

  it('Botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Os requisitos do formulário funcionan corretamente.', async () => {
    renderWithRouterAndRedux(<App />);

    const login = screen.getByRole('textbox');
    const password = screen.getByTestId(passwordInput);
    const button = screen.getByRole('button', { name: /entrar/i });

    await userEvent.type(login, '123@13');
    await userEvent.type(password, '12345');

    expect(button).toBeDisabled();

    await userEvent.clear(login);
    await userEvent.clear(password);

    await userEvent.type(login, validLoginInput);
    await userEvent.type(password, '123456');

    expect(button).toBeEnabled();
  });

  it('Se a store armazena os dados corretamente e é redirecionado corretamente para Rota "/carteira"', async () => {
    renderWithRouterAndRedux(<App />, { store });

    expect(store.getState().user.email).toBe('');

    const button = screen.getByRole('button', { name: /entrar/i });
    const login = screen.getByRole('textbox');
    const password = screen.getByTestId(passwordInput);

    await userEvent.type(login, validLoginInput);
    await userEvent.type(password, '123456');

    await userEvent.click(button);

    expect(store.getState().user.email).toBe(validLoginInput);

    expect(screen.getByRole('heading', { name: 'Wallet' })).toBeInTheDocument();
  });
});
