import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const drawerWidth = 240;

export default makeStyles((theme: Theme) => ({
  toolbar: {
    height: '80px',
    marginLeft: drawerWidth,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      flexWrap: 'wrap',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  linkButton: {
    '&:hover': {
      // color: 'white !important',
      textDecoration: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));
