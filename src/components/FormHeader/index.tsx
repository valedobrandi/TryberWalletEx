import { TableHead, TableRow, TableCell } from '@mui/material';

function FormHeader() {
  return (

    <TableHead>
      <TableRow>
        <TableCell>Descrição</TableCell>
        <TableCell>Tag</TableCell>
        <TableCell>Método de pagamento</TableCell>
        <TableCell>Valor</TableCell>
        <TableCell>Moeda</TableCell>
        <TableCell>Câmbio utilizado</TableCell>
        <TableCell>Valor convertido</TableCell>
        <TableCell>Moeda de conversão</TableCell>
        <TableCell>Editar/Excluir</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default FormHeader;
