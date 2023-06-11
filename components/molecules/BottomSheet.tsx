import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Dimensions, LayoutChangeEvent, View } from 'react-native';
import { Sheet } from 'tamagui';

export interface forwardRefProps {
  open: () => void;
  close: () => void;
}

const BottomSheet: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<{
    readonly children?: any;
  }> &
    React.RefAttributes<unknown>
> = forwardRef(({ children }, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const [contentSnapPoints, setcontentSnapPoints] = useState<number[]>([33]);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  const onContentLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const contentHeight = event.nativeEvent.layout.height + 100;
      // Get height of screen
      const screenHeight = Dimensions.get('window').height;

      if (contentHeight > 0) {
        const viewPercentHeight = Math.floor((contentHeight / screenHeight) * 100);
        setcontentSnapPoints([viewPercentHeight]);
      }
    },
    [setcontentSnapPoints],
  );

  return (
    <Sheet
      open={open}
      onOpenChange={(open: boolean) => {
        setOpen(open);
      }}
      snapPoints={contentSnapPoints}
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame flex={1} padding="$4" justifyContent="center" alignItems="center" space="$5">
        <View onLayout={onContentLayout}>{children}</View>
      </Sheet.Frame>
    </Sheet>
  );
});

export default BottomSheet;
