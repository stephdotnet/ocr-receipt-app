import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-paper';
import { Box, Text } from '@/components/atoms';
import { forwardRefProps } from '@/components/molecules/BottomSheet';
import { useStore } from '@/hooks/store';

interface UploadCTAProps {
  bottomSheetRef: React.RefObject<forwardRefProps>;
}

export default function UploadCTA({ bottomSheetRef }: UploadCTAProps) {
  const { t } = useTranslation();
  const { user } = useStore();

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.open();
  }, []);

  return (
    <>
      <Box py="$3" alignItems="center">
        <Text>{t('home.caption')}</Text>
      </Box>
      <Button mode="contained" onPress={openBottomSheet} disabled={!user}>
        <Text fontWeight="bold">{t('home.upload.cta')}</Text>
      </Button>
    </>
  );
}
