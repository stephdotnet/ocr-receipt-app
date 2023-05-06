import { Product, Receipt, receiptsHttpResponse } from '@/types/Receipts';
import { dataGetValue } from '@/utils/system';
import { AxiosResponse } from 'axios';
import { apiClient } from './api';

interface ProductsRequestOptions {
  signal?: AbortSignal;
}

interface deleteProductFunction {
  (receipt: Receipt, product: Product, options?: ProductsRequestOptions): Promise<boolean>;
}

const ENDPOINT = 'receipts';

const remove: deleteProductFunction = async (receipt, product, options) => {
  const response: AxiosResponse<receiptsHttpResponse> = await apiClient.delete(
    `${ENDPOINT}/${receipt.id}/products/${product.id}`,
    {
      params: { limit: dataGetValue(options, 'limit', 50) },
      signal: options?.signal,
    },
  );

  // return response.data.data;
  return response.status === 200;
};

export default {
  remove,
};
