import { Button, Typography } from '@mui/material';

import useStyles from './Pagination.styles';
import { PaginationProps } from './Pagination.props';

const Pagination = ({ currentPage, setPage, totalPages }: PaginationProps) => {
  const classes = useStyles();

  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (totalPages === 0) return null;
  return (
    <div className={classes.container}>
      <Button
        disabled={currentPage === 1}
        onClick={handlePrev}
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
      >
        Prev
      </Button>
      <Typography variant="h4" className={classes.pageNumber}>
        {currentPage}
      </Typography>
      <Button
        disabled={currentPage === totalPages}
        onClick={handleNext}
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
