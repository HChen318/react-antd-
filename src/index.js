import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Life from './pages/demo/Life.jsx'
import Admin from './Admin'
import Main from './pages/router-demo/router1/Main'
import Main2 from './pages/router-demo/router2/Main'
import Router from './Router'
import zhCN from 'antd/es/locale-provider/zh_CN';
import {LocaleProvider} from 'antd'


ReactDOM.render(<LocaleProvider locale={zhCN}><Router /></LocaleProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
