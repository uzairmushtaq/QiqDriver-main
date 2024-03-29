/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createStore} from 'redux';
import allReducers from './src/reducers/index.js';
import {Provider} from 'react-redux';
import InternetConnectionAlert from 'react-native-internet-connection-alert';

const store = createStore(allReducers);
const ReduxApp = () => (
  <Provider store={store}>
    <InternetConnectionAlert
      onChange={connectionState => {
        console.log('Connection State: ', connectionState);
      }}>
      <App />
    </InternetConnectionAlert>
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
LogBox.ignoreAllLogs();
