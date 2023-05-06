import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';

interface useFilePickerFunction {
  (
    setErrors: (errors: any) => void,
    setFile: (file: any) => void,
    bottomSheetRef: React.RefObject<BottomSheet>,
  ): {
    openPicker: () => Promise<void>;
  };
}

const useFilePicker: useFilePickerFunction = (setErrors, setFile, bottomSheetRef) => {
  const { t } = useTranslation();

  const askPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status !== 'denied';
  };

  const openPicker = async () => {
    if (!(await askPermission())) {
      setErrors({
        file: [t('Please accept permissions')],
      });

      return;
    }

    setErrors(null);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.9,
    });

    if (!result.canceled) {
      bottomSheetRef.current?.close();

      if (result?.assets?.length) {
        setFile(result.assets[0]);
      } else {
        setErrors({
          file: [t('home.file.error')],
        });
      }
    }
  };

  return {
    openPicker,
  };
};

export default useFilePicker;
