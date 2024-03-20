import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { TableBody } from '@mui/material';
import { currenciesAction } from '../../redux/actions';
import { Dispatch, InitialStateType } from '../../types/type';
import FromCell from '../FormCell';
import FormRegistration from '../FormRegistration';
import FormHeader from '../FormHeader';

function WalletForm() {
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const filterData = [...Object.keys(data)].filter((key) => key !== 'USDT');
      dispatch(currenciesAction(filterData));
    }
    fetchData();
  }, []);

  const { expenses } = useSelector((state: InitialStateType) => state.wallet);

  return (
    <TableContainer component={ Paper }>
      <Table sx={ { minWidth: 650 } } aria-label="simple table">
        <FormRegistration />
        <FormHeader />
        <TableBody>
          {expenses.map((expense) => (
            <FromCell key={ expense.id } expense={ expense } />))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WalletForm;
