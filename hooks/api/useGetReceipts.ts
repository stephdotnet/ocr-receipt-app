import { Receipt } from '@/types/Receipts';
import receipts from '@/utils/api/receipts';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useStore } from '../store';

const QUERY_KEY_RECEIPTS = 'receipts';
const QUERY_KEY_RECEIPT = 'receipt';

export function getQueryKeyList(page?: number): QueryKey {
  if (page === undefined) {
    page = 1;
  }
  return [QUERY_KEY_RECEIPTS, page];
}

export function getQueryKeyShow(id: string): QueryKey {
  return [QUERY_KEY_RECEIPT, parseInt(id, 10)];
}

export function useGetReceipts() {
  const { token } = useStore();  
  console.log(token);  
  return useQuery<Receipt[], AxiosError>(getQueryKeyList(1), ({ signal }) =>
    receipts.get(1, { signal, token }),
  );
};

export function useShowReceipt(id: string) {
  const { token } = useStore();  
  return useQuery<Receipt, AxiosError>(getQueryKeyShow(id), ({ signal }) =>
    receipts.show(id, { signal, token }),
  );
};
