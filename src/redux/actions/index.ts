// Coloque aqui suas actions

import { DataExpenseType, Dispatch } from '../../types/type';

export const writeEmail = 'WRITE_EMAIL';
export const updateCurrencies = 'UPDATE_CURRENCIES';
export const started = 'REQUEST_STARTED';
export const successful = 'REQUEST_SUCCESSFUL';
export const failed = 'REQUEST_FAILED';
export const deleteExpense = 'DELETE_EXPENSE';

export function deleteAction(id: number) {
  return {
    type: deleteExpense,
    payload: { id },
  };
}

export function currenciesAction(data: string[]) {
  return {
    type: updateCurrencies,
    payload: { currencies: data },
  };
}

export function emailAction(email: string) {
  return {
    type: writeEmail,
    payload: { email },
  };
}

function requestStarted() {
  return { type: started };
}

function requestSuccessful(data: DataExpenseType) {
  return { type: successful, payload: { expenses: data } };
}

function requestFailed(error: string) {
  return { type: failed, payload: { error } };
}

export function fetchCurrencies(dataExpense: DataExpenseType) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(requestStarted());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();

      dispatch(requestSuccessful({ ...dataExpense, exchangeRates: data }));
    } catch (error: any) {
      dispatch(requestFailed(error.message));
    }
  };
}
