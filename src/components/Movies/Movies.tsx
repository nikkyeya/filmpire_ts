import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';

import useStyles from './Movies.styles';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';
import { RootState } from '../../app/store';

const Movies = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const isLarge = useMediaQuery((theme: Theme) => theme.breakpoints.only('lg'));
  const numberOfMovies = isLarge ? 16 : 18;
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
  return (
    <div>
      <MovieList movies={data} numberOfMovies={numberOfMovies} />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data.total_pages}
      />
    </div>
  );
};

export default Movies;
