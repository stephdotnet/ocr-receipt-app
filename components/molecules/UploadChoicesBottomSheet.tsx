import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Box } from '@/components/atoms';
import useFilePicker from '@/hooks/api/useFilePicker';
import BottomSheetType from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import BottomSheet from './BottomSheet';

interface UploadChoicesBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetType>;
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
          <Button style={styles.button} mode="contained" onPress={openPicker}>
            {t('home.upload.from_gallery')}
          </Button>
        </Box>
        <Box>
          <Button style={styles.button} mode="contained" onPress={openCamera}>
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
