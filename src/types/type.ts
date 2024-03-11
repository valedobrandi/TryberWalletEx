export type InitialStateType = {
  user: {
    email: string;
  };
  wallet: {
    currencies: never[];
    expenses: never[];
    editor: boolean;
    idToEdit: number;
  };
};

export type UserInitialStatetype = {
  email: string, // string que armazena o e-mail da pessoa usuária
};

export type WalletInitalStateType = {

  currencies: never[];
  expenses: never[];
  editor: boolean;
  idToEdit: number;
};
