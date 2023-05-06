import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Receipt } from '@/types/Receipts';
import receipts from '@/utils/api/receipts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getQueryKeyList, getQueryKeyShow } from './useGetReceipts';

export default function useUploadReceipt() {
  const [progress, setProgress] = useState(0);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    onMutate: () => {
      setProgress(0);
    },
    mutationFn: async (file: ImagePicker.ImagePickerAsset) => {
      return receipts.send(file, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total) / 100);
          } else {
            setProgress(1);
          }
        },
      });
    },
    onSuccess: async (data: Receipt) => {
      if (data.recently_created) {
        await queryClient.cancelQueries({ queryKey: getQueryKeyList() });
        const oldReceipts = queryClient.getQueryData<Receipt[]>(getQueryKeyList());

        if (oldReceipts) {
          oldReceipts.unshift(data);
        }

        const allReceipts = oldReceipts ?? [data];

        queryClient.setQueryData<Receipt[]>(getQueryKeyList(), allReceipts);
        queryClient.setQueryData<Receipt>(getQueryKeyShow(data.id), data);
      }
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: getQueryKeyList() });
    },
  });

  return { ...mutation, progress };
}
