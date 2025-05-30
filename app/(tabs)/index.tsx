import React from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useI18n } from '../../constants/I18nContext';
import styles from '../../styles/home.styles';

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
