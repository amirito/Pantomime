import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useI18n } from '../../constants/I18nContext';

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useI18n();
  return (
    <>
      <View style={styles.headerContainer}>
        <Text variant="headlineLarge" style={[styles.headerText, { color: theme.colors.primary }]}>{t('home_title')}</Text>
      </View>
      <View style={styles.container}>
        <Button
          mode="contained"
          style={styles.circleButton}
          onPress={() => router.push('/game-props')}
          contentStyle={styles.circleButtonContent}
          labelStyle={styles.buttonText}
        >
          {t('create_new_game')}
        </Button>
      </View>
    </>
  );
}

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
  // Add styles for the header
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
