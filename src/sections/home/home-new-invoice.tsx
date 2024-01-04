import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Card, { CardProps } from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import Label, { LabelColor } from 'src/components/label';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { RowProps } from "../../api/home";
import { paths } from "../../routes/paths";
import { ffDate } from "../../utils/format-time";
import { RouterLink } from "../../routes/components";



export const STATUS_COLOR:LabelColor[] = [
  'default',
  'info', 'info', 'success', 'success',
  'info', 'info', 'info', 'info',
  'info',  'default',  'info',  'info',
   'info',  'info',  'info',  'info',
   'info',  'info',  'info',  'info',
   'info',  'success',  'info',  'info',
   'info',  'info',  'info',  'success',
   'error',  'info',  'info',  'default',
   'info',  'info'
]


// ----------------------------------------------------------------------
interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  tableLabels: any;
}

export default function HomeNewInvoice({
                                         title,
                                         subheader,
                                         tableData,
                                         tableLabels,
                                         ...other
                                       }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{mb: 3}} />

      <TableContainer sx={{overflow: 'unset'}}>
        <Scrollbar>
          <Table sx={{minWidth: 680}}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row: RowProps) => (
                <AppNewInvoiceRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{borderStyle: 'dashed'}} />

      <Box sx={{p: 2, textAlign: 'right'}}>
        <Button
          component={RouterLink}
          href={paths.dashboard.orders}
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ml: -0.5}} />}
        >Посмотреть все</Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type AppNewInvoiceRowProps = {
  row: RowProps;
};

function AppNewInvoiceRow({row}: AppNewInvoiceRowProps) {
  const popover = usePopover();
  console.log(row)
  const handleDownload = () => {
    popover.onClose();
    console.info('DOWNLOAD', row?.id);
  };

  const handlePrint = () => {
    popover.onClose();
    console.info('PRINT', row?.id);
  };

  const handleShare = () => {
    popover.onClose();
    console.info('SHARE', row?.id);
  };

  const handleDelete = () => {
    popover.onClose();
    console.info('DELETE', row?.id);
  };

  // @ts-ignore
  return (
    <>
      <TableRow>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.id}</TableCell>

        <TableCell>{ffDate(row.receiver.date)}</TableCell>

        <TableCell>{row.route.from.name} - {row.route.to.name}</TableCell>


        <TableCell>
          <Label
            variant="soft"
            color={ STATUS_COLOR[row.status.status] }
          >
            {row.status.text}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{pr: 1}}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{width: 160}}
      >
        <MenuItem onClick={handleDownload}>
          <Iconify icon="eva:cloud-download-fill" />
          Download
        </MenuItem>

        <MenuItem onClick={handlePrint}>
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="solar:share-bold" />
          Share
        </MenuItem>

        <Divider sx={{borderStyle: 'dashed'}} />

        <MenuItem onClick={handleDelete} sx={{color: 'error.main'}}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}
