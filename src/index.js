import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';
import store from "./store/index"
import { Provider } from 'react-redux';
// import { Toaster } from 'react-hot-toast';
// const App = lazy(() => import("./App"))

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
 
  </Provider>

);

{/* </BrowserRouter>
    <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback="<h1>loading............</h1>">
        <App />
        <Toaster toastOptions={{
          position: 'top-right',
          style: {
            background: '#283046',
            color: "white"
          }
        }}/>
      </Suspense>
    </Provider>

  </BrowserRouter> */}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();