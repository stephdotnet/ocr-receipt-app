import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Box from '@/components/atoms/Box';
import Text from '@/components/atoms/Text';
import { withReactQuery } from '@/components/molecules/ComponentLoader/ComponentLoader';
import { useGetReceipts } from '@/hooks/api/useGetReceipts';
import { Receipt } from '@/types/Receipts';
import { parseAndFormatDate } from '@/utils/dates';
import { conditionnalSlice } from '@/utils/objects';
import { Button } from '../atoms';

interface ReceiptListProps {
  data: Receipt[];
  count?: number;
  style?: any;
}

function ReceiptsList({ count, data }: ReceiptListProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleNavigate = (receipt: Receipt) => {
    router.push(`/receipts/${receipt.id}`);
  };

  return (
    <Box>
      {conditionnalSlice(data, count ?? null).map((receipt) => {
        return (
          <TouchableOpacity onPress={() => handleNavigate(receipt)} key={receipt.id}>
            <Box
              borderColor="lightGrey"
              borderWidth={1}
              borderRadius={10}
              my={1}
              px={2}
              py={2}
              flexDirection="row"
              alignItems="center"
            >
              <Box flex={1}>
                <Text>{receipt.store.name}</Text>
                <Text variant="thin">
                  {t('receipt.date_caption', {
                    date: parseAndFormatDate(receipt.invoice_date),
                  })}{' '}
                  <Text variant="bold">{receipt.products?.length} produits</Text>
                </Text>
              </Box>
              <Box>
                <MaterialIcons name="arrow-right" size={24} color="black" />
              </Box>
            </Box>
          </TouchableOpacity>
        );
      })}
      {count && data.length > count && (
        <Button onPress={() => router.push('/receipts')}>
          <Text>Voir plus</Text>
        </Button>
      )}
    </Box>
  );
}

export default withReactQuery(ReceiptsList, useGetReceipts);
