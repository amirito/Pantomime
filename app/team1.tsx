import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setTeam1 } from '../redux/gameSlice';
import styles from '../styles/team1.styles';

export default function Team1Screen() {
  const [player, setPlayer] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();

  const addPlayer = () => {
    if (player.trim()) {
      const updated = [...players, player.trim()];
      setPlayers(updated);
      dispatch(setTeam1(updated));
      setPlayer('');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>Team 1 Players</Text>
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
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => <Text style={styles.player}>{item}</Text>}
        style={styles.list}
      />
      <Button
        mode="contained"
        onPress={() => {
          dispatch(setTeam1(players));
          router.push('/team2');
        }}
        disabled={players.length === 0}
        style={styles.nextButton}
      >
        Next
      </Button>
    </View>
  );
}
