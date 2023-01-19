import React from 'react';
import {
  Divider,
  List,
  ListItemText,
  ListSubheader,
  Box,
  CircularProgress,
  Theme,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';

import { SidebarProps, GenresProps } from './Sidebar.props';
import useStyles from './Sidebar.styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';

// Demo data
const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const blueLogo =
  'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo =
  'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const Sidebar = ({ setMobileOpen }: SidebarProps) => {
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const { data, isFetching } = useGetGenresQuery();

  console.log('Data', data);

  // IF FETCHING MOVIES
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'dark' ? redLogo : blueLogo}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}} button>
              <ListItemIcon>
                <img
                  alt={label}
                  src={
                    genreIcons[label.toLowerCase() as keyof typeof genreIcons]
                  }
                  className={classes.genreImage}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {data.genres.map(({ name, id }: GenresProps) => (
          <Link key={id} className={classes.links} to="/">
            <ListItem onClick={() => {}} button>
              <ListItemIcon>
                <img
                  alt={name}
                  src={
                    genreIcons[name.toLowerCase() as keyof typeof genreIcons]
                  }
                  className={classes.genreImage}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
