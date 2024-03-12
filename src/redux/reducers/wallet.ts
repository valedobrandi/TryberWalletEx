import { DataExpenseType } from '../../types/type';
import { deleteExpense, successful, updateCurrencies } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
export type ActionType = {
  type: string;
  payload: {
    email: string;
    currencies: string[]
    expenses: DataExpenseType
    id: number
  }
};

const walletInitialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};
const walletReducer = (state = walletInitialState, action: ActionType) => {
  switch (action.type) {
    case updateCurrencies:
      return { ...state, currencies: action.payload.currencies };

    case successful:
      return { ...state, expenses: [...state.expenses, action.payload.expenses] };

    case deleteExpense:
      return {
        ...state,
        expenses: state.expenses.filter(({ id }) => id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default walletReducer;
