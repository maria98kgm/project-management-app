import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { useGetTasksBySearchMutation } from '../../redux/features/api/taskApi';
import { TaskData } from '../../models';
import './style.scss';

export const Search = () => {
  const { t } = useTranslation();
  const { query } = useParams();
  const [searchTasks] = useGetTasksBySearchMutation();
  const [searchResults, setSearchResults] = useState<TaskData[]>([]);
  const [mount, setMount] = useState(false);

  const fetchTasks = useCallback(async () => {
    if (query) {
      setMount(false);
      const results = await searchTasks(query).unwrap();
      setSearchResults(results);
      setMount(true);
    }
  }, [searchTasks, query]);

  useEffect(() => {
    fetchTasks().then(() => setMount(true));
  }, [fetchTasks, query]);

  return !mount ? (
    <Box className="loader">
      <CircularProgress />
    </Box>
  ) : (
    <div className="search-results container">
      <h3>{`${t('INFO.FOUND_TASKS')} "${query}":`}</h3>
      <div className="task-results">
        {searchResults.length ? (
          searchResults.map((task) => {
            return (
              <div className="task-result" key={task._id}>
                <h3 className="task-title">
                  <strong>{t('HEADERS.TITLE')}:</strong> {task.title}
                </h3>
                <p>
                  <strong>{t('HEADERS.DESCRIPTION')}:</strong> {task.description}
                </p>
                <p>
                  <strong>{t('HEADERS.OWNER')}:</strong> {task.userId}
                </p>
                <p>
                  <strong>{t('HEADERS.RESPONSIBLE')}:</strong> {task.users.join(', ')}
                </p>
              </div>
            );
          })
        ) : (
          <p>{t('INFO.NOTHING_FOUND')}</p>
        )}
      </div>
    </div>
  );
};
