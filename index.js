/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Login from './app/vues/Login';
import Router from './app/Router';
import Configuration from './app/vues/Configuration';
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => Login);
// AppRegistry.registerComponent(appName, () => Configuration);
AppRegistry.registerComponent(appName, () => Router);
