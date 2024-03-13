import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import * as actions from '../redux/actions/index';

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
    const { store } = renderWithRouterAndRedux(<App />);

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

describe('Pagina "Wallet" renderiza as informações corretamente.', async () => {
  const columTags = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
    'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
  const email = 'tryber@gmail.com';
  const userInitialState = {
    user: { email },
  };

  const info = {
    value: '10',
    description: 'sorvete',
    currency: 'CAD',
    method: 'Cartão de crédito',
    tag: 'Lazer',
  };

  const infoEdit = {
    value: '20',
    description: 'biscoito',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Trabalho',
  };

  const expenses = [
    'sorvete',
    'Lazer',
    'Cartão de crédito',
    '10.00',
    'Dólar Canadense/Real Brasileiro',
    '3.76',
    '37.56',
    'Real',
    'EditarExcluir',
  ];

  const expensesEdit = [
    'biscoito',
    'Trabalho',
    'Dinheiro',
    '20.00',
    'Dólar Americano/Real Brasileiro',
    '4.75',
    '95.06',
    'Real',
    'EditarExcluir',
  ];

  vi.spyOn(global, 'fetch').mockResolvedValue({ json: async () => mockData } as Response);

  it('Página "Wallet" é renderizada corretamente', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: userInitialState });

    expect(fetch).toBeCalledTimes(2);

    expect(store.getState().user.email).toBe(email);
    expect(await screen.findByText(email)).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /wallet/i })).toBeInTheDocument();
    expect(screen.getByText(/0\.00/i)).toBeInTheDocument();
    expect(screen.getByText(/brl/i)).toBeInTheDocument();
    const columnheader = screen.getAllByRole('columnheader').map((tag) => tag.textContent);
    expect(columnheader).toEqual(columTags);
  });

  it('Formúlario de despesas é prenchido corretamente e as informacões são salvas e editadas', async () => {
    vi.spyOn(actions, 'requestSuccessful');
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(fetch).toBeCalledTimes(3);
    const despesa = screen.getByLabelText(/Despesa/i);
    const descrição = screen.getByLabelText('Descrição');
    const selects = screen.getAllByRole('combobox');
    const button = screen.getByRole('button', { name: /adicionar despesas/i });

    await userEvent.type(despesa, info.value);
    await userEvent.type(descrição, info.description);
    await userEvent.selectOptions(selects[0], info.currency);
    await userEvent.selectOptions(selects[1], info.method);
    await userEvent.selectOptions(selects[2], info.tag);

    await userEvent.click(button);

    const cells = screen.getAllByRole('cell').map((tag) => tag.textContent);
    expect(cells).toEqual(expenses);

    expect(store.getState().wallet.expenses).toHaveLength(1);

    const btnEdit = screen.getByRole('button', { name: /editar/i });

    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument();
    expect(btnEdit).toBeInTheDocument();

    await userEvent.click(btnEdit);

    expect(screen.getByRole('button', { name: /editar despesas/i })).toBeInTheDocument();
    await userEvent.clear(despesa);
    await userEvent.clear(descrição);
    await userEvent.type(despesa, infoEdit.value);
    await userEvent.type(descrição, infoEdit.description);
    await userEvent.selectOptions(selects[0], infoEdit.currency);
    await userEvent.selectOptions(selects[1], infoEdit.method);
    await userEvent.selectOptions(selects[2], infoEdit.tag);

    await userEvent.click(screen.getByRole('button', { name: /editar despesas/i }));

    const editCells = screen.getAllByRole('cell').map((tag) => tag.textContent);
    expect(editCells).toEqual(expensesEdit);

    expect(store.getState().wallet.expenses).toHaveLength(1);

    const btnDeletee = screen.getByRole('button', { name: /excluir/i });
    await userEvent.click(btnDeletee);
  });
});
