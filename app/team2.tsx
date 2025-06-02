import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setTeam2 } from '../redux/gameSlice';
import getTeam2Styles from '../styles/team2.styles';
import { useThemeMode } from '../constants/ThemeContext';
import { useI18n } from '../constants/I18nContext';

export default function Team2Screen() {
  const [player, setPlayer] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const router = useRouter();
  const { t, language } = useI18n();
  const { themeMode } = useThemeMode();
  const styles = getTeam2Styles(themeMode);
  const dispatch = useDispatch();

  const farsiFont = language === 'fa' ? { fontFamily: 'Samim' } : {};
  const FarsiText = (props: React.ComponentProps<typeof Text>) => <Text {...props} style={[props.style, farsiFont]} />;

  const addPlayer = () => {
    if (player.trim()) {
      const updated = [...players, player.trim()];
      setPlayers(updated);
      dispatch(setTeam2(updated));
      setPlayer('');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right", "top"]}>
      <FarsiText variant="titleLarge" style={styles.title}>{t('team2_players')}</FarsiText>
      <TextInput
        mode="outlined"
        label={t('add_player')}
        value={player}
        onChangeText={setPlayer}
        onSubmitEditing={addPlayer}
        style={styles.input}
        contentStyle={styles.inputContent}
        dense
      />
      <Button mode="contained" onPress={addPlayer} style={styles.addButton} labelStyle={farsiFont}>
        <FarsiText>{t('add_player')}</FarsiText>
      </Button>
      <FlatList
        data={players}
        keyExtractor={(item, idx) => item + idx}
        renderItem={({ item }) => <FarsiText style={styles.player}>{item}</FarsiText>}
        style={styles.list}
      />
      <Button
        mode="contained"
        onPress={() => {
          try {
            dispatch(setTeam2(players));
            router.push('/game');
          } catch (e) {
            console.error('Navigation or dispatch error in Team2Screen:', e);
          }
        }}
        labelStyle={styles.nextButtonText}
        disabled={players.length === 0}
        style={[styles.nextButton, players.length < 2 ? styles.nextButtonDisabled : {}]}
      >
        <FarsiText>{t('start_game')}</FarsiText>
      </Button>
    </SafeAreaView>
  );
}
