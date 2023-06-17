import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useSearchParams } from 'expo-router';
import { Box, Text } from '@/components/atoms';
import Button from '@/components/atoms/Button';
import MainContainer from '@/components/layout/MainContainer';
import BottomSheet, { forwardRefProps } from '@/components/molecules/BottomSheet';
import ReceiptDetails from '@/components/organisms/ReceiptDetails';
import useDeleteProduct from '@/hooks/api/useDeleteProduct';
import { useShowReceipt } from '@/hooks/api/useGetReceipts';
import { Product } from '@/types/Receipts';
import { Dialog } from 'tamagui';

type ReceiptSearchParams = Record<string, string>;

export interface handleProductPressType {
  (product: Product): void;
}

export default function ReceiptPage() {
  const bottomSheetRef = useRef<forwardRefProps>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const { id } = useSearchParams<ReceiptSearchParams>();
  const { data: receipt, isLoading, isError, isFetching, refetch } = useShowReceipt(id as string);
  const { t } = useTranslation();
  const { mutate: deleteMutation } = useDeleteProduct();

  const handleProductPress: handleProductPressType = (product) => {
    setSelectedProduct(product);
    bottomSheetRef.current?.open();
  };

  const handleDeleteDialog = () => {
    bottomSheetRef.current?.close();
    setShowDialog(true);
  };

  const handleHideDialog = () => {
    setShowDialog(false);
    bottomSheetRef.current?.open();
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
        contentContainerStyle={{ flexGrow: 1 }}
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
        <Box mt="$2">
          <Text variant="title2" textAlign="center">
            {selectedProduct?.name}
          </Text>
        </Box>
        <Box my="$3" alignItems="center">
          <Box>
            <Button theme="red" onPress={handleDeleteDialog}>
              {t('system.delete')}
            </Button>
          </Box>
        </Box>
      </BottomSheet>
      <Dialog open={showDialog}>
        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            onPress={handleHideDialog}
          />
          <Dialog.Content
            bordered
            elevate
            key="content"
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            space
          >
            <Dialog.Title style={{ fontSize: 18 }}>{t('product.dialog.delete.title')}</Dialog.Title>
            <Text>{t('product.dialog.delete.content')}</Text>

            <Button theme="red" onPress={handleDeleteConfirm}>
              {t('system.confirm')}
            </Button>
            <Button onPress={handleHideDialog}>{t('system.cancel')}</Button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
