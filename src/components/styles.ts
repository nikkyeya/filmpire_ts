import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  toolbar: {
    height: '80px',
    border: '1px solid red',
  },
  content: {
    flexGrow: '1',
    padding: '0 2em',
  },
}));
