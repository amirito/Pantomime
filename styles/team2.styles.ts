import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingBottom: 24,
    padding: 15,
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
    width: '100%',
    paddingHorizontal: 16,
    height: 48, // Set row height to 48px
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#b0b0b0',
    height: 48, // Set input height to 48px
    paddingVertical: 0, // Remove extra vertical padding
  },
  addButton: {
   backgroundColor: '#4F8EF7',
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
