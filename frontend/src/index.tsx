import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Helmet } from 'react-helmet'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Helmet>
      <title>yakimanjusuki-Chat-GPT</title>
      <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1.0"></meta>
      <link rel="icon" href="./logo2.png"></link>
    </Helmet>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
