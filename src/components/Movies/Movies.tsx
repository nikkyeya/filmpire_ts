import React, { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import useStyles from './Movies.styles';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import { RootState } from '../../app/store';

const Movies = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state: RootState) => state.currentGenreOrCategory
  );
  const { data, isFetching, error } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  // IF FETCHING MOVIES
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  // IF NO DATA RESULT
  if (!data.results.length) {
    <Box display="flex" alignItems="center" mt="20px">
      <Typography variant="h4">
        No movies that match the name.
        <br />
        Please search for something else.
      </Typography>
    </Box>;
  }

  // IF ERROR
  if (error) return <Typography>An error has occured.</Typography>;

  // RENDER MOVIE LIST
  return <MovieList movies={data} />;
};

export default Movies;
