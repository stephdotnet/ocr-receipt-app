import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { forwardRef, useCallback } from 'react';

interface BottomSheetProps extends React.ComponentProps<typeof BottomSheet> {
  snapPoints: string[];
  children: React.ReactNode;
}

export default forwardRef(
  ({ snapPoints, children, ...props }: BottomSheetProps, ref: React.Ref<BottomSheet>) => {
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
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        {...props}
      >
        {children}
      </BottomSheet>
    );
  },
);
