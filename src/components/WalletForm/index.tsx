import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input/Input';
import Select from '../Select/Select';
import { Dispatch, InitialStateType } from '../../types/type';
import { currenciesAction, fetchCurrencies } from '../../redux/actions';
import Table from '../Table';

const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

function WalletForm() {
  const [despesa, setDespesa] = useState('');
  const [descrição, setDescrição] = useState('');
  const [selectOptions, setSelectOptions] = useState(
    {
      currencie: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    },
  );

  const { wallet } = useSelector((state: InitialStateType) => state);
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const filter = [...Object.keys(data)].filter((key) => key !== 'USDT');
      dispatch(currenciesAction(filter));
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
      id: wallet.expenses.length || 0,
      value: despesa,
      description: descrição,
      currency: selectOptions.currencie,
      method: selectOptions.method,
      tag: selectOptions.tag,
      exchangeRates: {},
    };
    dispatch(fetchCurrencies(dataExpense));
    setDespesa('');
    setDescrição('');
  }

  return (
    <div>
      <form action="" onSubmit={ handleSubmit }>
        <Input
          test="value-input"
          field="Despesa"
          onSetChange={ setDespesa }
          setChange={ despesa }
        />
        <Input
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
        <button>Adicionar Despesas</button>
      </form>
      <Table />
    </div>
  );
}

export default WalletForm;
