
import { _mock } from "./_mock";

export const _homePackages = [...Array(5)].map((_, index) => {
  const category = ['Android', 'Mac', 'Windows', 'Android', 'Mac'][index];

  const status = ['Курьер выехал', 'Курьер выехал', 'progress', 'paid', 'paid'][index];

  return {
    description: _mock._orderDescriptions(index),
    id: _mock.id(index),
    invoiceNumber: `INV-199${index}`,
    date:_mock.time(index),
    direction: _mock.direction(index),
    category,
    status,
  };
});

export const _listPackages = [...Array(20)].map((_, index) => {
  const category = ['Android', 'Mac', 'Windows', 'Android', 'Mac'][index];

  const status = ['Курьер выехал', 'Курьер выехал', 'progress', 'paid', 'paid'][index];

  return {
    description: _mock._orderDescriptions(index),
    id: _mock.id(index),
    invoiceNumber: `INV-199${index}`,
    date:_mock.time(index),
    direction: _mock.direction(index),
    category,
    status,
  };
});
