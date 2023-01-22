import { configureStore } from '@reduxjs/toolkit';

import { tmdbApi } from '../services/TMDB';
import { genreOrCategoryReducer, userReducer } from '../features';

const rootReducer = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer.getState>;
export default rootReducer;
