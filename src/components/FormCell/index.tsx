import { useDispatch, useSelector } from 'react-redux';
import { TableRow, TableCell } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataExpenseType, InitialStateType } from '../../types/type';
import { deleteAction, editIdAction } from '../../redux/actions';

function FromCell({ expense }: { expense: DataExpenseType }) {
  const { wallet } = useSelector((state: InitialStateType) => state);
  const dispatch = useDispatch();
  const { id, value, description, currency, method, tag, exchangeRates } = expense;

  const convertValue = Number(value) * Number(exchangeRates[currency].ask);
  const currencyName = exchangeRates[currency].name;

  const handleClickDelete = () => {
    dispatch(deleteAction(id));
  };

  const handleClickEdit = () => {
    dispatch(editIdAction(id));
  };

  return (wallet.isFetching
    ? (
      <TableRow>
        <TableCell>{`${description}`}</TableCell>
        <TableCell>{`${tag}`}</TableCell>
        <TableCell>{`${method}`}</TableCell>
        <TableCell>{`${Number(value).toFixed(2)}`}</TableCell>
        <TableCell>{`${currencyName}`}</TableCell>
        <TableCell>{`${Number(exchangeRates[currency].ask).toFixed(2)}`}</TableCell>
        <TableCell>{`${convertValue.toFixed(2)}`}</TableCell>
        <TableCell>Real</TableCell>
        <TableCell>
          <IconButton
            aria-label="edit"
            data-testid="edit-btn"
            onClick={ handleClickEdit }
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            data-testid="delete-btn"
            onClick={ handleClickDelete }
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )
    : <p>Loading...</p>
  );
}

export default FromCell;
