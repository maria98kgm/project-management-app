import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { useDebounce } from '../../share/utils';
import './style.scss';

export const SearchBar = () => {
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

  return (
    <TextField
      id="search-bar"
      className="text"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
      }}
      label={t('INFO.TASK_SEARCH')}
      variant="outlined"
      placeholder={t('HEADERS.SEARCH')}
      size="small"
      color="secondary"
      InputProps={{
        startAdornment: <SearchIcon color="secondary" />,
      }}
    />
  );
};
