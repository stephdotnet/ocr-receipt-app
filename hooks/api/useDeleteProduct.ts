import { Product, Receipt } from '@/types/Receipts';
import productApi from '@/utils/api/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getQueryKeyShow } from './useGetReceipts';

interface MutationFnProps {
  receipt: Receipt;
  product: Product;
}

export default function useDeleteProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    onMutate: async ({ receipt, product }: MutationFnProps) => {
      await queryClient.cancelQueries(getQueryKeyShow(receipt.id));
      const receiptSnapshot = queryClient.getQueryData<Receipt>(getQueryKeyShow(receipt.id));
      const newProducts = receiptSnapshot?.products.filter((item) => item.id !== product.id) ?? [];

      queryClient.setQueryData<Receipt>(getQueryKeyShow(receipt.id), (old) => {
        return { ...old!, products: newProducts };
      });

      return { receiptSnapshot };
    },
    mutationFn: ({ receipt, product }: MutationFnProps) => {
      return productApi.remove(receipt, product);
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(getQueryKeyShow(variables.receipt.id), context?.receiptSnapshot);
    },
  });

  return { ...mutation };
}
