import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { Button, Chip, ProgressBar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import Box from '@/components/atoms/Box';
import Text from '@/components/atoms/Text';
import MainContainer from '@/components/layout/MainContainer';
import UploadCTA from '@/components/molecules/UploadCTA';
import { UploadChoicesBottomSheet } from '@/components/molecules/UploadChoicesBottomSheet';
import ReceiptsList from '@/components/organisms/ReceiptsList';
import UploadHome from '@/components/organisms/UploadHome';
import { useGetReceipts } from '@/hooks/api/useGetReceipts';
import useUploadReceipt from '@/hooks/api/useUploadReceipt';
import { useStore } from '@/hooks/store';
import { getFileName } from '@/utils/files';
import { dataGetValue } from '@/utils/system';
import BottomSheetType from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';

export interface errors {
  file: string[];
}

export default function Home() {
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [errors, setErrors] = useState<errors | null>(null);
  const bottomSheetRef = useRef<BottomSheetType>(null);

  const { user } = useStore();
  const { isFetching, refetch } = useGetReceipts();

  return (
    <>
      <MainContainer style={{ justifyContent: 'center' }}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        >
          {user ? (
            <UploadHome
              errors={errors}
              setErrors={setErrors}
              file={file}
              setFile={setFile}
              bottomSheetRef={bottomSheetRef}
            />
          ) : (
            <Button>Login</Button>
          )}
        </ScrollView>
        <UploadChoicesBottomSheet
          bottomSheetRef={bottomSheetRef}
          setErrors={setErrors}
          setFile={setFile}
        />
      </MainContainer>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
  },
});
