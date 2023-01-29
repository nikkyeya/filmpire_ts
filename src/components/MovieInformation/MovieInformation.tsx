import React, { useState, useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  Modal,
  Box,
  Grid,
  CircularProgress,
  Rating,
  useMediaQuery,
  Typography,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Language,
  Theaters,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from '@mui/icons-material';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import useStyles from './MovieInformation.styles';
import {
  ParamsProps,
  GenreProps,
  CharacterProps,
} from './MovieInformation.props';
import {
  useGetMovieInformationQuery,
  useGetRecommendationsQuery,
} from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import genreIcons from '../../assets/genres';
import MovieList from '../MovieList/MovieList';
import { userSelector } from '../../features/auth';
import { useGetListQuery } from '../../services/TMDB';
import { FeaturedItemProps } from '../FeaturedMovie/FeaturedMovie.props';

const MovieInformation = () => {
  const classes = useStyles();
  const { id }: ParamsProps = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector(userSelector);
  const [open, setOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const { data: favoriteMovies } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  const { data: movie, isFetching, error } = useGetMovieInformationQuery(id);
  const { data: recommendations, isFetching: isFetchingRecommendations } =
    useGetRecommendationsQuery({ movieId: id, list: '/recommendations' });

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find(
        (item: FeaturedItemProps) => item?.id === movie?.id
      )
    );
  }, [favoriteMovies, movie]);
  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find(
        (item: FeaturedItemProps) => item?.id === movie?.id
      )
    );
  }, [watchlistMovies, movie]);


  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem('session_id')}`,
      {
        media_type: 'movie',
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );
    setIsMovieFavorited((prev) => !prev);
  };
  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem('session_id')}`,
      {
        media_type: 'movie',
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );
    setIsMovieWatchlisted((prev) => !prev);
  };

  // IF FETCHING MOVIE INFORMATION
  if (isFetching || isFetchingRecommendations) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  // IF ERROR
  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        <Link to="/">Something has gine wrong - Go back</Link>
      </Box>
    );
  }
  console.log(movie);

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          alt={movie?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {movie?.title} ({movie?.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {movie?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
            component="div"
          >
            <Rating readOnly value={movie?.vote_average / 2} precision={0.1} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: '10px' }}
            >
              {Math.round(movie?.vote_average * 10) / 10} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {movie?.runtime}min | Language: {movie?.spoken_languages[0].name}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {movie?.genres?.map((genre: GenreProps) => (
            <Link
              to="/"
              key={genre.name}
              className={classes.links}
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={
                  genreIcons[
                    genre.name.toLowerCase() as keyof typeof genreIcons
                  ]
                }
                className={classes.genreImage}
                height={30}
                alt={genre.name}
              />
              <Typography variant="subtitle1" color="textPrimary">
                {genre.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {movie?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {movie &&
            movie.credits?.cast
              ?.map(
                (character: CharacterProps) =>
                  character.profile_path && (
                    <Grid
                      item
                      key={character.id}
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actor/${character.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color="textPrimary">
                        {character.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character.character.split('/')[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem', width: '100%' }}>
          <div className={classes.buttonsContainer}>
            <Grid item className={classes.buttonGroup}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={movie?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${movie?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: 'primary.main' }}
                >
                  <Typography
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                    style={{ textDecoration: 'none' }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>

      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry nothing was found</Box>
        )}
      </Box>

      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {movie && movie?.videos?.results?.length > 0 && (
          <iframe
            // autoPlay
            className={classes.video}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
