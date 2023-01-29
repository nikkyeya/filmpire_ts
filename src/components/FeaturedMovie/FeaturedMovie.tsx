import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

import { FeaturedMovieProps } from './FeaturedMovie.props';

import useStyles from './FeaturedMovie.styles';

const FeaturedMovie = ({ movie }: FeaturedMovieProps) => {
  const classes = useStyles();

  if (!movie) return null;

  return (
    <Box
      className={classes.container}
      component={Link}
      to={`/movie/${movie.id}`}
    >
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        <CardMedia
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          title={movie.title}
          className={classes.cardMedia}
        />
        <CardContent
          className={classes.cardContent}
          classes={{ root: classes.cardContentRoot }}
        >
          <Typography variant="h5" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {movie.overview}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
