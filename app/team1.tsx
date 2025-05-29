import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setTeam1 } from '../redux/gameSlice';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 48, // Add padding to keep button above bezel
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    marginBottom: 12,
  },
  addButton: {
    marginBottom: 12,
    width: '100%',
  },
  list: {
    width: '100%',
    marginVertical: 16,
  },
  player: {
    fontSize: 18,
    padding: 4,
  },
  nextButton: {
    marginTop: 32,
    marginBottom: 24, // Add margin to keep button above bezel
    borderRadius: 30,
    backgroundColor: '#4F8EF7',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
});
