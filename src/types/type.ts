import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type SelectOptionsType = {
  currencie?: string;
  payment?: string;
  expense?: string;
};

type ExchangeRate = {
  ask: string;
  name: string;
};

export type DataExpenseType = {
  id: number;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates: Record<string, ExchangeRate>;
};

export type InitialStateType = {
  user: {
    email: string;
  };
  wallet: {
    currencies: string[];
    expenses: DataExpenseType[];
    editor: boolean;
    idToEdit: number;
  };
};

export type UserInitialStatetype = {
  email: string, // string que armazena o e-mail da pessoa usuária
};

export type WalletInitalStateType = {

  currencies: string[];
  expenses: DataExpenseType[];
  editor: boolean;
  idToEdit: number;
};

export type ReduxState = {
  isFetching: boolean,
  errorMessage: string,
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
