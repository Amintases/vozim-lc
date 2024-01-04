import { memo } from 'react';

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Dialog from '@mui/material/Dialog';
import { useTheme } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';

import { OrderDialogProps } from "../../components/custom-dialog/types";

// ----------------------------------------------------------------------

function OrdersDialog({
                        open,
                        onClose,
                        ...other
                      }: OrderDialogProps) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{py: 3}}>Новая доставка</DialogTitle>

      <Stack sx={{px: 2.5, pb: 3}}>
        <DialogRow img="/assets/images/orders/document.svg" title="Документы" subtitle="до 1 кг" />

        <DialogRow img="/assets/images/orders/package.svg" title="Посылка" subtitle="до 15 кг" />

        <DialogRow img="/assets/images/orders/load.svg" title="Груз" subtitle="до 2000 кг" />

        <DialogRow img="/assets/images/orders/location.svg" title="Экспедиция"
                   subtitle="внутри страны и международная" />
      </Stack>


    </Dialog>
  );
}

type RowProps = {
  img: string,
  title: string,
  subtitle: string,
}

function DialogRow({img, title, subtitle}: RowProps) {
  const theme = useTheme()
  return (
    <Box sx={{
      borderRadius: 1,
      p: 2,
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.hover,
      },
    }}>
      <Stack direction="row" spacing={2}>
        <Box
          component="img"
          alt="auth"
          src={img}
          sx={{
            width: 32,
          }}
        />
        <Stack>
          <Typography variant="h6">{title}</Typography>
          <Typography color="text.disabled">{subtitle}</Typography>
        </Stack>

      </Stack>
    </Box>
  )
}


export default memo(OrdersDialog)
