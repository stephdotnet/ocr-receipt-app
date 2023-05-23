import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { Button, Dialog, Portal } from 'react-native-paper';
import { useSearchParams } from 'expo-router';
import { Box, Text } from '@/components/atoms';
import MainContainer from '@/components/layout/MainContainer';
import BottomSheet from '@/components/molecules/BottomSheet';
import ReceiptDetails from '@/components/organisms/ReceiptDetails';
import useDeleteProduct from '@/hooks/api/useDeleteProduct';
import { useShowReceipt } from '@/hooks/api/useGetReceipts';
import { Product } from '@/types/Receipts';
import theme from '@/utils/theme';
import BottomSheetType from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';

type ReceiptSearchParams = Record<string, string>;

export interface handleProductPressType {
  (product: Product): void;
}

export default function ReceiptPage() {
  const bottomSheetRef = useRef<BottomSheetType>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const { id } = useSearchParams<ReceiptSearchParams>();
  const { data: receipt, isLoading, isError, isFetching, refetch } = useShowReceipt(id as string);
  const { t } = useTranslation();
  const { mutate: deleteMutation } = useDeleteProduct();

  const handleProductPress: handleProductPressType = (product) => {
    setSelectedProduct(product);
    bottomSheetRef.current?.expand();
  };

  const handleDeleteDialog = () => {
    bottomSheetRef.current?.close();
    setShowDialog(true);
  };

  const handleHideDialog = () => {
    setShowDialog(false);
    bottomSheetRef.current?.expand();
  };

  const handleDeleteConfirm = () => {
    if (receipt && selectedProduct) {
      deleteMutation({ receipt, product: selectedProduct });
      setShowDialog(false);
    }
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
      >
        <MainContainer>
          <ReceiptDetails
            data={receipt}
            isLoading={isLoading}
            isError={isError}
            onProductPress={handleProductPress}
          />
        </MainContainer>
      </ScrollView>
      <BottomSheet ref={bottomSheetRef}>
        <Box mt={2}>
          <Text variant="title2" textAlign="center">
            {selectedProduct?.name}
          </Text>
        </Box>
        <Box mt={3} mb={3} alignItems="center">
          <Box>
            <Button mode="outlined" textColor={theme.colors.error50} onPress={handleDeleteDialog}>
              {t('system.delete')}
            </Button>
          </Box>
        </Box>
      </BottomSheet>
      <Portal>
        <Dialog visible={showDialog} onDismiss={handleHideDialog}>
          <Dialog.Title>{t('product.dialog.delete.title')}</Dialog.Title>
          <Dialog.Content>
            <Text>{t('product.dialog.delete.content')}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button textColor={theme.colors.error50} onPress={handleDeleteConfirm}>
              {t('system.confirm')}
            </Button>
            <Button onPress={handleHideDialog}>{t('system.cancel')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
