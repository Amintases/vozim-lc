// eslint-disable-next-line import/no-duplicates
import { ru } from "date-fns/locale";
// eslint-disable-next-line import/no-duplicates
import { format, getTime, formatDistanceToNow } from 'date-fns';
// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';
  return date ? format(new Date(date), fm, {locale: ru}) : '';
}

export function ruDate(date: string){
  const arrayDate = date.split('.')
  return new Date(`${arrayDate[1]} ${arrayDate[0]} ${arrayDate[2]}`)
}

export function ffDate(date: string, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';
  return date ? format(ruDate(date), fm, {locale: ru}) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function ffTimestamp(date: string) {
  const arrayDate = date.split('.')
  return date ? getTime(new Date(`${arrayDate[1]} ${arrayDate[0]} ${arrayDate[2]}`)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
      addSuffix: true,
    })
    : '';
}
