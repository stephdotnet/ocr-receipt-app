import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-paper';
import { Box, Text } from '@/components/atoms';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';

interface UploadCTAProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export default function UploadCTA({ bottomSheetRef }: UploadCTAProps) {
  const { t } = useTranslation();

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <>
      <Box py={3} alignItems="center">
        <Text>{t('home.caption')}</Text>
      </Box>
      <Button mode="contained" onPress={openBottomSheet}>
        <Text fontWeight="bold">{t('home.upload.cta')}</Text>
      </Button>
    </>
  );
}
