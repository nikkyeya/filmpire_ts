import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    // Get Movie Genres
    getGenres: builder.query({
      query: (param: void) => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    // Get Movies by [Type]
    getMovies: builder.query({
      query: (page: number) =>
        `movie/popular?page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const { useGetGenresQuery, useGetMoviesQuery } = tmdbApi;
