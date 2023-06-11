import { useStore } from '@/hooks/store';
import { ThemeName } from '@tamagui/web/src/types';
import { useTheme as useThemeBase } from 'tamagui';

const useTheme = (themeName?: ThemeName) => {
  const { theme: storeTheme } = useStore();

  return useThemeBase(themeName ?? (storeTheme as ThemeName));
};

export default useTheme;
