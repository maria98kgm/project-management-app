import { useTranslation } from 'react-i18next';
import './style.scss';

type SearchItemProps = {
  title: string;
  description: string;
  owner: string;
  responsible: string;
  handleClick: () => void;
};

export const SearchItem: React.FC<SearchItemProps> = ({
  title,
  description,
  owner,
  responsible,
  handleClick,
}) => {
  const { t } = useTranslation();

  return (
    <div className="task-result" onClick={handleClick}>
      <h3 className="task-title">
        <strong>{t('HEADERS.TITLE')}:</strong> {title}
      </h3>
      <p>
        <strong>{t('HEADERS.DESCRIPTION')}:</strong> {description}
      </p>
      <p>
        <strong>{t('HEADERS.OWNER')}:</strong> {owner}
      </p>
      <p>
        <strong>{t('HEADERS.RESPONSIBLE')}:</strong> {responsible}
      </p>
    </div>
  );
};
