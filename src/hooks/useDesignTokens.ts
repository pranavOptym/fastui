import { useTheme } from '@mui/material/styles';

export const useDesignTokens = () => {
  const theme = useTheme();
  return theme.custom;
};

export default useDesignTokens; 