import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Box } from '@/components/atoms';
import Button from '@/components/atoms/Button';
import BottomSheet, { forwardRefProps } from '@/components/layout/BottomSheet';
import useFilePicker from '@/hooks/api/useFilePicker';

interface UploadChoicesBottomSheetProps {
  bottomSheetRef: React.RefObject<forwardRefProps>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string[]> | null>>;
  setFile: React.Dispatch<React.SetStateAction<ImagePicker.ImagePickerAsset | null>>;
}

export const UploadChoicesBottomSheet = ({
  bottomSheetRef,
  setErrors,
  setFile,
}: UploadChoicesBottomSheetProps) => {
  const { openPicker, openCamera } = useFilePicker(setErrors, setFile, bottomSheetRef);
  const { t } = useTranslation();
  return (
    <BottomSheet ref={bottomSheetRef}>
      <Box py="$3" alignItems="center">
        <Box mb="$2">
          <Button style={styles.button} theme="green" onPress={openPicker}>
            {t('home.upload.from_gallery')}
          </Button>
        </Box>
        <Box>
          <Button style={styles.button} theme="green" onPress={openCamera}>
            {t('home.upload.from_camera')}
          </Button>
        </Box>
      </Box>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 43,
  },
});
