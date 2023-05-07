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
    openCamera: () => Promise<void>;
  };
}

const useFilePicker: useFilePickerFunction = (setErrors, setFile, bottomSheetRef) => {
  const { t } = useTranslation();

  const askPickerPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status !== 'denied';
  };

  const askCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status !== 'denied';
  };

  const openPicker = async () => {
    if (!(await askPickerPermission())) {
      setErrors({
        file: [t('Please accept permissions')],
      });

      return;
    }

    setErrors(null);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
    });

    handleResult(result);
  };

  const handleResult = (result: ImagePicker.ImagePickerResult) => {
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

  const openCamera = async () => {
    if (!(await askCameraPermission())) {
      setErrors({
        file: [t('Please accept permissions')],
      });

      return;
    }

    setErrors(null);
    const pickerResult = await ImagePicker.launchCameraAsync({
      quality: 0.9,
    });

    handleResult(pickerResult);
  };

  return {
    openPicker,
    openCamera,
  };
};

export default useFilePicker;
