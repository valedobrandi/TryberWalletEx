import { writeEmail } from '../actions';

export type ActionType = {
  type: string;
  payload: {
    email: string;
  }
};

// Esse reducer será responsável por tratar as informações da pessoa usuária
const userInitialState = {
  email: '', // string que armazena o e-mail da pessoa usuária
};
const userReducer = (state = userInitialState, action: ActionType) => {
  switch (action.type) {
    case writeEmail:
      return { ...state, email: action.payload.email };

    default:
      return state;
  }
};

export default userReducer;
