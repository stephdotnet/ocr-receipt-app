import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import MainContainer from '@/components/layout/MainContainer';
import ReceiptsList from '@/components/organisms/ReceiptsList';

export default function Receipts() {
  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <MainContainer style={{ paddingTop: 20 }}>
          <ReceiptsList />
        </MainContainer>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
