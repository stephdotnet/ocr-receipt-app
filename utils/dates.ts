import dayjs from 'dayjs';

export function parseAndFormatDate(date: string, outputFormat?: string, inputFormat?: string) {
  return dayjs(date).format('DD/MM/YYYY');
}
