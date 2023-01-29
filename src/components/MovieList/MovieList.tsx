import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './MovieList.styles';
import { MovieListProps } from './MovieList.props';
import Movie from '../Movie/Movie';

const MovieList = ({
  movies,
  numberOfMovies = 20,
  excludeFirst,
}: MovieListProps) => {
  const classes = useStyles();
  const startFrom = excludeFirst ? 1 : 0;

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.slice(startFrom, numberOfMovies).map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
