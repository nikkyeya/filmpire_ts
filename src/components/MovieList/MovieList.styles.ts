import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  moviesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));
