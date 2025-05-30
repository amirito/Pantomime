import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setTeam2 } from '../redux/gameSlice';
import styles from '../styles/team2.styles';

export default function Team2Screen() {
  const [player, setPlayer] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();

  const addPlayer = () => {
    if (player.trim()) {
      const updated = [...players, player.trim()];
      setPlayers(updated);
      dispatch(setTeam2(updated));
      setPlayer('');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>Team 2 Players</Text>
      <TextInput
        mode="outlined"
        label="Enter player name"
        value={player}
        onChangeText={setPlayer}
        onSubmitEditing={addPlayer}
        style={styles.input}
      />
      <Button mode="contained" onPress={addPlayer} style={styles.addButton}>
        Add Player
      </Button>
      <FlatList
        data={players}
        keyExtractor={(item, idx) => item + idx}
        renderItem={({ item }) => <Text style={styles.player}>{item}</Text>}
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
        disabled={players.length === 0}
        style={styles.nextButton}
      >
        Start Game
      </Button>
    </View>
  );
}
