import Box from '@/components/atoms/Box';
import Skeleton from '@/components/atoms/Skeleton';
import ProductCardSkeleton from '@/components/molecules/ProductCard/ProductCardSkeleton';

function ReceiptDetailsSkeleton() {
  return (
    <Box mt="$6">
      <Skeleton height={40} />
      <Box alignItems="center" mt="$2">
        <Skeleton height={10} width="50%" />
      </Box>
      <Box mt="$5" pb="$4">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </Box>
    </Box>
  );
}

export default ReceiptDetailsSkeleton;
