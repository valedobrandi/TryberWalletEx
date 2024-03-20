import { useSelector } from 'react-redux';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { InitialStateType } from '../../types/type';

function Header() {
  const { user } = useSelector((state: InitialStateType) => state);
  const { wallet } = useSelector((state: InitialStateType) => state);

  const isValid = wallet.expenses.length > 0;

  const totalExpenses = isValid
    ? wallet.expenses.reduce((prev, cur) => {
      const sum = Number(cur.value) * Number(cur.exchangeRates[cur.currency].ask);
      return prev + sum;
    }, 0)
    : 0;

  return (
    <Box sx={ { flexGrow: 1 } }>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="h4" sx={ { flexGrow: 1 } }>
            Wallet Expense
          </Typography>
          <Typography variant="h6" component="p" ml="70%" mr="20px">
            {totalExpenses.toFixed(2)}
          </Typography>
          <Typography variant="h6" component="p" mr="10px" sx={ { flexGrow: 1 } }>
            BRL
          </Typography>
          <Typography variant="h6" component="p" mr={ 2 }>
            {user.email}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
