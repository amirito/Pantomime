import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GameMode = 'simple' | '3step';

interface GameState {
  mode: GameMode;
  team1: string[];
  team2: string[];
  turnDuration: number; // in seconds
  gameOptions: { [key: string]: number };
}

const initialState: GameState = {
  mode: 'simple',
  team1: [],
  team2: [],
  turnDuration: 60,
  gameOptions: {
    'Easy simple': 0,
    'Hard simple': 0,
    'Easy combination': 0,
    'Hard combination': 0,
    'Poem': 0,
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<GameMode>) {
      state.mode = action.payload;
    },
    setTeam1(state, action: PayloadAction<string[]>) {
      state.team1 = action.payload;
    },
    setTeam2(state, action: PayloadAction<string[]>) {
      state.team2 = action.payload;
    },
    setTurnDuration(state, action: PayloadAction<number>) {
      state.turnDuration = action.payload;
    },
    setGameOptions(state, action: PayloadAction<{ [key: string]: number }>) {
      state.gameOptions = action.payload;
    },
    resetGame(state) {
      state.mode = 'simple';
      state.team1 = [];
      state.team2 = [];
      state.turnDuration = 60;
      state.gameOptions = {
        'Easy simple': 0,
        'Hard simple': 0,
        'Easy combination': 0,
        'Hard combination': 0,
        'Poem': 0,
      };
    },
  },
});

export const { setMode, setTeam1, setTeam2, setTurnDuration, setGameOptions, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
