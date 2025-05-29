import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Text, useTheme, ToggleButton, IconButton } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setTurnDuration, setGameOptions } from '../redux/gameSlice';
import { RootState } from '../redux/store';
import { useI18n } from '../constants/I18nContext';
import { translations } from '../constants/i18n';

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
  const theme = useTheme();
  const { t } = useI18n();

  // When localMode changes, update redux
  useEffect(() => {
    if (mode !== localMode) {
      dispatch(setMode(localMode));
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
      <Text variant="titleLarge" style={styles.title}>{t('game_mode')}</Text>
      <ToggleButton.Row
        onValueChange={value => setLocalMode(value as 'simple' | '3step')}
        value={localMode}
        style={styles.toggleRow}
      >
        <ToggleButton icon="numeric-1-box" value="simple" style={styles.toggleButton} />
        <ToggleButton icon="numeric-3-box" value="3step" style={styles.toggleButton} />
      </ToggleButton.Row>
      <View style={styles.toggleLabels}>
        <Text style={styles.label}>{t('simple')}</Text>
        <Text style={styles.label}>{t('three_step')}</Text>
      </View>
      <Text style={styles.durationLabel}>{t('turn_duration')}: {duration} s</Text>
      <Slider
        style={{ width: 220, height: 40 }}
        minimumValue={20}
        maximumValue={180}
        step={5}
        value={duration}
        onValueChange={setDuration}
        onSlidingComplete={(val: number) => dispatch(setTurnDuration(val))}
        minimumTrackTintColor="#4F8EF7"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#4F8EF7"
      />
      <Text style={styles.optionsTitle}>{t('game_options')}</Text>
      {GAME_OPTIONS.map(option => (
        <View key={option} style={styles.optionRow}>
          <Text style={styles.optionLabel}>{t(optionTranslationKeys[option])}</Text>
          <View style={styles.counter}>
            <IconButton icon="minus" size={20} onPress={() => handleCountChange(option, -1)} />
            <Text style={styles.count}>{optionCounts[option]}</Text>
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
        contentStyle={{ paddingVertical: 8 }}
        labelStyle={styles.nextButtonText}
        disabled={Object.values(optionCounts).reduce((a, b) => a + b, 0) < 10}
      >
        {t('next')}
      </Button>
    </View>
  );
}

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
