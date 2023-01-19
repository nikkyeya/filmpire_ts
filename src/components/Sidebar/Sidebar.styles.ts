import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  container: {
    border: '1px solid red',
  },
  image: {
    width: '70%',
  },
  imageLink: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10% 0',
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  genreImage: {
    filter: theme.palette.mode === 'light' ? 'dark' : 'invert(1)',
  },
}));
