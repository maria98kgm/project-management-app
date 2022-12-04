import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { useDebounce } from '../../share/utils';
import './style.scss';

export const SearchBar: React.FC<{ isToken: boolean }> = ({ isToken }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery) {
      navigate(`/search/${debouncedSearchQuery}`);
    }
    return () => setQuery('');
  }, [debouncedSearchQuery, navigate]);

  return isToken ? (
    <div className="search-bar">
      <TextField
        className="text"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(event.target.value);
        }}
        variant="outlined"
        placeholder={t('HEADERS.SEARCH')}
        size="small"
        color="secondary"
        InputProps={{
          startAdornment: <SearchIcon color="secondary" />,
        }}
      />
    </div>
  ) : null;
};
