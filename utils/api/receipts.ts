import * as ImagePicker from 'expo-image-picker';
import { Receipt, receiptHttpResponse, receiptsHttpResponse } from '@/types/Receipts';
import { dataGetValue } from '@/utils/system';
import { AxiosProgressEvent, AxiosResponse } from 'axios';
import { apiClient } from './api';

interface ReceiptsRequestOptions {
  page?: number;
  limit?: number;
  signal?: AbortSignal;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  token?: string | null;
}

interface getPlaylistsFunction {
  (page?: number, options?: ReceiptsRequestOptions): Promise<Receipt[]>;
}

const ENDPOINT = 'receipts';

const get: getPlaylistsFunction = async (page, options) => {
  const response: AxiosResponse<receiptsHttpResponse> = await apiClient.get(ENDPOINT, {
    params: { limit: dataGetValue(options, 'limit', 50), page: page ?? 1 },
    signal: options?.signal,
    headers: {
      Authorization: `Bearer ${options?.token}`,
    },
  });

  return response.data.data;
};

interface getReceiptFunction {
  (id: string, options?: ReceiptsRequestOptions): Promise<Receipt>;
}

const show: getReceiptFunction = async (id, options) => {
  const response: AxiosResponse<receiptHttpResponse> = await apiClient.get(`${ENDPOINT}/${id}`, {
    signal: options?.signal,
    headers: {
      Authorization: `Bearer ${options?.token}`,
    },
  });

  return response.data.data;
};

interface sendReceiptFunction {
  (file: ImagePicker.ImagePickerAsset, options?: ReceiptsRequestOptions): Promise<Receipt>;
}

const send: sendReceiptFunction = async (file, options) => {
  const uri = file.uri;
  const uriArray = uri.split('.');
  const fileType = uriArray[uriArray.length - 1];

  const formData = new FormData();
  formData.append('file', {
    /* @ts-ignore */
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  const response: AxiosResponse<receiptHttpResponse> = await apiClient.post(ENDPOINT, formData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${options?.token}`,
    },
    ...options,
  });

  return response.data.data;
};

export default {
  get,
  show,
  send,
};
