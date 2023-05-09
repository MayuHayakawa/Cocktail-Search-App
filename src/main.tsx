import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './redux/store.tsx';
// import { store, persistor } from './redux/store.tsx';
// import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={ store }>
    {/* <PersistGate persistor={persistor}> */}
      <App />
    {/* </PersistGate> */}
  </Provider>
)
