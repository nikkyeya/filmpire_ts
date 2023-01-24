import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
export default makeStyles((theme: Theme) => ({
  containerSpaceAround: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '30px 0 !important',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
  },
  image: {
    display: 'flex',
    borderRadius: '20px',
    boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
    width: '90%',
    [theme.breakpoints.down('lg')]: {
      margin: '0 auto',
      width: '50%',
      justifyContent: 'center',
      marginBottom: '30px',
    },
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      width: '80%',
      marginBottom: '30px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      width: '100%',
      // height: '350px',
      marginBottom: '30px',
    },
  },
}));
