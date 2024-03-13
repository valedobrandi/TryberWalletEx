import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input/Input';
import Select from '../Select/Select';
import { Dispatch, InitialStateType } from '../../types/type';
import { currenciesAction, editAction, fetchCurrencies } from '../../redux/actions';
import Table from '../Table';

const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

function WalletForm() {
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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    setSelectOptions({ ...selectOptions, [name]: value });
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dataExpense = {
      id: isValid ? filter.id : wallet.expenses.length || 0,
      value: despesa,
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
  }

  return (
    <div>
      <form action="" onSubmit={ handleSubmit }>
        <Input
          name="Despesa"
          test="value-input"
          field="Despesa"
          onSetChange={ setDespesa }
          setChange={ despesa }
        />
        <Input
          name="Descrição"
          test="description-input"
          field="Descrição"
          onSetChange={ setDescrição }
          setChange={ descrição }
        />
        <Select
          test="currency-input"
          options={ wallet.currencies }
          onHandleChange={ handleChange }
          optionType="currencie"
          selectOptions={ selectOptions.currencie }
        />
        <Select
          test="method-input"
          options={ methods }
          onHandleChange={ handleChange }
          optionType="method"
          selectOptions={ selectOptions.method }
        />
        <Select
          test="tag-input"
          options={ tags }
          onHandleChange={ handleChange }
          optionType="tag"
          selectOptions={ selectOptions.tag }
        />
        <button>{wallet.editor ? 'Editar Despesas' : 'Adicionar Despesas'}</button>
      </form>
      <Table />
    </div>
  );
}

export default WalletForm;
