import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import MainContainer from '@/components/layout/MainContainer';
import ReceiptsList from '@/components/organisms/ReceiptsList';

export default function Receipts() {
  const { t } = useTranslation();

  return (
    <>
      <ScrollView>
        <MainContainer style={{ justifyContent: 'center', paddingTop: 20 }}>
          <ReceiptsList />
        </MainContainer>
      </ScrollView>
    </>
  );
}
