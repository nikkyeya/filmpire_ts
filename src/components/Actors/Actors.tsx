import React, { useState } from 'react';
import { Box, CircularProgress, Grid, Typography, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useParams, useHistory } from 'react-router-dom';

import { useGetActorQuery, useGetActorMoviesQuery } from '../../services/TMDB';
import useStyles from './Actors.styles';
import MovieList from '../MovieList/MovieList';
import { ParamsProps } from './Actors.props';
import Pagination from '../Pagination/Pagination';

const Actor = () => {
  const classes = useStyles();
  const { id }: ParamsProps = useParams();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorQuery(id);
  const { data: actorMovies, isFetching: isFetchingActorMovies } =
    useGetActorMoviesQuery({ personId: id, page });

  if (isFetching || isFetchingActorMovies) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="h6" gutterBottom>
          Something has gone wrong - Go back
        </Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => history.goBack()}>
          <Typography
            variant="subtitle2"
            style={{ textDecoration: 'none' }}
            color="primary"
          >
            Go Back
          </Typography>
        </Button>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item lg={5} xl={4}>
        <img
          className={classes.image}
          src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`}
          alt={data.name}
        />
      </Grid>

      <Grid
        item
        container
        display="flex"
        // justifyContent="center"
        direction="column"
        lg={7}
        xl={4}
      >
        <Typography variant="h2" gutterBottom color="textPrimary">
          {data.name}
        </Typography>
        <Typography variant="h5" gutterBottom color="textPrimary">
          Born:
          {new Date(data.birthday).toLocaleDateString('en-us', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          gutterBottom
          color="textPrimary"
          paragraph
        >
          {data.biography}
        </Typography>

        <Box display="flex" justifyContent="space-between" mt="2rem">
          <Button
            variant="contained"
            color="primary"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.imdb.com/name/${data?.imdb_id}`}
          >
            IMDB
          </Button>
          <Button
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
        </Box>
      </Grid>

      <Box marginTop="5rem" width="100%">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        {actorMovies ? (
          <MovieList
            movies={actorMovies}
            numberOfMovies={12}
            excludeFirst={false}
          />
        ) : (
          <Box>Sorry nothing was found</Box>
        )}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={actorMovies?.total_pages}
        />
      </Box>
    </Grid>
  );
};

export default Actor;
