import { configureStore } from '@reduxjs/toolkit';
const createSagaMiddleware = require('redux-saga').default;

const sagaMiddleware = createSagaMiddleware();

import { all } from 'redux-saga/effects';
import gameReducer from './gameSlice';

// Placeholder root reducer and saga
function* rootSaga() {
  yield all([]); // Add sagas here
}

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
