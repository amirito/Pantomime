import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  roundLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b71c1c',
    marginBottom: 4,
    marginTop: 8,
  },
  currentPlayer: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4F8EF7',
    marginBottom: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 24,
    color: '#4F8EF7',
  },
  wordContainer: {
    marginVertical: 32,
    padding: 32,
    borderRadius: 24,
    backgroundColor: '#e0f7e9',
    minWidth: 220,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1b5e20',
    textAlign: 'center',
  },
  passButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 100,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  passButtonLabel: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  passButtonContent: {
    height: 120,
  },
  nextButton: {
    marginTop: 32,
    borderRadius: 30,
    backgroundColor: '#4F8EF7',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  passedList: {
    marginTop: 32,
    alignItems: 'center',
  },
  passedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  passedWord: {
    fontSize: 18,
    color: '#b71c1c',
    marginVertical: 2,
  },
  points: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
});

export default styles;
