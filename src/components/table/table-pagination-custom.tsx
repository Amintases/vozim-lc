import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { Theme, SxProps } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import TablePagination, { TablePaginationProps } from '@mui/material/TablePagination';

// ----------------------------------------------------------------------

type Props = {
  dense?: boolean;
  onChangeDense?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
};

export default function TablePaginationCustom({
                                                dense,
                                                onChangeDense,
                                                rowsPerPageOptions = [5, 10, 25],
                                                sx,
                                                ...other
                                              }: Props & TablePaginationProps) {

  const labelDisplayedRows = ({from, to, count}: any) => `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`

  return (
    <Box sx={{position: 'relative', ...sx}}>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        labelRowsPerPage="Строк на странице"
        labelDisplayedRows={labelDisplayedRows}
        component="div"
        {...other}
        sx={{
          borderTopColor: 'transparent',
        }}
      />

    {onChangeDense && (
      <FormControlLabel
        label="Уменьшить"
        control={<Switch checked={dense} onChange={onChangeDense} />}
        sx={{
          pl: 2,
          py: 1.5,
          top: 0,
          position: {
            sm: 'absolute',
          },
        }}
      />
    )}
    </Box>
  );
}
