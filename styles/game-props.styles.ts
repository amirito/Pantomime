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
  toggleRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  toggleButton: {
    flex: 1,
    marginHorizontal: 8,
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
  },
  durationLabel: {
    fontSize: 18,
    marginBottom: 8,
    marginTop: 16,
  },
  optionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 12,
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
  },
  nextButton: {
    backgroundColor: '#4F8EF7',
    borderRadius: 30,
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
