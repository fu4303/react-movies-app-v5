import * as React from 'react';
import Api from 'services/Api.service';
import cinema from 'assets/cinema.svg';
import { GridFrame } from 'components/global-styles';
import { MovieCard, SearchInput, NoData } from 'components';
import { ErrorAlert } from 'components/SweetAlert';
import { SearchPageTitle, SearchPageResultsText } from './styles';

export const SearchPage: React.FC = () => {
  const [searchMovies, setSearchMovies] = React.useState<SearchMoviesProps>();

  const fetchMoviesByQuery = async (query: string) => {
    try {
      if (!query) {
        ErrorAlert({
          title: 'Empty search field!',
          text: 'Type something and then hit search to get your movies',
        });
        return undefined;
      }
      const response = await Api.get(`search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`);
      setSearchMovies(response.data);
      return undefined;
    } catch (error) {
      ErrorAlert({
        title: 'Some error has occured',
        text: 'Please, try again later.',
      });
      return undefined;
    }
  };

  const renderResponse = () => {
    if (searchMovies && searchMovies.results) {
      return <NoData title="Oops, no movie was found!" icon={cinema} />;
    }

    return <NoData title="Start to search a movie by title!" icon={cinema} />;
  };

  return (
    <>
      <SearchPageTitle>
        Search for Movies
      </SearchPageTitle>
      <SearchInput
        placeholder="E.g.: Star Wars"
        searchHandler={fetchMoviesByQuery}
      />
      {
        searchMovies && searchMovies.results.length > 0
          ? (
            <>
              <SearchPageResultsText>
                {`Showing results (${searchMovies.results.length}):`}
              </SearchPageResultsText>
              <GridFrame center>
                {
                  searchMovies && searchMovies.results.map(({
                    id,
                    poster_path,
                    title,
                    release_date,
                    overview,
                  }) => (
                    <MovieCard
                      key={id}
                      id={id}
                      poster_path={poster_path}
                      title={title}
                      release_date={release_date}
                      overview={overview}
                    />
                  ))
                }
              </GridFrame>
            </>
          )
          : renderResponse()
      }
    </>
  );
};
