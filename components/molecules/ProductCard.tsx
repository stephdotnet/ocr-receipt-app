import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, Text } from '@/components/atoms';
import { Product } from '@/types/Receipts';

export default function ProductCard({
  data,
  handlePress,
}: {
  data: Product;
  handlePress: (data: Product) => void;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        handlePress(data);
      }}
    >
      <Box
        borderColor="$gray8"
        borderWidth={1}
        borderRadius="$5"
        padding="$2"
        my="$1"
        flex={1}
        flexDirection="row"
        alignItems="center"
      >
        <Box flex="$1">
          <Text>{data.name}</Text>
        </Box>
        <Box ml="$2">
          <Text fontWeight="bold">{Number(parseFloat(data.price).toFixed(2))} €</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}
