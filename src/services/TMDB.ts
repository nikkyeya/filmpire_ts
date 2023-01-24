import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    // ---- GET GENRES
    getGenres: builder.query({
      query: (param: void) => `/genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    // ---- GET MOVIES BY [TYPE]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // GET MOVIES BY SEARCH
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // GET MOVIES BY CATEGORY NAME
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          return `/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        // GET MOVIES BY GENRE ID
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          return `/discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // GET POPULAR MOVIES BY DEFAULT
        return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    // ---- GET MOVIE INFORMATION
    getMovieInformation: builder.query({
      query: (movieId) =>
        `/movie/${movieId}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),
    // --- GET USER SPECIFIC LIST
    getRecommendations: builder.query({
      query: ({ movieId, list }) =>
        `/movie/${movieId}/${list}?api_key=${tmdbApiKey}`,
    }),
    // --- GET ACTOR
    getActor: builder.query({
      query: (personId) => `/person/${personId}?api_key=${tmdbApiKey}`,
    }),
    // --- GET MOVIES BY ACTOR
    getActorMovies: builder.query({
      query: ({ personId, page }) =>
        `/discover/movie?with_cast=${personId}&page=${page}&api_key=${tmdbApiKey}`,
    }),
    // --- GET LIST (FAVORITE OR WATCHLIST)
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMovieInformationQuery,
  useGetMoviesQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetActorMoviesQuery,
  useGetListQuery,
} = tmdbApi;
