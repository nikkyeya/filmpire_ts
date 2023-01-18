import React from 'react';

import useStyles from './Movies.styles';

const Movies = () => {
  const classes = useStyles();

  return <div className={classes.container}>Movies</div>;
};

export default Movies;
