import { MovieItemProps } from '../Movie/Movie.props';
export interface MovieListProps {
  movies: {
    page: number;
    results: MovieItemProps[];
    total_pages: number;
    total_results: number;
  };
  numberOfMovies: number;
  excludeFirst: boolean;
}
