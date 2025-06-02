import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setTeam1 } from '../redux/gameSlice';
import getTeam1Styles from '../styles/team1.styles';
import { useThemeMode } from '../constants/ThemeContext';
import { useI18n } from '../constants/I18nContext';

export default function Team1Screen() {
  const [player, setPlayer] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const router = useRouter();
  const { t, language } = useI18n();
  const { themeMode } = useThemeMode();
  const styles = getTeam1Styles(themeMode);
  const dispatch = useDispatch();

  const farsiFont = language === 'fa' ? { fontFamily: 'Samim' } : {};
  const FarsiText = (props: React.ComponentProps<typeof Text>) => <Text {...props} style={[props.style, farsiFont]} />;

  const addPlayer = () => {
    if (player.trim()) {
      const updated = [...players, player.trim()];
      setPlayers(updated);
      dispatch(setTeam1(updated));
      setPlayer('');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right", "top"]}>
      <FarsiText variant="titleLarge" style={styles.title}>{t('team1_players')}</FarsiText>
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
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => <FarsiText style={styles.player}>{item}</FarsiText>}
        style={styles.list}
      />
      <Button
        mode="contained"
        onPress={() => {
          dispatch(setTeam1(players));
          router.push('/team2');
        }}
        labelStyle={styles.nextButtonText}
        disabled={players.length === 0}
        style={[styles.nextButton, players.length < 2 ? styles.nextButtonDisabled : {}]}
      >
        <FarsiText>{t('next')}</FarsiText>
      </Button>
    </SafeAreaView>
  );
}
