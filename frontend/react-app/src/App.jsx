import React from 'react';
import AppRouter from './routers/AppRouter'
import { Provider } from 'react-redux';
import store from './redux/redux';
import './styles/styles.scss'

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App
