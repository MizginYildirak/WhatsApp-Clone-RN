import { useTheme } from "../store/theme-context.tsx";
import { lightColors, darkColors } from "../constants/colors";

export const useThemeColors = () => {
  const { isDarkMode } = useTheme();
  return isDarkMode ? darkColors : lightColors;
};
