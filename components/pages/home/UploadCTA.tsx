import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Text } from '@/components/atoms';
import Button from '@/components/atoms/Button';
import { forwardRefProps } from '@/components/layout/BottomSheet';
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
      <Button theme="green" disabled={!user} onPress={openBottomSheet}>
        {t('home.upload.cta')}
      </Button>
    </>
  );
}
