import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitch: React.FC = () => {
  const { i18n, ready } = useTranslation();
  const [lang, setLang] = useState(ready && i18n.language ? i18n.language : 'en');

  const changeLanguage = (event: SelectChangeEvent) => {
    const lng = event.target.value as string;
    setLang(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language">
      <FormControl sx={{ m: 1, minWidth: 70 }} size="small" color="secondary">
        <Select
          value={lang}
          onChange={changeLanguage}
          inputProps={{ MenuProps: { disableScrollLock: true } }}
        >
          <MenuItem value={'en'}>En</MenuItem>
          <MenuItem value={'ru'}>Ru</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
