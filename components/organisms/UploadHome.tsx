import { useTranslation } from 'react-i18next';
import { Button, Chip, ProgressBar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { errors } from '@/app';
import { Box, Text } from '@/components/atoms';
import UploadCTA from '@/components/molecules/UploadCTA';
import useUploadReceipt from '@/hooks/api/useUploadReceipt';
import { getFileName } from '@/utils/files';
import { dataGetValue } from '@/utils/system';
import ReceiptsList from './ReceiptsList';

interface props {
  errors: errors;
  setErrors: (errors: errors) => void;
  file: ImagePicker.ImagePickerAsset | null;
  setFile: (file: ImagePicker.ImagePickerAsset | null) => void;
  bottomSheetRef: React.RefObject<BottomSheetType>;
}

export default function ({ errors, setErrors, file, setFile, bottomSheetRef }) {
  const { progress, isLoading, mutate } = useUploadReceipt();
  const router = useRouter();
  const { t } = useTranslation();

  const handleFileUpload = () => {
    if (file) {
      setErrors(null);
      mutate(file, {
        onError: (error: any) => {
          setFile(null);
          setErrors(error?.response?.validationErrors ?? { file: [t('home.file.error')] });
        },
        onSuccess: (data) => {
          // @todo notify if duplicate
          setFile(null);
          router.push(`/receipts/${data.id}`);
        },
      });
    }
  };

  return (
    <>
      <Box style={{ marginTop: -50 }}>
        {!file ? (
          <UploadCTA bottomSheetRef={bottomSheetRef} />
        ) : (
          <>
            <Box py={3} alignItems="center">
              <Text>{t('home.send.caption')}</Text>
            </Box>
            <Chip closeIcon="close" onClose={() => setFile(null)} style={{ marginBottom: 32 }}>
              {getFileName(file.uri)}
            </Chip>
            <Box mb={2}>{isLoading && <ProgressBar progress={progress} />}</Box>
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
        <Box py={3} alignItems="center">
          <Text>{dataGetValue(errors, 'file.0')}</Text>
        </Box>
      )}
      <Box mt={2}>
        <ReceiptsList count={3} />
      </Box>
    </>
  );
}
