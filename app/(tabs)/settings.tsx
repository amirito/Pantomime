import React from 'react';
import { View, Image } from 'react-native';
import { Text, Menu, Button as PaperButton } from 'react-native-paper';
import { useI18n } from '../../constants/I18nContext';
import styles from '../../styles/settings.styles';

const flagImages: Record<'en' | 'fa' | 'tr', any> = {
  en: require('../../assets/images/usa-flag.png'),
  fa: require('../../assets/images/iran-flag.png'),
  tr: require('../../assets/images/turkey-flag.png'),
};

export default function SettingsScreen() {
  const { language, setLanguage, t } = useI18n();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const languageOptions = [
    { key: 'en', label: t('english') },
    { key: 'fa', label: t('farsi') },
    { key: 'tr', label: t('turkish') },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings')}</Text>
      <Text style={styles.label}>{t('language')}</Text>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <PaperButton mode="outlined" onPress={() => setMenuVisible(true)}>
            {languageOptions.find(opt => opt.key === language)?.label}
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
                <Text>{opt.label}</Text>
              </View>
            }
          />
        ))}
      </Menu>
    </View>
  );
}
