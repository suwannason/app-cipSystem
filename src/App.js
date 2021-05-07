
import './App.css';

import Page from './pages/index';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
}

export default App;
