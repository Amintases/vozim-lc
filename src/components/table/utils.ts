// ----------------------------------------------------------------------


import { ruDate } from "../../utils/format-time";

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function getNestedValue<T>(obj: T, path: string): any {
  // @ts-ignore
  return path.split('.').reduce((o, p) => (o ? o[p] : null), obj);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T | string) {
  let aValue: any;
  let bValue: any;

  if (typeof orderBy === "string" && orderBy.includes('.')) {
    aValue = getNestedValue(a, orderBy);
    bValue = getNestedValue(b, orderBy);
    console.log(aValue)
    if(
      typeof aValue === "string" &&
      typeof bValue === "string" &&
      aValue.includes('.') &&
      bValue.includes('.'))
    {
      aValue = ruDate(aValue)
      bValue = ruDate(bValue)
    }

  } else if (typeof orderBy === "string") {
    aValue = a[orderBy as keyof T];
    bValue = b[orderBy as keyof T];
  } else {
    aValue = a[orderBy];
    bValue = b[orderBy];
  }

  if (aValue === null) {
    return 1;
  }
  if (bValue === null) {
    return -1;
  }
  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
