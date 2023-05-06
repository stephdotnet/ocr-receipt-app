import React from 'react';
import { ScrollView } from 'react-native';
import MainContainer from '@/components/layout/MainContainer';
import ReceiptsList from '@/components/organisms/ReceiptsList';

export default function Receipts() {
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
