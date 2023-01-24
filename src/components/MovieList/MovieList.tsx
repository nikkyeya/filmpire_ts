import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './MovieList.styles';
import { MovieListProps } from './MovieList.props';
import Movie from '../Movie/Movie';

const MovieList = ({ movies, numberOfMovies = 20 }: MovieListProps) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.slice(0, numberOfMovies).map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
