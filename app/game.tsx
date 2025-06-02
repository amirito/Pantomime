import React, { useEffect, useRef, useState } from 'react';
import { View, BackHandler } from 'react-native';
import { Text, Button, Dialog, Portal } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import wordsDatabase from '../assets/pantomime_words_database.json';
import { useRouter } from 'expo-router';
import { useI18n } from '../constants/I18nContext';
import getGameStyles from '../styles/game.styles';
import { useThemeMode } from '../constants/ThemeContext';

// Mapping from gameOptions keys to word database categories
const CATEGORY_MAP: Record<string, string> = {
  'Easy simple': 'simple_single',
  'Hard simple': 'hard_single',
  'Easy combination': 'simple_compound',
  'Hard combination': 'hard_compound',
  'Poem': 'poem_or_proverb',
};

function getRandomWordsByCategory(
  db: { word: string; category: string }[],
  options: { [key: string]: number }
) {
  const selected: string[] = [];
  const used = new Set();
  Object.entries(options).forEach(([option, count]) => {
    const category = CATEGORY_MAP[option];
    if (!category || count <= 0) return;
    const pool = db.filter((w) => w.category === category && !used.has(w.word));
    // Shuffle pool
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    for (let i = 0; i < Math.min(count, pool.length); i++) {
      selected.push(pool[i].word);
      used.add(pool[i].word);
    }
  });
  return selected;
}

export default function GameScreen() {
  const router = useRouter();
  const { team1, team2, turnDuration, gameOptions, mode } = useSelector((state: RootState) => state.game);
  const [currentTeam, setCurrentTeam] = useState<'team1' | 'team2'>('team1');
  const [timer, setTimer] = useState(turnDuration);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [team1Played, setTeam1Played] = useState<number[]>([]);
  const [team2Played, setTeam2Played] = useState<number[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [remainingWords, setRemainingWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string | null>(null);
  const [passedWords, setPassedWords] = useState<string[]>([]);
  const [turnPassedWords, setTurnPassedWords] = useState<string[]>([]);
  const [round, setRound] = useState(1); // 3-step mode: track round
  const [showResults, setShowResults] = useState(false); // for 3-step mode
  // Track points for each round in 3step mode
  const [roundPoints, setRoundPoints] = useState<{ team1: number[]; team2: number[] }>({ team1: [], team2: [] });
  const [exitDialogVisible, setExitDialogVisible] = useState(false);
  const { t, language } = useI18n();
  const { themeMode } = useThemeMode();
  const styles = getGameStyles(themeMode);
  // Helper for Farsi font
  const farsiFont = language === 'fa' ? { fontFamily: 'Samim' } : {};
  // Helper to apply Farsi font to all Text
  const FarsiText = (props: React.ComponentProps<typeof Text>) => <Text {...props} style={[props.style, farsiFont]} />;

  // Select words on mount (only for round 1 or if mode is not 3step)
  useEffect(() => {
    if (mode === '3step') {
      if (round === 1) {
        const words = getRandomWordsByCategory(wordsDatabase as any, gameOptions);
        setSelectedWords(words);
        setRemainingWords(words);
      } else {
        setRemainingWords(selectedWords);
      }
    } else {
      // simple mode: always select new words
      const words = getRandomWordsByCategory(wordsDatabase as any, gameOptions);
      setSelectedWords(words);
      setRemainingWords(words);
    }
    setPassedWords([]);
    setTurnPassedWords([]);
    setIsRunning(true);
    setTimer(turnDuration);
    setCurrentWord(null);
    setTeam1Played([]);
    setTeam2Played([]);
    setCurrentTeam('team1');
    setShowResults(false);
  }, [gameOptions, round, mode]);

  // Handle Android back button
  useEffect(() => {
    const onBackPress = () => {
      setExitDialogVisible(true);
      return true;
    };
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      subscription.remove();
    };
  }, []);

  // On each turn, pick a random word from remainingWords
  useEffect(() => {
    if (isRunning && remainingWords.length > 0) {
      const idx = Math.floor(Math.random() * remainingWords.length);
      setCurrentWord(remainingWords[idx]);
      // Only clear turnPassedWords when a new turn actually starts
      // So, clear it when timer is reset (i.e., isRunning just became true)
    }
    // ...existing code...
  }, [isRunning, remainingWords]);

  // Clear turnPassedWords only when a new turn starts (timer reset)
  useEffect(() => {
    if (isRunning && timer === turnDuration) {
      setTurnPassedWords([]);
    }
  }, [isRunning, timer, turnDuration]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000) as unknown as NodeJS.Timeout;
    } else if (timer === 0) {
      setIsRunning(false);
    }
    // End game immediately if no words left
    if (isRunning && remainingWords.length === 0) {
      setIsRunning(false);
      setTimer(0);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timer, remainingWords]);

  // Helper to get next non-repeating player index
  const getNextPlayerIndex = (played: number[], teamArr: string[]) => {
    if (played.length >= teamArr.length) return 0;
    for (let i = 0; i < teamArr.length; i++) {
      if (!played.includes(i)) return i;
    }
    return 0;
  };

  // On mount, start with first player of team1
  useEffect(() => {
    if (team1Played.length === 0 && team1.length > 0) {
      setTeam1Played([0]);
    }
  }, [team1, team1Played.length]);

  // Calculate team points
  // We need to know which team passed each word, not just alternate by index
  // We'll track which team was active when each word was passed
  const [passedTeams, setPassedTeams] = useState<string[]>([]);

  // Update passedTeams in handlePass
  const handlePass = () => {
    if (!currentWord) return;
    setTurnPassedWords((prev) => [...prev, currentWord]);
    setPassedWords((prev) => [...prev, currentWord]);
    setPassedTeams((prev) => [...prev, currentTeam]);
    setRemainingWords((prev) => prev.filter((w) => w !== currentWord));
    if (remainingWords.length > 1) {
      const nextWords = remainingWords.filter((w) => w !== currentWord);
      const idx = Math.floor(Math.random() * nextWords.length);
      setCurrentWord(nextWords[idx]);
    } else {
      setCurrentWord(null);
    }
  };

  // Reset passedTeams on new round/game
  useEffect(() => {
    setPassedTeams([]);
  }, [round, mode, gameOptions]);

  // Calculate team points based on passedTeams
  const team1Points = passedTeams.filter(t => t === 'team1').length;
  const team2Points = passedTeams.filter(t => t === 'team2').length;

  // At the end of each round, store the round's points (for 3step mode)
  useEffect(() => {
    if (
      mode === '3step' &&
      remainingWords.length === 0 &&
      !isRunning &&
      turnPassedWords.length === 0 &&
      !showResults
    ) {
      setRoundPoints(prev => {
        // Only update if the value is different to avoid unnecessary rerenders
        const newTeam1 = [...prev.team1];
        const newTeam2 = [...prev.team2];
        if (newTeam1[round - 1] !== team1Points || newTeam2[round - 1] !== team2Points) {
          newTeam1[round - 1] = team1Points;
          newTeam2[round - 1] = team2Points;
          return { team1: newTeam1, team2: newTeam2 };
        }
        return prev;
      });
    }
  }, [remainingWords.length, isRunning, turnPassedWords.length, mode, round, team1Points, team2Points, showResults]);

  // Current player logic
  const currentPlayersArr = currentTeam === 'team1' ? team1 : team2;
  const playedArr = currentTeam === 'team1' ? team1Played : team2Played;
  let currentPlayer = '';
  if (currentPlayersArr && currentPlayersArr.length > 0) {
    const currentPlayerIndex = playedArr.length > 0 ? playedArr[playedArr.length - 1] : 0;
    currentPlayer = currentPlayersArr[currentPlayerIndex] || '';
  }

  // Always use roundPoints for display in 3step mode
  if (remainingWords.length === 0 && !isRunning && turnPassedWords.length === 0) {
    if (mode === '3step' && round < 3 && !showResults) {
      const thisRoundTeam1 = roundPoints.team1[round - 1] !== undefined ? roundPoints.team1[round - 1] : team1Points;
      const thisRoundTeam2 = roundPoints.team2[round - 1] !== undefined ? roundPoints.team2[round - 1] : team2Points;
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Round {round} Over!</Text>
          <Text style={styles.points}>Team 1 Points: {thisRoundTeam1}</Text>
          <Text style={styles.points}>Team 2 Points: {thisRoundTeam2}</Text>
          <Button mode="contained" style={styles.nextButton} onPress={() => {
            setRound(r => r + 1);
            setShowResults(true);
          }}>
            Next Round
          </Button>
        </View>
      );
    }
    if (mode === '3step' && round === 3 && !showResults) {
      const thisRoundTeam1 = roundPoints.team1[2] !== undefined ? roundPoints.team1[2] : team1Points;
      const thisRoundTeam2 = roundPoints.team2[2] !== undefined ? roundPoints.team2[2] : team2Points;
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Round 3 Over!</Text>
          <Text style={styles.points}>Team 1 Points: {thisRoundTeam1}</Text>
          <Text style={styles.points}>Team 2 Points: {thisRoundTeam2}</Text>
          <Button mode="contained" style={styles.nextButton} onPress={() => setShowResults(true)}>
            Show Final Results
          </Button>
        </View>
      );
    }
    if (mode === '3step' && round === 3 && showResults) {
      const totalTeam1 = (roundPoints.team1[0] || 0) + (roundPoints.team1[1] || 0) + (roundPoints.team1[2] || 0);
      const totalTeam2 = (roundPoints.team2[0] || 0) + (roundPoints.team2[1] || 0) + (roundPoints.team2[2] || 0);
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Final Results!</Text>
          <Text style={styles.points}>Team 1 Total: {totalTeam1}</Text>
          <Text style={styles.points}>Team 2 Total: {totalTeam2}</Text>
          <Text style={styles.points}>Round 1: {roundPoints.team1[0] || 0} - {roundPoints.team2[0] || 0}</Text>
          <Text style={styles.points}>Round 2: {roundPoints.team1[1] || 0} - {roundPoints.team2[1] || 0}</Text>
          <Text style={styles.points}>Round 3: {roundPoints.team1[2] || 0} - {roundPoints.team2[2] || 0}</Text>
          <Button mode="contained" style={styles.nextButton} onPress={() => router.replace('/')}>Go to Home</Button>
        </View>
      );
    }
    // Simple mode or after pressing Next Round in 3-step mode
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Game Over!</Text>
        <Text style={styles.points}>Team 1 Points: {team1Points}</Text>
        <Text style={styles.points}>Team 2 Points: {team2Points}</Text>
        <Button mode="contained" style={styles.nextButton} onPress={() => router.replace('/')}>Go to Home</Button>
      </View>
    );
  }

  // Calculate next player name for the button
  let nextPlayerName = '';
  const nextTurn = () => {
    setTimer(turnDuration);
    setIsRunning(true);
    setTurnPassedWords([]);
    if (currentTeam === 'team1') {
      const nextIdx = getNextPlayerIndex(team2Played, team2);
      setTeam2Played((prev) => [...prev, nextIdx]);
      setCurrentTeam('team2');
    } else {
      const nextIdx = getNextPlayerIndex(team1Played, team1);
      setTeam1Played((prev) => [...prev, nextIdx]);
      setCurrentTeam('team1');
    }
  };
  if (!isRunning) {
    if (currentTeam === 'team1') {
      const nextIdx = getNextPlayerIndex(team2Played, team2);
      nextPlayerName = team2[nextIdx] || '';
    } else {
      const nextIdx = getNextPlayerIndex(team1Played, team1);
      nextPlayerName = team1[nextIdx] || '';
    }
  }

  // UI
  return (
    <View style={styles.container}>
      {isRunning ? (
        <>
          {mode === '3step' && (
            <FarsiText style={styles.roundLabel}>Round {round}</FarsiText>
          )}
          <FarsiText style={styles.currentPlayer}>{currentPlayer}'s Turn</FarsiText>
          <FarsiText style={styles.timer}>{timer}s</FarsiText>
          {currentWord && (
            <View style={styles.wordContainer}>
              <FarsiText style={styles.word}>{currentWord}</FarsiText>
            </View>
          )}
          <Button
            mode="contained"
            style={styles.passButton}
            onPress={handlePass}
            disabled={!currentWord || remainingWords.length === 0}
            labelStyle={[styles.passButtonLabel, farsiFont]}
            contentStyle={styles.passButtonContent}
          >
            <FarsiText style={styles.passButtonLabel}>Pass</FarsiText>
          </Button>
        </>
      ) : (
        <>
          {turnPassedWords.length > 0 && (
            <View style={styles.passedList}>
              <FarsiText style={styles.passedTitle}>Passed Words:</FarsiText>
              {turnPassedWords.map((w, i) => (
                <FarsiText key={i} style={styles.passedWord}>{w}</FarsiText>
              ))}
            </View>
          )}
          <Button mode="contained" onPress={nextTurn} style={styles.nextButton} labelStyle={farsiFont}>
            <FarsiText>{t('next_player')}{nextPlayerName ? `: ${nextPlayerName}` : ''}</FarsiText>
          </Button>
        </>
      )}
      <Portal>
        <Dialog visible={exitDialogVisible} onDismiss={() => setExitDialogVisible(false)}>
          <Dialog.Title style={farsiFont}>{t('exit_game_title') || 'Exit Game'}</Dialog.Title>
          <Dialog.Content>
            <FarsiText>{t('exit_game_message') || 'Are you sure you want to exit the game?'}</FarsiText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setExitDialogVisible(false)} labelStyle={farsiFont}><FarsiText>{t('cancel') || 'Cancel'}</FarsiText></Button>
            <Button onPress={() => { setExitDialogVisible(false); router.replace('/'); }} labelStyle={farsiFont}><FarsiText>{t('exit') || 'Exit'}</FarsiText></Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
