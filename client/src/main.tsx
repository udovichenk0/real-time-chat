import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './app/index.css'
import {store} from "@/app/redux/store";
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
    <App />
    </Provider>
)
