import TableHead from '@mui/material/TableHead';
import { Button, TableRow, TableCell } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import Input from '../Input/Input';
import { Dispatch, InitialStateType } from '../../types/type';
import SelectBox from '../Select/SelectBox';
import { editAction, fetchCurrencies } from '../../redux/actions';

const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

export default function FormRegistration() {
  const { wallet } = useSelector((state: InitialStateType) => state);
  const filter = wallet.expenses.find(({ id }) => id === wallet.idToEdit);
  const isValid = filter && wallet.editor;
  const [despesa, setDespesa] = useState('');
  const [descrição, setDescrição] = useState('');
  const [selectOptions, setSelectOptions] = useState(
    {
      currencie: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    },
  );
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    if (wallet.editor && filter) {
      setDespesa(filter.value);
      setDescrição(filter.description);
      setSelectOptions({
        currencie: filter.currency,
        method: filter.method,
        tag: filter.tag,
      });
    }
  }, [wallet.editor]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { value, name } = event.target;
    setSelectOptions({ ...selectOptions, [name]: value });
  };

  const handleSubmit = () => {
    const dataExpense = {
      id: isValid ? filter.id : wallet.expenses.length || 0,
      value: despesa === '' ? '0' : despesa,
      description: descrição,
      currency: selectOptions.currencie,
      method: selectOptions.method,
      tag: selectOptions.tag,
      exchangeRates: isValid ? filter.exchangeRates : {},
    };

    switch (wallet.editor) {
      case true:
        dispatch(editAction(dataExpense));
        setDespesa('');
        setDescrição('');
        return;

      default:
        dispatch(fetchCurrencies(dataExpense));
        setDespesa('');
        setDescrição('');
    }
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Input
            name="Despesa"
            test="value-input"
            field="Despesa"
            onSetChange={ setDespesa }
            setChange={ despesa }
          />
        </TableCell>
        <TableCell>
          <Input
            name="Descrição"
            test="description-input"
            field="Descrição"
            onSetChange={ setDescrição }
            setChange={ descrição }
          />
        </TableCell>
        <TableCell>
          <SelectBox
            test="currency-input"
            options={ wallet.currencies }
            onHandleChange={ handleChange }
            optionType="currencie"
            selectOptions={ selectOptions.currencie }
          />
        </TableCell>
        <TableCell>
          <SelectBox
            test="method-input"
            options={ methods }
            onHandleChange={ handleChange }
            optionType="method"
            selectOptions={ selectOptions.method }
          />
        </TableCell>
        <TableCell>
          <SelectBox
            test="tag-input"
            options={ tags }
            onHandleChange={ handleChange }
            optionType="tag"
            selectOptions={ selectOptions.tag }
          />
        </TableCell>
        <TableCell>
          <Button onClick={ handleSubmit }>
            {wallet.editor ? 'Editar Despesas' : 'Adicionar Despesas'}
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
