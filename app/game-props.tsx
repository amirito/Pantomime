import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Text, ToggleButton, IconButton } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setTurnDuration, setGameOptions } from '../redux/gameSlice';
import { RootState } from '../redux/store';
import { useI18n } from '../constants/I18nContext';
import { translations } from '../constants/i18n';
import getGamePropsStyles from '../styles/game-props.styles';
import { useThemeMode } from '../constants/ThemeContext';

const GAME_OPTIONS = [
  'Easy simple',
  'Hard simple',
  'Easy combination',
  'Hard combination',
  'Poem',
];

export default function GamePropsScreen() {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.game.mode);
  const turnDuration = useSelector((state: RootState) => state.game.turnDuration);
  const [duration, setDuration] = useState(turnDuration);
  const [optionCounts, setOptionCounts] = useState<{ [key: string]: number }>({
    'Easy simple': 0,
    'Hard simple': 0,
    'Easy combination': 0,
    'Hard combination': 0,
    'Poem': 0,
  });
  const [localMode, setLocalMode] = useState<'simple' | '3step'>(mode || '3step');
  const router = useRouter();
  const { t, language } = useI18n();
  const { themeMode } = useThemeMode();
  const styles = getGamePropsStyles(themeMode);
  const farsiFont = language === 'fa' ? { fontFamily: 'Samim' } : {};
  const FarsiText = (props: React.ComponentProps<typeof Text>) => <Text {...props} style={[props.style, farsiFont]} />;

  // When localMode changes, update redux
  useEffect(() => {
    if (mode !== localMode) {
      dispatch(setMode(localMode));
    }
    if (!localMode) {
      setLocalMode('3step');
    }
  }, [localMode]);

  // Set default mode to '3step' if not set
  useEffect(() => {
    if (!mode) {
      setLocalMode('3step');
      dispatch(setMode('3step'));
    }
  }, []);

  const handleCountChange = (option: string, delta: number) => {
    setOptionCounts((prev) => ({
      ...prev,
      [option]: Math.max(0, prev[option] + delta),
    }));
  };

  // Map for option translation keys
  const optionTranslationKeys: { [key: string]: keyof typeof translations['en'] } = {
    'Easy simple': 'easy_simple',
    'Hard simple': 'hard_simple',
    'Easy combination': 'easy_combination',
    'Hard combination': 'hard_combination',
    'Poem': 'poem',
  };

  return (
    <View style={styles.container}>
      <FarsiText style={styles.title}>{t('game_mode')}</FarsiText>
      
      <ToggleButton.Row
        onValueChange={value => setLocalMode(value as 'simple' | '3step')}
        value={localMode}
        style={styles.toggleRow}
      >
        <ToggleButton icon="numeric-1-box" iconColor={localMode === 'simple' ? styles.toggleButtonActive.color : undefined} value="simple" style={[styles.toggleButton, localMode === 'simple' && styles.toggleButtonActive]} />
        <ToggleButton icon="numeric-3-box" iconColor={localMode === '3step' ? styles.toggleButtonActive.color : undefined} value="3step" style={[styles.toggleButton, localMode === '3step' && styles.toggleButtonActive]} />
      </ToggleButton.Row>
      <View style={styles.toggleLabels}>
        <FarsiText style={styles.label}>{t('simple')}</FarsiText>
        <FarsiText style={styles.label}>{t('three_step')}</FarsiText>
      </View>
      <FarsiText style={styles.durationLabel}>{t('turn_duration')}: {duration} {t('seconds_short')}</FarsiText>
      <Slider
        style={{ width: 220, height: 40 }}
        minimumValue={30}
        maximumValue={5*60}
        step={5}
        value={duration}
        onValueChange={setDuration}
        onSlidingComplete={(val: number) => dispatch(setTurnDuration(val))}
        minimumTrackTintColor={themeMode === 'dark' ? '#DDFFD9' : '#171738'}
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor={themeMode === 'dark' ? '#DDFFD9' : '#171738'}
      />
      <FarsiText style={styles.optionsTitle}>{t('game_options')}</FarsiText>
      {GAME_OPTIONS.map(option => (
        <View key={option} style={styles.optionRow}>
          <FarsiText style={styles.optionLabel}>{t(optionTranslationKeys[option])}</FarsiText>
          <View style={styles.counter}>
            <IconButton icon="minus" size={20} onPress={() => handleCountChange(option, -1)} />
            <FarsiText style={styles.count}>{optionCounts[option]}</FarsiText>
            <IconButton icon="plus" size={20} onPress={() => handleCountChange(option, 1)} />
          </View>
        </View>
      ))}
      <Button
        mode="contained"
        style={[styles.nextButton, Object.values(optionCounts).reduce((a, b) => a + b, 0) < 10 && styles.nextButtonDisabled]}
        onPress={() => {
          dispatch(setTurnDuration(duration));
          dispatch(setGameOptions(optionCounts));
          router.push('/team1');
        }}
        
        labelStyle={styles.nextButtonText}
        disabled={Object.values(optionCounts).reduce((a, b) => a + b, 0) < 10}
      >
        <FarsiText>{t('next')}</FarsiText>
      </Button>
    </View>
  );
}
