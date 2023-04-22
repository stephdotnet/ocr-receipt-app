import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Box from '@/components/atoms/Box';
import Text from '@/components/atoms/Text';
import { withReactQuery } from '@/components/molecules/ComponentLoader/ComponentLoader';
import { useGetReceipts } from '@/hooks/api/useGetReceipts';
import { Receipt } from '@/types/Receipts';
import { conditionnalSlice } from '@/utils/objects';
import { Button } from '../atoms';

interface ReceiptListProps {
  data: Receipt[];
  count?: number;
  style?: any;
}

function ReceiptsList({ count, data }: ReceiptListProps) {
  const router = useRouter();

  const handleNavigate = (receipt: Receipt) => {
    router.push(`/receipts/${receipt.id}`);
  };

  return (
    <Box>
      {conditionnalSlice(data, count ?? null).map((receipt) => {
        return (
          <TouchableOpacity onPress={() => handleNavigate(receipt)} key={receipt.id}>
            <Box
              borderColor="black"
              borderWidth={1}
              borderRadius={10}
              backgroundColor="lightGrey"
              my={1}
              p={1}
              flexDirection="row"
              alignItems="center"
            >
              <Box flex={1}>
                <Text>{receipt.store}</Text>
                <Text>{receipt.created_at}</Text>
                <Text>{receipt.OCRData?.products?.length} produits</Text>
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
