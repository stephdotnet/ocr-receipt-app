import { Receipt, receiptHttpResponse, receiptsHttpResponse } from '@/types/Receipts';
import { AxiosResponse } from 'axios';
import { dataGetValue } from '../system';
import { apiClient } from './api';

interface ReceiptsRequestOptions {
  page?: number;
  limit?: number;
  signal?: AbortSignal;
}

interface getPlaylistsFunction {
  (page?: number, options?: ReceiptsRequestOptions): Promise<Receipt[]>;
}

const ENDPOINT = 'ocr-scans';

const get: getPlaylistsFunction = async (page, options) => {
  const response: AxiosResponse<receiptsHttpResponse> = await apiClient.get(ENDPOINT, {
    params: { limit: dataGetValue(options, 'limit', 50), page: page ?? 1 },
    signal: options?.signal,
  });

  return response.data.data;
};

interface getReceiptFunction {
  (id: string, options?: ReceiptsRequestOptions): Promise<Receipt>;
}

const show: getReceiptFunction = async (id, options) => {
  const response: AxiosResponse<receiptHttpResponse> = await apiClient.get(`${ENDPOINT}/${id}`, {
    params: {
      limit: dataGetValue(options, 'limit', 50),
      page: dataGetValue(options, 'page', 1),
    },
    signal: options?.signal,
  });

  return response.data.data;
};

export default {
  get,
  show,
};
