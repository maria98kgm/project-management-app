import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <HashRouter>
    <AppRouter />
  </HashRouter>
);
