import React from 'react';
import { View, Image } from 'react-native';
import { Text, Menu, Button as PaperButton, Switch } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useI18n } from '../../constants/I18nContext';
import { useThemeMode } from '../../constants/ThemeContext';
import getSettingsStyles from '../../styles/settings.styles';

const flagImages: Record<'en' | 'fa' | 'tr', any> = {
  en: require('../../assets/images/usa-flag.png'),
  fa: require('../../assets/images/iran-flag.png'),
  tr: require('../../assets/images/turkey-flag.png'),
};

export default function SettingsScreen() {
  const { language, t, setLanguage } = useI18n();
  const { themeMode, setThemeMode } = useThemeMode();
  const styles = getSettingsStyles(themeMode);
  const farsiFont = language === 'fa' ? { fontFamily: 'Samim' } : {};
  const FarsiText = (props: React.ComponentProps<typeof Text>) => <Text {...props} style={[props.style, farsiFont]} />;
  const [menuVisible, setMenuVisible] = React.useState(false);
  const languageOptions = [
    { key: 'en', label: t('english') },
    { key: 'fa', label: t('farsi') },
    { key: 'tr', label: t('turkish') },
  ];
  // Add translations for theme, light, dark
  const themeLabel = t('theme');
  const lightLabel = t('light');
  const darkLabel = t('dark');
  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right", "top"]}>
      <FarsiText style={styles.title}>{t('settings')}</FarsiText>
      <FarsiText style={styles.label}>{t('language')}</FarsiText>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <PaperButton mode="outlined" onPress={() => setMenuVisible(true)} labelStyle={farsiFont}>
            <FarsiText>{languageOptions.find(opt => opt.key === language)?.label}</FarsiText>
          </PaperButton>
        }
      >
        {languageOptions.map(opt => (
          <Menu.Item
            key={opt.key}
            onPress={() => {
              setLanguage(opt.key as 'en' | 'fa' | 'tr');
              setMenuVisible(false);
            }}
            title={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={flagImages[opt.key as 'en' | 'fa' | 'tr']} style={{ width: 24, height: 16, marginRight: 8, resizeMode: 'contain' }} />
                <FarsiText>{opt.label}</FarsiText>
              </View>
            }
          />
        ))}
      </Menu>
      <FarsiText style={[styles.label, { marginTop: 32 }]}>{themeLabel}</FarsiText>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <FarsiText style={{ marginRight: 12 }}>{lightLabel}</FarsiText>
        <Switch
          value={themeMode === 'dark'}
          onValueChange={v => setThemeMode(v ? 'dark' : 'light')}
        />
        <FarsiText style={{ marginLeft: 12 }}>{darkLabel}</FarsiText>
      </View>
    </SafeAreaView>
  );
}
