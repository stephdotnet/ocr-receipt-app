import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { Button, Chip, ProgressBar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Box from '@/components/atoms/Box';
import Text from '@/components/atoms/Text';
import MainContainer from '@/components/layout/MainContainer';
import BottomSheet from '@/components/molecules/BottomSheet';
import UploadCTA from '@/components/molecules/UploadCTA';
import ReceiptsList from '@/components/organisms/ReceiptsList';
import useFilePicker from '@/hooks/api/useFilePicker';
import { useGetReceipts } from '@/hooks/api/useGetReceipts';
import useUploadReceipt from '@/hooks/api/useUploadReceipt';
import { getFileName } from '@/utils/files';
import { dataGetValue } from '@/utils/system';
import BottomSheetType from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';

interface errors {
  file: string[];
}

export default function Home() {
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [errors, setErrors] = useState<errors | null>(null);
  const bottomSheetRef = useRef<BottomSheetType>(null);

  const { progress, isLoading, mutate } = useUploadReceipt();
  const { openPicker } = useFilePicker(setErrors, setFile, bottomSheetRef);
  const { isFetching, refetch } = useGetReceipts();
  const { t } = useTranslation();

  const handleFileUpload = () => {
    if (file) {
      setErrors(null);
      mutate(file, {
        onError: (error: any) => {
          if (error?.response?.validationErrors) {
            setFile(null);
            setErrors(error?.response?.validationErrors);
          } else {
            setErrors({
              file: [t('home.file.error')],
            });
          }
        },
        onSuccess: () => {
          // @todo notify if duplicate
          // @todo Redirect to receipt details
          setFile(null);
        },
      });
    }
  };

  const openCamera = async () => {};

  return (
    <>
      <MainContainer style={{ justifyContent: 'center' }}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        >
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
        </ScrollView>
        <BottomSheet ref={bottomSheetRef} snapPoints={['50%']}>
          <Box py={3} alignItems="center">
            <Box mb={3}>
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
      </MainContainer>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    minHeight: 43,
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
  },
});
