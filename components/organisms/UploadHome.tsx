import { useTranslation } from 'react-i18next';
import { Button, Chip, ProgressBar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Box, Text } from '@/components/atoms';
import { forwardRefProps } from '@/components/molecules/BottomSheet';
import UploadCTA from '@/components/molecules/UploadCTA';
import useUploadReceipt from '@/hooks/api/useUploadReceipt';
import { Receipt } from '@/types/Receipts';
import { CustomAxiosError } from '@/utils/api/api';
import { getFileName } from '@/utils/files';
import { dataGetValue } from '@/utils/system';
import ReceiptsList from './ReceiptsList';

interface props {
  errors: Record<string, string[]> | null;
  setErrors: (errors: Record<string, string[]> | null) => void;
  file: ImagePicker.ImagePickerAsset | null;
  setFile: (file: ImagePicker.ImagePickerAsset | null) => void;
  bottomSheetRef: React.RefObject<forwardRefProps>;
}

export default function ({ errors, setErrors, file, setFile, bottomSheetRef }: props) {
  const { progress, isLoading, mutate } = useUploadReceipt();
  const router = useRouter();
  const { t } = useTranslation();
  const handleFileUpload = () => {
    if (file) {
      setErrors(null);
      mutate(file, {
        onError: (error: CustomAxiosError) => {
          setFile(null);
          setErrors(error?.response?.validationErrors ?? { file: [t('home.file.error')] });
        },
        onSuccess: (data: Receipt) => {
          // @todo notify if duplicate
          setFile(null);
          router.push(`/receipts/${data.id}`);
        },
      });
    }
  };

  return (
    <>
      <Box my="$-2">
        {!file ? (
          <UploadCTA bottomSheetRef={bottomSheetRef} />
        ) : (
          <>
            <Box py="$3" alignItems="center">
              <Text>{t('home.send.caption')}</Text>
            </Box>
            <Chip closeIcon="close" onClose={() => setFile(null)} style={{ marginBottom: 32 }}>
              {getFileName(file.uri)}
            </Chip>
            <Box mb="$2">{isLoading && <ProgressBar progress={progress} />}</Box>
            <Button
              mode="contained"
              loading={isLoading}
              disabled={isLoading}
              contentStyle={{ flexDirection: 'row-reverse' }}
              onPress={handleFileUpload}
            >
              {t('home.send.cta')}
            </Button>
          </>
        )}
      </Box>
      {errors?.file && (
        <Box py="$3" alignItems="center">
          <Text>{dataGetValue(errors, 'file.0')}</Text>
        </Box>
      )}
      <Box mt="$4">
        <ReceiptsList count={3} />
      </Box>
    </>
  );
}
