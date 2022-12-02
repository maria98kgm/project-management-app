import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { useGetTasksBySearchMutation } from '../../redux/features/api/taskApi';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { SearchItem } from '../../components/SearchItem';
import { TaskData } from '../../models';

export const Search = () => {
  const { t } = useTranslation();
  const { query } = useParams();
  const navigate = useNavigate();

  const names = useAppSelector((state: RootState) => state.user.allUsers);

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
          searchResults.map((task) => (
            <SearchItem
              key={task._id}
              title={task.title}
              description={task.description}
              owner={names.find((name) => name.id === task.userId)?.name || ''}
              responsible={
                names
                  .filter((name) => task.users.includes(name.id))
                  .map((name) => name.name)
                  .join(', ') || 'no users'
              }
              handleClick={() => navigate(`/board/${task.boardId}`)}
            />
          ))
        ) : (
          <p>{t('INFO.NOTHING_FOUND')}</p>
        )}
      </div>
    </div>
  );
};
