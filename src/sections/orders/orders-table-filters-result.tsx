import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';

import Iconify from 'src/components/iconify';
import { shortDateLabel } from 'src/components/custom-date-range-picker';

import { IInvoiceTableFilters, IInvoiceTableFilterValue } from 'src/types/invoice';

import fUpper from "../../utils/format-string";


// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: IInvoiceTableFilters;
  onFilters: (name: string, value: IInvoiceTableFilterValue) => void;
  //
  onResetFilters: VoidFunction;
  //
  results: number;
};

export default function OrdersTableFiltersResult({
  filters,
  onFilters,
  //
  onResetFilters,
  //
  results,
  ...other
}: Props) {
  const shortLabel = shortDateLabel(filters.startDate, filters.endDate);
  console.log(filters)
  const handleRemoveService = (inputValue: string) => {
    const newValue = filters.status.filter((item) => item !== inputValue);
    onFilters('status', newValue);
  };

  const handleRemoveStatus = () => {
    onFilters('state', 'Все');
  };

  const handleRemoveDate = () => {
    onFilters('startDate', null);
    onFilters('endDate', null);
  };

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          Всего найдено
        </Box>
        <strong> {results}</strong>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {!!filters.status.length && (
          <Block label="Статус:">
            {filters.status.map((item) => (
              <Chip
                key={item}
                label={fUpper(item)}
                size="small"
                onDelete={() => handleRemoveService(item)}
              />
            ))}
          </Block>
        )}

        {filters.state !== 'Все' && (
          <Block label="Cостояние:">
            <Chip size="small" label={filters.state} onDelete={handleRemoveStatus} />
          </Block>
        )}

        {filters.startDate && filters.endDate && (
          <Block label="Дата:">
            <Chip size="small" label={shortLabel} onDelete={handleRemoveDate} />
          </Block>
        )}

        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Очистить
        </Button>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type BlockProps = StackProps & {
  label: string;
};

function Block({ label, children, sx, ...other }: BlockProps) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
