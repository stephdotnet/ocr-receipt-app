import { Receipt } from '@/types/Receipts';
import receipts from '@/utils/api/receipts';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const QUERY_KEY_PLAYLISTS = 'receipts';
const QUERY_KEY_PLAYLIST = 'receipt';

export function getQueryKeyList(page?: number): QueryKey {
  if (page === undefined) {
    return [QUERY_KEY_PLAYLISTS];
  }
  return [QUERY_KEY_PLAYLISTS, page];
}

export function getQueryKeyShow(id?: string): QueryKey {
  if (id === undefined) {
    return [QUERY_KEY_PLAYLIST];
  }
  return [QUERY_KEY_PLAYLIST, id];
}

export function useGetReceipts() {
  return useQuery<Receipt[], AxiosError>(getQueryKeyList(1), ({ signal }) =>
    receipts.get(1, { signal }),
  );
}

export function useShowReceipt(id: string) {
  return useQuery<Receipt, AxiosError>(getQueryKeyShow(id), ({ signal }) =>
    receipts.show(id, { signal }),
  );
}
