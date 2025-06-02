import { StyleSheet } from 'react-native';

export const getSettingsStyles = (themeMode: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeMode === 'dark' ? '#171738' : '#DDFFD9',
    },
    title: {
      fontSize: 28,
    //   fontWeight: 'bold',
      marginBottom: 32,
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
    label: {
      fontSize: 20,
      marginBottom: 16,
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
  });

export default getSettingsStyles;
