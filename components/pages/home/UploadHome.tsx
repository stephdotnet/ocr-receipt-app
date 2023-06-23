import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Box, Button, Text } from '@/components/atoms';
import Chip from '@/components/atoms/Chip';
import { forwardRefProps } from '@/components/molecules/BottomSheet';
import ReceiptsList from '@/components/organisms/ReceiptsList';
import UploadCTA from '@/components/pages/home/UploadCTA';
import useUploadReceipt from '@/hooks/api/useUploadReceipt';
import { Receipt } from '@/types/Receipts';
import { CustomAxiosError } from '@/utils/api/api';
import { getFileName } from '@/utils/files';
import { dataGetValue } from '@/utils/system';
import { Progress } from 'tamagui';

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
            <Box mb="$3">
              <Chip theme="green" onClose={() => setFile(null)}>
                {getFileName(file.uri)}
              </Chip>
            </Box>
            {isLoading && (
              <Box mb="$4">
                <Progress value={progress}>
                  <Progress.Indicator animation={null} />
                </Progress>
              </Box>
            )}
            <Button
              theme="green"
              loading={isLoading}
              disabled={isLoading}
              onPress={handleFileUpload}
            >
              {t('home.send.cta')}
            </Button>
          </>
        )}
      </Box>
      {errors?.file && (
        <Box py="$3" alignItems="center">
          <Text variant="error" textAlign="center">
            {dataGetValue(errors, 'file.0')}
          </Text>
        </Box>
      )}
      <Box mt="$4">
        <ReceiptsList count={3} />
      </Box>
    </>
  );
}
