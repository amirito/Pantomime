import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useI18n } from '../../constants/I18nContext';
import getHomeStyles from '../../styles/home.styles';
import { useThemeMode } from '../../constants/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const { t, language } = useI18n();
  const { themeMode } = useThemeMode();
  const styles = getHomeStyles(themeMode);
  const farsiFont = language === 'fa' ? { fontFamily: 'Samim' } : {};
  const FarsiText = (props: React.ComponentProps<typeof Text>) => <Text {...props} style={[props.style, farsiFont]} />;
  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right", "top"]}>
      <View style={styles.headerContainer}>
        <FarsiText variant="headlineLarge" style={styles.headerText}>{t('home_title')}</FarsiText>
      </View>
      <View style={styles.container}>
        <Button
          mode="contained"
          style={styles.circleButton}
          onPress={() => router.push('/game-props')}
          contentStyle={styles.circleButtonContent}
          labelStyle={farsiFont}
        >
          <FarsiText style={styles.buttonText}>{t('create_new_game')}</FarsiText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
