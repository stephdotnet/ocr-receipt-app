import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { withReactQuery } from '@/components/molecules/ComponentLoader/ComponentLoader';
import { useGetReceipts } from '@/hooks/api/useGetReceipts';
import { Receipt } from '@/types/Receipts';
import { parseAndFormatDate } from '@/utils/dates';
import { conditionnalSlice } from '@/utils/objects';
import { useTheme } from 'tamagui';

interface ReceiptListProps {
  data: Receipt[];
  count?: number;
  style?: any;
}

function ReceiptsList({ count, data }: ReceiptListProps) {
  const router = useRouter();
  const theme = useTheme();
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
              borderColor="$gray10"
              borderWidth={1}
              borderRadius="$5"
              mb="$3"
              px="$2"
              py="$2"
              flexDirection="row"
              alignItems="center"
            >
              <Box flex={1}>
                <Text>{receipt.store.name}</Text>
                <Text variant="thin">
                  {t('receipt.date_caption', {
                    date: parseAndFormatDate(receipt.invoice_date),
                  })}{' '}
                  <Text fontWeight="bold">{receipt.products?.length} produits</Text>
                </Text>
              </Box>
              <Box>
                <MaterialIcons name="arrow-right" size={24} color={theme.color.val} />
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
