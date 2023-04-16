import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Box from '@/components/atoms/Box';
import Text from '@/components/atoms/Text';
import MainContainer from '@/components/layout/MainContainer';
import BottomSheet from '@/components/molecules/BottomSheet';
import { getFileName } from '@/utils/files';
import BottomSheetType from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';

export default function Home() {
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetType>(null);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const openPicker = async () => {
    setError(null);
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
        setError(t('home.file.error'));
      }
    }
  };

  return (
    <>
      <MainContainer style={{ justifyContent: 'center' }}>
        <Box style={{ marginTop: -50 }}>
          {!file ? (
            <>
              <Box py={3} alignItems="center">
                <Text style={styles.caption}>{t('home.caption')}</Text>
              </Box>
              {error && (
                <Box py={3} alignItems="center">
                  <Text style={styles.caption}>{error}</Text>
                </Box>
              )}

              <Button style={styles.button} onPress={openBottomSheet}>
                <Text fontWeight="bold">{t('home.upload.cta')}</Text>
              </Button>
            </>
          ) : (
            <>
              <Box py={3} alignItems="center">
                <Text>{t('home.send.caption')}</Text>
              </Box>
              <Chip closeIcon="close" onClose={() => setFile(null)} style={{ marginBottom: 32 }}>
                {getFileName(file.uri)}
              </Chip>
              <Button
                mode="contained"
                loading={true}
                contentStyle={{ flexDirection: 'row-reverse' }}
              >
                {t('home.send.cta')}
              </Button>
            </>
          )}
        </Box>
        <BottomSheet ref={bottomSheetRef} snapPoints={['25%']}>
          <Box py={3} alignItems="center">
            <Button style={styles.button} onPress={openPicker}>
              <Text fontWeight="bold">{t('home.upload.from_gallery')}</Text>
            </Button>
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
  caption: {},
  button: {
    borderColor: '#CCC',
    borderWidth: 2,
  },
});
