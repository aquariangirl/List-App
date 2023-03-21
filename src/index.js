import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// Load the CDN links for React, React DOM, and Babel
const scripts = [
  'https://cdnjs.cloudflare.com/ajax/libs/react/16.14.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.14.0/umd/react-dom.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js',
];

// Add script tags to the DOM to load the scripts
scripts.forEach((src) => {
  const script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
});

// React component function is defined in App.js

// Render your component to the DOM
// ReactDOM.render(<App />, document.getElementById('root'));


// reportWebVitals();