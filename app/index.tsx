import React, { useRef, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import Button from '@/components/atoms/Button';
import MainContainer from '@/components/layout/MainContainer';
import { forwardRefProps } from '@/components/molecules/BottomSheet';
import { UploadChoicesBottomSheet } from '@/components/pages/home/UploadChoicesBottomSheet';
import UploadHome from '@/components/pages/home/UploadHome';
import { useGetReceipts } from '@/hooks/api/useGetReceipts';
import { useStore } from '@/hooks/store';

export default function Home() {
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const bottomSheetRef = useRef<forwardRefProps>(null);

  const { user, token } = useStore();
  const router = useRouter();
  const { isFetching, refetch } = useGetReceipts(!!user);

  return (
    <>
      <MainContainer style={{ justifyContent: 'center' }}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} enabled={!!user} />
          }
        >
          {token ? (
            <UploadHome
              errors={errors}
              setErrors={setErrors}
              file={file}
              setFile={setFile}
              bottomSheetRef={bottomSheetRef}
            />
          ) : (
            <Button theme="green" onPress={() => router.push('login')}>
              Login
            </Button>
          )}
        </ScrollView>
      </MainContainer>
      <UploadChoicesBottomSheet
        bottomSheetRef={bottomSheetRef}
        setErrors={setErrors}
        setFile={setFile}
      />
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
