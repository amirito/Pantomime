import { StyleSheet } from 'react-native';

export const getGameStyles = (themeMode: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeMode === 'dark' ? '#171738' : '#fff',
      paddingHorizontal: 15,
    },
    roundLabel: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeMode === 'dark' ? '#DDFFD9' : '#b71c1c',
      marginBottom: 4,
      marginTop: 8,
    },
    currentPlayer: {
      fontSize: 22,
      fontWeight: 'bold',
      color: themeMode === 'dark' ? '#DDFFD9' : '#4F8EF7',
      marginBottom: 8,
      marginTop: 8,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
    timer: {
      fontSize: 40,
      fontWeight: 'bold',
      marginVertical: 24,
      color: themeMode === 'dark' ? '#DDFFD9' : '#4F8EF7',
    },
    wordContainer: {
      marginVertical: 32,
      padding: 32,
      borderRadius: 24,
      backgroundColor: themeMode === 'dark' ? '#23233a' : '#e0f7e9',
      minWidth: 220,
      minHeight: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    word: {
      fontSize: 32,
    //   fontWeight: 'bold',
      color: themeMode === 'dark' ? '#DDFFD9' : '#1b5e20',
      textAlign: 'center',
    },
    passButton: {
      backgroundColor: themeMode === 'dark' ? '#4CAF50' : '#4CAF50',
      borderRadius: 100,
      width: 120,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 32,
    },
    passButtonLabel: {
      color: themeMode === 'dark' ? '#171738' : '#fff',
      fontSize: 28,
      fontWeight: 'bold',
    },
    passButtonContent: {
      height: 120,
    },
    nextButton: {
      marginTop: 32,
      borderRadius: 30,
      backgroundColor: themeMode === 'dark' ? '#DDFFD9' : '#171738',
      paddingHorizontal: 32,
      paddingVertical: 5,
    },
    passedList: {
      marginTop: 32,
      alignItems: 'center',
    },
    passedTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
      marginBottom: 8,
    },
    passedWord: {
      fontSize: 18,
      color: themeMode === 'dark' ? '#DDFFD9' : '#333',
      marginBottom: 4,
    },
    points: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
      marginBottom: 8,
    },
  });

export default getGameStyles;
