import { StyleSheet } from 'react-native';

export const getTeam2Styles = (themeMode: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: themeMode === 'dark' ? '#171738' : '#DDFFD9',
      paddingBottom: 24,
      padding: 15,
    },
    title: {
      fontSize: 28,
    //   fontWeight: 'bold',
      marginBottom: 32,
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
    label: {
      fontSize: 18,
      marginBottom: 16,
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      width: '100%',
      paddingHorizontal: 16,
      height: 48,
    },
    input: {
      fontSize: 16,
      height: 48,
      paddingVertical: 0,
      color: themeMode === 'dark' ? '#171738' : '#DDFFD9',
      backgroundColor: themeMode === 'dark' ? '#171738' : '#DDFFD9',
    },
    inputContent: {
        color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
    addButton: {
      backgroundColor: themeMode === 'dark' ? '#468C98' : '#468C98',
      borderRadius: 20,
      marginLeft: 0,
      width: '100%',
      marginTop: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    playerList: {
      width: '100%',
      marginTop: 16,
      marginBottom: 32,
    },
    list: {
      width: '100%',
      marginTop: 16,
      marginBottom: 32,
      alignSelf: 'stretch',
    },
    player: {
      fontSize: 18,
      marginVertical: 4,
      color: themeMode === 'dark' ? '#DDFFD9' : '#333',
    },
    nextButton: {
      backgroundColor: themeMode === 'dark' ? '#DDFFD9' : '#171738',
      borderRadius: 30,
      marginTop: 24,
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

export default getTeam2Styles;
