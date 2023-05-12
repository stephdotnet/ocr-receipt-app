import React, { useEffect, useRef, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import MainContainer from '@/components/layout/MainContainer';
import { UploadChoicesBottomSheet } from '@/components/molecules/UploadChoicesBottomSheet';
import UploadHome from '@/components/organisms/UploadHome';
import { useGetReceipts } from '@/hooks/api/useGetReceipts';
import { useStore } from '@/hooks/store';
import BottomSheetType from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useRouter } from 'expo-router';

export default function Home() {
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const bottomSheetRef = useRef<BottomSheetType>(null);

  const { user } = useStore();
  const router = useRouter();
  const { isFetching, refetch } = useGetReceipts(!! user);

  return (
    <>
      <MainContainer style={{ justifyContent: 'center' }}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} enabled={!! user}/>}
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
            <Button mode="contained" onPress={() => router.push('login')}>Login</Button>
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
