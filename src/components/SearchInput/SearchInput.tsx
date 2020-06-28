import * as React from 'react';
import { Button } from 'components';
import { SearchInputText, SearchContainer } from './styles';

export const SearchInput: React.FC<SearchInputProps> = ({ searchHandler, placeholder }) => {
  const [search, setSearch] = React.useState('');

  return (
    <SearchContainer
      onSubmit={(e) => {
        e.preventDefault();
        searchHandler(search);
      }}
    >
      <SearchInputText
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
      />
      <Button
        icon="search"
        text="Search"
        onClick={() => searchHandler(search)}
      />
    </SearchContainer>
  );
};
