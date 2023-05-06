import { TouchableOpacity } from 'react-native-gesture-handler';
import { Product } from '@/types/Receipts';
import { Box, Text } from '../atoms';

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
        borderColor="lightGrey"
        borderWidth={1}
        borderRadius={10}
        padding={2}
        my={1}
        flex={1}
        flexDirection="row"
        alignItems="center"
      >
        <Box flex={1}>
          <Text>{data.name}</Text>
        </Box>
        <Box ml={2}>
          <Text variant="bold">{data.price} €</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}
