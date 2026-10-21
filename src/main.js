import './style.css';
import { initApp } from './app.js';

const appRoot = document.querySelector('#app');

if (appRoot) {
  initApp(appRoot);
}
