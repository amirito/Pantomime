import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  label: {
    fontSize: 18,
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#b0b0b0',
    marginRight: 8,
    paddingVertical: 4,
  },
  addButton: {
    backgroundColor: '#4F8EF7',
    borderRadius: 20,
    marginLeft: 8,
  },
  playerList: {
    width: 220,
    marginTop: 16,
    marginBottom: 32,
  },
  player: {
    fontSize: 18,
    marginVertical: 4,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#4F8EF7',
    borderRadius: 30,
    marginTop: 24,
  },
  nextButtonDisabled: {
    backgroundColor: '#b0b0b0',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;
