import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.scss';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Dev tools
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store ={store}>	
			<App />
		</Provider>
  	</React.StrictMode>
);
