import { StyleSheet } from 'react-native';

export const getGamePropsStyles = (themeMode: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeMode === 'dark' ? '#171738' : '#DDFFD9',
      paddingHorizontal: 15,
    },
    title: {
      fontSize: 28,
    //   fontWeight: 'bold',
      marginBottom: 32,
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
    toggleRow: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    toggleButton: {
      width: 100,
      borderRadius: 20,
    },
    toggleButtonActive: {
      backgroundColor: themeMode === 'dark' ? '#DDFFD9' : '#171738',
      color: themeMode === 'dark' ? '#171738' : '#DDFFD9',
    },
    toggleLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 180,
      marginBottom: 32,
    },
    label: {
      fontSize: 18,
      marginHorizontal: 12,
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
    durationLabel: {
      fontSize: 18,
      marginBottom: 8,
      marginTop: 16,
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
    optionsTitle: {
      fontSize: 22,
    //   fontWeight: 'bold',
      marginTop: 32,
      marginBottom: 12,
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      width: 260,
      justifyContent: 'space-between',
    },
    optionLabel: {
      fontSize: 16,
      flex: 1,
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
    counter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    count: {
      fontSize: 18,
      marginHorizontal: 8,
      minWidth: 24,
      textAlign: 'center',
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
    nextButton: {
      backgroundColor: themeMode === 'dark' ? '#DDFFD9' : '#171738',
      borderRadius: 30,
      width: '100%',
      marginTop: 24,
      height: 40,
    },
    nextButtonDisabled: {
      backgroundColor: '#b0b0b0',
    },
    nextButtonText: {
      color: themeMode === 'dark' ? '#171738' : '#DDFFD9',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

export default getGamePropsStyles;
