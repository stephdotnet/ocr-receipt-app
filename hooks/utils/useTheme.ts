import { useStore } from '@/hooks/store';
import { useTheme } from '@tamagui/core';
import { ThemeName } from '@tamagui/web/src/types';

const useThemeExtended = (themeName?: ThemeName) => {
  const { theme: storeTheme } = useStore();

  // @ts-ignore
  return useTheme(themeName ?? storeTheme);
};

export default useThemeExtended;
