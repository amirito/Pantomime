import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  circleButton: {
    minWidth: 220,
    minHeight: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  circleButtonContent: {
    minHeight: 80,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 32,
  },
});

export default styles;
