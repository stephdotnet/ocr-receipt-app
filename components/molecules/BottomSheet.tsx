import { forwardRef, useCallback, useMemo, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

interface BottomSheetProps extends Omit<React.ComponentProps<typeof BottomSheet>, 'snapPoints'> {
  snapPoints?: string[];
  children: React.ReactNode;
}

export default forwardRef(
  ({ snapPoints, children, ...props }: BottomSheetProps, ref: React.Ref<BottomSheet>) => {
    const [contentSnapPoints, setcontentSnapPoints] = useState<number[] | string[]>(['25%']);

    const onContentLayout = useCallback(
      (event: LayoutChangeEvent) => {
        const contentHeight = event.nativeEvent.layout.height;
        if (contentHeight > 0) {
          setcontentSnapPoints([contentHeight + 50]);
        }
      },
      [setcontentSnapPoints],
    );

    const bottomSheetSnapPoints = useMemo(() => {
      if (!snapPoints) {
        return contentSnapPoints;
      }

      return snapPoints;
    }, [contentSnapPoints, snapPoints]);

    const renderBackdrop = useCallback(
      (props: BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.3} />
      ),
      [],
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={bottomSheetSnapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        {...props}
      >
        <View onLayout={onContentLayout}>{children}</View>
      </BottomSheet>
    );
  },
);
