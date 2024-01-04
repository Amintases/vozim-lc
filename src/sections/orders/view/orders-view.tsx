import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { fTimestamp, ffTimestamp } from 'src/utils/format-time';

import { INVOICE_STATUS_OPTIONS } from 'src/_mock';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { IInvoiceTableFilters, IInvoiceTableFilterValue } from 'src/types/invoice';

import OrdersDialog from "../orders-dialog";
import OrdersTableRow from '../orders-table-row';
import OrdersTableToolbar from '../orders-table-toolbar';
import { RowProps, useGetOrders } from "../../../api/home";
import OrdersTableFiltersResult from '../orders-table-filters-result';

// ----------------------------------------------------------------------
// TODO: сделать общий эксопрт
const FILTER_STATUSES = {
  all: [0, 4, 10, 21, 22, 23, 27, 28, 29, 30, 31, 32],
  waiting: [32, 10],
  active: [0, 21, 22, 23, 27, 30, 31],
  done: [4, 28],
  canceled: [29],
}

const FILTER_NAMES = {
  all: 'Все',
  waiting: 'Ожидают подтверждения',
  active: 'Активные',
  done: 'Выполненные',
  canceled: 'Отмененные',
}

const TABLE_HEAD = [
  {id: 'name', label: 'Описание'},
  {id: 'id', label: 'Номер'},
  {id: 'receiver.date', label: 'Дата доставки'},
  {id: 'route.from.name', label: 'Направление'},
  {id: 'status.status', label: 'Статус'},
  {id: ''},
];

const defaultFilters: IInvoiceTableFilters = {
  name: '',
  status: [],
  state: 'Все',
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function OrdersView() {
  const theme = useTheme();

  const settings = useSettingsContext();

  const {orders} = useGetOrders()

  const router = useRouter();

  const table = useTable({defaultOrderBy: 'createDate'});

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(orders);

  const [filters, setFilters] = useState(defaultFilters);

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = applyFilter({
    inputData: orders,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 76;

  const canReset =
    !!filters.name ||
    !!filters.status.length ||
    filters.state !== FILTER_NAMES.all ||
    (!!filters.startDate && !!filters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const getInvoiceLength = (status: string) =>
    orders.filter((item) => status === FILTER_NAMES.waiting && FILTER_STATUSES.waiting.includes(item.status.status) ||
      status === FILTER_NAMES.active && FILTER_STATUSES.active.includes(item.status.status) ||
      status === FILTER_NAMES.done && FILTER_STATUSES.done.includes(item.status.status) ||
      status === FILTER_NAMES.canceled && FILTER_STATUSES.canceled.includes(item.status.status)).length;

  const TABS = [
    {
      value: FILTER_NAMES.all,
      color: 'default',
      statuses: FILTER_STATUSES.all,
      count: orders.length
    },
    {
      value: FILTER_NAMES.done,
      color: 'success',
      statuses: FILTER_STATUSES.done,
      count: getInvoiceLength(FILTER_NAMES.done),
    },
    {
      value: FILTER_NAMES.active,
      color: 'info',
      statuses: FILTER_STATUSES.active,
      count: getInvoiceLength(FILTER_NAMES.active),
    },
    {
      value: FILTER_NAMES.waiting,
      color: 'default',
      statuses: FILTER_STATUSES.waiting,
      count: getInvoiceLength(FILTER_NAMES.waiting),
    },
    {
      value: FILTER_NAMES.canceled,
      color: 'error',
      statuses: FILTER_STATUSES.canceled,
      count: getInvoiceLength(FILTER_NAMES.canceled),
    },

  ] as const;

  const handleFilters = useCallback(
    (name: string, value: IInvoiceTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );


  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  // const handleDeleteRows = useCallback(() => {
  //   const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
  //   setTableData(deleteRows);
  //
  //   table.onUpdatePageDeleteRows({
  //     totalRows: tableData.length,
  //     totalRowsInPage: dataInPage.length,
  //     totalRowsFiltered: dataFiltered.length,
  //   });
  // }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.invoice.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.invoice.details(id));
    },
    [router]
  );


  const handleFilterState = useCallback(
    (event: React.SyntheticEvent, newValue: number[]) => {

      handleFilters('state', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const orderDialogOpened = useBoolean();

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Посылки и грузы"
          links={[
            {
              name: 'Главная',
              href: paths.dashboard.root,
            },
            {
              name: 'Посылки и грузы',
            }
          ]}
          action={
            <Button
              onClick={() => orderDialogOpened.onTrue()}
              variant="contained"
              color="primary"
              sx={{color: 'white'}}
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Новая заявка
            </Button>
          }
          sx={{
            mb: {xs: 3, md: 5},
          }}
        />

        <Card
          sx={{
            mb: {xs: 3, md: 5},
          }}
        />

        <Card>
          <Tabs
            value={filters.state}
            onChange={handleFilterState}
            sx={{
              px: 2.5,
              boxShadow: `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.value}
                iconPosition="end"
                icon={
                  <Label
                    variant={
                      ((tab.value === 'Все' || tab.value === filters.state) && 'filled') || 'soft'
                    }
                    color={tab.color}
                  >
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <OrdersTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            dateError={dateError}
            serviceOptions={INVOICE_STATUS_OPTIONS.map((option) => option.name)}
          />

          {canReset && (
            <OrdersTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{p: 2.5, pt: 0}}
            />
          )}

          <TableContainer sx={{position: 'relative', overflow: 'unset'}}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Stack direction="row">
                  <Tooltip title="Sent">
                    <IconButton color="primary">
                      <Iconify icon="iconamoon:send-fill" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Download">
                    <IconButton color="primary">
                      <Iconify icon="eva:download-outline" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Print">
                    <IconButton color="primary">
                      <Iconify icon="solar:printer-minimalistic-bold" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={confirm.onTrue}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{minWidth: 800}}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  onSort={table.onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <OrdersTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, orders.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <OrdersDialog
        open={orderDialogOpened.value}
        onClose={orderDialogOpened.onFalse}
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
                       inputData,
                       comparator,
                       filters,
                       dateError,
                     }: {
  inputData: RowProps[];
  comparator: (a: any, b: any) => number;
  filters: IInvoiceTableFilters;
  dateError: boolean;
}) {
  const {name, state, status, startDate, endDate} = filters;
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (invoice) =>
        invoice.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        invoice.id.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (state !== FILTER_NAMES.all) {
    inputData = inputData.filter((invoice) => state === FILTER_NAMES.waiting && FILTER_STATUSES.waiting.includes(invoice.status.status) ||
      state === FILTER_NAMES.active && FILTER_STATUSES.active.includes(invoice.status.status) ||
      state === FILTER_NAMES.done && FILTER_STATUSES.done.includes(invoice.status.status) ||
      state === FILTER_NAMES.canceled && FILTER_STATUSES.canceled.includes(invoice.status.status));
  }

  if (status.length) {
    inputData = inputData.filter((invoice) =>
      status.includes(invoice.status.text) ||
      (status.includes('на складе') && invoice.status.text.includes('на складе'))
    );
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (invoice) =>
          ffTimestamp(invoice.receiver.date) >= fTimestamp(startDate) &&
          ffTimestamp(invoice.receiver.date) <= fTimestamp(endDate)
      );
    }
  }


  return inputData;
}
