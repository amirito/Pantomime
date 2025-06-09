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
    customWordsButton: {
      marginTop: 16,
      marginBottom: 8,
      borderColor: themeMode === 'dark' ? '#DDFFD9' : '#171738',
      borderWidth: 1,
      borderRadius: 20,
      alignSelf: 'center',
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end', // open from bottom
      alignItems: 'center',
      zIndex: 100,
    },
    modalContent: {
      backgroundColor: themeMode === 'dark' ? '#222' : '#fff',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      padding: 28,
      paddingBottom: 100,
      width: '100%',
      maxHeight: '100%',
      alignItems: 'center',
      minHeight: 350,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 18,
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      width: '100%',
      justifyContent: 'space-between',
    },
    inputLabel: {
      fontSize: 16,
      marginRight: 8,
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginRight: 8,
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
      backgroundColor: themeMode === 'dark' ? '#333' : '#f9f9f9',
      minWidth: 0,
      height: 30
    },
    addWordButton: {
      minWidth: 90,
      alignSelf: 'flex-end',
      backgroundColor: themeMode === 'dark' ? '#468C98' : '#468C98',
    },
    addWordButtonText: {
      color: themeMode === 'dark' ? '#FFFFFF' : '#FFFFFF',
    },
    wordsList: {
      width: '100%',
      marginBottom: 12,
      maxHeight: 180,
    },
    wordRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 4,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    wordText: {
      fontSize: 16,
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
    closeModalButton: {
      marginTop: 8,
      alignSelf: 'center',
    },
  });

export default getGamePropsStyles;
