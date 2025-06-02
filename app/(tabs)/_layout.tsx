import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Text } from 'react-native-paper';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeMode } from '../../constants/ThemeContext';
import { useI18n } from '../../constants/I18nContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { themeMode } = useThemeMode();
  const { t, language } = useI18n();
  const farsiFont = language === 'fa' ? { fontFamily: 'Samim' } : {};
  const FarsiText = (props: React.ComponentProps<typeof Text>) => <Text {...props} style={[props.style, farsiFont]} />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[themeMode].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarLabel: ({ focused, color }) => null, // We'll use custom label below
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {
            backgroundColor: Colors[themeMode].background,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home_title'),
          tabBarLabel: ({ color }) => <FarsiText style={{ color }}>{t('home_title')}</FarsiText>,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />, 
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('settings'),
          tabBarLabel: ({ color }) => <FarsiText style={{ color }}>{t('settings')}</FarsiText>,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape" color={color} />, 
        }}
      />
    </Tabs>
  );
}
