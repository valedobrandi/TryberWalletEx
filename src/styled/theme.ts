import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiTableCell: {
      defaultProps: {
        align: 'center',
      },
    },
  },
});
