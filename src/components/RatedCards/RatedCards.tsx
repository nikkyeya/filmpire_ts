import React from 'react';
import { Box, Typography } from '@mui/material';

import useStyles from './RatedCards.styles';
import Movie from '../Movie/Movie';
import { RatedCardsProps } from './RatedCards.props';

const RatedCards = ({ title, data }: RatedCardsProps) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h5" gutterBottom />
      {title}
      <Box display="flex" flexWrap="wrap" className={classes.container}>
        {data?.results?.map((movie: any, i: number) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;
