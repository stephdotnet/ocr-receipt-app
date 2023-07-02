import React from 'react';
import Skeleton from '@/components/atoms/Skeleton';
import { ReceiptsListProps } from '@/components/organisms/ReceiptsList/ReceiptsList';
import { YStack } from 'tamagui';

const ReceiptsListSkeleton = ({ count }: ReceiptsListProps) => {
  return (
    <YStack space="$2">
      {Array.from({ length: count ?? 10 }).map(() => (
        <Skeleton height={70} />
      ))}
    </YStack>
  );
};

export default ReceiptsListSkeleton;
