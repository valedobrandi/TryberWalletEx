import { DataExpenseType } from '../../types/type';
import { successful, updateCurrencies } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
export type ActionType = {
  type: string;
  payload: {
    email: string;
    currencies: string[]
    expenses: DataExpenseType
  }
};

const walletInitialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que está sendo editada
};
const walletReducer = (state = walletInitialState, action: ActionType) => {
  switch (action.type) {
    case updateCurrencies:
      return { ...state, currencies: action.payload.currencies };

    case successful:
      return { ...state, expenses: [...state.expenses, action.payload.expenses] };

    default:
      return state;
  }
};

export default walletReducer;
