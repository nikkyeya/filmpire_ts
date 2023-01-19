import { MovieItemProps } from '../Movie/Movie.props';

export interface MovieListProps {
  movies: {
    page: 1;
    results: MovieItemProps[];
    total_pages: 36737;
    total_results: 734733;
  };
}
