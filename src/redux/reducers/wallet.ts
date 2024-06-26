import { DataExpenseType, WalletInitalStateType } from '../../types/type';
import { deleteExpense, editExpense,
  editId, started, successful, updateCurrencies } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
export type ActionType = {
  type: string;
  payload: {
    email: string;
    currencies: string[];
    expenses: DataExpenseType[];
    id: number;
    idToEdit: number
  }
};

const walletInitialState: WalletInitalStateType = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetching: true,
};
const walletReducer = (state = walletInitialState, action: ActionType) => {
  switch (action.type) {
    case updateCurrencies:
      return { ...state, currencies: action.payload.currencies };

    case started:
      return { ...state, isFetching: false };

    case successful:
      return {
        ...state,
        isFetching: true,
        expenses: [...state.expenses, action.payload.expenses],
      };
    case deleteExpense:
      return {
        ...state,
        expenses: state.expenses.filter(({ id }) => id !== action.payload.id),
      };

    case editId:
      return { ...state, editor: true, idToEdit: action.payload.idToEdit };

    case editExpense:
      return {
        ...state,
        editor: false,
        expenses: state.expenses
          .map((expense: DataExpenseType) => (expense.id === state.idToEdit
            ? action.payload.expenses
            : expense)),
      };
    default:
      return state;
  }
};

export default walletReducer;
