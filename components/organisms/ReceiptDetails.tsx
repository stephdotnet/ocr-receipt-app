import { useTranslation } from 'react-i18next';
import { handleProductPressType } from '@/app/receipts/[id]';
import Box from '@/components/atoms/Box';
import Text from '@/components/atoms/Text';
import { withLoadingState } from '@/components/molecules/ComponentLoader/ComponentLoader';
import ProductCard from '@/components/molecules/ProductCard';
import { Receipt } from '@/types/Receipts';
import { parseAndFormatDate } from '@/utils/dates';

interface ProductsListProps {
  data: Receipt;
  onProductPress: handleProductPressType;
}

function ReceiptDetails({ data, onProductPress }: ProductsListProps) {
  const { t } = useTranslation();

  return (
    <>
      <Box mt="$4">
        <Text variant="title1" textAlign="center">
          {data.store.name}
        </Text>
      </Box>
      <Text textAlign="center">
        {t('receipt.date_caption', {
          date: parseAndFormatDate(data.invoice_date),
        })}
      </Text>
      <Box mt="$4" pb="$4">
        {data.products.map((data, id) => {
          console.log(data);

          return <ProductCard data={data} key={data.id} handlePress={onProductPress} />;
        })}
      </Box>
    </>
  );
}

export default withLoadingState<ProductsListProps>(ReceiptDetails);
