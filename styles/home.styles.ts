import { StyleSheet } from 'react-native';

export const getHomeStyles = (themeMode: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeMode === 'dark' ? '#171738' : '#DDFFD9',
    },
    circleButton: {
      minWidth: 220,
      height: 60,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
    //   elevation: 5,
    //   shadowColor: '#000',
    //   shadowOffset: { width: 0, height: 2 },
    //   shadowOpacity: 0.3,
    //   shadowRadius: 4,
    //   overflow: 'hidden',
      backgroundColor: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
    circleButtonContent: {
      minHeight: 80,
      paddingHorizontal: 24,
      
    },
    buttonText: {
      color: themeMode === 'dark' ? '#171738' : '#DDFFD9',
      fontSize: 20,
    //   fontWeight: 'bold',
      textAlign: 'center',
      
    },
    headerContainer: {
      width: '100%',
      alignItems: 'center',
      paddingTop: 60,
      paddingBottom: 20,
      backgroundColor: themeMode === 'dark' ? '#171738' : '#DDFFD9',
    },
    headerText: {
    //   fontWeight: 'bold',
      fontSize: 32,
      color: themeMode === 'dark' ? '#DDFFD9' : '#171738',
    },
  });

export default getHomeStyles;
