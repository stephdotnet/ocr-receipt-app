import React from 'react';
import Box from '@/components/atoms/Box';
import Skeleton from '@/components/atoms/Skeleton';
import { Text, YStack } from 'tamagui';

const ReceiptsListSkeleton = () => {
  return (
    <YStack space="$2">
      <Skeleton height={70}></Skeleton>
      <Skeleton height={70}></Skeleton>
      <Skeleton height={70}></Skeleton>
      <Skeleton height={45}></Skeleton>
    </YStack>
  );
};

export default ReceiptsListSkeleton;
