import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Main from './Main';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Main />
  </Provider>
);
