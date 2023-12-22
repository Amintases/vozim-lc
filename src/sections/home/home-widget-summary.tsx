import Box from '@mui/material/Box';
import Card, { CardProps } from '@mui/material/Card';


// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  total: number;
  unit?: 'amount' | 'kg' | 'size';
}

const units = {
  amount:'',
  kg: 'кг',
  size: "М³"
}

export default function HomeWidgetSummary({ title, total, unit, sx, ...other }: Props) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        pl: 3,
        ...sx,
      }}
      {...other}
    >
      <Box>
        <Box sx={{ mb: 1, typography: 'h3' }}>{total} {unit && units[unit]}</Box>
        <Box sx={{ color: 'text.secondary', typography: 'subtitle2' }}>{title}</Box>
      </Box>
    </Card>
  );
}
