import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';
import store from './assets/store';
import { register } from 'swiper/element'

register();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <SkeletonTheme baseColor='#ddd' highlightColor='#eee'>
          <App />
        </SkeletonTheme>
      </Router>
    </Provider>
  </React.StrictMode>
);